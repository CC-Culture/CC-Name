"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

interface InkDrop {
  id: number;
  x: number;
  y: number;
  rotation: number;
  scale: number;
  opacity: number;
}

export default function InkTrail() {
  const [inkDrops, setInkDrops] = useState<InkDrop[]>([]);
  const [lastPosition, setLastPosition] = useState({ x: 0, y: 0 });
  const [speed, setSpeed] = useState(0);

  useEffect(() => {
    let lastTime = 0;
    const minTimeBetweenDrops = 16; // 提高频率到约60fps

    const handleMouseMove = (e: MouseEvent) => {
      const currentTime = Date.now();

      if (currentTime - lastTime > minTimeBetweenDrops) {
        // 计算移动速度和方向
        const dx = e.clientX - lastPosition.x;
        const dy = e.clientY - lastPosition.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        const currentSpeed = distance / (currentTime - lastTime);
        setSpeed(currentSpeed);

        // 计算旋转角度
        const rotation = Math.atan2(dy, dx) * (180 / Math.PI);

        // 根据速度调整大小和透明度
        const scale = Math.min(0.8 + currentSpeed / 15, 1.5); // 减小基础大小和最大大小
        const opacity = Math.min(0.5, 0.2 + currentSpeed / 15); // 降低基础透明度和最大透明度

        const newDrop = {
          id: currentTime,
          x: e.clientX,
          y: e.clientY,
          rotation,
          scale,
          opacity,
        };

        setInkDrops((prev) => [...prev, newDrop]);
        setLastPosition({ x: e.clientX, y: e.clientY });
        lastTime = currentTime;

        // 根据速度调整消失时间
        const duration = Math.max(300, 600 - currentSpeed * 200); // 缩短持续时间
        setTimeout(() => {
          setInkDrops((prev) => prev.filter((drop) => drop.id !== newDrop.id));
        }, duration);
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [lastPosition, speed]);

  return (
    <>
      {inkDrops.map((drop) => (
        <div
          key={drop.id}
          className="ink-trail"
          style={{
            left: drop.x - 12, // 减小偏移量
            top: drop.y - 12, // 减小偏移量
            transform: `rotate(${drop.rotation}deg) scale(${drop.scale})`,
            opacity: drop.opacity,
          }}
        >
          <Image
            src="/ink-drop.svg"
            alt=""
            width={24} // 减小图片大小
            height={24} // 减小图片大小
            priority
          />
        </div>
      ))}
    </>
  );
}
