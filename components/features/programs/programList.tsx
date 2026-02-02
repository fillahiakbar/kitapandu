import { ProgramCard } from "./programCard";
import { Program } from "./program.types";

type ProgramListProps = {
  programs?: Program[];
};

export function ProgramList({ programs = [] }: ProgramListProps) {
  if (programs.length === 0) {
    return (
      <p className="mt-6 text-gray-500">
        Belum ada jadwal untuk program ini.
      </p>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {programs.map((program) => (
        <ProgramCard
          key={program.program_id}
          program={program}
        />
      ))}
    </div>
  );
}
