import { NextResponse } from "next/server";
import OpenAI from "openai";
import { calculateElements } from "@/utils/elements";
import { translateNameResult } from "@/services/translation/name-translator";

const openai = new OpenAI({
  apiKey: process.env.DASHSCOPE_API_KEY,
  baseURL: "https://dashscope.aliyuncs.com/compatible-mode/v1",
});

// 语言代码到语言名称的映射表
const languageNameMap: Record<string, string> = {
  en: "en",
  zh: "zh",
  fr: "fr",
  es: "es",
  ja: "ja",
  ar: "ara",
  ru: "ru",
  pt: "pt",
  bn: "zh",
  ur: "zh",
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
      model: "qwen-turbo",
      messages: [
        {
          role: "system",
          content: `
您是一位融合中国传统文化精髓、现代审美的命名大师，请为我取名:
- 融入五行相生相克的智慧，但不必过分拘泥于传统规则
- 随机从不同时代的诗词歌赋里选字
- 随机从自然景物、人文典故、美好寓意等多个维度选字
按照name层和poetry层的JSON格式返回:
{
    "name": {
      "firstName": "名字",
      "pinyin": "名字拼音"
      "meaning": "名字含义",
      "reasoning": "取名理由，包括字义分析、文化内涵、五行关系等",
    },
    "poetry": {
      "title": "诗句标题",
      "content": "相关诗句的原文",
      "meaning": "文学典故与名字呼应关系"
    }
}`,
        },
        {
          role: "user",
          content: `生日:${birthdate},性别:${gender},五行数据:${JSON.stringify(
            elements
          )}`,
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

    // 构建最终返回的格式
    const result = {
      name: {
        firstName: modelResponse.name.firstName,
        pinyin: modelResponse.name.pinyin,
      },
      translation: {
        name: {
          firstName: modelResponse.name.firstName,
          meaning: modelResponse.name.meaning,
          reasoning: modelResponse.name.reasoning,
          style: modelResponse.name.style,
        },
        poetry: {
          type: "古诗",
          title: modelResponse.poetry.title,
          content: modelResponse.poetry.content,
          meaning: modelResponse.poetry.meaning,
        },
      },
      elements,
    };

    // 如果请求的语言不是中文，则使用百度翻译API将内容翻译成目标语言
    if (language && language !== "zh") {
      try {
        console.log(`开始翻译结果到 ${language} 语言...`);
        const startTime = Date.now();
        const translatedResult = await translateNameResult(
          result,
          languageNameMap[language]
        );
        const endTime = Date.now();
        console.log(
          `翻译完成，耗时: ${endTime - startTime}ms，目标语言: ${language}`
        );
        return NextResponse.json(translatedResult);
      } catch (translationError) {
        console.error("翻译错误:", translationError);
        // 如果翻译失败，返回原始中文结果
        return NextResponse.json(result);
      }
    }

    return NextResponse.json(result);
  } catch (error) {
    console.error("Error generating name:", error);
    return NextResponse.json(
      { error: "生成名字时发生错误，请稍后重试" },
      { status: 500 }
    );
  }
}
