"use client";

import { motion } from "framer-motion";
import Introduction from "@/components/home/Introduction";
import BirthdateForm from "@/components/home/BirthdateForm";

// Client组件不应该处理Promise params
export default function Home() {
  return (
    <div className="min-h-screen">
      <div className="container mx-auto px-4 py-12 flex flex-col items-center">
        <motion.div
          className="paper-background rounded-2xl p-8 md:p-10 w-full max-w-4xl shadow-xl mb-12 scroll-reveal backdrop-blur-sm"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <Introduction />
        </motion.div>

        <BirthdateForm />
      </div>
    </div>
  );
}
