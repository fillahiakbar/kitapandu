"use client";

import { useState } from "react";
import { programs } from "@/components/features/programs/programs.data";
import ProgramFilter from "@/components/features/programs/programFilter";
import { ProgramList } from "@/components/features/programs/programList";

export default function ProgramsPage() {
  const [month, setMonth] = useState<"current" | "next" | "upcoming">(
    "current"
  );

  // Filter berdasarkan bulan
  const filteredPrograms = programs.filter((p) => p.month === month);

  return (
    <>
      <ProgramFilter value={month} onChange={setMonth} />

      <div className="mt-6">
        <ProgramList programs={filteredPrograms} />
      </div>
    </>
  );
}
