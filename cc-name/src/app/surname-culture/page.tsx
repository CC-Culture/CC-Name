"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export default function SurnameCulture() {
  return (
    <div className="min-h-screen xuan-paper-bg pt-24">
      <div className="container mx-auto px-4 py-12">
        <motion.div
          className="paper-background rounded-lg p-8 w-full max-w-4xl mx-auto shadow-lg mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-4xl font-bold chinese-font bg-gradient-to-r from-[var(--dunhuang-primary)] to-[var(--dunhuang-secondary)] bg-clip-text text-transparent mb-8 text-center">
            中国姓氏文化
          </h1>

          <div className="space-y-8 text-[#8B4513] chinese-font">
            <section className="mb-12">
              <h2 className="text-2xl font-semibold mb-4">姓氏的起源与演变</h2>
              <p className="text-lg leading-relaxed mb-4">
                中国的姓氏文化源远流长，最早可追溯至上古时期。最初，姓与氏是有区别的：姓代表血缘关系，
                而氏则表示社会地位或居住地域。随着社会的发展，姓氏逐渐合二为一。
              </p>
              <div className="p-6 bg-white/30 backdrop-blur-sm rounded-lg">
                <h3 className="text-xl font-semibold mb-3">姓氏的发展阶段</h3>
                <ul className="list-disc list-inside space-y-2">
                  <li>上古时期：以女性为本的姓氏文化</li>
                  <li>春秋战国：姓氏单字化</li>
                  <li>秦汉时期：复姓的产生与发展</li>
                  <li>魏晋南北朝：姓氏大规模迁移</li>
                  <li>唐宋以后：姓氏的稳定发展</li>
                </ul>
              </div>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-semibold mb-4">百家姓与地域分布</h2>
              <p className="text-lg leading-relaxed mb-4">
                《百家姓》成书于北宋时期，按"赵钱孙李"顺序收录了当时最常见的姓氏。不同地域的姓氏分布
                具有其独特的历史渊源和文化特点。
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="p-6 bg-white/30 backdrop-blur-sm rounded-lg">
                  <h3 className="text-xl font-semibold mb-3">姓氏排名</h3>
                  <p className="leading-relaxed">
                    目前中国最常见的姓氏依次为：李、王、张、刘、陈等。这些姓氏的分布和迁移体现了中国
                    历史上的人口流动和文化交融。
                  </p>
                </div>
                <div className="p-6 bg-white/30 backdrop-blur-sm rounded-lg">
                  <h3 className="text-xl font-semibold mb-3">地域特色</h3>
                  <p className="leading-relaxed">
                    南方地区多见的姓氏与北方有所不同，这与历史上的移民潮、地理环境和文化传统密切相关。
                  </p>
                </div>
              </div>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-semibold mb-4">姓氏文化研究</h2>
              <div className="p-6 bg-white/30 backdrop-blur-sm rounded-lg">
                <h3 className="text-xl font-semibold mb-3">现代意义</h3>
                <p className="leading-relaxed">
                  姓氏研究不仅能帮助我们了解家族历史，还能揭示人口迁移规律、文化交流等重要历史信息。
                  通过姓氏文化研究，我们可以更好地理解中华民族的形成和发展过程。
                </p>
              </div>
            </section>

            <div className="mt-8 text-center">
              <a
                href="https://zh.wikipedia.org/wiki/百家姓"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center text-[var(--dunhuang-primary)] hover:text-[var(--dunhuang-secondary)] transition-colors"
              >
                <span>了解更多百家姓历史</span>
                <svg
                  className="w-4 h-4 ml-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                  />
                </svg>
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
