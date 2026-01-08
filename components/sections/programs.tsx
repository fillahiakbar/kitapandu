import Image from "next/image";
import { ProgramCard } from "@/components/ui/program-card";
import { PROGRAMS } from "@/data/program";

export function ProgramSection() {
  return (
    <section id="program" className="py-28">
      <div className="mx-auto max-w-7xl px-4">
        {/* HEADER */}
        <div className="mb-20 grid grid-cols-1 gap-10 md:grid-cols-2">
          <div>
            <span className="mb-3 block text-2xl font-bold text-blue-600">
              Kursus
            </span>
            <h2 className="text-[48px] font-medium leading-[1.15]">
              Program Belajar <br />
              Digital Anak
            </h2>
          </div>

          <p className="max-w-md text-[16px] leading-[1.6] text-gray-500 md:pt-10">
            Program pembelajaran digital untuk anak yang dirancang agar belajar
            teknologi terasa seru dan mudah dipahami.
          </p>
        </div>

        {/* CONTENT */}
        <div className="grid grid-cols-1 gap-16 md:grid-cols-2">
          <Image
            src="/assets/images/assets2.png"
            alt="Ilustrasi program belajar digital"
            width={520}
            height={520}
            priority
          />

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            {PROGRAMS.map((program) => (
              <ProgramCard key={program.title} {...program} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
