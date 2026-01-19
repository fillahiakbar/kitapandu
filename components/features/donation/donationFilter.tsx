"use client";

import clsx from "clsx";

type TabValue = "open" | "upcoming" | "selesai";

type Props = {
    value: TabValue;
    onChange: (value: TabValue) => void;
};

const tabs: { label: string; value: TabValue }[] = [
    { label: "Donasi Terbuka", value: "open" },
    { label: "Donasi Selesai", value: "selesai" },
    { label: "Donasi Akan Datang", value: "upcoming" },
];

export default function DonationFilter({ value, onChange }: Props) {
    return (
        <div className="flex flex-col sm:flex-row gap-2 sm:gap-4">
            {tabs.map((tab) => (
                <button
                    key={tab.value}
                    onClick={() => onChange(tab.value)}
                    className={clsx(
                        "whitespace-nowrap rounded-md font-semibold transition-colors duration-200",
                        "px-4 py-2 text-xs sm:px-5 sm:py-2 sm:text-sm",
                        "focus:outline-none focus:ring-2 focus:ring-blue-400",
                        value === tab.value
                            ? "bg-blue-600 text-white"
                            : "border border-gray-300 text-gray-600 hover:bg-gray-100"
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