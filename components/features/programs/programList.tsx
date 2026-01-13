import { ProgramCard } from "./programCard";
import { ProgramSchedule } from "./programs.data";

export function ProgramList({ programs }: { programs: ProgramSchedule[] }) {
  if (!programs || programs.length === 0) {
    return (
      <p className="text-gray-500 mt-6">Belum ada jadwal untuk program ini.</p>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {programs.map((program) => (
        <ProgramCard key={program.id} {...program} />
      ))}
    </div>
  );
}
