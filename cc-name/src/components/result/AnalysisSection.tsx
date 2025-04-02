"use client";

import type { NameGenerationResponse } from "@/services/api";

interface AnalysisSectionProps {
  analysis: NameGenerationResponse["analysis"];
}

export default function AnalysisSection({ analysis }: AnalysisSectionProps) {
  return (
    <section className="mb-12 bg-white/80 backdrop-blur-sm rounded-lg p-8 shadow-lg">
      <h2 className="text-xl font-bold mb-8 text-center">命理分析</h2>

      <div className="space-y-6">
        <div className="border-l-4 border-black pl-4">
          <h3 className="text-lg font-semibold mb-2">性格特征</h3>
          <ul className="list-disc list-inside space-y-2">
            {analysis.personality.map((trait, index) => (
              <li key={index} className="text-gray-700">
                {trait}
              </li>
            ))}
          </ul>
        </div>

        <div className="border-l-4 border-black pl-4">
          <h3 className="text-lg font-semibold mb-2">命运走向</h3>
          <p className="text-gray-700">{analysis.destiny}</p>
        </div>

        <div className="border-l-4 border-black pl-4">
          <h3 className="text-lg font-semibold mb-2">事业发展</h3>
          <ul className="list-disc list-inside space-y-2">
            {analysis.career.map((item, index) => (
              <li key={index} className="text-gray-700">
                {item}
              </li>
            ))}
          </ul>
        </div>

        <div className="border-l-4 border-black pl-4">
          <h3 className="text-lg font-semibold mb-2">人际关系</h3>
          <ul className="list-disc list-inside space-y-2">
            {analysis.relationships.map((item, index) => (
              <li key={index} className="text-gray-700">
                {item}
              </li>
            ))}
          </ul>
        </div>

        <div className="border-l-4 border-black pl-4">
          <h3 className="text-lg font-semibold mb-2">易经解读</h3>
          <p className="text-gray-700">{analysis.iChing}</p>
        </div>

        <div className="border-l-4 border-black pl-4">
          <h3 className="text-lg font-semibold mb-2">数理分析</h3>
          <p className="text-gray-700">{analysis.numerologyAnalysis}</p>
        </div>
      </div>
    </section>
  );
}
