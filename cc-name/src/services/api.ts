import OpenAI from "openai";

interface NameGenerationRequest {
  name: string;
  birthdate: string;
}

interface ElementData {
  element: string;
  value: number;
  description: string;
}

interface NameRecommendation {
  name: string;
  source: string;
  explanation: string;
}

export interface NameGenerationResponse {
  elements: {
    gold: ElementData;
    wood: ElementData;
    water: ElementData;
    fire: ElementData;
    earth: ElementData;
  };
  analysis: string;
  recommendations: NameRecommendation[];
}

export async function generateName(
  data: NameGenerationRequest
): Promise<NameGenerationResponse> {
  try {
    // 创建OpenAI客户端实例
    const openai = new OpenAI({
      apiKey: process.env.NEXT_PUBLIC_DASHSCOPE_API_KEY || "",
      baseURL: "https://dashscope.aliyuncs.com/compatible-mode/v1",
    });

    // 构建提示词
    const prompt = `
    基于以下信息，生成姓名推荐：
    姓名: ${data.name}
    生日: ${data.birthdate}
    
    请基于中国古代诗歌、四书五经以及五行八卦、梅花易数来生成姓名推荐。
    分析该人的五行属性，并提供基于五行的命理分析。
    从四书五经和诗经中选取合适的内容作为姓名来源。
    
    请以JSON格式返回，包含以下字段：
    - elements: 包含五个元素(gold, wood, water, fire, earth)的对象，每个元素包含：element(元素名), value(0-100的数值), description(英文描述)
    - analysis: 基于五行和易经的命理分析(英文)
    - recommendations: 推荐的名字数组，每个包含name(推荐的中文名), source(诗经或四书五经出处，中文), explanation(名字解释，包含五行分析和引用原文的英文解释)
    `;

    // 调用API
    const completion = await openai.chat.completions.create({
      model: "qwen-plus",
      messages: [
        {
          role: "system",
          content:
            "你是一个专精于中国传统文化、五行八卦、诗经和四书五经的AI助手。你需要基于用户提供的信息，生成符合要求的姓名推荐。",
        },
        {
          role: "user",
          content: prompt,
        },
      ],
      response_format: {
        type: "json_object",
      },
    });

    // 解析返回的JSON
    const responseContent = completion.choices[0].message.content;
    if (!responseContent) {
      throw new Error("API返回内容为空");
    }

    return JSON.parse(responseContent) as NameGenerationResponse;
  } catch (error) {
    console.error("API调用失败:", error);
    // 返回模拟数据用于开发测试
    return {
      elements: {
        gold: {
          element: "金",
          value: 65,
          description:
            "Strong metal energy representing resilience and determination.",
        },
        wood: {
          element: "木",
          value: 45,
          description:
            "Moderate wood energy symbolizing growth and flexibility.",
        },
        water: {
          element: "水",
          value: 80,
          description:
            "Abundant water energy indicating wisdom and adaptability.",
        },
        fire: {
          element: "火",
          value: 30,
          description:
            "Lower fire energy suggesting a calm and steady temperament.",
        },
        earth: {
          element: "土",
          value: 50,
          description:
            "Balanced earth energy providing stability and nurturing qualities.",
        },
      },
      analysis:
        "Based on the Five Elements analysis, your chart shows a predominance of Water and Metal elements. This combination indicates a person with strong intellectual abilities and analytical thinking. The Water element enhances your adaptability and wisdom, while the Metal element provides determination and precision. The relatively lower Fire element suggests you may benefit from activities that increase enthusiasm and passion. The balanced Earth element gives you stability and practicality in your approach to life.",
      recommendations: [
        {
          name: "泽瑾",
          source:
            "《诗经·小雅·鹿鸣》：'呦呦鹿鸣，食野之苹。我有嘉宾，鼎食之簋。'取'泽'表水泽之美，'瑾'为美玉。",
          explanation:
            "The name 'Ze Jin' combines water (Ze) and metal (Jin) elements to balance your chart. 'Ze' means 'lustrous water' or 'blessing', while 'Jin' represents precious jade. This name draws inspiration from the Classic of Poetry where honored guests are welcomed with respect and appreciation, symbolizing how you will be valued in society. The water element in 'Ze' enhances your inherent wisdom, while the metal in 'Jin' strengthens your determination.",
        },
        {
          name: "书涵",
          source:
            "《论语·述而》：'默而识之，学而不厌，诲人不倦。'取'书'表学识，'涵'表包容。",
          explanation:
            "'Shu Han' balances wood and water elements. 'Shu' (book) represents knowledge and learning, while 'Han' means to contain or include, suggesting depth and capacity. This name is inspired by Confucius' teaching about tireless learning and generous sharing of knowledge. The wood element in 'Shu' nurtures your growth potential, while the water in 'Han' complements your natural affinity for wisdom and adaptability.",
        },
        {
          name: "金澜",
          source:
            "《诗经·周南·关雎》：'关关雎鸠，在河之洲。窈窕淑女，君子好逑。'取'金'表坚固，'澜'表水波。",
          explanation:
            "'Jin Lan' harmonizes metal and water elements. 'Jin' (gold/metal) represents strength and resilience, while 'Lan' refers to waves or flowing water. This name draws from the first poem in the Classic of Poetry, which describes the pursuit of beauty and virtue. The metal element in 'Jin' reinforces your determination, while the water in 'Lan' enhances your adaptability and wisdom, creating a balanced character with both strength and flexibility.",
        },
      ],
    };
  }
}
