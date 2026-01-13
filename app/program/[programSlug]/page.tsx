"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import {
  programs,
  ProgramSchedule,
} from "@/components/features/programs/programs.data";
import ProgramFilter from "@/components/features/programs/programFilter";
import { ProgramList } from "@/components/features/programs/programList";

export default function ProgramDetailPage() {
  const params = useParams();
  const programSlug = params?.programSlug;

  const [month, setMonth] = useState<"current" | "next" | "upcoming">(
    "current"
  );

  if (!programSlug) return <p>Loading...</p>;

  const filteredPrograms: ProgramSchedule[] = programs.filter(
    (p) => p.programSlug === programSlug && p.month === month
  );

  const programTitle = filteredPrograms[0]?.title || "Program";

  return (
    <>
      {/* Judul utama */}
      <h1 className="text-4xl font-extrabold leading-tight mb-4">
        {programTitle}
      </h1>

      {/* Filter tombol */}
      <div className="flex gap-4 mb-8">
        <ProgramFilter value={month} onChange={setMonth} />
      </div>

      {/* List program */}
      <ProgramList programs={filteredPrograms} />

      {filteredPrograms.length === 0 && (
        <p className="mt-6 text-gray-500">
          Belum ada jadwal untuk program ini.
        </p>
      )}
    </>
  );
}
