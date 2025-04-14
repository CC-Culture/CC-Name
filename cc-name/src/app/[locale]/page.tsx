"use client";

import { motion } from "framer-motion";
import Introduction from "@/components/home/Introduction";
import BirthdateForm from "@/components/home/BirthdateForm";
import Script from "next/script";

// 结构化数据
const structuredData = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "CC Name - Chinese Name Generator",
  description:
    "AI-powered Chinese name generator based on ancient Chinese culture and wisdom",
  applicationCategory: "Name Generator",
  operatingSystem: "Web",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "USD",
  },
};

// Client组件不应该处理Promise params
export default function Home() {
  return (
    <>
      <Script
        id="structured-data"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <main className="min-h-screen">
        <div className="container mx-auto px-4 py-12 flex flex-col items-center">
          <motion.article
            className="paper-background rounded-2xl p-8 md:p-10 w-full max-w-4xl shadow-xl mb-12 scroll-reveal backdrop-blur-sm"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <Introduction />
          </motion.article>

          <section
            aria-label="Name Generation Form"
            className="w-full max-w-4xl"
          >
            <BirthdateForm />
          </section>
        </div>
      </main>
    </>
  );
}
