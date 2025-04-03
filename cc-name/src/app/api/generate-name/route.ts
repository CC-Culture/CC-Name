import { NextResponse } from "next/server";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.DASHSCOPE_API_KEY,
  baseURL: "https://dashscope.aliyuncs.com/compatible-mode/v1",
});

export async function POST(request: Request) {
  try {
    const { birthdate, gender, surnamae } = await request.json();

    if (!birthdate) {
      return NextResponse.json({ error: "请提供生日" }, { status: 400 });
    }

    if (!gender) {
      return NextResponse.json({ error: "请提供性别" }, { status: 400 });
    }

    const completion = await openai.chat.completions.create({
      model: "qwen-plus",
      messages: [
        {
          role: "system",
          content: `You are a Chinese name generator that combines traditional Chinese culture with modern technology.
      Based on the birthday and gender provided from poetry, generate:
      
      Format the response as a JSON object with the following structure:
      {
      "name": {
        "firstName": "名",
        "lastName": "姓",
        "meaning": "名字含义",
        "reasoning": "详细取名理由和五行和命理分析"
      },
      "elements": {
          "metal": number (0-100),
          "wood": number (0-100),
          "water": number (0-100),
          "fire": number (0-100),
          "earth": number (0-100)
      },
     "poetry": {
        "title": "生成名字引用的诗句标题",
        "content": "诗句内容",
        "meaning": "诗句含义"
        }
      }`,
        },
        {
          role: "user",
          content: `birthdate:${birthdate}
                    gender:${gender}
                    surnamae:${surnamae ? surnamae : ""}`,
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
    console.log("aaa" + response);
    return NextResponse.json(JSON.parse(response));
  } catch (error) {
    console.error("Error generating name:", error);
    return NextResponse.json(
      { error: "生成名字时发生错误，请稍后重试" },
      { status: 500 }
    );
  }
}
