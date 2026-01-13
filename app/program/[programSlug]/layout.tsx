import Link from "next/link";
import { ProgramList } from "@/components/features/programs";

export default function ProgramDetailLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="mx-auto max-w-7xl px-4 py-8">

      {children}
    </main>
  );
}
