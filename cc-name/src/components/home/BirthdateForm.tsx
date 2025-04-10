"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { motion } from "framer-motion";
import { generateName, Gender } from "@/services/api";
import { useTranslations, useLocale } from "next-intl";
import { format, isValid, parse } from "date-fns";
import { enUS, fr, es, ja, ar, zhCN } from "date-fns/locale";
import Image from "next/image";

// 日期格式映射
const dateFormatMap: Record<string, string> = {
  zh: "yyyy/MM/dd",
  en: "MM/dd/yyyy",
  fr: "dd/MM/yyyy",
  es: "dd/MM/yyyy",
  ja: "yyyy/MM/dd",
  ar: "yyyy/MM/dd",
};

// 日期库映射
import type { Locale as DateFnsLocale } from "date-fns";

const localeMap: Record<string, DateFnsLocale> = {
  zh: zhCN,
  en: enUS,
  fr: fr,
  es: es,
  ja: ja,
  ar: ar,
};

// Get date format based on locale
const getDateFormat = (currentLocale: string) => {
  switch (currentLocale) {
    case "en":
      return "MM/dd/yyyy";
    case "fr":
    case "es":
      return "dd/MM/yyyy";
    case "ja":
    case "zh":
      return "yyyy/MM/dd";
    case "ar":
      return "dd/MM/yyyy";
    default:
      return "MM/dd/yyyy";
  }
};

export default function BirthdateForm() {
  const locale = useLocale();
  const t = useTranslations("form");
  const router = useRouter();

  const [birthdate, setBirthdate] = useState<Date | null>(null);
  const [dateString, setDateString] = useState("");
  const [birthdateError, setBirthdateError] = useState("");
  const [surname, setSurname] = useState<string>("");
  const [gender, setGender] = useState<Gender>("male");
  const [timeRange, setTimeRange] = useState<string>("morning");
  const [error, setError] = useState("");
  const [surnameError, setSurnameError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Use the date format from the helper function
  const dateFormat = getDateFormat(locale);

  // Set time range options
  const timeRangeOptions = [
    { value: "morning", label: t("time_range_morning") },
    { value: "afternoon", label: t("time_range_afternoon") },
    { value: "evening", label: t("time_range_evening") },
    { value: "night", label: t("time_range_night") },
  ];

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
    if (surname && !/^[\u4e00-\u9fa5]{1,2}$/.test(surname)) {
      setSurnameError(t("surname_invalid"));
      return;
    }
    setError("");
    setSurnameError("");
    setIsLoading(true);

    try {
      const formattedDate = format(birthdate, "yyyy-MM-dd");
      const response = await generateName(
        formattedDate,
        gender,
        surname,
        timeRange
      );
      const encodedData = encodeURIComponent(JSON.stringify(response));
      router.push(`/result?data=${encodedData}`);
    } catch (err) {
      setError(err instanceof Error ? err.message : "生成名字时出错");
    } finally {
      setIsLoading(false);
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

  return (
    <motion.form
      className="paper-background rounded-2xl p-8 md:p-10 w-full max-w-4xl shadow-xl xuan-paper-bg relative overflow-hidden backdrop-blur-sm"
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
        <h2 className="text-3xl font-bold chinese-font bg-gradient-to-r from-[var(--dunhuang-primary)] to-[var(--dunhuang-secondary)] bg-clip-text text-transparent inline-block">
          {t("title")}
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {/* 生日选择 */}
        <div className="space-y-2">
          <label
            htmlFor="birthdate"
            className="block text-lg font-medium chinese-font text-[#8B4513] mb-2"
          >
            {t("birthdate")}
          </label>
          <div className="relative">
            <DatePicker
              selected={birthdate}
              onChange={handleDateChange}
              dateFormat={dateFormat}
              locale={localeMap[locale]}
              className="w-full px-4 py-3 border-2 border-[#D4B08C] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#8B4513] focus:border-transparent calligraphy-input bg-white/90 text-base transition-all duration-300"
              placeholderText={t("birthdate_placeholder")}
              popperClassName="react-datepicker-popper z-50"
              popperPlacement="bottom-start"
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
          </div>
        </div>

        {/* 出生时辰 */}
        <div className="space-y-2">
          <label className="block text-lg font-medium chinese-font text-[#8B4513] mb-2">
            {t("birthtime")}
          </label>
          <div className="relative">
            <select
              value={timeRange}
              onChange={(e) => setTimeRange(e.target.value)}
              className="w-full px-4 py-3 border-2 border-[#D4B08C] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#8B4513] focus:border-transparent calligraphy-input bg-white/90 text-base transition-all duration-300 appearance-none"
            >
              {timeRangeOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
            <div className="absolute right-4 top-1/2 transform -translate-y-1/2 pointer-events-none text-[#8B4513]">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                viewBox="0 0 16 16"
              >
                <path d="M7.247 11.14 2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z" />
              </svg>
            </div>
          </div>
        </div>

        {/* 性别选择 */}
        <div className="space-y-2">
          <label className="block text-lg font-medium chinese-font text-[#8B4513] mb-2">
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
                }`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {option.label}
              </motion.button>
            ))}
          </div>
        </div>

        {/* 姓氏输入 */}
        <div className="space-y-2">
          <label
            htmlFor="surname"
            className="block text-lg font-medium chinese-font text-[#8B4513] mb-2"
          >
            {t("surname")}
          </label>
          <input
            type="text"
            id="surname"
            value={surname}
            onChange={(e) => {
              setSurname(e.target.value);
              if (
                surnameError &&
                /^[\u4e00-\u9fa5]{1,2}$/.test(e.target.value)
              ) {
                setSurnameError("");
              }
            }}
            placeholder={t("surname_placeholder")}
            className="w-full px-4 py-3 border-2 border-[#D4B08C] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#8B4513] focus:border-transparent calligraphy-input bg-white/90 text-base transition-all duration-300"
          />
          {surnameError && (
            <p className="text-red-500 text-sm mt-1">{surnameError}</p>
          )}
        </div>
      </div>

      {error && <p className="text-red-500 text-center mb-4">{error}</p>}

      <div className="text-center">
        <motion.button
          type="submit"
          className="py-3 px-8 bg-gradient-to-r from-[var(--dunhuang-primary)] to-[var(--dunhuang-secondary)] text-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          disabled={isLoading}
        >
          {isLoading ? (
            <>
              <span className="mr-2">{t("loading")}</span>
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
            t("submit")
          )}
        </motion.button>
      </div>
    </motion.form>
  );
}
