import { motion } from "framer-motion";
import Image from "next/image";

export default function Introduction() {
  return (
    <div className="prose max-w-none mb-8">
      <div className="flex justify-center mb-8">
        <Image
          src="/scholar.png"
          alt="Ancient Chinese Scholar"
          width={400}
          height={400}
          className="object-contain"
        />
      </div>
      <motion.p
        className="text-lg mb-6 chinese-font leading-relaxed"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <span className="block text-center text-2xl font-bold mb-4 bg-gradient-to-r from-[var(--dunhuang-primary)] to-[var(--dunhuang-secondary)] bg-clip-text text-transparent">
          传统智慧 · 现代命名
        </span>
        <span className="block text-center text-[var(--ink-gray)]">
          融合了《诗经》、《四书五经》的传统文化精髓，
          结合五行八卦与梅花易数的玄妙智慧，为您打造独具匠心的人生名片。
        </span>
      </motion.p>

      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 gap-6 text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        <div className="p-4 rounded-lg bg-gradient-to-b from-white/50 to-transparent border border-[var(--dunhuang-accent)] shadow-sm">
          <h3 className="text-lg font-bold mb-2 text-[var(--dunhuang-primary)] chinese-font">
            五行相生
          </h3>
          <p className="text-[var(--ink-gray)]">
            基于您的生辰八字，精准匹配五行属性，确保名字与命理相生相融
          </p>
        </div>
        <div className="p-4 rounded-lg bg-gradient-to-b from-white/50 to-transparent border border-[var(--dunhuang-accent)] shadow-sm">
          <h3 className="text-lg font-bold mb-2 text-[var(--dunhuang-primary)] chinese-font">
            诗经典故
          </h3>
          <p className="text-[var(--ink-gray)]">
            汲取诗经雅意，融入经典文化，为您的名字注入深邃的文化意境
          </p>
        </div>
      </motion.div>
    </div>
  );
}
