"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import type { NameGenerationResponse } from "@/services/api";

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
    return (
      <div className="min-h-screen bg-[#F5F5DC] bg-opacity-90 flex items-center justify-center">
        <div className="text-red-600 text-xl">{error}</div>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="min-h-screen bg-[#F5F5DC] bg-opacity-90 flex items-center justify-center">
        <div className="text-xl">加载中...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F5F5DC] bg-opacity-90 py-12">
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

          {/* 名字部分 */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold mb-4 chinese-font text-[var(--dunhuang-primary)]">
              {data.name.fullName}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-xl font-semibold mb-2 chinese-font">
                  名字含义
                </h3>
                <p className="text-lg">{data.name.meaning}</p>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2 chinese-font">
                  五行属性
                </h3>
                <div className="flex flex-wrap gap-2">
                  {data.name.elements.map((element, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-gray-100 rounded-full text-sm"
                    >
                      {element}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* 分析部分 */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-6 chinese-font text-[var(--dunhuang-primary)]">
              命理分析
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-semibold mb-3 chinese-font">
                  性格特点
                </h3>
                <ul className="list-disc list-inside space-y-2">
                  {data.analysis.personality.map((trait, index) => (
                    <li key={index}>{trait}</li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-3 chinese-font">
                  命运分析
                </h3>
                <p className="text-lg">{data.analysis.destiny}</p>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-3 chinese-font">
                  适合职业
                </h3>
                <ul className="list-disc list-inside space-y-2">
                  {data.analysis.career.map((career, index) => (
                    <li key={index}>{career}</li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-3 chinese-font">
                  人际关系建议
                </h3>
                <ul className="list-disc list-inside space-y-2">
                  {data.analysis.relationships.map((advice, index) => (
                    <li key={index}>{advice}</li>
                  ))}
                </ul>
              </div>
            </div>
          </section>

          {/* 诗词部分 */}
          <section>
            <h2 className="text-2xl font-bold mb-6 chinese-font text-[var(--dunhuang-primary)]">
              相关诗词
            </h2>
            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-3 chinese-font">
                {data.poetry.title}
              </h3>
              <p className="text-lg mb-4">{data.poetry.content}</p>
              <p className="text-gray-600">{data.poetry.meaning}</p>
            </div>
          </section>
        </motion.div>
      </div>
    </div>
  );
}
