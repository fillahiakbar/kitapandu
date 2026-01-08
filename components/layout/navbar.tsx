"use client";

import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 bg-white">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 relative">
        <Link href="/" className="inline-flex items-center">
          <Image
            src="/assets/images/logo.png"
            alt="KitaPandu"
            width={180}
            height={80}
            priority
            unoptimized
            className="block object-contain mt-6"
          />
        </Link>

        <nav className="hidden gap-16 text-sm font-semibold md:flex md:absolute md:left-1/2 md:transform md:-translate-x-1/2">
          <Link href="/" className="hover:text-blue-600">
            Beranda
          </Link>
          <Link href="/#program" className="hover:text-blue-600">
            Kursus
          </Link>
          <Link href="/#about" className="hover:text-blue-600">
            Tentang Kami
          </Link>
          <Link href="/#faq" className="hover:text-blue-600">
            FAQs
          </Link>
        </nav>
      </div>
    </header>
  );
}
