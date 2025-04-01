"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

interface ElementCircleProps {
  element: string;
  value: number;
  color: string;
  description: string;
}

const ElementCircle = ({
  element,
  value,
  color,
  description,
}: ElementCircleProps) => {
  const [progress, setProgress] = useState(0);
  const radius = 40;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  useEffect(() => {
    const timer = setTimeout(() => {
      setProgress(value);
    }, 300);
    return () => clearTimeout(timer);
  }, [value]);

  return (
    <motion.div
      className="element-container flex flex-col items-center p-2 mx-1 transform transition-all duration-500"
      whileHover={{ scale: 1.05, y: -5 }}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="relative w-24 h-24 flex items-center justify-center">
        <svg
          width="100%"
          height="100%"
          viewBox="0 0 100 100"
          className="transform -rotate-90"
        >
          {/* 背景圆 */}
          <defs>
            <pattern
              id="paperPattern"
              patternUnits="userSpaceOnUse"
              width="100"
              height="100"
            >
              <rect width="100" height="100" fill="var(--paper-texture)" />
              <path
                d="M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7z"
                fill="#000"
                fillOpacity="0.03"
              />
            </pattern>
          </defs>
          <circle
            cx="50"
            cy="50"
            r={radius + 2}
            fill="url(#paperPattern)"
            stroke="#d9d9d9"
            strokeWidth="1"
          />
          <circle
            cx="50"
            cy="50"
            r={radius}
            fill="transparent"
            stroke="#e6e6e6"
            strokeWidth="4"
          />
          {/* 进度圆 */}
          <motion.circle
            cx="50"
            cy="50"
            r={radius}
            fill="transparent"
            stroke={color}
            strokeWidth="4"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            className="circle-progress"
            initial={{ strokeDashoffset: circumference }}
            animate={{ strokeDashoffset }}
            transition={{ duration: 1, ease: "easeInOut" }}
          />
        </svg>
        {/* 中心文字 */}
        <motion.div
          className="absolute inset-0 flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.5 }}
        >
          <span className="text-3xl font-bold chinese-font" style={{ color }}>
            {element}
          </span>
        </motion.div>
      </div>
      {/* 描述文字 */}
      <motion.p
        className="mt-2 text-sm text-center max-w-[150px] element-description"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7, duration: 0.5 }}
      >
        {description}
      </motion.p>
      {/* 数值显示 */}
      <motion.div
        className="element-value mt-1 text-xs font-semibold"
        style={{ color }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.9, duration: 0.5 }}
      >
        {value}/100
      </motion.div>
    </motion.div>
  );
};

export default ElementCircle;
