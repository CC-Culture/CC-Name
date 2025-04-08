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
      if (!encodedData) {
        setError("未找到数据参数");
        return;
      }

      let decodedString;
      try {
        decodedString = decodeURIComponent(encodedData);
      } catch {
        setError("URL解码失败：数据格式不正确");
        return;
      }

      try {
        const decodedData = JSON.parse(decodedString);
        setData(decodedData);
      } catch (e) {
        setError("JSON解析失败：数据格式不正确");
      }
    } catch (e) {
      setError("数据处理过程中发生错误");
      console.error("数据处理错误:", e);
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
          />
          <NameSection name={data.name} poetry={data.poetry} />
        </motion.div>
      </div>
    </div>
  );
}
