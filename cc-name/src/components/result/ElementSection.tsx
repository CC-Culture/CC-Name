"use client";

interface ElementSectionProps {
  elements: {
    金: number;
    木: number;
    水: number;
    火: number;
    土: number;
  };
  reasoning?: string;
  reasoningElements?: string[];
}

const elementDescriptions = {
  金: "Metal",
  木: "Wood",
  水: "Water",
  火: "Fire",
  土: "Earth",
};

const elementColors = {
  金: "stroke-amber-500",
  木: "stroke-green-500",
  水: "stroke-blue-500",
  火: "stroke-red-500",
  土: "stroke-yellow-700",
};

const ElementCircle = ({
  element,
  value,
}: {
  element: string;
  value: number;
}) => {
  const radius = 40;
  const circumference = 2 * Math.PI * radius;
  const progress = (value / 100) * circumference;
  const dashOffset = circumference - progress;

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
            strokeWidth="4"
            strokeDasharray={circumference}
            strokeDashoffset={dashOffset}
            strokeLinecap="round"
          />
        </svg>
        <span className="absolute text-3xl font-bold font-xingshu">
          {element}
        </span>
      </div>
      <span className="text-gray-600">
        {elementDescriptions[element as keyof typeof elementDescriptions]}
      </span>
    </div>
  );
};

export default function ElementSection({
  elements,
  reasoning,
  reasoningElements,
}: ElementSectionProps) {
  return (
    <section className="mb-12 bg-white/80 backdrop-blur-sm rounded-lg p-8 shadow-lg">
      <h2 className="text-2xl font-bold mb-8 text-center">五行分析</h2>
      <div className="flex justify-center items-center flex-wrap gap-8 mb-8">
        {Object.entries(elements).map(([element, value]) => (
          <ElementCircle key={element} element={element} value={value} />
        ))}
      </div>
      {reasoning && (
        <div className="border-t border-gray-200 pt-8">
          <h4 className="text-xl font-semibold mb-2">五行推理</h4>
          <div className="space-y-2">
            <p className="text-gray-700">{reasoning}</p>
            {reasoningElements && reasoningElements.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-2">
                {reasoningElements.map((element, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-black/5 rounded-full text-sm"
                  >
                    {element}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </section>
  );
}
