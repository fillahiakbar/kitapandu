import Image from "next/image";
import { cn } from "@/lib/utils";


import Link from "next/link";

type ProgramCardProps = {
  title: string;
  description: string;
  icon: string;
  slug?: string;
  active?: boolean;
};

export function ProgramCard({
  title,
  description,
  icon,
  slug,
  active = false,
}: ProgramCardProps) {
  const content = (
    <div
      className={cn(
        "group rounded-2xl p-6 transition-all duration-300 ease-out h-[250px] flex flex-col justify-between",
        "hover:scale-[1.03] hover:-translate-y-1 shadow-md",
        active
          ? "bg-blue-600 text-white shadow-[0_20px_60px_rgba(59,130,246,0.35)]"
          : "bg-white shadow-[0_0_10px_rgba(0,0,0,0.15)] hover:bg-blue-600 hover:shadow-[0_20px_60px_rgba(59,130,246,0.35)]"
      )}
    >
      <div
        className={cn(
          "mb-4 flex h-10 w-10 items-center justify-center rounded-md transition-all duration-300 bg-transparent",
        )}
      >
        <Image
          src={icon}
          alt={title}
          width={24}
          height={24}
          className={cn(
            "transition-all duration-300 scale-200",
            active
              ? "brightness-0 invert"
              : "group-hover:scale-250 group-hover:brightness-0 group-hover:invert"
          )}
        />
      </div>


      <h3
        className={cn(
          "mb-2 text-lg font-semibold transition-colors duration-300 cursor-default",
          active ? "text-white" : "group-hover:text-white"
        )}
      >
        {title}
      </h3>

      <p
        className={cn(
          "text-sm leading-[1.6] transition-colors duration-300 cursor-default",
          active ? "text-blue-100" : "text-gray-500 group-hover:text-blue-100"
        )}
      >
        {description}
      </p>
    </div>
  );

  if (slug) {
    return (
      <Link
        href={`/program/${slug}`}
        className="block h-full cursor-pointer rounded-2xl focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
      >
        {content}
      </Link>
    );
  }

  return content;
}
