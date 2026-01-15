import { ReactNode } from "react";

interface BadgeProps {
  children: ReactNode;
  variant?: "jadwal" | "libur" | "event" | "umum";
}

const VARIANT_STYLE: Record<string, string> = {
  jadwal: "bg-cyan-50 text-cyan-700",
  libur: "bg-orange-50 text-orange-700",
  event: "bg-purple-50 text-purple-700",
  umum: "bg-gray-100 text-gray-700",
};

export function Badge({ children, variant = "umum" }: BadgeProps) {
  return (
    <span
      className={`inline-flex items-center rounded-md px-3 py-1 text-xs font-medium
        ${VARIANT_STYLE[variant]}`}
    >
      {children}
    </span>
  );
}
