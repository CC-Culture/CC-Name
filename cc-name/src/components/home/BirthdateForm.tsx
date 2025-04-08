import { useState } from "react";
import { useRouter } from "next/navigation";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { motion } from "framer-motion";
import { generateName, Gender } from "@/services/api";
import { zhCN } from "date-fns/locale";

export default function BirthdateForm() {
  // 时间段选项
  const timeRangeOptions = [
    { value: "0:00", label: "子时 (0:00-2:00)" },
    { value: "2:00", label: "丑时 (2:00-4:00)" },
    { value: "4:00", label: "寅时 (4:00-6:00)" },
    { value: "6:00", label: "卯时 (6:00-8:00)" },
    { value: "8:00", label: "辰时 (8:00-10:00)" },
    { value: "10:00", label: "巳时 (10:00-12:00)" },
    { value: "12:00", label: "午时 (12:00-14:00)" },
    { value: "14:00", label: "未时 (14:00-16:00)" },
    { value: "16:00", label: "申时 (16:00-18:00)" },
    { value: "18:00", label: "酉时 (18:00-20:00)" },
    { value: "20:00", label: "戌时 (20:00-22:00)" },
    { value: "22:00", label: "亥时 (22:00-24:00)" },
  ];

  const [birthdate, setBirthdate] = useState<Date | null>(new Date(2000, 0, 1));
  const [surname, setSurname] = useState<string>("");
  const [gender, setGender] = useState<Gender>("male");
  const [timeRange, setTimeRange] = useState<string>(timeRangeOptions[0].value);
  const [error, setError] = useState("");
  const [surnameError, setSurnameError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!birthdate) {
      setError("请选择您的生日");
      return;
    }
    if (!(birthdate instanceof Date) || isNaN(birthdate.getTime())) {
      setError("请输入有效的日期格式");
      return;
    }
    if (surname && !/^[\u4e00-\u9fa5]{1,2}$/.test(surname)) {
      setSurnameError("请输入1-2个中文字符");
      return;
    }
    setError("");
    setSurnameError("");
    setIsLoading(true);

    try {
      const formattedDate = `${birthdate.getFullYear()}-${String(
        birthdate.getMonth() + 1
      ).padStart(2, "0")}-${String(birthdate.getDate()).padStart(2, "0")}`;
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
          寻找您的命定之名
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {/* 生日选择 */}
        <div className="space-y-2">
          <label
            htmlFor="birthdate"
            className="block text-lg font-medium chinese-font text-[#8B4513] mb-2"
          >
            出生日期
          </label>
          <div className="relative">
            <DatePicker
              selected={birthdate}
              onChange={(date: Date | null) => setBirthdate(date || new Date())}
              dateFormat="yyyy/MM/dd"
              locale={zhCN}
              className="w-full px-4 py-3 border-2 border-[#D4B08C] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#8B4513] focus:border-transparent calligraphy-input bg-white/90 text-base transition-all duration-300"
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
              strictParsing
              onChangeRaw={(
                e:
                  | React.MouseEvent<HTMLElement>
                  | React.KeyboardEvent<HTMLElement>
                  | undefined
              ) => {
                const value = (e?.target as HTMLInputElement)?.value || "";
                if (value && !/^\d{4}\/\d{2}\/\d{2}$/.test(value)) {
                  setError("请使用正确的日期格式：yyyy/MM/dd");
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
            出生时辰
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
            性别
          </label>
          <div className="grid grid-cols-3 gap-3">
            {[
              { value: "male", label: "男性" },
              { value: "female", label: "女性" },
              { value: "neutral", label: "中性" },
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
            className="block text-lg font-medium chinese-font text-[#8B4513] mb-2 hover:text-[#A0522D] cursor-pointer transition-colors"
          >
            <div className="flex items-center gap-2">
              <span>姓氏</span>
              <span
                onClick={() => router.push("/surname-culture")}
                className="text-[#A0522D] hover:text-[#8B4513] transition-colors underline text-sm"
              >
                (了解姓氏文化)
              </span>
            </div>
          </label>
          <div className="relative">
            <input
              type="text"
              id="surname"
              value={surname}
              onChange={(e) => {
                const value = e.target.value;
                setSurname(value);
                if (value && !/^[\u4e00-\u9fa5]{1,2}$/.test(value)) {
                  setSurnameError("请输入1-2个中文字符");
                } else {
                  setSurnameError("");
                }
              }}
              className="w-full px-4 py-3 border-2 border-[#D4B08C] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#8B4513] focus:border-transparent calligraphy-input bg-white/90 text-base transition-all duration-300"
              placeholder="可选，输入您的姓氏"
            />
            {surnameError && (
              <motion.p
                className="absolute left-0 -bottom-6 text-sm text-red-600 w-full"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                {surnameError}
              </motion.p>
            )}
          </div>
        </div>
      </div>

      {error && (
        <motion.div
          className="mb-6 p-3 bg-red-50/90 text-red-700 rounded-xl border border-red-200 text-center shadow-sm"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <p className="chinese-font text-sm">{error}</p>
        </motion.div>
      )}

      <div className="flex justify-center">
        <motion.button
          type="submit"
          className="px-10 py-3 bg-gradient-to-r from-[#8B4513] to-[#A0522D] text-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed chinese-font text-lg relative overflow-hidden group w-full md:w-64"
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
      <div className="absolute top-4 right-4 opacity-20 transform rotate-45">
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
      <div className="absolute bottom-4 left-4 opacity-20 transform -rotate-135">
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

      {/* 添加底部说明文字 */}
      <div className="mt-6 text-center text-xs text-[#8B4513]/70">
        <p>请填写准确的出生日期与时辰，以获得更精准的命名推荐</p>
      </div>
    </motion.form>
  );
}
