"use client";

import { useTranslations } from "next-intl";

interface ErrorStateProps {
  message?: string;
}

export default function ErrorState({ message }: ErrorStateProps) {
  const t = useTranslations("result");
  const commonT = useTranslations("common");

  return (
    <div className="text-center p-8">
      <p className="text-red-500 mb-4">{message || commonT("general_error")}</p>
      <button
        onClick={() => window.history.back()}
        className="px-4 py-2 bg-[var(--dunhuang-primary)] text-white rounded"
      >
        {t("back_to_home")}
      </button>
    </div>
  );
}
