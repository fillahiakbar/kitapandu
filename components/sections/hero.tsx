"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

export function HeroSection() {
  return (
    <section className="relative overflow-hidden">
      <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-16 px-4 py-20 md:grid-cols-2 md:py-28">

        {/* LEFT CONTENT */}
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-center md:text-left"
        >
          <h1 className="mb-8 text-[clamp(36px,6vw,80px)] font-medium leading-tight cursor-default">
            Tingkatkan Skill lewat Kelas Terbaik Kami
          </h1>

          <Button className="mb-6">Mulai Sekarang</Button>

          <p className="mx-auto max-w-md text-[16px] leading-relaxed text-gray-500 md:mx-0 md:text-[20px] cursor-default">
            Kelas online praktis dan terarah untuk membantumu menguasai skill
            baru sesuai kebutuhan industri.
          </p>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="relative mx-auto flex w-full max-w-[560px] justify-center"
        >
          {/* VISUAL WRAPPER (STICKS EVERYTHING) */}
          <div className="relative aspect-square w-[280px] sm:w-[360px] md:w-[520px]">

            {/* ELLIPSE */}
            <div className="absolute bottom-0 right-0 h-full w-full rounded-full bg-blue-600" />

            {/* STAR */}
            <motion.div
              className="absolute right-[6%] -top-[10%]"
              animate={{
                scale: [1, 1.15, 1],
                y: [0, -10, 0],
              }}
              transition={{
                duration: 3,
                ease: "easeInOut",
                repeat: Infinity,
              }}
            >
              <Image
                src="/assets/images/bintang.png"
                alt="Dekorasi bintang"
                width={90}
                height={90}
                className="w-[60px] sm:w-[80px] md:w-[150px]"
                priority
              />
            </motion.div>


            {/* MAIN CHARACTER */}
            <motion.div
              className="absolute inset-0 flex items-end justify-center"
              animate={{ y: [0, -12, 0] }}
              transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
            >
              <Image
                src="/assets/images/assets1.png"
                alt="Ilustrasi anak belajar digital"
                width={520}
                height={520}
                className="w-full"
                priority
              />
            </motion.div>

            <motion.div
              className="absolute right-[75%] top-[30%]"
              animate={{
                scale: [1, 1.15, 1],
                y: [0, -10, 0],
              }}
              transition={{
                duration: 3,
                ease: "easeInOut",
                repeat: Infinity,
              }}
            >
              <Image
                src="/assets/images/bintang.png"
                alt="Dekorasi bintang"
                width={50}
                height={50}
                className="w-[40px] sm:w-[60px] md:w-[80px]"
                priority
              />
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
