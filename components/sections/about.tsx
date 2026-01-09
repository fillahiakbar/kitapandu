import Image from "next/image";
import { Button } from "@/components/ui/button";

export function AboutSection() {
  return (
    <section id="about" className="py-8">
      <div className="mx-auto max-w-7xl px-4 cursor-default">
        {/* TOP TITLE */}
        <div className="mb-20 text-center">
          <span className="mb-4 block text-lg font-bold text-blue-600">
            Tentang kami
          </span>
          <h2 className="text-[32px] font-semibold leading-[1.2] md:text-[48px]">
            Kenali KitaPandu <br />
            Lebih Dekat
          </h2>
        </div>

        {/* CONTENT */}
        <div className="grid grid-cols-1 items-center gap-16 md:grid-cols-2">
          {/* IMAGE */}
          <div className="flex justify-center md:justify-start">
            <Image
              src="/assets/images/robotbanner.png"
              alt="Kegiatan pembelajaran robotika anak"
              width={520}
              height={420}
              className="rounded-3xl object-cover"
              priority
            />
          </div>

          {/* TEXT */}
          <div>
            <p className="mb-6 text-center md:text-left text-[16px] leading-[1.8] text-gray-500">
              KitaPandu adalah platform pembelajaran digital yang dirancang
              khusus untuk anak TK–SMP agar dapat mengenal dan mengembangkan
              keterampilan teknologi sejak dini. Kami percaya bahwa kemampuan
              digital, logika berpikir, dan kreativitas adalah bekal penting
              bagi anak untuk menghadapi masa depan.
            </p>

            <p className="mb-10 text-center md:text-left text-[16px] leading-[1.8] text-gray-500">
              Melalui berbagai program seperti coding dasar, robotika, dan
              kreativitas digital, KitaPandu menghadirkan pembelajaran yang
              disesuaikan dengan usia anak dan dikemas dengan cara yang seru,
              interaktif, dan mudah dipahami.
            </p>

            <div className="flex justify-center md:justify-start">
              <Button>Mulai Sekarang</Button>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
