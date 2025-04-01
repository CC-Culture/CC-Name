import { useState } from "react";
import { motion } from "framer-motion";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useRouter } from "next/navigation";
import { generateName } from "@/services/api";
import { MiddlewareReturn } from "@floating-ui/core";
import { MiddlewareState } from "@floating-ui/dom";

export default function BirthdateForm() {
  const [birthdate, setBirthdate] = useState<Date | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!birthdate) {
      setError("请选择您的生日");
      return;
    }

    setIsLoading(true);
    setError("");

    try {
      const formattedDate = birthdate.toISOString().split("T")[0];
      const response = await generateName(formattedDate);
      console.log(response);
      // 将响应数据编码并存储到URL中
      const encodedData = encodeURIComponent(JSON.stringify(response));
      router.push(`/result?data=${encodedData}`);
    } catch {
      setIsLoading(false);
      setError("生成名字时发生错误，请稍后重试");
    }
  };

  return (
    <motion.form
      className="paper-background rounded-lg p-12 w-full max-w-3xl shadow-lg bamboo-slip xuan-paper-bg border border-[#E8D3B9]"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.2 }}
      onSubmit={handleSubmit}
    >
      <div className="mb-10 flex items-center justify-center space-x-4">
        <label
          htmlFor="birthdate"
          className="text-xl font-medium chinese-font text-[#8B4513]"
        >
          您的生日
        </label>
        <div className="w-[300px]">
          <DatePicker
            selected={birthdate}
            onChange={(date) => setBirthdate(date)}
            dateFormat="yyyy年MM月dd日"
            className="w-full p-4 border border-[#D4B08C] rounded-md focus:outline-none focus:ring-2 focus:ring-[#8B4513] focus:border-transparent calligraphy-input bg-white/80 text-lg"
            placeholderText="请选择您的生日"
            showYearDropdown
            scrollableYearDropdown
            yearDropdownItemNumber={100}
            dropdownMode="select"
            popperClassName="react-datepicker-popper"
            popperPlacement="bottom-start"
            popperModifiers={[
              {
                name: "offset",
                options: {
                  offset: [0, 8],
                },
                fn: function (
                  state: MiddlewareState
                ): MiddlewareReturn | Promise<MiddlewareReturn> {
                  throw new Error("Function not implemented.");
                },
              },
            ]}
          />
        </div>
      </div>

      {error && (
        <motion.div
          className="mb-8 p-4 bg-red-50 text-red-700 rounded-md border border-red-200"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <p className="chinese-font">{error}</p>
        </motion.div>
      )}

      <motion.button
        type="submit"
        disabled={isLoading}
        className={`ink-button w-full py-4 px-8 rounded-md text-white font-medium text-xl transition-all duration-300 chinese-font
          ${
            isLoading
              ? "bg-[#D4B08C]"
              : "bg-[#E6A23C] hover:bg-[#F0B55C] shadow-lg hover:shadow-xl"
          }`}
        whileHover={!isLoading ? { scale: 1.02 } : {}}
        whileTap={!isLoading ? { scale: 0.98 } : {}}
      >
        {isLoading ? (
          <div className="w-full">
            <div className="h-2 bg-white/30 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-white"
                initial={{ width: "0%" }}
                animate={{ width: "100%" }}
                transition={{ duration: 8, ease: "linear" }}
              />
            </div>
            <p className="text-center mt-3 chinese-font">生成中...</p>
          </div>
        ) : (
          <div className="flex items-center justify-center space-x-2">
            <span>生成姓名</span>
            <motion.span
              animate={{ x: [0, 5, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              →
            </motion.span>
          </div>
        )}
      </motion.button>
    </motion.form>
  );
}
