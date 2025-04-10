import { NextResponse } from "next/server";
import OpenAI from "openai";
import { calculateElements } from "@/utils/elements";

const openai = new OpenAI({
  apiKey: process.env.DASHSCOPE_API_KEY,
  baseURL: "https://dashscope.aliyuncs.com/compatible-mode/v1",
});

const example1Response = JSON.stringify({
  name: { firstName: "瑞安", lastName: "刘" },
  meaning: {
    meaning:
      "Brilliant peace, representing the brilliance of water and earth elements in his birth chart balanced by a tranquil heart.",
    reasoning:
      "The name 'Rui'an' combines the Chinese characters 瑞 (brilliant, auspicious) and 安 (peace, tranquility). The character 瑞 is associated with the water element which dominates his birth chart, symbolizing success and prosperity. 安 represents earth, balancing the overall composition and bringing harmony. These elements reflect his strong water and earth elements while incorporating metal through the sound resonance.",
    style: "Elegant and harmonious",
  },
  poetry: {
    type: "Song Ci (宋词)",
    title: "《青玉案·元夕》",
    content: "东风夜放花千树，更吹落，星如雨。",
    meaning:
      "This line from Song Ci reflects a vibrant yet serene atmosphere, akin to the balance of elements in his chart. The brilliance of flowers and stars mirrors the brilliance of water and earth, while the peaceful night sky evokes the tranquil heart represented by 安.",
  },
});

export async function POST(request: Request) {
  try {
    const { birthdate, gender, timeRange, language } = await request.json();

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
      )},国家代码:${language}`
    );

    // 调用大模型生成名字和诗句
    const completion = await openai.chat.completions.create({
      model: "qwen-turbo",
      messages: [
        {
          role: "system",
          content: `您是一位融合中国传统文化精髓、多国语言与现代审美的命名大师。您深谙诗经、楚辞、唐诗宋词、四书五经等典籍，也精通易经五行、天干地支的奥秘。请根据用户提供的生日、性别和五行数据，发挥创意，生成独特而富有诗意的名字建议。
在创作时请注意：
1. 结合不同时代、流派的文学作品，可以从诗经、楚辞到唐诗宋词，甚至现代诗词中汲取灵感
2. 考虑名字的音律与节奏感，追求谐音美感
3. 融入五行相生相克的智慧，但不必过分拘泥于传统规则
4. 可以从自然景物、人文典故、美好寓意等多个维度选字
5. 重视名字的现代感，避免过于生僻难认的字
6. 结果除了姓名外其他结果按照国家代码翻译
输出包含name层和meaning层和poetry的JSON。
示例：
          Q:生日:2000-01-01，性别:male，五行数据:{"metal":0,"wood":0.105,"water":0.35,"fire":0.245,"earth":0.301},国家代码:en
          A:${example1Response}
      `,
        },
        {
          role: "user",
          content: `生日:${birthdate}，性别:${gender}，五行数据:${JSON.stringify(
            elements
          )},国家代码:${language}`,
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
