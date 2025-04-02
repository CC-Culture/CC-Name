"use client";

import { motion } from "framer-motion";
import Introduction from "@/components/home/Introduction";
import BirthdateForm from "@/components/home/BirthdateForm";

export default function Home() {
  return (
    <div className="min-h-screen xuan-paper-bg">
      <div className="container mx-auto px-4 py-12 flex flex-col items-center">
        <motion.div
          className="paper-background rounded-lg p-8 w-full max-w-2xl shadow-lg mb-12 scroll-reveal"
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
