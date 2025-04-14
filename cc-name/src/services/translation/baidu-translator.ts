import crypto from "crypto";

/**
 * 百度翻译API服务
 *
 * 基于百度翻译通用文本翻译API
 * @link https://fanyi-api.baidu.com/product/113
 */

// 环境变量中的配置，需在.env中设置
const BAIDU_APP_ID = process.env.BAIDU_APP_ID || "";
const BAIDU_APP_KEY = process.env.BAIDU_APP_KEY || "";

// API端点
const BAIDU_TRANSLATE_API =
  "https://fanyi-api.baidu.com/api/trans/vip/translate";

// 百度翻译API的限制
const MAX_TEXT_LENGTH = 6000; // 百度翻译单次请求最大字符数限制

// 支持的语言代码映射
export const SUPPORTED_LANGUAGES = {
  zh: "zh", // 中文
  en: "en", // 英语
  fr: "fra", // 法语
  es: "spa", // 西班牙语
  ja: "jp", // 日语
  ar: "ara", // 阿拉伯语
  ru: "ru", // 俄语
  pt: "pt", // 葡萄牙语
  bn: "ben", // 孟加拉语
  ur: "urd", // 乌尔都语
};

/**
 * 翻译结果接口
 */
export interface TranslationResult {
  from: string;
  to: string;
  trans_result: {
    src: string;
    dst: string;
  }[];
  error_code?: string;
  error_msg?: string;
}

/**
 * 生成随机数
 * @returns 随机字符串
 */
function generateSalt(): string {
  return Math.round(Math.random() * 10000000000).toString();
}

/**
 * 计算签名
 * @param appid 百度应用ID
 * @param query 待翻译文本
 * @param salt 随机数
 * @param appkey 百度应用密钥
 * @returns MD5签名
 */
function calculateSign(
  appid: string,
  query: string,
  salt: string,
  appkey: string
): string {
  const str = appid + query + salt + appkey;
  return crypto.createHash("md5").update(str).digest("hex");
}

/**
 * 发送翻译请求
 * @param text 待翻译文本
 * @param fromLang 源语言代码
 * @param toLang 目标语言代码
 * @returns 翻译结果
 */
async function sendTranslateRequest(
  text: string,
  fromLang: string,
  toLang: string
): Promise<string[]> {
  // 构建请求参数
  const salt = generateSalt();
  const sign = calculateSign(BAIDU_APP_ID, text, salt, BAIDU_APP_KEY);

  const params = new URLSearchParams({
    q: text,
    from: fromLang,
    to: toLang,
    appid: BAIDU_APP_ID,
    salt,
    sign,
  });

  // 发送请求
  const response = await fetch(`${BAIDU_TRANSLATE_API}?${params}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
  });

  const result: TranslationResult = await response.json();

  // 检查错误
  if (result.error_code) {
    console.error(`百度翻译错误: ${result.error_code} - ${result.error_msg}`);
    return [];
  }

  // 返回翻译结果
  return result.trans_result.map((result) => {
    return result.dst;
  });
}

/**
 * 翻译文本
 * @param text 待翻译文本
 * @param from 源语言代码
 * @param to 目标语言代码
 * @returns 翻译结果
 */
export async function translateText(
  text: string,
  from: string = "auto",
  to: string = "zh"
): Promise<string[]> {
  try {
    if (!BAIDU_APP_ID || !BAIDU_APP_KEY) {
      throw new Error("百度翻译API凭证未配置");
    }

    // 空文本直接返回
    if (!text || text.trim() === "") {
      return [];
    }

    // 转换语言代码（如果有特殊映射）
    const fromLang =
      SUPPORTED_LANGUAGES[from as keyof typeof SUPPORTED_LANGUAGES] || from;
    const toLang =
      SUPPORTED_LANGUAGES[to as keyof typeof SUPPORTED_LANGUAGES] || to;

    return await sendTranslateRequest(text, fromLang, toLang);
  } catch (error) {
    console.error("翻译过程中出错:", error);
    return []; // 出错时返回原文
  }
}
