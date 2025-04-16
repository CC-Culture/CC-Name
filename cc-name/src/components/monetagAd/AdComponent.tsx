"use client";

import React, { useEffect, useState } from "react";

interface AdComponentProps {
  className?: string;
}

const AdComponent: React.FC<AdComponentProps> = ({ className = "" }) => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // 检测是否为移动设备（屏幕宽度小于等于768px）
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    // 初始检测
    checkIfMobile();

    // 监听窗口大小变化
    window.addEventListener("resize", checkIfMobile);

    // 清理监听器
    return () => {
      window.removeEventListener("resize", checkIfMobile);
    };
  }, [isMobile]);

  useEffect(() => {
    // 只在非移动设备上加载广告脚本
    if (!isMobile) {
      const script = document.createElement("script");
      script.async = true;
      script.src = "https://eechicha.com/act/files/tag.min.js?z=9219011";
      document.body.appendChild(script);

      return () => {
        document.body.removeChild(script);
      };
    }
  });

  return null;
};

export default AdComponent;
