"use client";

import type { NameGenerationResponse } from "@/services/api";
import { useTranslations } from "next-intl";

interface NameSectionProps {
  chineseName: NameGenerationResponse["name"];
  name: NameGenerationResponse["translation"]["name"] & {
    elements?: string[];
  };
  poetry?: NameGenerationResponse["translation"]["poetry"];
}

export default function NameSection({
  chineseName,
  name,
  poetry,
}: NameSectionProps) {
  const t = useTranslations("result");

  return (
    <section className="mb-12 mt-12">
      <h2 className="text-xl font-bold mb-8 text-center">
        {t("name_recommendation")}
      </h2>

      <div className="space-y-6">
        <div className="border-l-4 border-black pl-4">
          <h4 className="text-lg font-semibold mb-2">
            {name.elements
              ? chineseName.firstName
              : chineseName.lastName + chineseName.firstName}
          </h4>
          <div className="text-gray-600">
            {name.elements ? (
              <span>{name.firstName}</span>
            ) : (
              <>
                <span className="mr-2">{name.firstName}</span>
                <span>{name.lastName}</span>
              </>
            )}
          </div>
        </div>
        <div className="border-l-4 border-black pl-4">
          <h4 className="text-lg font-semibold mb-2">{t("name_meaning")}</h4>
          <p className="text-gray-700">{name.meaning}</p>
        </div>

        {poetry && (
          <div className="border-l-4 border-black pl-4">
            <h4 className="text-lg font-semibold mb-2">
              {t("poetic_reference")}
            </h4>
            <div className="bg-black/5 p-2 rounded-lg">
              <p className="text-gray-700 whitespace-pre-line mb-4">
                c:{poetry.title}
                <br />
                {poetry.content}
              </p>
            </div>
            <p className="text-gray-700 mt-3">{poetry.meaning}</p>
          </div>
        )}
      </div>
    </section>
  );
}
