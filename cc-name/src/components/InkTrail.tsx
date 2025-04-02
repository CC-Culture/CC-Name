"use client";

import { useEffect, useState, useCallback } from "react";
import Image from "next/image";

interface InkDrop {
  id: number;
  x: number;
  y: number;
  rotation: number;
  scale: number;
  opacity: number;
  initialOpacity: number;
  timestamp: number;
}

export default function InkTrail() {
  const [inkDrops, setInkDrops] = useState<InkDrop[]>([]);
  const [lastPosition, setLastPosition] = useState({ x: 0, y: 0, time: 0 });
  const [isDrawing, setIsDrawing] = useState(false);

  const calculateSpeed = useCallback(
    (dx: number, dy: number, timeDiff: number) => {
      const distance = Math.sqrt(dx * dx + dy * dy);
      return distance / Math.max(timeDiff, 1);
    },
    []
  );

  const createInkDrop = useCallback(
    (x: number, y: number, speed: number, angle: number) => {
      const currentTime = Date.now();
      const baseScale = 0.6;
      const speedFactor = Math.min(speed / 10, 1);
      const scale = baseScale + speedFactor * 0.4;
      const baseOpacity = 0.3;
      const opacity = Math.min(baseOpacity + speedFactor * 0.4, 0.7);

      return {
        id: currentTime,
        x,
        y,
        rotation: angle,
        scale,
        opacity,
        initialOpacity: opacity,
        timestamp: currentTime,
      };
    },
    []
  );

  useEffect(() => {
    const minTimeBetweenDrops = 12;
    let animationFrameId: number;
    let lastDropTime = 0;

    const handleMouseMove = (e: MouseEvent) => {
      if (!isDrawing) return;

      const currentTime = Date.now();
      const timeDiff = currentTime - lastPosition.time;

      if (timeDiff >= minTimeBetweenDrops) {
        const dx = e.clientX - lastPosition.x;
        const dy = e.clientY - lastPosition.y;
        const speed = calculateSpeed(dx, dy, timeDiff);
        const angle = Math.atan2(dy, dx) * (180 / Math.PI);

        const newDrop = createInkDrop(e.clientX, e.clientY, speed, angle);
        setInkDrops((prev) => [...prev, newDrop]);
        setLastPosition({ x: e.clientX, y: e.clientY, time: currentTime });
        lastDropTime = currentTime;
      }
    };

    const handleMouseDown = () => setIsDrawing(true);
    const handleMouseUp = () => setIsDrawing(false);

    const animate = () => {
      setInkDrops((prev) =>
        prev
          .filter((drop) => {
            const age = Date.now() - drop.timestamp;
            const maxAge = 800;
            return age < maxAge;
          })
          .map((drop) => {
            const age = Date.now() - drop.timestamp;
            const maxAge = 800;
            const fadeOutStart = maxAge * 0.6;

            if (age > fadeOutStart) {
              const fadeProgress =
                (age - fadeOutStart) / (maxAge - fadeOutStart);
              return {
                ...drop,
                opacity: drop.initialOpacity * (1 - fadeProgress),
              };
            }
            return drop;
          })
      );

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [lastPosition, isDrawing, calculateSpeed, createInkDrop]);

  return (
    <>
      {inkDrops.map((drop) => (
        <div
          key={drop.id}
          className="ink-trail"
          style={{
            position: "fixed",
            left: drop.x - 12,
            top: drop.y - 12,
            transform: `rotate(${drop.rotation}deg) scale(${drop.scale})`,
            opacity: drop.opacity,
            transition: "opacity 0.1s ease-out",
            pointerEvents: "none",
          }}
        >
          <Image
            src="/ink-drop.svg"
            alt=""
            width={24}
            height={24}
            priority
            style={{ filter: "blur(0.5px)" }}
          />
        </div>
      ))}
    </>
  );
}
