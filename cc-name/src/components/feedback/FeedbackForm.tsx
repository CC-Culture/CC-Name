import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { useTranslations, useLocale } from "next-intl";

type FeedbackFormProps = {
  className?: string;
};

export default function FeedbackForm({ className = "" }: FeedbackFormProps) {
  const t = useTranslations("feedback");
  const locale = useLocale();
  const isRtl = locale === "ar" || locale === "ur";

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<
    "idle" | "success" | "error" | "timeout"
  >("idle");
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  // 清除超时计时器的函数
  const clearTimeoutTimer = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
  };

  // 组件卸载时清除计时器
  useEffect(() => {
    return () => clearTimeoutTimer();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!message.trim()) {
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus("idle");

    // 设置8秒超时计时器
    clearTimeoutTimer();
    timeoutRef.current = setTimeout(() => {
      setSubmitStatus("timeout");
      setIsSubmitting(false);
    }, 8000); // 8秒超时
    try {
      // 将反馈添加到Firestore
      await addDoc(collection(db, "feedback"), {
        name: name.trim() || t("anonymous"),
        email: email.trim() || null,
        message: message.trim(),
        locale: locale,
        createdAt: serverTimestamp(),
      });
      // 清除超时计时器
      clearTimeoutTimer();

      // 重置表单
      setName("");
      setEmail("");
      setMessage("");
      setSubmitStatus("success");
    } catch (error) {
      // 清除超时计时器
      clearTimeoutTimer();

      console.error("Error submitting feedback:", error);
      setSubmitStatus("error");
    } finally {
      // 如果计时器还在运行（没有超时），则清除它
      clearTimeoutTimer();
      setIsSubmitting(false);
    }
  };

  return (
    <div className={`${className}`}>
      <h3 className="text-2xl font-semibold mb-4 text-[#8B4513]">
        {t("title")}
      </h3>

      {submitStatus === "success" ? (
        <motion.div
          className="p-6 rounded-lg bg-green-50 text-green-800 mb-6"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <p className="text-center">{t("thank_you")}</p>
          <div className="text-center mt-4">
            <button
              onClick={() => setSubmitStatus("idle")}
              className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
            >
              {t("continue")}
            </button>
          </div>
        </motion.div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label
              htmlFor="name"
              className="block text-lg font-medium mb-2 text-[#8B4513]"
            >
              {t("name_label")}
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className={`w-full p-3 rounded-lg bg-white/50 backdrop-blur-sm border border-[#8B4513]/20 focus:outline-none focus:border-[#8B4513] ${
                isRtl ? "text-right" : ""
              }`}
              disabled={isSubmitting}
            />
          </div>

          <div>
            <label
              htmlFor="email"
              className="block text-lg font-medium mb-2 text-[#8B4513]"
            >
              {t("email_label")}
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={`w-full p-3 rounded-lg bg-white/50 backdrop-blur-sm border border-[#8B4513]/20 focus:outline-none focus:border-[#8B4513] ${
                isRtl ? "text-right" : ""
              }`}
              disabled={isSubmitting}
            />
          </div>

          <div>
            <label
              htmlFor="message"
              className="block text-lg font-medium mb-2 text-[#8B4513]"
            >
              {t("message_label")} <span className="text-red-500">*</span>
            </label>
            <textarea
              id="message"
              name="message"
              rows={4}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className={`w-full p-3 rounded-lg bg-white/50 backdrop-blur-sm border border-[#8B4513]/20 focus:outline-none focus:border-[#8B4513] ${
                isRtl ? "text-right" : ""
              }`}
              required
              disabled={isSubmitting}
            />
          </div>

          {submitStatus === "error" && (
            <div className="p-4 bg-red-50 text-red-700 rounded-lg">
              {t("error_message")}
            </div>
          )}

          {submitStatus === "timeout" && (
            <div className="p-4 bg-red-50 text-red-700 rounded-lg">
              {t("timeout_message")}
            </div>
          )}

          <div className="text-center">
            <button
              type="submit"
              disabled={isSubmitting || !message.trim()}
              className={`px-8 py-3 bg-gradient-to-r from-[var(--dunhuang-primary)] to-[var(--dunhuang-secondary)] text-white rounded-lg transition-all ${
                isSubmitting
                  ? "opacity-70 cursor-not-allowed"
                  : "hover:opacity-90"
              }`}
            >
              {isSubmitting ? t("submitting") : t("submit")}
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
