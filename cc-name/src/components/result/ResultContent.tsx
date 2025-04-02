"use client";

import type { NameGenerationResponse } from "@/services/api";
import ElementSection from "./ElementSection";
import AnalysisSection from "./AnalysisSection";
import NameSection from "./NameSection";

interface ResultContentProps {
  result: NameGenerationResponse;
}

export default function ResultContent({ result }: ResultContentProps) {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8 space-y-12">
      <ElementSection
        elements={result.elements}
        reasoning={result.name.reasoning}
        reasoningElements={result.name.elements}
      />
      <AnalysisSection analysis={result.analysis} />
      <NameSection name={result.name} poetry={result.poetry} />
    </div>
  );
}
