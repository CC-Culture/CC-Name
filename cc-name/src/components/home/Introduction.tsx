"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import { useTranslations } from "next-intl";
import ReactDOM from "react-dom";

interface TooltipProps {
  content: React.ReactNode;
  children: React.ReactNode;
  width?: string;
}

// 添加Portal组件确保Tooltip内容渲染在DOM树顶层
function TooltipPortal({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  // 在客户端渲染之前不显示内容
  if (!mounted) return null;

  return ReactDOM.createPortal(
    children,
    document.getElementById("tooltip-root") || document.body
  );
}

function Tooltip({ content, children, width = "w-96" }: TooltipProps) {
  const [isVisible, setIsVisible] = useState(false);
  const tooltipRef = useRef<HTMLDivElement>(null);

  // 添加点击外部关闭tooltip的功能
  useEffect(() => {
    if (!isVisible) return;

    const handleClickOutside = (event: MouseEvent) => {
      if (
        tooltipRef.current &&
        !tooltipRef.current.contains(event.target as Node)
      ) {
        setIsVisible(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isVisible]);

  return (
    <div
      className="relative inline-block cursor-help"
      onMouseEnter={() => setIsVisible(true)}
      onMouseLeave={() => setIsVisible(false)}
    >
      {children}

      {isVisible && (
        <TooltipPortal>
          <div
            ref={tooltipRef}
            className={`fixed z-[9999] ${width} p-5 rounded-xl bg-white shadow-xl border border-[var(--dunhuang-accent)]`}
            style={{
              left: tooltipRef.current
                ? tooltipRef.current.getBoundingClientRect().left
                : "50%",
              top: tooltipRef.current
                ? tooltipRef.current.getBoundingClientRect().bottom +
                  window.scrollY +
                  10
                : "50%",
              transform: "translateX(-50%)",
              maxHeight: "80vh",
              overflowY: "auto",
            }}
          >
            <div className="text-[var(--ink-gray)] text-sm">{content}</div>
            <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-4 h-4 rotate-45 bg-white border-t border-l border-[var(--dunhuang-accent)]" />
          </div>
        </TooltipPortal>
      )}
    </div>
  );
}

// 五行元素图标组件
const ElementIcon = ({
  type,
}: {
  type: "metal" | "wood" | "water" | "fire" | "earth";
}) => {
  const iconPaths: Record<string, { path: string; color: string }> = {
    metal: {
      path: "M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-5-9h10v2H7z",
      color: "#D4AF37",
    },
    wood: {
      path: "M12 22c4.97 0 9-4.03 9-9-4.97 0-9 4.03-9 9zm0-18c-4.97 0-9 4.03-9 9 4.97 0 9-4.03 9-9zm0 7c1.1 0 2 .9 2 2s-.9 2-2 2-2-.9-2-2 .9-2 2-2z",
      color: "#228B22",
    },
    water: {
      path: "M12 2c-5.33 4.55-8 8.48-8 11.8 0 4.98 3.8 8.2 8 8.2s8-3.22 8-8.2c0-3.32-2.67-7.25-8-11.8zm0 18c-3.35 0-6-2.57-6-6.2 0-2.34 1.95-5.44 6-9.14 4.05 3.7 6 6.79 6 9.14 0 3.63-2.65 6.2-6 6.2zm-4-8c0 2.2 1.79 4 4 4 2.21 0 4-1.8 4-4s-1.79-4-4-4c-2.21 0-4 1.8-4 4z",
      color: "#1E90FF",
    },
    fire: {
      path: "M19.48 12.35c-1.57-4.08-7.16-4.3-5.81-10.23.1-.44-.37-.78-.75-.55C9.29 3.71 6.68 8 8.87 13.62c.18.46-.36.89-.75.59-1.81-1.37-2-3.34-1.84-4.75.06-.52-.62-.77-.91-.34C4.69 10.16 4 11.84 4 14.37c.38 5.6 5.11 7.32 6.81 7.54 2.43.31 5.06-.14 6.95-1.87 2.08-1.93 2.84-5.01 1.72-7.69zm-9.28 5.03c1.44-.35 2.18-1.39 2.38-2.31.33-1.43-.96-2.83-.09-5.09.33 1.87 3.27 3.04 3.27 5.08.08 2.53-2.66 4.7-5.56 2.32z",
      color: "#FF4500",
    },
    earth: {
      path: "M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z",
      color: "#8B4513",
    },
  };

  const { path, color } = iconPaths[type];

  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill={color}
      className="inline-block mr-2"
    >
      <path d={path} />
    </svg>
  );
};

// 五行元素详细介绍内容
const WuxingDetailContent = () => {
  const t = useTranslations("home");

  return (
    <div className="space-y-3">
      <p className="mb-2">{t("wuxing_tooltip")}</p>

      <div className="grid grid-cols-1 gap-2 mt-3">
        <div className="flex items-start bg-white/30 p-2 rounded">
          <ElementIcon type="metal" />
          <div>
            <span className="font-semibold">金：</span>
            {t("metal_desc")}
          </div>
        </div>
        <div className="flex items-start bg-white/30 p-2 rounded">
          <ElementIcon type="wood" />
          <div>
            <span className="font-semibold">木：</span>
            {t("wood_desc")}
          </div>
        </div>
        <div className="flex items-start bg-white/30 p-2 rounded">
          <ElementIcon type="water" />
          <div>
            <span className="font-semibold">水：</span>
            {t("water_desc")}
          </div>
        </div>
        <div className="flex items-start bg-white/30 p-2 rounded">
          <ElementIcon type="fire" />
          <div>
            <span className="font-semibold">火：</span>
            {t("fire_desc")}
          </div>
        </div>
        <div className="flex items-start bg-white/30 p-2 rounded">
          <ElementIcon type="earth" />
          <div>
            <span className="font-semibold">土：</span>
            {t("earth_desc")}
          </div>
        </div>
      </div>

      <div className="mt-3 pt-2 border-t border-[var(--dunhuang-accent)]/20">
        <p className="text-xs text-gray-500">{t("wuxing_naming")}</p>
      </div>
    </div>
  );
};

// 诗词典故详细介绍内容
const ShijingDetailContent = () => {
  const t = useTranslations("home");

  return (
    <div className="space-y-3">
      <p className="mb-2">{t("shijing_tooltip")}</p>

      <div className="bg-white/30 p-3 rounded border-l-4 border-[var(--dunhuang-primary)] mt-2 italic">
        <p className="text-sm">&quot;{t("shijing_quote")}&quot;</p>
        <p className="text-right text-xs mt-1">— {t("shijing_source")}</p>
      </div>

      <div className="mt-3">
        <h4 className="font-semibold text-[var(--dunhuang-primary)]">
          {t("classics_in_naming")}
        </h4>
        <ul className="list-disc list-inside text-sm mt-1 space-y-1">
          <li>{t("classics_point1")}</li>
          <li>{t("classics_point2")}</li>
          <li>{t("classics_point3")}</li>
        </ul>
      </div>

      <div className="mt-3 pt-2 border-t border-[var(--dunhuang-accent)]/20">
        <p className="text-xs text-gray-500">{t("shijing_naming")}</p>
      </div>
    </div>
  );
};

export default function Introduction() {
  const t = useTranslations("home");

  // 确保tooltip-root元素存在
  useEffect(() => {
    if (!document.getElementById("tooltip-root")) {
      const tooltipRoot = document.createElement("div");
      tooltipRoot.id = "tooltip-root";
      document.body.appendChild(tooltipRoot);
    }

    return () => {
      const tooltipRoot = document.getElementById("tooltip-root");
      if (tooltipRoot && tooltipRoot.parentNode) {
        tooltipRoot.parentNode.removeChild(tooltipRoot);
      }
    };
  }, []);

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
        <Tooltip content={<WuxingDetailContent />} width="w-96">
          <div className="p-6 rounded-xl bg-gradient-to-b from-white/50 to-transparent border border-[var(--dunhuang-accent)] shadow-sm hover:shadow-md transition-all duration-300">
            <h3 className="text-xl font-bold mb-3 text-[var(--dunhuang-primary)] chinese-font flex items-center justify-center">
              <span className="inline-flex items-center bg-[var(--dunhuang-primary)]/10 px-3 py-1 rounded-full">
                <svg
                  className="w-5 h-5 mr-2"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 22c4.97 0 9-4.03 9-9-4.97 0-9 4.03-9 9zm0-18c-4.97 0-9 4.03-9 9 4.97 0 9-4.03 9-9zm0 2c3.86 0 7 3.14 7 7 0 3.86-3.14 7-7 7s-7-3.14-7-7c0-3.86 3.14-7 7-7z" />
                </svg>
                {t("wuxing")}
              </span>
            </h3>
            <p className="text-[var(--ink-gray)] leading-relaxed">
              {t("wuxing_desc")}
            </p>
            <div className="mt-4 text-xs text-[var(--dunhuang-secondary)]">
              {t("hover_for_details") || "悬停了解更多详情"}
            </div>
          </div>
        </Tooltip>
        <Tooltip content={<ShijingDetailContent />} width="w-96">
          <div className="p-6 rounded-xl bg-gradient-to-b from-white/50 to-transparent border border-[var(--dunhuang-accent)] shadow-sm hover:shadow-md transition-all duration-300">
            <h3 className="text-xl font-bold mb-3 text-[var(--dunhuang-primary)] chinese-font flex items-center justify-center">
              <span className="inline-flex items-center bg-[var(--dunhuang-primary)]/10 px-3 py-1 rounded-full">
                <svg
                  className="w-5 h-5 mr-2"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M21 5c-1.11-.35-2.33-.5-3.5-.5-1.95 0-4.05.4-5.5 1.5-1.45-1.1-3.55-1.5-5.5-1.5-1.95 0-4.05.4-5.5 1.5v14.65c0 .25.25.5.5.5.1 0 .15-.05.25-.05C3.1 20.45 5.05 20 6.5 20c1.95 0 4.05.4 5.5 1.5 1.35-.85 3.8-1.5 5.5-1.5 1.65 0 3.35.3 4.75 1.05.1.05.15.05.25.05.25 0 .5-.25.5-.5V6c-.6-.45-1.25-.75-2-1zm0 13.5c-1.1-.35-2.3-.5-3.5-.5-1.7 0-4.15.65-5.5 1.5V8c1.35-.85 3.8-1.5 5.5-1.5 1.2 0 2.4.15 3.5.5v11.5z" />
                </svg>
                {t("shijing")}
              </span>
            </h3>
            <p className="text-[var(--ink-gray)] leading-relaxed">
              {t("shijing_desc")}
            </p>
            <div className="mt-4 text-xs text-[var(--dunhuang-secondary)]">
              {t("hover_for_details") || "悬停了解更多详情"}
            </div>
          </div>
        </Tooltip>
      </motion.div>
    </div>
  );
}
