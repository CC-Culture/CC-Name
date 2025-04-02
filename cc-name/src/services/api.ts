export interface NameGenerationResponse {
  name: {
    fullName: string;
    firstName: string;
    lastName: string;
    meaning: string;
    elements: string[];
    numerology: {
      number: number;
      meaning: string;
    };
    reasoning: string;
    poetryReference: string;
  };
  analysis: {
    personality: string[];
    destiny: string;
    career: string[];
    relationships: string[];
    iChing: string;
    numerologyAnalysis: string;
  };
  elements: {
    金: number;
    木: number;
    水: number;
    火: number;
    土: number;
  };
  poetry: {
    title: string;
    content: string;
    meaning: string;
  };
}

export async function generateName(
  birthdate: string
): Promise<NameGenerationResponse> {
  try {
    const response = await fetch("/api/generate-name", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ birthdate }),
    });

    const data = await response.text();

    try {
      const jsonData = JSON.parse(data);

      if (!response.ok) {
        throw new Error(jsonData.error || "生成名字时发生错误，请稍后重试");
      }

      return jsonData;
    } catch (parseError) {
      console.error("Error parsing response:", parseError);
      console.error("Raw response:", data);
      throw new Error("服务器返回格式错误，请稍后重试");
    }
  } catch (error) {
    console.error("Error generating name:", error);
    throw error instanceof Error
      ? error
      : new Error("生成名字时发生错误，请稍后重试");
  }
}
