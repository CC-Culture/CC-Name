"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function ZhNotFound() {
  const pathname = usePathname();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <div className="paper-background p-8 md:p-10 w-full max-w-2xl shadow-xl backdrop-blur-sm">
        <h1 className="text-4xl font-bold mb-4 text-center">
          404 - 页面未找到
        </h1>
        <p className="mb-6 text-center">
          您尝试访问的路径不存在：
          <code className="bg-gray-100 px-2 py-1 rounded ml-2">{pathname}</code>
        </p>
        <p className="mb-8 text-center">此页面可能已被移动或删除。</p>

        <div className="text-center">
          <Link
            href="/zh"
            className="inline-block px-6 py-3 bg-[var(--dunhuang-primary)] text-white rounded-lg hover:bg-[var(--dunhuang-secondary)] transition-colors"
          >
            返回首页
          </Link>
        </div>
      </div>
    </div>
  );
}
