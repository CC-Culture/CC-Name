import { NextResponse } from "next/server";
import OpenAI from "openai";
import { calculateElements } from "@/utils/elements";

const openai = new OpenAI({
  apiKey: process.env.DASHSCOPE_API_KEY,
  baseURL: "https://dashscope.aliyuncs.com/compatible-mode/v1",
});

// 语言代码到语言名称的映射表
const languageNameMap: Record<string, string> = {
  en: "英语",
  zh: "中文",
  fr: "法语",
  es: "西班牙语",
  ja: "日语",
  ar: "阿拉伯语",
  ru: "俄语",
  pt: "葡萄牙语",
  bn: "孟加拉语",
  ur: "乌尔都语",
};

export async function POST(request: Request) {
  try {
    const { birthdate, gender, timeRange, language, surname } =
      await request.json();

    if (!birthdate) {
      return NextResponse.json({ error: "请提供生日" }, { status: 400 });
    }

    if (!gender) {
      return NextResponse.json({ error: "请提供性别" }, { status: 400 });
    }

    if (!timeRange) {
      return NextResponse.json({ error: "请提供时间范围" }, { status: 400 });
    }

    // 计算五行数据
    const elements = calculateElements(birthdate + " " + timeRange);

    console.log(
      "Request:",
      `生日:${birthdate}，性别:${gender}，五行数据:${JSON.stringify(
        elements
      )}，姓氏:${surname || "未提供"}，语言:${languageNameMap[language]}`
    );

    // 调用大模型生成名字和诗句
    const completion = await openai.chat.completions.create({
      model: "qwen-plus",
      messages: [
        {
          role: "system",
          content: `
您是一位融合中国传统文化精髓、多国语言与现代审美的命名大师。您深谙诗经、楚辞、唐诗宋词、四书五经等典籍，也精通易经五行、天干地支的奥秘。严格按照以下步骤操作：
1. 基于中国传统文化，从中国不同时代、流派的文学作品中随机选择和五行属性相关的的诗句，再根据诗句取名:
- 考虑名字的音律与节奏感，追求谐音美感
- 融入五行相生相克的智慧，但不必过分拘泥于传统规则
- 可以从自然景物、人文典故、美好寓意等多个维度选字
- 重视名字的现代感，避免过于生僻难认的字
2. 基于上一步生成的引用的诗句，基于中文生成详细的字义分析、文化内涵、五行关系、以及引用作品的详细解释。
3. 保持中文诗词的原文,生成根据"目标语言"翻译后的解释
按照name层和translation层JSON格式返回。
{
  "name": {
    "firstName": "中文名（必须是中文字符）",
    "lastName": "中文姓（必须是中文字符）"
  },
  "translation": {
    "name": {
      "firstName": "名字在目标语言中的发音或对应翻译",
      "lastName": "姓氏在目标语言中的发音或对应翻译",
      "meaning": "名字含义的目标语言翻译",
      "reasoning": "取名理由的目标语言翻译，包括字义分析、文化内涵、五行关系等",
      "style": "名字风格特点的目标语言翻译，如典雅古风、自然清新等"
    },
    "poetry": {
      "type": "文学作品类型的目标语言翻译",
      "title": "诗句标题的目标语言翻译",
      "content": "相关诗句的原文（保持中文）",
      "meaning": "文学典故与名字呼应关系的目标语言翻译"
    }
  }
}`,
        },
        {
          role: "user",
          content: `生日:${birthdate},性别:${gender},五行数据:${JSON.stringify(
            elements
          )},姓氏:${surname || ""},目标语言:${languageNameMap[language]}`,
        },
      ],
      response_format: {
        type: "json_object",
      },
    });

    const response = completion.choices[0].message.content;
    if (!response) {
      throw new Error("No response from API");
    }
    const modelResponse = JSON.parse(response);
    console.log("Model response:", modelResponse);
    // 合并本地计算的五行数据和模型生成的结果
    const finalResponse = {
      ...modelResponse,
      elements,
    };
    return NextResponse.json(finalResponse);
  } catch (error) {
    console.error("Error generating name:", error);
    return NextResponse.json(
      { error: "生成名字时发生错误，请稍后重试" },
      { status: 500 }
    );
  }
}
