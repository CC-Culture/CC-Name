"use client";

import { motion } from "framer-motion";
import FeedbackForm from "@/components/feedback/FeedbackForm";
import { useTranslations } from "next-intl";

export default function About() {
  const t = useTranslations("about");

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
            {t("title")}
          </h1>

          <div className="space-y-6 text-[#8B4513] chinese-font">
            <p className="text-lg leading-relaxed">{t("intro.p1")}</p>

            <p className="text-lg leading-relaxed">{t("intro.p2")}</p>

            <h2 className="text-2xl font-semibold mt-8 mb-4">
              {t("philosophy.title")}
            </h2>

            <ul className="list-disc list-inside space-y-4 pl-4">
              <li>{t("philosophy.item1")}</li>
              <li>{t("philosophy.item2")}</li>
              <li>{t("philosophy.item3")}</li>
            </ul>

            <h2 className="text-2xl font-semibold mt-8 mb-4">
              {t("advantages.title")}
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-6 rounded-lg bg-white/30 backdrop-blur-sm">
                <h3 className="text-xl font-semibold mb-3">
                  {t("advantages.team.title")}
                </h3>
                <p>{t("advantages.team.description")}</p>
              </div>

              <div className="p-6 rounded-lg bg-white/30 backdrop-blur-sm">
                <h3 className="text-xl font-semibold mb-3">
                  {t("advantages.method.title")}
                </h3>
                <p>{t("advantages.method.description")}</p>
              </div>
            </div>

            <div className="mt-16 border-t border-[#8B4513]/20 pt-8">
              <div className="text-center mb-8">
                <p className="text-lg leading-relaxed">{t("contact.intro")}</p>
              </div>

              <div className="mb-8">
                <div className="p-6 rounded-lg bg-white/30 backdrop-blur-sm">
                  <h3 className="text-xl font-semibold mb-3">
                    {t("contact.email.title")}
                  </h3>
                  <p>comochris_2020@163.com</p>
                </div>
              </div>
              <FeedbackForm />
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
