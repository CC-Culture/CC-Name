"use client";

import { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import type { NameGenerationResponse } from "@/services/api";
import LoadingState from "@/components/result/LoadingState";
import ErrorState from "@/components/result/ErrorState";
import NameSection from "@/components/result/NameSection";
import ElementSection from "@/components/result/ElementSection";
import { useTranslations } from "next-intl";

function ResultContent() {
  const searchParams = useSearchParams();
  const [data, setData] = useState<NameGenerationResponse | null>(null);
  const [error, setError] = useState("");
  const t = useTranslations("result");
  const commonT = useTranslations("common");

  useEffect(() => {
    try {
      const encodedData = searchParams.get("data");
      if (!encodedData) {
        setError(commonT("data_not_found"));
        return;
      }

      let decodedString;
      try {
        decodedString = decodeURIComponent(encodedData);
      } catch {
        setError(commonT("url_decode_error"));
        return;
      }

      try {
        const decodedData = JSON.parse(decodedString);
        setData(decodedData);
      } catch (e) {
        setError(commonT("json_parse_error"));
      }
    } catch (e) {
      setError(commonT("data_processing_error"));
      console.error("Data processing error:", e);
    }
  }, [searchParams, commonT]);

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
            {t("title")}
          </h1>
          <ElementSection
            elements={data.elements}
            reasoning={data.translation.name.reasoning}
          />
          <NameSection
            chineseName={data.name}
            name={data.translation.name}
            poetry={data.translation.poetry}
          />

          <div className="mt-10 flex justify-center space-x-4">
            <button
              onClick={() => window.history.back()}
              className="px-6 py-2 bg-[var(--dunhuang-primary)] text-white rounded-md hover:bg-[var(--dunhuang-secondary)] transition-colors"
            >
              {t("back_to_home")}
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export default function ResultPage() {
  return (
    <Suspense fallback={<LoadingState />}>
      <ResultContent />
    </Suspense>
  );
}
