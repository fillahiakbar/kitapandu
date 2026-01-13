"use client";

import clsx from "clsx";

type TabValue = "current" | "next" | "upcoming";

type Props = {
  value: TabValue;
  onChange: (value: TabValue) => void;
};

const tabs: { label: string; value: TabValue }[] = [
  { label: "Bulan Ini", value: "current" },
  { label: "Bulan Depan", value: "next" },
  { label: "Upcoming", value: "upcoming" },
];

export default function ProgramFilter({ value, onChange }: Props) {
  return (
    <div className="flex gap-4">
      {tabs.map((tab) => (
        <button
          key={tab.value}
          onClick={() => onChange(tab.value)}
          className={clsx(
            "rounded-md px-5 py-2 text-sm font-semibold transition-colors duration-200 cursor-pointer",
            value === tab.value
              ? "bg-blue-600 text-white"
              : "border border-gray-300 text-gray-600 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-400"
          )}
          aria-pressed={value === tab.value}
          aria-label={`Filter ${tab.label}`}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
}
