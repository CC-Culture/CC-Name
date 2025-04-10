import { motion } from "framer-motion";
import Image from "next/image";
import { useState } from "react";
import { useTranslations } from "next-intl";

interface TooltipProps {
  content: string;
  children: React.ReactNode;
}

function Tooltip({ content, children }: TooltipProps) {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <div
      className="relative"
      onMouseEnter={() => setIsVisible(true)}
      onMouseLeave={() => setIsVisible(false)}
    >
      {children}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{
          opacity: isVisible ? 1 : 0,
          y: isVisible ? 0 : 10,
          pointerEvents: isVisible ? "auto" : "none",
        }}
        transition={{ duration: 0.2 }}
        className="absolute z-50 w-80 p-4 rounded-xl bg-gradient-to-b from-white/90 to-white/80 backdrop-blur-sm border border-[var(--dunhuang-accent)] shadow-lg text-left"
        style={{ top: "100%", left: "50%", transform: "translateX(-50%)" }}
      >
        <div className="text-[var(--ink-gray)] text-sm">{content}</div>
      </motion.div>
    </div>
  );
}

export default function Introduction() {
  const t = useTranslations("home");

  return (
    <div className="prose max-w-none mb-8 relative overflow-hidden">
      <div className="flex justify-center mb-8">
        <Image
          src="/scholar.png"
          alt="Ancient Chinese Scholar"
          width={400}
          height={400}
          className="object-contain"
        />
      </div>
      <motion.div
        className="mb-8 text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h2 className="text-3xl font-bold chinese-font mb-4 bg-gradient-to-r from-[var(--dunhuang-primary)] to-[var(--dunhuang-secondary)] bg-clip-text text-transparent inline-block">
          {t("slogan")}
        </h2>
        <p className="text-lg text-[var(--ink-gray)] leading-relaxed max-w-3xl mx-auto">
          {t("description")}
        </p>
      </motion.div>

      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 gap-6 text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        <Tooltip content={t("wuxing_tooltip")}>
          <div className="p-6 rounded-xl bg-gradient-to-b from-white/50 to-transparent border border-[var(--dunhuang-accent)] shadow-sm hover:shadow-md transition-all duration-300 cursor-help">
            <h3 className="text-xl font-bold mb-3 text-[var(--dunhuang-primary)] chinese-font">
              {t("wuxing")}
            </h3>
            <p className="text-[var(--ink-gray)] leading-relaxed">
              {t("wuxing_desc")}
            </p>
          </div>
        </Tooltip>
        <Tooltip content={t("shijing_tooltip")}>
          <div className="p-6 rounded-xl bg-gradient-to-b from-white/50 to-transparent border border-[var(--dunhuang-accent)] shadow-sm hover:shadow-md transition-all duration-300 cursor-help">
            <h3 className="text-xl font-bold mb-3 text-[var(--dunhuang-primary)] chinese-font">
              {t("shijing")}
            </h3>
            <p className="text-[var(--ink-gray)] leading-relaxed">
              {t("shijing_desc")}
            </p>
          </div>
        </Tooltip>
      </motion.div>
    </div>
  );
}
