import { cn } from "@/lib/utils";
import { FiArrowUpRight } from "react-icons/fi";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary";
};

export function Button({
  className,
  variant = "primary",
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      className={cn(
        "inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-medium transition",
        variant === "primary" && "bg-[#364DE8] text-white hover:bg-blue-700",
        variant === "secondary" &&
          "bg-white text-blue-600 border border-blue-600 hover:bg-blue-50",
        className
      )}
      {...props}
    >
      {children}

      <span className="ml-2 h-8 w-8 flex items-center justify-center rounded-full bg-white">
        <FiArrowUpRight className="text-[#364DE8]" size={18} aria-hidden />
      </span>
    </button>
  );
}
