"use client";

import { motion } from "framer-motion";

export default function About() {
  return (
    <div className="min-h-screen xuan-paper-bg">
      <div className="container mx-auto px-4 py-12">
        <motion.div
          className="paper-background rounded-2xl p-12 w-full max-w-3xl mx-auto shadow-lg xuan-paper-bg relative overflow-hidden"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          {/* 装饰性边框 */}
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#8B4513]/20 to-transparent" />
          <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#8B4513]/20 to-transparent" />
          <div className="absolute left-0 top-0 h-full w-1 bg-gradient-to-b from-transparent via-[#8B4513]/20 to-transparent" />
          <div className="absolute right-0 top-0 h-full w-1 bg-gradient-to-b from-transparent via-[#8B4513]/20 to-transparent" />

          <h1 className="text-3xl font-bold chinese-font bg-gradient-to-r from-[var(--dunhuang-primary)] to-[var(--dunhuang-secondary)] bg-clip-text text-transparent mb-8 text-center">
            关于我们
          </h1>

          <div className="space-y-6 text-[#8B4513] chinese-font">
            <p className="text-lg leading-relaxed">
              我们是一个致力于传承中国传统文化的团队，专注于为新生儿提供富有文化底蕴的姓名推荐服务。
            </p>

            <p className="text-lg leading-relaxed">
              通过结合传统命理学和现代数据分析，我们为每个家庭提供独特而富有意义的名字选择。
            </p>

            <h2 className="text-2xl font-semibold mt-8 mb-4">我们的理念</h2>

            <ul className="list-disc list-inside space-y-4 pl-4">
              <li>尊重传统，传承文化</li>
              <li>科学分析，精准推荐</li>
              <li>专业服务，用心对待</li>
            </ul>

            <h2 className="text-2xl font-semibold mt-8 mb-4">我们的优势</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-6 rounded-lg bg-white/30 backdrop-blur-sm">
                <h3 className="text-xl font-semibold mb-3">专业团队</h3>
                <p>拥有多年命名经验的专业团队，深谙传统文化精髓</p>
              </div>

              <div className="p-6 rounded-lg bg-white/30 backdrop-blur-sm">
                <h3 className="text-xl font-semibold mb-3">科学方法</h3>
                <p>结合传统文化与现代分析方法，为您提供最佳建议</p>
              </div>
            </div>

            <div className="mt-16 border-t border-[#8B4513]/20 pt-8">
              <div className="text-center mb-8">
                <p className="text-lg leading-relaxed">
                  如果您有任何问题或建议，欢迎随时与我们联系
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div className="p-6 rounded-lg bg-white/30 backdrop-blur-sm">
                  <h3 className="text-xl font-semibold mb-3">电子邮件</h3>
                  <p>comochris_2020@163.com</p>
                </div>

                <div className="p-6 rounded-lg bg-white/30 backdrop-blur-sm">
                  <h3 className="text-xl font-semibold mb-3">微信公众号</h3>
                  <p>CCName命名</p>
                </div>
              </div>
              {/* 
              <form className="space-y-6">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-lg font-medium mb-2"
                  >
                    您的姓名
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    className="w-full p-3 rounded-lg bg-white/50 backdrop-blur-sm border border-[#8B4513]/20 focus:outline-none focus:border-[#8B4513]"
                  />
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="block text-lg font-medium mb-2"
                  >
                    电子邮件
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    className="w-full p-3 rounded-lg bg-white/50 backdrop-blur-sm border border-[#8B4513]/20 focus:outline-none focus:border-[#8B4513]"
                  />
                </div>

                <div>
                  <label
                    htmlFor="message"
                    className="block text-lg font-medium mb-2"
                  >
                    留言内容
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={4}
                    className="w-full p-3 rounded-lg bg-white/50 backdrop-blur-sm border border-[#8B4513]/20 focus:outline-none focus:border-[#8B4513]"
                  />
                </div>

                <div className="text-center">
                  <button
                    type="submit"
                    className="px-8 py-3 bg-gradient-to-r from-[var(--dunhuang-primary)] to-[var(--dunhuang-secondary)] text-white rounded-lg hover:opacity-90 transition-opacity"
                  >
                    发送留言
                  </button>
                </div>
              </form> */}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
