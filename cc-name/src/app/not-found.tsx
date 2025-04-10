import Link from "next/link";
import { defaultLocale } from "@/i18n/config";

// 404页面根组件
export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <div className="max-w-xl mx-auto p-8 bg-white/80 backdrop-blur-sm rounded-lg shadow-xl">
        <h1 className="text-4xl font-bold mb-6 text-center text-[var(--dunhuang-primary)]">
          404 - 页面未找到
        </h1>
        <p className="text-lg mb-8 text-center text-[var(--dunhuang-secondary)]">
          您尝试访问的页面不存在
        </p>
        <div className="text-center">
          <Link
            className="inline-block px-6 py-3 bg-[var(--dunhuang-primary)] text-white rounded-lg hover:bg-[var(--dunhuang-secondary)] transition-colors"
            href={`/${defaultLocale}`}
          >
            返回首页
          </Link>
        </div>
      </div>
    </div>
  );
}
