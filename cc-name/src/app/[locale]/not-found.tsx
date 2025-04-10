"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTranslations } from "next-intl";

export default function LocaleNotFound() {
  const pathname = usePathname();
  const t = useTranslations("common");

  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <div className="paper-background p-8 md:p-10 w-full max-w-2xl shadow-xl backdrop-blur-sm">
        <h1 className="text-4xl font-bold mb-4 text-center">
          404 - {t("not_found")}
        </h1>
        <p className="mb-6 text-center">
          {t("path_not_exists")}:{" "}
          <code className="bg-gray-100 px-2 py-1 rounded">{pathname}</code>
        </p>
        <p className="mb-8 text-center">{t("page_moved")}</p>

        <div className="text-center">
          <Link
            href="/"
            className="inline-block px-6 py-3 bg-[var(--dunhuang-primary)] text-white rounded-lg hover:bg-[var(--dunhuang-secondary)] transition-colors"
          >
            {t("back_home")}
          </Link>
        </div>
      </div>
    </div>
  );
}
