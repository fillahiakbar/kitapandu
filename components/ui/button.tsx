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
        "group inline-flex items-center gap-2 rounded-md px-6 py-3 text-sm font-medium",
        "transition-all duration-300 ease-out hover:-translate-y-0.5 hover:shadow-lg cursor-pointer",
        variant === "primary" && "bg-[#364DE8] text-white hover:bg-blue-800",
        variant === "secondary" &&
          "bg-white text-blue-600 border border-blue-600",
        className
      )}
      {...props}
    >
      {children}

      {/* <span className="ml-2 flex h-8 w-8 items-center justify-center rounded-full bg-white">
        <FiArrowUpRight
          className="text-[#364DE8] transition-transform duration-300 group-hover:rotate-45"
          size={18}
          aria-hidden
        />
      </span> */}
    </button>
  );
}
