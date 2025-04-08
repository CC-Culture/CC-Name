export interface NameGenerationResponse {
  name: {
    firstName: string;
    lastName: string;
    meaning: string;
    reasoning: string;
    style: string;
  };
  elements: {
    metal: number;
    wood: number;
    water: number;
    fire: number;
    earth: number;
  };
  poetry: {
    type: string;
    title: string;
    content: string;
    meaning: string;
  };
}

export type Gender = "male" | "female" | "neutral";

export async function generateName(
  birthdate: string,
  gender: Gender,
  surname?: string,
  timeRange?: string
): Promise<NameGenerationResponse> {
  try {
    const response = await fetch("/api/generate-name", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ birthdate, surname, gender, timeRange }),
    });

    const data = await response.text();

    try {
      const jsonData = JSON.parse(data);

      if (!response.ok) {
        throw new Error(jsonData.error || "生成名字时发生错误，请稍后重试");
      }

      // 如果传入了surname，替换返回数据中的lastName
      if (surname) {
        jsonData.name.lastName = surname;
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
