"use client";

import React, { useEffect, useState } from "react";

interface AdComponentProps {
  className?: string;
}

const localScript = `(function(d,z,s){s.src='https://'+d+'/400/'+z;try{(document.body||document.documentElement).appendChild(s)}catch(e){}})('vemtoutcheeg.com',9219562,document.createElement('script'))`;

const AdComponent2: React.FC<AdComponentProps> = ({ className = "" }) => {
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
  }, []);

  useEffect(() => {
    // 只在非移动设备上加载广告脚本
    if (!isMobile) {
      const script = document.createElement("script");
      script.async = true;
      script.setHTMLUnsafe(localScript);
      document.body.appendChild(script);

      return () => {
        document.body.removeChild(script);
      };
    }
  }, [isMobile]);

  return null;
};

export default AdComponent2;
