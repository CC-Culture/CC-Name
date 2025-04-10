import { NextResponse } from "next/server";
import OpenAI from "openai";
import { calculateElements } from "@/utils/elements";

const openai = new OpenAI({
  apiKey: process.env.DASHSCOPE_API_KEY,
  baseURL: "https://dashscope.aliyuncs.com/compatible-mode/v1",
});

export async function POST(request: Request) {
  try {
    const { birthdate, gender, timeRange } = await request.json();

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

    console.log("Request elements:", elements);

    // 调用大模型生成名字和诗句
    const completion = await openai.chat.completions.create({
      model: "qwen-turbo",
      messages: [
        {
          role: "system",
          content: `您是一位融合中国传统文化精髓与现代审美的命名大师。您深谙诗经、楚辞、唐诗宋词、四书五经等典籍，也精通易经五行、天干地支的奥秘。请根据用户提供的生日、性别和五行数据，发挥创意，生成独特而富有诗意的名字建议。

在创作时请注意：
1. 结合不同时代、流派的文学作品，可以从诗经、楚辞到唐诗宋词，甚至现代诗词中汲取灵感
2. 考虑名字的音律与节奏感，追求谐音美感
3. 融入五行相生相克的智慧，但不必过分拘泥于传统规则
4. 可以从自然景物、人文典故、美好寓意等多个维度选字
5. 重视名字的现代感，避免过于生僻难认的字

请按照以下json格式返回您的创意建议：
{
	"name": {
		"firstName": "名",
		"lastName": "姓",
		"meaning": "名字含义",
		"reasoning": "详细的取名理由，包括字义分析、文化内涵、五行关系等",
		"style": "名字的风格特点，如典雅古风、自然清新等"
	},
	"poetry": {
		"type": "主要参考的文学作品类型，如诗经、楚辞、唐诗等",
		"title": "生成名字引用的诗句标题",
		"content": "相关诗句或文段",
		"meaning": "此处文学典故与名字的呼应关系"
	}
}
      `,
        },
        {
          role: "user",
          content: `生日:${birthdate}
                    性别:${gender}
                    五行数据:${JSON.stringify(elements)},`,
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

    // 合并本地计算的五行数据和模型生成的结果
    const finalResponse = {
      ...modelResponse,
      elements,
    };
    console.log("Request finalResponse:", finalResponse);

    return NextResponse.json(finalResponse);
  } catch (error) {
    console.error("Error generating name:", error);
    return NextResponse.json(
      { error: "生成名字时发生错误，请稍后重试" },
      { status: 500 }
    );
  }
}
