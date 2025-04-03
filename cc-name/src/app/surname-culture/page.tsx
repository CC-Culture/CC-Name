"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { surnameData } from "@/data/surnames";

export default function SurnameCulture() {
  return (
    <div className="min-h-screen xuan-paper-bg">
      {/* 顶部横幅区域 */}
      <motion.div
        className="relative h-[400px] w-full overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-[#8B4513]/80 to-[#A0522D]/80 z-10" />
        <Image
          src="/scholar.png"
          alt="百家姓历史"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 flex items-center justify-center z-20">
          <div className="text-center text-white">
            <h1 className="text-5xl font-bold chinese-font mb-6">
              中国姓氏文化
            </h1>
            <p className="text-xl max-w-2xl mx-auto mb-8">
              探索五千年姓氏渊源，传承华夏文明印记
            </p>
            <motion.a
              href="https://zh.wikipedia.org/wiki/百家姓"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center bg-white/20 hover:bg-white/30 text-white px-8 py-3 rounded-full backdrop-blur-sm transition-all duration-300 border border-white/30 relative"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              从wiki中挑选更多姓氏
              <svg
                className="w-5 h-5 ml-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M14 5l7 7m0 0l-7 7m7-7H3"
                />
              </svg>
              <motion.div
                className="absolute -right-12 -bottom-12"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{
                  scale: [0.8, 1, 0.8],
                  opacity: [0, 1, 0],
                  x: [-20, 0, -20],
                  y: [-20, 0, -20],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  repeatType: "reverse",
                }}
              >
                <svg
                  width="32"
                  height="32"
                  viewBox="0 0 24 24"
                  fill="white"
                  stroke="white"
                  strokeWidth="1.5"
                >
                  <path d="M9.5 3l-5 5v3l5-5V3zm0 0h3l-5 5h-3l5-5z" />
                </svg>
              </motion.div>
            </motion.a>
          </div>
        </div>
      </motion.div>

      <div className="container mx-auto px-4 py-12">
        <div className="flex gap-8">
          {/* 主要内容区域 */}
          <motion.div
            className="flex-1 space-y-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            {/* 姓氏起源卡片 */}
            <div className="paper-background rounded-xl p-8 shadow-lg">
              <h2 className="text-2xl font-bold chinese-font text-[#8B4513] mb-6">
                姓氏的起源与演变
              </h2>
              <p className="text-lg leading-relaxed text-[#8B4513]/90 mb-6">
                中国的姓氏文化源远流长，最早可追溯至上古时期。最初，姓与氏是有区别的：姓代表血缘关系，
                而氏则表示社会地位或居住地域。
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {surnameData.map((surname, index) => (
                  <motion.div
                    key={surname.surname}
                    className="bg-white/30 backdrop-blur-sm rounded-lg p-6 hover:shadow-lg transition-all duration-300"
                    whileHover={{ scale: 1.02 }}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    <h3 className="text-2xl font-bold text-[#8B4513] mb-2">
                      {surname.surname}
                    </h3>
                    <p className="text-[#8B4513]/80 font-medium mb-2">
                      {surname.origin}
                    </p>
                    <p className="text-[#8B4513]/70">{surname.history}</p>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* 地域分布卡片 */}
            <div className="paper-background rounded-xl p-8 shadow-lg">
              <h2 className="text-2xl font-bold chinese-font text-[#8B4513] mb-6">
                百家姓与地域分布
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white/30 backdrop-blur-sm rounded-lg p-6">
                  <h3 className="text-xl font-semibold text-[#8B4513] mb-3">
                    姓氏排名
                  </h3>
                  <p className="text-[#8B4513]/80">
                    目前中国最常见的姓氏依次为：李、王、张、刘、陈等。这些姓氏的分布和迁移体现了中国
                    历史上的人口流动和文化交融。
                  </p>
                </div>
                <div className="bg-white/30 backdrop-blur-sm rounded-lg p-6">
                  <h3 className="text-xl font-semibold text-[#8B4513] mb-3">
                    地域特色
                  </h3>
                  <p className="text-[#8B4513]/80">
                    南方地区多见的姓氏与北方有所不同，这与历史上的移民潮、地理环境和文化传统密切相关。
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* 右侧快速导航栏 */}
          <motion.div
            className="hidden lg:block w-64 sticky top-24 h-fit"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="paper-background rounded-xl p-6 shadow-lg">
              <h3 className="text-lg font-bold text-[#8B4513] mb-4">
                快速导航
              </h3>
              <ul className="space-y-3">
                <li>
                  <a
                    href="#"
                    className="block text-[#8B4513]/80 hover:text-[#8B4513] hover:bg-white/30 rounded-lg px-4 py-2 transition-all duration-300"
                  >
                    姓氏起源
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="block text-[#8B4513]/80 hover:text-[#8B4513] hover:bg-white/30 rounded-lg px-4 py-2 transition-all duration-300"
                  >
                    地域分布
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="block text-[#8B4513]/80 hover:text-[#8B4513] hover:bg-white/30 rounded-lg px-4 py-2 transition-all duration-300"
                  >
                    姓氏文化
                  </a>
                </li>
              </ul>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
