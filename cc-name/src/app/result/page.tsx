"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import type { NameGenerationResponse } from "@/services/api";
import LoadingState from "@/components/result/LoadingState";
import ErrorState from "@/components/result/ErrorState";
import NameSection from "@/components/result/NameSection";
import ElementSection from "@/components/result/ElementSection";

export default function ResultPage() {
  const searchParams = useSearchParams();
  const [data, setData] = useState<NameGenerationResponse | null>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    try {
      const encodedData = searchParams.get("data");
      if (encodedData) {
        const decodedData = JSON.parse(decodeURIComponent(encodedData));
        setData(decodedData);
      } else {
        setError("未找到数据");
      }
    } catch {
      setError("数据解析错误");
    }
  }, [searchParams]);

  if (error) {
    return <ErrorState message={error} />;
  }

  if (!data) {
    return <LoadingState />;
  }

  return (
    <div className="min-h-screen xuan-paper-bg bg-opacity-90 py-12">
      <div className="container mx-auto px-4">
        <motion.div
          className="paper-background rounded-lg p-8 w-full max-w-4xl mx-auto shadow-lg xuan-paper-bg"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-4xl font-bold text-center mb-8 chinese-font text-[var(--dunhuang-primary)]">
            您的名字分析
          </h1>
          <ElementSection
            elements={data.elements}
            reasoning={data.name.reasoning}
            reasoningElements={data.name.elements}
          />
          <NameSection name={data.name} poetry={data.poetry} />
        </motion.div>
      </div>
    </div>
  );
}
