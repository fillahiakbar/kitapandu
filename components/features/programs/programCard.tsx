import Image from "next/image";
import Link from "next/link";
import { Program } from "./program.types";

export type ProgramCardProps = {
  program: Program;
};

export function ProgramCard({ program }: ProgramCardProps) {
  return (
    <div className="flex flex-col rounded-xl border border-gray-200 bg-white shadow-md hover:shadow-lg transition-shadow duration-300">
      <div className="relative h-48 w-full">
        <Image
          src={program.image || "/assets/images/programs/learning.jpg"}
          alt={program.name}
          fill
          className="rounded-t-xl object-cover"
          sizes="(max-width: 768px) 100vw, 400px"
          priority
        />
      </div>
      <div className="p-6 flex flex-col flex-grow">
        <h3 className="text-lg font-semibold mb-2">{program.name}</h3>
        <p className="text-sm text-gray-600 mb-2">{program.description}</p>

        <Link
          href={`/programs/${program.program_id}`}
          className="mt-auto inline-block rounded-md bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700 transition-colors duration-200 text-center"
        >
          Lihat Kelas
        </Link>
      </div>
    </div>
  );
}
