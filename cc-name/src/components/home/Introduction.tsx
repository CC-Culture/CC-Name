import { motion } from "framer-motion";
import Image from "next/image";
import { useState } from "react";

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
  const wuxingContent =
    "五行（金、木、水、火、土）是中国古代哲学中阐述自然界基本物质的构成及其运动变化规律的重要理论。这一理论认为世间万物皆由五行相生相克：木生火，火生土，土生金，金生水，水生木。在起名中，通过五行相生相克的原理，可以帮助平衡人生命格，趋吉避凶。";
  const shijingContent =
    "《诗经》是中国最早的诗歌总集，收录了西周初年至春秋中叶（前11世纪至前6世纪）的诗歌，共311篇。其中包含了丰富的文化内涵、优美的意境以及深厚的人类精神。在起名时借鉴《诗经》的典故和意境，不仅能赋予名字深远的文化底蕴，更能传承中华文化的精髓。";

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
          传统智慧 · 现代命名
        </h2>
        <p className="text-lg text-[var(--ink-gray)] leading-relaxed max-w-3xl mx-auto">
          融合了《诗经》、《四书五经》的传统文化精髓，
          结合五行八卦与梅花易数的玄妙智慧，为您打造独具匠心的人生名片。
        </p>
      </motion.div>

      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 gap-6 text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        <Tooltip content={wuxingContent}>
          <div className="p-6 rounded-xl bg-gradient-to-b from-white/50 to-transparent border border-[var(--dunhuang-accent)] shadow-sm hover:shadow-md transition-all duration-300 cursor-help">
            <h3 className="text-xl font-bold mb-3 text-[var(--dunhuang-primary)] chinese-font">
              五行相生
            </h3>
            <p className="text-[var(--ink-gray)] leading-relaxed">
              基于您的生辰八字，精准匹配五行属性，确保名字与命理相生相融
            </p>
          </div>
        </Tooltip>
        <Tooltip content={shijingContent}>
          <div className="p-6 rounded-xl bg-gradient-to-b from-white/50 to-transparent border border-[var(--dunhuang-accent)] shadow-sm hover:shadow-md transition-all duration-300 cursor-help">
            <h3 className="text-xl font-bold mb-3 text-[var(--dunhuang-primary)] chinese-font">
              诗经典故
            </h3>
            <p className="text-[var(--ink-gray)] leading-relaxed">
              汲取诗经雅意，融入经典文化，为您的名字注入深邃的文化意境
            </p>
          </div>
        </Tooltip>
      </motion.div>
    </div>
  );
}
