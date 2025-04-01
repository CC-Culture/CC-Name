import { NextResponse } from "next/server";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.DASHSCOPE_API_KEY,
  baseURL: "https://dashscope.aliyuncs.com/compatible-mode/v1",
});

export async function POST(request: Request) {
  try {
    const { birthdate } = await request.json();

    if (!birthdate) {
      return NextResponse.json({ error: "请提供生日" }, { status: 400 });
    }

    const prompt = `请根据以下生日生成一个中文名字及其详细分析：
生日：${birthdate}

请按照以下JSON格式返回：
{
  "name": {
    "fullName": "完整姓名",
    "firstName": "名",
    "lastName": "姓",
    "meaning": "名字含义",
    "elements": ["五行属性"],
    "numerology": {
      "number": 数字,
      "meaning": "数字含义"
    }
  },
  "analysis": {
    "personality": ["性格特点"],
    "destiny": "命运分析",
    "career": ["适合职业"],
    "relationships": ["人际关系建议"]
  },
  "poetry": {
    "title": "相关诗句标题",
    "content": "诗句内容",
    "meaning": "诗句含义"
  }
}`;

    const completion = await openai.chat.completions.create({
      model: "qwen-plus",
      messages: [
        {
          role: "system",
          content:
            "你是一个专业的中国传统文化专家，精通姓名学、五行、诗词等领域。",
        },
        {
          role: "user",
          content: prompt,
        },
      ],
    });

    const response = completion.choices[0].message.content;
    if (!response) {
      throw new Error("No response from API");
    }

    return NextResponse.json(JSON.parse(response));
  } catch (error) {
    console.error("Error generating name:", error);
    return NextResponse.json(
      { error: "生成名字时发生错误，请稍后重试" },
      { status: 500 }
    );
  }
}
