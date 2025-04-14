"use client";

import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { motion } from "framer-motion";
import { generateName, Gender } from "@/services/api";
import { useTranslations, useLocale } from "next-intl";
import { format, isValid, parse } from "date-fns";
import { enUS, fr, es, ja, zhCN, ar } from "date-fns/locale";

// 日期库映射
import type { Locale as DateFnsLocale } from "date-fns";

// For the languages where we don't have locale support in date-fns,
// fall back to English or another close language
const localeMap: Record<string, DateFnsLocale> = {
  zh: zhCN,
  en: enUS,
  fr: fr,
  es: es,
  ja: ja,
  ar: ar, // Use Arabic locale
  ur: ar, // Use Arabic locale for Urdu
  ru: enUS, // Fallback to English for Russian
  pt: es, // Portuguese is similar to Spanish for date format
  bn: enUS, // Fallback to English for Bengali
};

// Get date format based on locale
const getDateFormat = (currentLocale: string) => {
  switch (currentLocale) {
    case "en":
      return "MM/dd/yyyy";
    case "fr":
    case "es":
    case "pt":
    case "bn":
      return "dd/MM/yyyy";
    case "ja":
    case "zh":
      return "yyyy/MM/dd";
    case "ar":
    case "ur":
      return "dd/MM/yyyy";
    case "ru":
      return "dd.MM.yyyy";
    default:
      return "MM/dd/yyyy";
  }
};

export default function BirthdateForm() {
  const locale = useLocale();
  const t = useTranslations("form");
  const router = useRouter();

  // Add RTL detection
  const isRtl = locale === "ar" || locale === "ur";
  // Add Russian detection
  const isRussian = locale === "ru";

  // Initialize birthdate to January 1, 2000
  const defaultDate = new Date(2000, 0, 1);
  const [birthdate, setBirthdate] = useState<Date | null>(defaultDate);
  const [dateString, setDateString] = useState(
    format(defaultDate, getDateFormat(locale))
  );
  const [birthdateError, setBirthdateError] = useState("");
  const [gender, setGender] = useState<Gender>("male");
  const [timeRange, setTimeRange] = useState<string>("zi"); // Default to 子时 (Zi hour)
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // 进度条相关状态
  const [progress, setProgress] = useState(0);
  const [showProgressBar, setShowProgressBar] = useState(false);
  const [isTimeoutError, setIsTimeoutError] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const requestRef = useRef<AbortController | null>(null);

  // Use the date format from the helper function
  const dateFormat = getDateFormat(locale);

  // Traditional Chinese time periods (12 divisions of a day)
  const chineseTimeRanges = [
    { value: "zi", key: "timezones.zi" }, // 子时 (23:00-1:00)
    { value: "chou", key: "timezones.chou" }, // 丑时 (1:00-3:00)
    { value: "yin", key: "timezones.yin" }, // 寅时 (3:00-5:00)
    { value: "mao", key: "timezones.mao" }, // 卯时 (5:00-7:00)
    { value: "chen", key: "timezones.chen" }, // 辰时 (7:00-9:00)
    { value: "si", key: "timezones.si" }, // 巳时 (9:00-11:00)
    { value: "wu", key: "timezones.wu" }, // 午时 (11:00-13:00)
    { value: "wei", key: "timezones.wei" }, // 未时 (13:00-15:00)
    { value: "shen", key: "timezones.shen" }, // 申时 (15:00-17:00)
    { value: "you", key: "timezones.you" }, // 酉时 (17:00-19:00)
    { value: "xu", key: "timezones.xu" }, // 戌时 (19:00-21:00)
    { value: "hai", key: "timezones.hai" }, // 亥时 (21:00-23:00)
  ];

  // Map Chinese time ranges to their start times
  const timeRangeStartMap: Record<string, string> = {
    zi: "23:00",
    chou: "01:00",
    yin: "03:00",
    mao: "05:00",
    chen: "07:00",
    si: "09:00",
    wu: "11:00",
    wei: "13:00",
    shen: "15:00",
    you: "17:00",
    xu: "19:00",
    hai: "21:00",
  };

  // Add custom CSS for RTL datepicker fixes and Russian text adjustments
  useEffect(() => {
    const style = document.createElement("style");
    style.id = "custom-form-styles";

    if (isRtl) {
      style.innerHTML = `
        /* RTL DatePicker Fixes */
        .react-datepicker__close-icon {
          position: absolute !important;
          right: auto !important;
          left: 10px !important;
          padding: 0 !important;
          width: 24px !important;
          height: 24px !important;
          top: calc(50% - 12px) !important;
          display: flex !important;
          align-items: center !important;
          justify-content: center !important;
          z-index: 10 !important;
        }
        .react-datepicker__close-icon::after {
          font-size: 16px !important;
          height: 18px !important;
          width: 18px !important;
          line-height: 16px !important;
          display: flex !important;
          align-items: center !important;
          justify-content: center !important;
          margin: 0 !important;
          background-color: #8B4513 !important;
          color: white !important;
          border-radius: 50% !important;
        }
        .react-datepicker-wrapper {
          width: 100% !important;
        }
        .react-datepicker-popper {
          z-index: 9999 !important;
        }
        /* 确保RTL模式下的日期文本正确显示 */
        .rtl-datepicker .react-datepicker__input-container input {
          padding-right: 12px !important;
          padding-left: 36px !important;
          text-align: right !important;
          direction: rtl !important;
        }
      `;
    } else if (isRussian) {
      style.innerHTML = `
        /* Russian text adjustments */
        .russian-date-input {
          font-family: 'Arial', sans-serif !important;
          font-size: 0.85rem !important;
          letter-spacing: -0.02em !important;
          font-weight: normal !important;
        }
        .russian-select {
          font-family: 'Arial', sans-serif !important;
          font-size: 0.85rem !important;
          letter-spacing: -0.02em !important;
        }
        .russian-label {
          font-size: 0.95rem !important;
          letter-spacing: -0.02em !important;
        }
        .russian-button {
          font-size: 0.85rem !important;
          letter-spacing: -0.02em !important;
          padding-left: 0.5rem !important;
          padding-right: 0.5rem !important;
        }
        .russian-title {
          font-size: 1.5rem !important;
          letter-spacing: -0.02em !important;
        }
      `;
    }

    document.head.appendChild(style);

    return () => {
      const styleElement = document.getElementById("custom-form-styles");
      if (styleElement) {
        document.head.removeChild(styleElement);
      }
    };
  }, [isRtl, isRussian]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!birthdate) {
      setBirthdateError(t("birthdate_required"));
      return;
    }
    if (!(birthdate instanceof Date) || isNaN(birthdate.getTime())) {
      setBirthdateError(t("birthdate_invalid"));
      return;
    }

    setError("");
    setIsLoading(true);
    setShowProgressBar(true);
    setProgress(0);
    setIsTimeoutError(false);

    // 创建新的AbortController用于取消请求
    requestRef.current = new AbortController();

    // 设置定时器更新进度条
    const startTime = Date.now();
    const duration = 30000; // 30秒

    // 清除之前的定时器
    if (timeoutRef.current) {
      clearInterval(timeoutRef.current);
    }

    // 设置进度条更新定时器
    timeoutRef.current = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const newProgress = Math.min(100, (elapsed / duration) * 100);
      setProgress(newProgress);

      // 如果到达30秒，显示超时错误
      if (elapsed >= duration) {
        setIsTimeoutError(true);
        setIsLoading(false);
        setShowProgressBar(false);
        setError(t("network_timeout_error"));

        if (timeoutRef.current) {
          clearInterval(timeoutRef.current);
          timeoutRef.current = null;
        }

        // 如果有正在进行的请求，取消它
        if (requestRef.current) {
          requestRef.current.abort();
          requestRef.current = null;
        }
      }
    }, 100); // 每100毫秒更新一次进度

    try {
      const formattedDate = format(birthdate, "yyyy-MM-dd");
      const response = await generateName(
        formattedDate,
        gender,
        undefined, // 删除姓氏参数
        timeRangeStartMap[timeRange],
        locale,
        requestRef.current.signal
      );

      // 如果成功获取到响应，清除定时器
      if (timeoutRef.current) {
        clearInterval(timeoutRef.current);
        timeoutRef.current = null;
      }

      const encodedData = encodeURIComponent(JSON.stringify(response));
      router.push(`/${locale}/result?data=${encodedData}`);
    } catch (err) {
      // 非中止错误才设置错误信息
      if (!(err instanceof DOMException && err.name === "AbortError")) {
        setError(err instanceof Error ? err.message : t("generation_error"));
      }
    } finally {
      if (!isTimeoutError) {
        setIsLoading(false);
        setShowProgressBar(false);
      }
    }
  };

  // Update date when date string changes manually
  useEffect(() => {
    if (dateString) {
      const parsedDate = parse(dateString, dateFormat, new Date());
      if (isValid(parsedDate)) {
        setBirthdate(parsedDate);
        setBirthdateError("");
      } else {
        setBirthdateError(t("birthdate_invalid"));
      }
    }
  }, [dateString, dateFormat, t]);

  // Handle custom date input change
  const handleDateChange = (
    date: Date | null,
    event?: React.SyntheticEvent | undefined
  ) => {
    setBirthdate(date);
    if (date) {
      setDateString(format(date, dateFormat));
      setBirthdateError("");
    } else {
      setDateString("");
    }
  };

  // Set initial dateString on component mount
  useEffect(() => {
    setDateString(format(defaultDate, dateFormat));
  }, [locale, dateFormat]);

  // 确保组件卸载时清除定时器
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearInterval(timeoutRef.current);
      }
    };
  }, []);

  return (
    <motion.form
      className="paper-background rounded-2xl p-8 md:p-10 w-full shadow-xl xuan-paper-bg relative overflow-hidden backdrop-blur-sm"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.2 }}
      onSubmit={handleSubmit}
    >
      {/* 装饰性边框 */}
      <div className="absolute inset-0 border border-[#8B4513]/20 rounded-2xl pointer-events-none" />
      <div className="absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-[#8B4513]/30 to-transparent" />
      <div className="absolute inset-x-8 bottom-0 h-px bg-gradient-to-r from-transparent via-[#8B4513]/30 to-transparent" />

      <div className="mb-8 text-center">
        <h2
          className={`text-3xl font-bold chinese-font bg-gradient-to-r from-[var(--dunhuang-primary)] to-[var(--dunhuang-secondary)] bg-clip-text text-transparent inline-block ${
            isRussian ? "russian-title" : ""
          }`}
        >
          {t("title")}
        </h2>
      </div>

      {/* 重新布局表单为三个等宽的区域 */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {/* 生日选择 */}
        <div className="space-y-2">
          <label
            htmlFor="birthdate"
            className={`block text-lg font-medium chinese-font text-[#8B4513] mb-2 ${
              isRussian ? "russian-label" : ""
            }`}
          >
            {t("birthdate")}
          </label>
          <div className={`relative ${isRtl ? "rtl-datepicker" : ""}`}>
            <DatePicker
              selected={birthdate}
              onChange={handleDateChange}
              dateFormat={dateFormat}
              locale={localeMap[locale]}
              className={`w-full ${
                isRtl ? "pr-4 pl-10 text-right" : "pr-10 pl-4"
              } py-3 border-2 border-[#D4B08C] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#8B4513] focus:border-transparent calligraphy-input bg-white/90 text-base transition-all duration-300 ${
                isRussian ? "russian-date-input" : ""
              }`}
              placeholderText={t("birthdate_placeholder")}
              popperClassName="react-datepicker-popper z-50"
              popperPlacement={isRtl ? "bottom-end" : "bottom-start"}
              fixedHeight
              showYearDropdown
              scrollableYearDropdown
              yearDropdownItemNumber={100}
              dropdownMode="select"
              isClearable
              maxDate={new Date()}
              minDate={new Date(1900, 0, 1)}
              portalId="date-picker-portal"
              strictParsing
              onChangeRaw={(
                e:
                  | React.MouseEvent<HTMLElement>
                  | React.KeyboardEvent<HTMLElement>
                  | undefined
              ) => {
                const value = (e?.target as HTMLInputElement)?.value || "";
                if (
                  value &&
                  !new RegExp(dateFormat.replace(/[a-z]/g, "\\d")).test(value)
                ) {
                  setError(t("date_error"));
                } else {
                  setError("");
                }
              }}
            />
            {birthdateError && (
              <p className="text-red-500 text-sm mt-1">{birthdateError}</p>
            )}
          </div>
        </div>

        {/* 出生时辰 */}
        <div className="space-y-2">
          <label
            className={`block text-lg font-medium chinese-font text-[#8B4513] mb-2 ${
              isRussian ? "russian-label" : ""
            }`}
          >
            {t("birthtime")}
          </label>
          <div className={`relative ${isRtl ? "rtl-select-wrapper" : ""}`}>
            <select
              value={timeRange}
              onChange={(e) => setTimeRange(e.target.value)}
              className={`w-full ${
                isRtl ? "pr-10 pl-4 text-right" : "pr-10 pl-4"
              } py-3 border-2 border-[#D4B08C] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#8B4513] focus:border-transparent calligraphy-input bg-white/90 text-base transition-all duration-300 appearance-none ${
                isRussian ? "russian-select" : ""
              }`}
            >
              {chineseTimeRanges.map((option) => (
                <option key={option.value} value={option.value}>
                  {t(option.key)}
                </option>
              ))}
            </select>
            <div
              className={`absolute ${
                isRtl ? "right-3" : "right-3"
              } top-1/2 transform -translate-y-1/2 pointer-events-none text-[#8B4513] select-icon`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                viewBox="0 0 16 16"
                className="no-flip"
              >
                <path d="M7.247 11.14 2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z" />
              </svg>
            </div>
          </div>
        </div>

        {/* 性别选择 */}
        <div className="space-y-2">
          <label
            className={`block text-lg font-medium chinese-font text-[#8B4513] mb-2 ${
              isRussian ? "russian-label" : ""
            }`}
          >
            {t("gender")}
          </label>
          <div className="grid grid-cols-3 gap-3">
            {[
              { value: "male", label: t("male") },
              { value: "female", label: t("female") },
              { value: "neutral", label: t("neutral") },
            ].map((option) => (
              <motion.button
                key={option.value}
                type="button"
                onClick={() => setGender(option.value as Gender)}
                className={`py-3 rounded-xl transition-all duration-300 border-2 ${
                  gender === option.value
                    ? "bg-[#8B4513] text-white border-[#8B4513]"
                    : "bg-white/90 text-[#8B4513] border-[#D4B08C] hover:bg-[#8B4513]/10"
                } ${isRussian ? "russian-button" : ""}`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {option.label}
              </motion.button>
            ))}
          </div>
        </div>
      </div>

      {error && (
        <div className="text-red-500 text-center mb-4">
          <p>{error}</p>
          {isTimeoutError && (
            <button
              type="button"
              onClick={() => {
                setIsTimeoutError(false);
                setError("");
              }}
              className="text-[var(--dunhuang-primary)] hover:underline mt-2"
            >
              {t("try_again")}
            </button>
          )}
        </div>
      )}

      {showProgressBar && (
        <div className="mb-6">
          <div className="w-full bg-gray-200 rounded-full h-2.5 mb-2">
            <div
              className="bg-[var(--dunhuang-primary)] h-2.5 rounded-full transition-all duration-100 ease-linear"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
          <p className="text-sm text-gray-600 text-center">
            {progress < 100 ? t("name_generating") : t("almost_done")}
          </p>
        </div>
      )}

      <div className="text-center">
        <motion.button
          type="submit"
          className="py-3 px-12 bg-gradient-to-r from-[var(--dunhuang-primary)] to-[var(--dunhuang-secondary)] text-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed text-lg font-semibold"
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.98 }}
          disabled={isLoading}
        >
          {isLoading ? (
            <>
              <span className={`mr-2 ${isRussian ? "russian-button" : ""}`}>
                {t("loading")}
              </span>
              <svg
                className="animate-spin -mr-1 ml-3 h-5 w-5 text-white inline-block"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
            </>
          ) : (
            <span className={isRussian ? "russian-button" : ""}>
              {t("submit")}
            </span>
          )}
        </motion.button>
      </div>
    </motion.form>
  );
}
