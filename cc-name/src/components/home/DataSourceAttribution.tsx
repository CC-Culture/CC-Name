"use client";

import React from "react";
import { useTranslations } from "next-intl";

const DataSourceAttribution: React.FC = () => {
  const t = useTranslations("common");

  return (
    <div className="text-center text-sm text-gray-600 mt-6 mb-2">
      <p>
        {t("data_source_description")}
        <a
          href="https://www.hko.gov.hk/tc/gts/time/conversion1_text.htm"
          target="_blank"
          rel="noopener noreferrer"
          className="text-[var(--dunhuang-primary)] hover:text-[var(--dunhuang-secondary)] transition-colors"
        >
          {t("hko_calendar_conversion")}
        </a>
      </p>
    </div>
  );
};

export default DataSourceAttribution;
