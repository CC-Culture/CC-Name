"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useTranslations, useLocale } from "next-intl";

export default function Footer() {
  const t = useTranslations("footer");
  const locale = useLocale();
  const isRtl = locale === "ar";

  return (
    <motion.footer
      className="py-8 px-6 md:px-12 relative z-10"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      <div className="container mx-auto">
        <div
          className={`flex flex-col md:flex-row ${
            isRtl ? "md:flex-row-reverse" : ""
          } justify-between items-center border-t border-[#D4B08C]/30 pt-8`}
        >
          <div className="mb-4 md:mb-0">
            <p className="text-[var(--ink-gray)] text-sm">{t("copyright")}</p>
          </div>
        </div>
      </div>
    </motion.footer>
  );
}
