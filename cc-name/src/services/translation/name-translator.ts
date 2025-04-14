import { translateText } from "./baidu-translator";
import type { NameGenerationResponse } from "../api";

/**
 * 名字翻译服务
 *
 * 将名字生成结果翻译为目标语言
 */

/**
 * 大模型直接响应的格式
 */
interface ModelResponse {
  name: {
    firstName: string;
    meaning?: string;
    reasoning?: string;
    style?: string;
    [key: string]: string | undefined;
  };
  poetry: {
    title?: string;
    content?: string;
    meaning?: string;
    [key: string]: string | undefined;
  };
  [key: string]: unknown;
}

/**
 * 需要翻译的字段映射
 */
const FIELDS_TO_TRANSLATE = {
  translation: {
    name: ["firstname", "meaning", "reasoning", "style"],
    poetry: ["meaning"], // 只翻译meaning字段，保留title和content原文
  },
};

/**
 * 批量翻译服务 - 一次性请求所有需要翻译的内容
 * @param texts 待翻译文本数组
 * @param from 源语言
 * @param to 目标语言
 * @returns 翻译结果对象，键为原文，值为译文
 */
async function batchTranslateAll(
  texts: string[],
  from: string = "zh",
  to: string = "en"
): Promise<Record<string, string>> {
  try {
    // 过滤空字符串并去重
    const uniqueTexts = Array.from(
      new Set(texts.filter((text) => text && text.trim() !== ""))
    );

    if (uniqueTexts.length === 0) {
      return {};
    }

    // 处理单引号内的内容
    const processedTexts: string[] = [];
    // 保存单引号内容的映射
    const quoteContents: Map<string, string> = new Map();

    uniqueTexts.forEach((text, index) => {
      // 提取各种引号内的内容
      // 匹配:
      // 1. 英文单引号: '...'
      // 2. 中文单引号: '...'
      // 注意中文单引号左右是不同的字符

      // 更准确的正则表达式 - 使用unicode转义来表示中文单引号
      const regex = /'([^']*)'|\u2018([^\u2019]*)\u2019/g;
      let matches: RegExpMatchArray | null = text.match(regex);

      // 测试一下中文单引号匹配
      if (text.includes("\u2018") || text.includes("\u2019")) {
        // 如果常规匹配失败，尝试手动查找中文单引号对
        if (!matches || matches.length === 0) {
          const manualMatches: string[] = [];
          let startIndex = -1;
          let content = "";

          // 手动查找中文单引号对
          for (let i = 0; i < text.length; i++) {
            if (text[i] === "\u2018" && startIndex === -1) {
              startIndex = i;
            } else if (text[i] === "\u2019" && startIndex !== -1) {
              content = text.substring(startIndex, i + 1);
              manualMatches.push(content);
              startIndex = -1;
            }
          }

          if (manualMatches.length > 0) {
            console.log(`【引号测试】手动查找中文单引号对结果:`, manualMatches);
            // 由于手动匹配的数组结构与RegExpMatchArray不同，我们需要创建一个新的数组
            // 这里直接赋值给matches，后面的代码只关心它是否有内容和length属性
            matches = manualMatches as unknown as RegExpMatchArray;
          }
        }
      }

      if (matches && matches.length > 0) {
        let processedText = text;
        const placeholders: string[] = [];

        // 为每个单引号内容创建唯一占位符
        matches.forEach((match, matchIndex) => {
          // 提取引号内的内容
          let content = "";

          // 判断引号类型并提取内容
          if (match.startsWith("'") && match.endsWith("'")) {
            // 英文单引号
            content = match.substring(1, match.length - 1);
          } else if (match.startsWith("\u2018") && match.endsWith("\u2019")) {
            // 中文单引号
            content = match.substring(1, match.length - 1);
          } else {
            // 其他情况，尝试获取第一个和最后一个字符之间的内容
            content = match.substring(1, match.length - 1);
          }

          const placeholder = `{${index}${matchIndex}}`;
          console.log(
            `【引号提取】匹配: "${match}", 提取内容: "${content}", CC: ${placeholder}`
          );
          processedText = processedText.replace(match, placeholder);
          placeholders.push(content);

          // 保存原始内容以便后续还原
          quoteContents.set(placeholder, content);
        });
        processedTexts.push(processedText);
      } else {
        processedTexts.push(text);
      }
    });

    // 所有文本合并成一个大字符串，使用特殊分隔符
    const DELIMITER = "\n"; // 使用不太可能出现在普通文本中的分隔符
    const combinedText = processedTexts.join(DELIMITER);

    // 只发送一次请求
    const translatedParts = await translateText(combinedText, from, to);

    // 构建原文到译文的映射
    const translationMap: Record<string, string> = {};

    // 处理翻译结果，还原单引号内容
    processedTexts.forEach((text, index) => {
      if (index < translatedParts.length) {
        let translatedText = translatedParts[index];
        // 如果原文有单引号内容需要还原
        quoteContents.forEach((value, placeholder) => {
          translatedText = translatedText.replace(placeholder, `'${value}'`);
        });

        // 在原始文本和处理后的文本之间建立映射
        const originalText = uniqueTexts[processedTexts.indexOf(text)];
        translationMap[originalText] = translatedText;
      } else {
        // 如果分割后的数组长度不匹配，使用原文
        const originalText = uniqueTexts[processedTexts.indexOf(text)];
        translationMap[originalText] = originalText;
      }
    });

    return translationMap;
  } catch (error) {
    console.error("批量翻译出错:", error);
    // 构建一个返回原文的映射
    return texts.reduce((map, text) => {
      if (text && text.trim() !== "") {
        map[text] = text;
      }
      return map;
    }, {} as Record<string, string>);
  }
}

/**
 * 翻译名字生成结果
 * @param result 原始生成结果
 * @param targetLanguage 目标语言代码
 * @returns 翻译后的生成结果
 */
export async function translateNameResult(
  result: NameGenerationResponse | ModelResponse,
  targetLanguage: string
): Promise<NameGenerationResponse | ModelResponse> {
  // 如果目标语言是中文，无需翻译
  if (targetLanguage === "zh") {
    return result;
  }

  try {
    // 创建结果副本
    const translatedResult = JSON.parse(JSON.stringify(result));

    // 收集所有需要翻译的文本
    const textsToTranslate: string[] = [];

    // 检测数据模式：是否存在translation字段
    const hasTranslationField = "translation" in result;

    // 日志记录数据格式
    console.log(
      `数据格式: ${hasTranslationField ? "API转换后格式" : "直接模型响应格式"}`
    );

    // 收集名字说明相关内容
    if (hasTranslationField) {
      // API转换后的格式
      const typedResult = result as NameGenerationResponse;
      for (const field of FIELDS_TO_TRANSLATE.translation.name) {
        const content = typedResult.translation.name[
          field as keyof typeof typedResult.translation.name
        ] as string;
        if (content && content.trim() !== "") {
          textsToTranslate.push(content);
        }
      }

      // 收集诗歌相关内容 - 只翻译meaning字段
      for (const field of FIELDS_TO_TRANSLATE.translation.poetry) {
        const content = typedResult.translation.poetry[
          field as keyof typeof typedResult.translation.poetry
        ] as string;
        if (content && content.trim() !== "") {
          textsToTranslate.push(content);
        }
      }
    } else {
      // 直接模型响应格式
      const typedResult = result as ModelResponse;
      for (const field of FIELDS_TO_TRANSLATE.translation.name) {
        if (
          typedResult.name &&
          typeof typedResult.name[field] === "string" &&
          typedResult.name[field]?.trim() !== ""
        ) {
          textsToTranslate.push(typedResult.name[field] as string);
        }
      }

      // 收集诗歌相关内容 - 只翻译meaning字段
      for (const field of FIELDS_TO_TRANSLATE.translation.poetry) {
        if (
          typedResult.poetry &&
          typeof typedResult.poetry[field] === "string" &&
          typedResult.poetry[field]?.trim() !== ""
        ) {
          textsToTranslate.push(typedResult.poetry[field] as string);
        }
      }
    }

    console.log(
      `需要翻译${textsToTranslate.length}个文本片段，通过批量翻译合并为1次请求`
    );

    // 批量翻译所有文本（仅一次API请求）
    const translationMap = await batchTranslateAll(
      textsToTranslate,
      "zh",
      targetLanguage
    );

    console.log(
      `批量翻译完成，成功翻译${Object.keys(translationMap).length}个文本片段`
    );

    // 更新翻译结果
    if (hasTranslationField) {
      // API转换后的格式
      const typedResult = result as NameGenerationResponse;
      const typedTranslatedResult = translatedResult as NameGenerationResponse;

      // 使用翻译结果更新名字说明
      for (const field of FIELDS_TO_TRANSLATE.translation.name) {
        const originalText = typedResult.translation.name[
          field as keyof typeof typedResult.translation.name
        ] as string;
        if (
          originalText &&
          originalText.trim() !== "" &&
          translationMap[originalText]
        ) {
          typedTranslatedResult.translation.name[
            field as keyof typeof typedTranslatedResult.translation.name
          ] = translationMap[originalText];
        }
      }

      // 使用翻译结果更新诗歌内容 - 只翻译meaning字段
      for (const field of FIELDS_TO_TRANSLATE.translation.poetry) {
        const originalText = typedResult.translation.poetry[
          field as keyof typeof typedResult.translation.poetry
        ] as string;
        if (
          originalText &&
          originalText.trim() !== "" &&
          translationMap[originalText]
        ) {
          typedTranslatedResult.translation.poetry[
            field as keyof typeof typedTranslatedResult.translation.poetry
          ] = translationMap[originalText];
        }
      }
    } else {
      // 直接模型响应格式
      const typedResult = result as ModelResponse;
      const typedTranslatedResult = translatedResult as ModelResponse;

      for (const field of FIELDS_TO_TRANSLATE.translation.name) {
        if (
          typedResult.name &&
          typeof typedResult.name[field] === "string" &&
          typedResult.name[field]?.trim() !== ""
        ) {
          const originalText = typedResult.name[field] as string;
          if (translationMap[originalText]) {
            typedTranslatedResult.name[field] = translationMap[originalText];
          }
        }
      }

      // 使用翻译结果更新诗歌内容 - 只翻译meaning字段
      for (const field of FIELDS_TO_TRANSLATE.translation.poetry) {
        if (
          typedResult.poetry &&
          typeof typedResult.poetry[field] === "string" &&
          typedResult.poetry[field]?.trim() !== ""
        ) {
          const originalText = typedResult.poetry[field] as string;
          if (translationMap[originalText]) {
            typedTranslatedResult.poetry[field] = translationMap[originalText];
          }
        }
      }
    }

    return translatedResult;
  } catch (error) {
    console.error("翻译名字结果时出错:", error);
    // 出错时返回原始结果
    return result;
  }
}

/**
 * 批量翻译文本
 * @param texts 待翻译文本数组
 * @param from 源语言
 * @param to 目标语言
 * @returns 翻译后的文本数组
 */
export async function batchTranslate(
  texts: string[],
  from: string = "zh",
  to: string = "en"
): Promise<string[]> {
  try {
    // 过滤掉空字符串
    const validTexts = texts.filter((text) => text && text.trim() !== "");

    if (validTexts.length === 0) {
      return texts;
    }

    // 获取批量翻译结果
    const translationMap = await batchTranslateAll(validTexts, from, to);

    // 将翻译结果映射回原始数组（保持原有的空字符串位置）
    return texts.map((text) => {
      if (text && text.trim() !== "" && translationMap[text]) {
        return translationMap[text];
      }
      return text;
    });
  } catch (error) {
    console.error("批量翻译出错:", error);
    return texts;
  }
}
