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
 * 分析五行属性平衡情况
 * @param elements 五行属性数据
 * @returns 分析结果描述
 */
export function analyzeElementsBalance(elements: ElementsData): string {
  // 找出最高和最低的元素
  const sorted = Object.entries(elements).sort((a, b) => b[1] - a[1]);
  const highest = sorted[0];
  const lowest = sorted[sorted.length - 1];
  // 五行相克关系: 木克土, 土克水, 水克火, 火克金, 金克木
  const controlCycle = {
    wood: "earth",
    earth: "water",
    water: "fire",
    fire: "metal",
    metal: "wood",
  };

  // 分析结果
  let analysis = `您的五行分布为：金(${(elements.metal * 100).toFixed(
    1
  )}%)、木(${(elements.wood * 100).toFixed(1)}%)、水(${(
    elements.water * 100
  ).toFixed(1)}%)、火(${(elements.fire * 100).toFixed(1)}%)、土(${(
    elements.earth * 100
  ).toFixed(1)}%)。\n\n`;

  // 判断是否平衡（最高和最低的差异是否小于0.3）
  const isBalanced = sorted[0][1] - sorted[sorted.length - 1][1] < 0.3;

  if (isBalanced) {
    analysis += "您的五行分布较为平衡。";
  } else {
    const highestElement = highest[0];
    const lowestElement = lowest[0];

    analysis += `您的五行中${translateElement(
      highestElement as keyof ElementsData
    )}较旺(${(highest[1] * 100).toFixed(1)}%)，而${translateElement(
      lowestElement as keyof ElementsData
    )}较弱(${(lowest[1] * 100).toFixed(1)}%)。\n\n`;

    // 分析五行关系
    const highestControls =
      controlCycle[highestElement as keyof typeof controlCycle];
    const controlsHighest = Object.entries(controlCycle).find(
      ([, value]) => value === highestElement
    )?.[0];

    if (highestControls) {
      analysis += `${translateElement(
        highestElement as keyof ElementsData
      )}克${translateElement(highestControls as keyof ElementsData)}，`;

      if (highestControls === lowestElement) {
        analysis += `这可能导致您的${traPercentsgteElement(
          lowestElement as keyof ElementsData
        )}更加不足。`;
      }
    }

    if (controlsHighest) {
      const controlsHighestPercentage =
        percentages[controlsHighest as keyof typeof percentages];

      if (controlsHighestPercentage < 0.15) {
        analysis += `${translateElement(
          controlsHighest as keyof ElementsData
        )}克${translateElement(
          highestElement as keyof ElementsData
        )}，但您的${translateElement(
          controlsHighest as keyof ElementsData
        )}不足，无法有效制约过旺的${translateElement(
          highestElement as keyof ElementsData
        )}。`;
      }
    }
  }

  return analysis;
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
