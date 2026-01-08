import Image from "next/image";
import { Button } from "@/components/ui/button";

export function DonationSection() {
  return (
    <section className="py-28">
      <div className="mx-auto max-w-7xl px-4">
        {/* TITLE */}
        <div className="mb-16 text-center">
          <h2 className="text-[36px] font-semibold leading-[1.2] md:text-[48px]">
            Dukung kelas gratis <br />
            untuk anak disabilitas
          </h2>
        </div>

        {/* CONTENT */}
        <div className="grid grid-cols-1 items-center gap-12 md:grid-cols-2">
          {/* LEFT TEXT */}
          <div className="max-w-lg">
            <p className="mb-10 text-[16px] leading-[1.8] text-gray-600">
              Bantu kami memberikan pendidikan digital gratis untuk anak-anak
              berkebutuhan khusus agar mereka memiliki kesempatan yang sama
              dalam belajar teknologi.
            </p>

            <Button>Donasi sekarang</Button>
          </div>

          {/* RIGHT IMAGE */}
          <div className="flex justify-center md:scale-110">
            <Image
              src="/assets/images/anak.png"
              alt="Anak belajar menggunakan laptop"
              width={480}
              height={480}
              priority
            />
          </div>
        </div>
      </div>
    </section>
  );
}
