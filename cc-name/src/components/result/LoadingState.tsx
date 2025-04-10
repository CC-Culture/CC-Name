"use client";

import { useTranslations } from "next-intl";

export default function LoadingState() {
  const t = useTranslations("form");

  return (
    <div className="flex items-center justify-center py-20">
      <div className="text-center">
        <div className="loader mb-4"></div>
        <p>{t("loading")}</p>
      </div>
    </div>
  );
}
