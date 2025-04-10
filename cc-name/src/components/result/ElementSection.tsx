"use client";

import { useTranslations } from "next-intl";

interface ElementSectionProps {
  elements: {
    metal: number;
    wood: number;
    water: number;
    fire: number;
    earth: number;
  };
  reasoning?: string;
  reasoningElements?: string[];
}

const elementChar = {
  metal: "金",
  wood: "木",
  water: "水",
  fire: "火",
  earth: "土",
};

const ElementCircle = ({
  element,
  value,
  elementNames,
}: {
  element: string;
  value: number;
  elementNames: Record<string, string>;
}) => {
  const radius = 40;
  const circumference = 2 * Math.PI * radius;
  const progress = value * circumference;
  const dashOffset = circumference - progress;

  const elementColors = {
    metal: "stroke-amber-500",
    wood: "stroke-green-500",
    water: "stroke-blue-500",
    fire: "stroke-red-500",
    earth: "stroke-yellow-700",
  };

  return (
    <div className="flex flex-col items-center gap-2">
      <div className="relative w-24 h-24 flex items-center justify-center">
        <svg className="w-full h-full transform -rotate-90">
          <circle
            cx="48"
            cy="48"
            r={radius}
            className="fill-none stroke-gray-200"
            strokeWidth="4"
          />
          <circle
            cx="48"
            cy="48"
            r={radius}
            className={`fill-none ${
              elementColors[element as keyof typeof elementColors]
            } transition-all duration-1000 ease-in-out`}
            strokeWidth="8"
            strokeDasharray={circumference}
            strokeDashoffset={dashOffset}
            strokeLinecap="round"
          />
        </svg>
        <span className="absolute text-3xl font-bold font-xingshu">
          {elementChar[element as keyof typeof elementChar]}
        </span>
      </div>
      <span className="text-gray-600">{elementNames[element]}</span>
    </div>
  );
};

export default function ElementSection({
  elements,
  reasoning,
}: ElementSectionProps) {
  const t = useTranslations("result");

  // Create element names from translations
  const elementNames = {
    metal: t("elements.metal"),
    wood: t("elements.wood"),
    water: t("elements.water"),
    fire: t("elements.fire"),
    earth: t("elements.earth"),
  };

  return (
    <section>
      <h2 className="text-2xl font-bold mb-8 text-center">
        {t("five_elements")}
      </h2>
      <div className="flex justify-center items-center flex-wrap gap-8 mb-8">
        {Object.entries(elements).map(([element, value]) => (
          <ElementCircle
            key={element}
            element={element}
            value={value}
            elementNames={elementNames}
          />
        ))}
      </div>
      {reasoning && (
        <div className="border-t border-gray-200 pt-8">
          <h4 className="text-xl font-semibold mb-2">{t("name_analysis")}</h4>
          <div className="space-y-2">
            <p className="text-gray-700">{reasoning}</p>
          </div>
        </div>
      )}
    </section>
  );
}
