"use client";

import type { NameGenerationResponse } from "@/services/api";
import ElementSection from "./ElementSection";
import NameSection from "./NameSection";

interface ResultContentProps {
  result: NameGenerationResponse;
}

export default function ResultContent({ result }: ResultContentProps) {
  return (
    <div className="max-w-4xl mx-auto bg-white/90 backdrop-blur-sm rounded-xl shadow-lg p-6 md:p-8">
      <div className="grid gap-6 md:gap-10">
        <ElementSection
          elements={result.elements}
          reasoning={result.name.reasoning}
        />
        <NameSection name={result.name} poetry={result.poetry} />
      </div>
    </div>
  );
}
