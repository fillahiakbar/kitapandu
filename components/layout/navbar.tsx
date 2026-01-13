"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export function Navbar() {
  const [open, setOpen] = useState(false);

  const navItems = [
    { label: "Beranda", href: "/" },
    { label: "Kursus", href: "/program" },
    { label: "Tentang Kami", href: "/#about" },
    { label: "FAQs", href: "/#faq" },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white shadow-sm">
      <div className="relative mx-auto flex max-w-7xl items-center justify-between px-4 py-4">
        {/* Logo */}
        <Link href="/" className="inline-flex items-center">
          <Image
            src="/assets/images/logo.png"
            alt="KitaPandu"
            width={170}
            height={70}
            priority
            unoptimized
            className="object-contain mt-3 mx-2"
          />
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:absolute md:left-1/2 md:flex md:-translate-x-1/2 gap-12 text-sm font-semibold">
          {navItems.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className="px-3 py-2 rounded-md transition-colors hover:bg-blue-600 hover:text-white"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Mobile Hamburger */}
        <button
          onClick={() => setOpen((prev) => !prev)}
          className="md:hidden inline-flex h-10 w-10 items-center justify-center rounded-lg hover:bg-gray-100"
          aria-label="Toggle menu"
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="md:hidden overflow-hidden bg-white shadow-md"
          >
            <nav className="flex flex-col gap-2 px-4 py-3 text-sm font-semibold">
              {navItems.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="
                    px-4 py-2.5
                    rounded-lg
                    transition-colors
                    hover:bg-blue-600 hover:text-white
                  "
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
