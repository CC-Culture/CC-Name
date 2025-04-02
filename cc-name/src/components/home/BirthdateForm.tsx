import { useState } from "react";
import { useRouter } from "next/navigation";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { motion } from "framer-motion";
import { generateName } from "@/services/api";

export default function BirthdateForm() {
  const [birthdate, setBirthdate] = useState<Date | null>(new Date(2000, 0, 1));
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!birthdate) {
      setError("请选择您的生日");
      return;
    }
    setError("");
    setIsLoading(true);

    try {
      const formattedDate = birthdate.toISOString().split("T")[0];
      const response = await generateName(formattedDate);
      const encodedData = encodeURIComponent(JSON.stringify(response));
      router.push(`/result?data=${encodedData}`);
    } catch (err) {
      setError(err instanceof Error ? err.message : "生成名字时出错");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <motion.form
      className="paper-background rounded-2xl p-12 w-full max-w-3xl shadow-lg xuan-paper-bg relative overflow-hidden"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.2 }}
      onSubmit={handleSubmit}
    >
      {/* 装饰性边框 */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#8B4513]/20 to-transparent" />
      <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#8B4513]/20 to-transparent" />
      <div className="absolute left-0 top-0 h-full w-1 bg-gradient-to-b from-transparent via-[#8B4513]/20 to-transparent" />
      <div className="absolute right-0 top-0 h-full w-1 bg-gradient-to-b from-transparent via-[#8B4513]/20 to-transparent" />

      <div className="mb-10 flex flex-col items-center space-y-6">
        <h2 className="text-2xl font-bold chinese-font bg-gradient-to-r from-[var(--dunhuang-primary)] to-[var(--dunhuang-secondary)] bg-clip-text text-transparent mb-2">
          寻找您的命定之名
        </h2>
        <div className="flex items-center justify-center space-x-6">
          <label
            htmlFor="birthdate"
            className="text-xl font-medium chinese-font text-[#8B4513]"
          >
            生辰八字
          </label>
          <div className="relative">
            <DatePicker
              selected={birthdate}
              onChange={(date: Date | null) => setBirthdate(date || new Date())}
              dateFormat="yyyy年MM月dd日"
              locale="zh-CN"
              className="w-[300px] px-6 py-3 border border-[#D4B08C] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8B4513] focus:border-transparent calligraphy-input bg-white/80 text-lg"
              placeholderText="请选择您的生日"
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
              allowKeyboardControl={true}
            />
            <div className="absolute right-4 top-1/2 transform -translate-y-1/2 pointer-events-none">
              <svg
                className="w-5 h-5 text-[#8B4513]"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>

      {error && (
        <motion.div
          className="mb-8 p-4 bg-red-50/80 text-red-700 rounded-lg border border-red-200 text-center"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <p className="chinese-font">{error}</p>
        </motion.div>
      )}

      <div
        className="flex flex-col items-center space-y-6"
        style={{ width: "300px", margin: "0 auto" }}
      >
        <motion.button
          type="submit"
          className="w-full px-12 py-4 bg-gradient-to-r from-[#8B4513] to-[#A0522D] text-white rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed chinese-font text-lg relative overflow-hidden group"
          disabled={isLoading}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <span className="relative z-10">
            {isLoading ? "命名推演中..." : "开始命名"}
          </span>
          <div className="absolute inset-0 bg-gradient-to-r from-[#A0522D] to-[#8B4513] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </motion.button>
      </div>

      {/* 装饰性图案 */}
      <div className="absolute top-4 right-4 opacity-10">
        <svg
          width="60"
          height="60"
          viewBox="0 0 100 100"
          className="text-[#8B4513]"
        >
          <path
            d="M10,50 C10,30 30,10 50,10 C70,10 90,30 90,50 C90,70 70,90 50,90 C30,90 10,70 10,50"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          />
          <circle cx="50" cy="50" r="5" fill="currentColor" />
        </svg>
      </div>
      <div className="absolute bottom-4 left-4 opacity-10 transform rotate-180">
        <svg
          width="60"
          height="60"
          viewBox="0 0 100 100"
          className="text-[#8B4513]"
        >
          <path
            d="M10,50 C10,30 30,10 50,10 C70,10 90,30 90,50 C90,70 70,90 50,90 C30,90 10,70 10,50"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          />
          <circle cx="50" cy="50" r="5" fill="currentColor" />
        </svg>
      </div>
    </motion.form>
  );
}
