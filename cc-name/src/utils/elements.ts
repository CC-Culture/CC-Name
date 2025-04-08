// 五行属性计算相关函数
import lunisolar from "lunisolar";

export interface ElementsData {
  metal: number;
  wood: number;
  water: number;
  fire: number;
  earth: number;
}

// 五行映射表（天干地支对应的五行）
type FiveElement = "metal" | "wood" | "water" | "fire" | "earth";
type StemBranch =
  | "甲"
  | "乙"
  | "丙"
  | "丁"
  | "戊"
  | "己"
  | "庚"
  | "辛"
  | "壬"
  | "癸"
  | "子"
  | "丑"
  | "寅"
  | "卯"
  | "辰"
  | "巳"
  | "午"
  | "未"
  | "申"
  | "酉"
  | "戌"
  | "亥";

const FIVE_ELEMENTS_MAP: Record<StemBranch, FiveElement> = {
  // 天干五行
  甲: "wood",
  乙: "wood",
  丙: "fire",
  丁: "fire",
  戊: "earth",
  己: "earth",
  庚: "metal",
  辛: "metal",
  壬: "water",
  癸: "water",
  // 地支五行
  子: "water",
  丑: "earth",
  寅: "wood",
  卯: "wood",
  辰: "earth",
  巳: "fire",
  午: "fire",
  未: "earth",
  申: "metal",
  酉: "metal",
  戌: "earth",
  亥: "water",
};

// 地支藏干表（每个地支所藏的天干）
type Branch =
  | "子"
  | "丑"
  | "寅"
  | "卯"
  | "辰"
  | "巳"
  | "午"
  | "未"
  | "申"
  | "酉"
  | "戌"
  | "亥";
type Stem = "甲" | "乙" | "丙" | "丁" | "戊" | "己" | "庚" | "辛" | "壬" | "癸";

const HIDDEN_STEMS: Record<Branch, Stem[]> = {
  子: ["癸"],
  丑: ["己", "辛", "癸"],
  寅: ["甲", "丙", "戊"],
  卯: ["乙"],
  辰: ["戊", "乙", "癸"],
  巳: ["丙", "庚", "戊"],
  午: ["丁", "己"],
  未: ["己", "丁", "乙"],
  申: ["庚", "壬", "戊"],
  酉: ["辛"],
  戌: ["戊", "辛", "丁"],
  亥: ["壬", "甲"],
};

/**
 * 根据生日计算五行属性
 * @param birthdate 出生日期 (YYYY/MM/DD格式)
 * @returns 五行属性数据
 */
export function calculateElements(birthTime: string): ElementsData {
  // 初始化五行计数
  const elements: ElementsData = {
    metal: 0,
    wood: 0,
    water: 0,
    fire: 0,
    earth: 0,
  };
  console.log("birthTime:" + birthTime);

  try {
    // 使用lunisolar库解析日期
    const lunar = lunisolar(birthTime);
    // 获取八字
    const bazi = lunar.char8;

    // 提取天干和地支
    const stems = [
      bazi.year.stem.name,
      bazi.month.stem.name,
      bazi.day.stem.name,
      bazi.hour.stem.name,
    ] as StemBranch[];
    const branches = [
      bazi.year.branch.name,
      bazi.month.branch.name,
      bazi.day.branch.name,
      bazi.hour.branch.name,
    ] as Branch[];

    // 计算天干的五行
    stems.forEach((stem) => {
      const element = FIVE_ELEMENTS_MAP[stem];
      elements[element] += 2; // 天干权重为2
    });

    // 计算地支的五行
    branches.forEach((branch) => {
      const element = FIVE_ELEMENTS_MAP[branch];
      elements[element] += 1; // 地支本气权重为1

      // 计算地支藏干的五行
      const hiddenStems = HIDDEN_STEMS[branch];
      hiddenStems.forEach((hiddenStem, index) => {
        const hiddenElement = FIVE_ELEMENTS_MAP[hiddenStem];
        // 藏干权重：0.5 (第一个), 0.3 (第二个), 0.2 (第三个)
        const weight = index === 0 ? 0.5 : index === 1 ? 0.3 : 0.2;
        elements[hiddenElement] += weight;
      });
    });

    // 计算总和并归一化
    const total = Object.values(elements).reduce(
      (sum, value) => sum + value,
      0
    );
    if (total > 0) {
      Object.keys(elements).forEach((key) => {
        elements[key as keyof ElementsData] =
          Math.round((elements[key as keyof ElementsData] / total) * 1000) /
          1000;
      });
    }

    return elements;
  } catch (error) {
    console.error("计算五行属性出错:", error);
    return {
      metal: 0,
      wood: 0,
      water: 0,
      fire: 0,
      earth: 0,
    };
  }
}

/**
 * 将五行元素英文名转换为中文
 */
function translateElement(element: keyof ElementsData): string {
  const translations = {
    metal: "金",
    wood: "木",
    water: "水",
    fire: "火",
    earth: "土",
  };

  return translations[element];
}
