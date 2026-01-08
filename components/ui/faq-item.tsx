"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";

type FAQItemProps = {
  question: string;
  answer: string;
  defaultOpen?: boolean;
};

export function FAQItem({
  question,
  answer,
  defaultOpen = false,
}: FAQItemProps) {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <div
      className={cn(
        "rounded-2xl p-6 transition-all duration-300",
        open
          ? "bg-blue-600 text-white"
          : "bg-white shadow-[0_10px_40px_rgba(0,0,0,0.06)]"
      )}
    >
      <button
        onClick={() => setOpen(!open)}
        className="flex w-full items-center justify-between text-left"
      >
        <h3 className="text-lg font-semibold">{question}</h3>
        <span className="text-2xl font-light">{open ? "×" : "+"}</span>
      </button>

      {open && (
        <p className="mt-4 text-sm leading-[1.7] text-blue-100">{answer}</p>
      )}
    </div>
  );
}
