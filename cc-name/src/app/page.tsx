"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function Home() {
  const [birthdate, setBirthdate] = useState<Date | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [seasonTheme, setSeasonTheme] = useState("");
  const router = useRouter();

  useEffect(() => {
    const determineSeasonTheme = () => {
      const now = new Date();
      const month = now.getMonth() + 1;

      if (month >= 3 && month <= 5) {
        setSeasonTheme("spring-theme");
      } else if (month >= 6 && month <= 8) {
        setSeasonTheme("summer-theme");
      } else if (month >= 9 && month <= 11) {
        setSeasonTheme("autumn-theme");
      } else {
        setSeasonTheme("winter-theme");
      }
    };

    determineSeasonTheme();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!birthdate) {
      setError("请选择您的生日");
      return;
    }

    setIsLoading(true);
    setError("");

    setTimeout(() => {
      try {
        const formattedDate = birthdate.toISOString().split("T")[0];
        router.push(`/result?birthdate=${encodeURIComponent(formattedDate)}`);
      } catch (err) {
        setIsLoading(false);
        setError("网络错误，请重试");
      }
    }, 8000);
  };

  return (
    <div
      className={`container mx-auto px-4 py-12 flex flex-col items-center ${seasonTheme}`}
    >
      <motion.div
        className="paper-background rounded-lg p-8 w-full max-w-2xl shadow-lg mb-12 scroll-reveal xuan-paper-bg"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <div className="flex items-center justify-center mb-6">
          <Image
            src="/yi-seal.svg"
            alt="易字印章"
            width={60}
            height={60}
            className="mr-4"
          />
          <h1 className="text-3xl md:text-4xl font-bold text-center chinese-font text-[var(--dunhuang-primary)]">
            CC Name
          </h1>
        </div>
        <div className="prose max-w-none mb-8">
          <p className="text-lg text-center">
            Welcome to CC Name, where ancient Chinese wisdom meets modern naming
            science. Our unique system draws from the Classic of Poetry, the
            Four Books and Five Classics, the Five Elements theory, and the Plum
            Blossom Numerology to create names that resonate with your destiny
            and character.
          </p>
          <p className="text-lg text-center mt-4">
            Each name we generate is carefully crafted based on your birth date,
            ensuring harmony between your name and your life's path according to
            traditional Chinese philosophy.
          </p>
        </div>
      </motion.div>

      <motion.form
        className="paper-background rounded-lg p-8 w-full max-w-2xl shadow-lg bamboo-slip xuan-paper-bg"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        onSubmit={handleSubmit}
      >
        <div className="mb-8 flex items-center space-x-4">
          <label
            htmlFor="birthdate"
            className="text-lg font-medium chinese-font whitespace-nowrap text-[var(--dunhuang-primary)]"
          >
            您的生日
          </label>
          <DatePicker
            selected={birthdate}
            onChange={(date) => setBirthdate(date)}
            dateFormat="yyyy-MM-dd"
            className="flex-1 p-3 border rounded-md focus:outline-none focus:ring-2 calligraphy-input"
            placeholderText="请选择您的生日"
            showYearDropdown
            scrollableYearDropdown
            yearDropdownItemNumber={100}
          />
        </div>

        {error && (
          <div className="mb-6 p-3 bg-red-100 text-red-700 rounded-md rubbing-effect">
            <p className="chinese-font">{error}</p>
          </div>
        )}

        <button
          type="submit"
          disabled={isLoading}
          className={`ink-button w-full py-3 px-6 rounded-md text-white font-medium text-lg transition-all duration-300 chinese-font ${
            isLoading ? "bg-gray-500" : "bg-blue-600 hover:bg-blue-700"
          }`}
        >
          {isLoading ? (
            <div className="w-full">
              <div className="h-2 bg-gray-300 rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-white"
                  initial={{ width: "0%" }}
                  animate={{ width: "100%" }}
                  transition={{ duration: 8, ease: "linear" }}
                />
              </div>
              <p className="text-center mt-2 chinese-font">生成中...</p>
            </div>
          ) : (
            "生成姓名"
          )}
        </button>
      </motion.form>
    </div>
  );
}
