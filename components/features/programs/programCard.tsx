import Image from "next/image";

export type ProgramCardProps = {
  title: string;
  age: string;
  period: string;
  schedule: string;
  image: string;
};

export function ProgramCard({
  title,
  age,
  period,
  schedule,
  image,
}: ProgramCardProps) {
  return (
    <div className="flex flex-col rounded-xl border border-gray-200 bg-white shadow-md hover:shadow-lg transition-shadow duration-300">
      <div className="relative h-48 w-full">
        <Image
          src={image}
          alt={title}
          fill
          style={{ objectFit: "cover" }}
          className="rounded-t-xl"
          sizes="(max-width: 768px) 100vw, 400px"
          priority
        />
      </div>
      <div className="p-6 flex flex-col flex-grow">
        <h3 className="text-lg font-semibold mb-3">{title}</h3>
        <p className="text-sm text-gray-600 mb-1">Usia: {age}</p>
        <p className="text-sm text-gray-600 mb-1">Periode: {period}</p>
        <p className="text-sm text-gray-600 mb-4">Jadwal: {schedule}</p>
        <button className="mt-auto inline-block rounded-md bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700 transition-colors duration-200">
          Daftar Sekarang
        </button>
      </div>
    </div>
  );
}
