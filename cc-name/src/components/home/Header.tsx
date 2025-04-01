import Image from "next/image";

export default function Header() {
  return (
    <div className="flex items-center justify-center mb-6">
      <h1 className="text-3xl md:text-4xl font-bold text-center chinese-font text-[var(--dunhuang-primary)]">
        CC Name
      </h1>
    </div>
  );
}
