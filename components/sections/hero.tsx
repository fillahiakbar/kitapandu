"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

export function HeroSection() {
  return (
    <section className="relative overflow-hidden">
      <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-16 px-4 py-24 md:grid-cols-2">
        {/* LEFT CONTENT */}
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <h1 className="mb-10 text-[48px] font-medium leading-[1.2] md:text-[80px] md:leading-[1.19]">
            Tingkatkan Skill lewat Kelas Terbaik Kami
          </h1>

          <Button className="mb-6">Mulai Sekarang</Button>

          <p className="max-w-md text-[16px] font-normal leading-[1.4] text-gray-500 md:text-[20px] md:leading-[1.4]">
            Kelas online praktis dan terarah untuk membantumu menguasai skill
            baru sesuai kebutuhan industri.
          </p>
        </motion.div>

        {/* RIGHT VISUAL */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="relative flex justify-center"
        >
          {/* ELLIPSE BACKGROUND */}
          <div className="absolute bottom-0 right-0 -z-10 h-[420px] w-[420px] rounded-full bg-blue-600 md:h-[520px] md:w-[520px]" />

          {/* STAR ASSET */}
          <Image
            src="/assets/images/bintang.png"
            alt="Dekorasi bintang"
            width={120}
            height={120}
            className="absolute right-0 top-10"
            priority
          />

          {/* MAIN CHARACTER */}
          <Image
            src="/assets/images/assets1.png"
            alt="Ilustrasi anak belajar digital"
            width={520}
            height={520}
            priority
          />
        </motion.div>
      </div>
    </section>
  );
}
