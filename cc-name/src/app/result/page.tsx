"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import Link from "next/link";
import ElementCircle from "@/components/ElementCircle";
import { generateName, NameGenerationResponse } from "@/services/api";

export default function ResultPage() {
  const searchParams = useSearchParams();
  const name = searchParams.get("name");
  const birthdate = searchParams.get("birthdate");

  const [result, setResult] = useState<NameGenerationResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [seasonTheme, setSeasonTheme] = useState("");

  // 节气时序感知系统 - 根据当前日期确定季节主题
  useEffect(() => {
    const determineSeasonTheme = () => {
      const now = new Date();
      const month = now.getMonth() + 1; // 月份从0开始，所以+1

      // 根据月份确定季节
      if (month >= 3 && month <= 5) {
        // 春季：3-5月
        setSeasonTheme("spring-theme");
      } else if (month >= 6 && month <= 8) {
        // 夏季：6-8月
        setSeasonTheme("summer-theme");
      } else if (month >= 9 && month <= 11) {
        // 秋季：9-11月
        setSeasonTheme("autumn-theme");
      } else {
        // 冬季：12-2月
        setSeasonTheme("winter-theme");
      }
    };

    determineSeasonTheme();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      if (!name || !birthdate) {
        setError("缺少必要的参数");
        setLoading(false);
        return;
      }

      try {
        const data = await generateName({ name, birthdate });
        setResult(data);
      } catch (err) {
        setError("生成姓名时出错，请重试");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [name, birthdate]);

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-12 flex flex-col items-center justify-center min-h-[60vh]">
        <div className="paper-background rounded-lg p-8 w-full max-w-2xl shadow-lg text-center">
          <h2 className="text-2xl font-bold mb-4">正在分析命理...</h2>
          <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-blue-600"
              initial={{ width: 0 }}
              animate={{ width: "100%" }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-12 flex flex-col items-center justify-center min-h-[60vh]">
        <div className="paper-background rounded-lg p-8 w-full max-w-2xl shadow-lg text-center">
          <h2 className="text-2xl font-bold mb-4">出错了</h2>
          <p className="mb-6">{error}</p>
          <Link
            href="/"
            className="ink-button py-2 px-6 rounded-md bg-blue-600 text-white hover:bg-blue-700 transition-colors"
          >
            返回首页
          </Link>
        </div>
      </div>
    );
  }

  if (!result) {
    return null;
  }

  return (
    <div className={`container mx-auto px-4 py-12 ${seasonTheme}`}>
      {/* 内容1 - 卷轴式标题 */}
      <motion.div
        className="paper-background rounded-lg p-8 w-full max-w-4xl mx-auto shadow-lg mb-12 scroll-reveal"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h1 className="text-3xl md:text-4xl font-bold mb-6 text-center chinese-font">
          命理分析结果
        </h1>
        <div className="prose max-w-none mb-8">
          <p className="text-lg text-center">
            基于<span className="chinese-font">{birthdate}</span>
            进行的五行分析和姓名推荐
          </p>
        </div>
      </motion.div>

      {/* 内容2 - 结果展示 */}
      <div className="w-full max-w-4xl mx-auto">
        {/* Section 1 - 五行元素 */}
        <motion.section
          className="paper-background rounded-lg p-8 shadow-lg mb-8 cabinet-display"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <h2 className="text-2xl font-bold mb-6 text-center chinese-font">
            五行分析
          </h2>
          <div className="elements-row">
            <ElementCircle
              element="金"
              value={result.elements.gold.value}
              color="var(--gold-accent)"
              description={result.elements.gold.description}
            />
            <ElementCircle
              element="木"
              value={result.elements.wood.value}
              color="#2e8b57"
              description={result.elements.wood.description}
            />
            <ElementCircle
              element="水"
              value={result.elements.water.value}
              color="var(--blue-porcelain)"
              description={result.elements.water.description}
            />
            <ElementCircle
              element="火"
              value={result.elements.fire.value}
              color="var(--red-cinnabar)"
              description={result.elements.fire.description}
            />
            <ElementCircle
              element="土"
              value={result.elements.earth.value}
              color="#8b4513"
              description={result.elements.earth.description}
            />
          </div>
        </motion.section>

        {/* Section 2 - 命理分析 - 竹简效果 */}
        <motion.section
          className="paper-background rounded-lg p-8 shadow-lg mb-8 bamboo-slip"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <h2 className="text-2xl font-bold mb-6 text-center chinese-font">
            命理分析
          </h2>
          <div className="prose max-w-none rubbing-effect">
            <p className="text-lg">{result.analysis}</p>
          </div>
        </motion.section>

        {/* Section 3 - 姓名推荐 - 多宝阁效果 */}
        <motion.section
          className="paper-background rounded-lg p-8 shadow-lg mb-8 cabinet-display"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <h2 className="text-2xl font-bold mb-6 text-center chinese-font">
            姓名推荐
          </h2>
          <div className="space-y-8 scroll-reveal">
            {result.recommendations.map((rec, index) => (
              <div
                key={index}
                className="border-b border-gray-200 pb-6 last:border-0"
              >
                <h3 className="text-xl font-bold mb-2 chinese-font">
                  {name ? name : ""}
                  {rec.name}
                </h3>
                <div className="mb-4 rubbing-effect p-3">
                  <h4 className="font-semibold mb-1 chinese-font">出处</h4>
                  <p className="text-gray-700">{rec.source}</p>
                </div>
                <div className="p-3">
                  <h4 className="font-semibold mb-1 chinese-font">解释</h4>
                  <p className="text-gray-700">{rec.explanation}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.section>

        <div className="text-center mt-8 mb-12">
          <Link
            href="/"
            className="ink-button py-3 px-8 rounded-md bg-blue-600 text-white hover:bg-blue-700 transition-colors inline-block chinese-font"
          >
            返回首页
          </Link>
        </div>
      </div>
    </div>
  );
}
