"use client";

import type { NameGenerationResponse } from "@/services/api";

interface NameSectionProps {
  name: NameGenerationResponse["name"] & {
    elements?: string[];
  };
  poetry?: NameGenerationResponse["poetry"];
}

export default function NameSection({ name, poetry }: NameSectionProps) {
  return (
    <section className="mb-12">
      <div className="bg-white/80 backdrop-blur-sm rounded-lg p-8 shadow-lg space-y-6">
        <h2 className="text-xl font-bold mb-8 text-center">姓名推荐</h2>
        <div className="border-l-4 border-black pl-4">
          <h4 className="text-lg font-semibold mb-2">{name.fullName}</h4>
          <div className="text-gray-600">
            <span className="mr-2">{name.firstName}</span>
            <span>{name.lastName}</span>
          </div>
        </div>

        <div className="space-y-6">
          <div className="border-l-4 border-black pl-4">
            <h4 className="text-lg font-semibold mb-2">名字寓意</h4>
            <p className="text-gray-700">{name.meaning}</p>
          </div>

          <div className="border-l-4 border-black pl-4">
            <h4 className="text-lg font-semibold mb-2">数理分析</h4>
            <p className="text-gray-700">
              数理：{name.numerology.number} - {name.numerology.meaning}
            </p>
          </div>

          <div className="border-l-4 border-black pl-4">
            <h4 className="text-lg font-semibold mb-2">诗经典故</h4>
            <p className="text-gray-700">{name.poetryReference}</p>
          </div>

          {poetry && (
            <div className="border-l-4 border-black pl-4">
              <h4 className="text-lg font-semibold mb-2">关联诗词</h4>
              <div className="bg-black/5 p-6 rounded-lg">
                <h5 className="text-lg font-medium mb-2">{poetry.title}</h5>
                <p className="text-gray-700 whitespace-pre-line mb-4">
                  {poetry.content}
                </p>
                <p className="text-gray-600 italic">{poetry.meaning}</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
