"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Menu, X, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const navItems = [
    { label: "Beranda", href: "/" },
    { label: "Program", href: "/program" },
    { label: "Jadwal", href: "/jadwal" },
    { label: "Donasi", href: "/donation" },
    {
      label: "Informasi",
      href: "#",
      children: [
        { label: "Pengumuman", href: "/announcements" },
        { label: "Kalendar Akademik", href: "/kalendar" },
        { label: "FAQs", href: "/" },
        { label: "Tentang Kami", href: "/" },
      ],
    },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white">
      <div className="relative mx-auto flex max-w-7xl items-center justify-between px-6 h-20">

        {/* Logo */}
        <div className="flex-shrink-0">
          <Link href="/" className="flex items-center">
            <Image
              src="/assets/images/logo.png"
              alt="KitaPandu"
              width={140}
              height={50}
              priority
              unoptimized
              className="object-contain"
            />
          </Link>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex absolute left-1/2 -translate-x-1/2 items-center gap-2 text-sm font-semibold h-full">
          {navItems.map((item) => (
            <div
              key={item.label}
              className="relative flex items-center h-full"
              onMouseEnter={() => item.children && setDropdownOpen(true)}
              onMouseLeave={() => item.children && setDropdownOpen(false)}
            >
              {item.children ? (
                <div className="flex items-center gap-1 px-4 py-2 rounded-md transition-all hover:bg-blue-600 hover:text-white cursor-pointer select-none">
                  {item.label}
                  <ChevronDown
                    size={14}
                    className={`transition-transform duration-200 ${dropdownOpen ? "rotate-180" : ""}`}
                  />
                </div>
              ) : (
                <Link
                  href={item.href}
                  className="px-4 py-2 rounded-md transition-all hover:bg-blue-600 hover:text-white"
                >
                  {item.label}
                </Link>
              )}

              {/* Desktop Dropdown */}
              {item.children && (
                <AnimatePresence>
                  {dropdownOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      className="absolute top-[70%] left-1/2 -translate-x-1/2 pt-4 w-52 z-[60]"
                    >
                      <div className="bg-white border border-gray-100 rounded-xl shadow-xl py-2 overflow-hidden">
                        {item.children.map((child) => (
                          <Link
                            key={child.label}
                            href={child.href}
                            className="block px-5 py-2.5 text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors font-medium"
                          >
                            {child.label}
                          </Link>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              )}
            </div>
          ))}
        </nav>

        {/* Mobile Hamburger */}
        <div className="md:hidden">
          <button
            onClick={() => setOpen((prev) => !prev)}
            className="inline-flex h-10 w-10 items-center justify-center rounded-lg hover:bg-gray-100"
          >
            {open ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        <div className="hidden md:block w-[140px]"></div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="md:hidden border-t bg-white overflow-hidden"
          >
            <nav className="flex flex-col p-4 space-y-1 text-sm font-semibold">
              {navItems.map((item) => (
                <div key={item.label}>
                  {item.children ? (
                    <>
                      <button
                        onClick={() => setDropdownOpen(!dropdownOpen)}
                        className="flex w-full items-center justify-between px-4 py-3 rounded-lg hover:bg-gray-50 text-gray-800"
                      >
                        {item.label}
                        <ChevronDown size={18} className={dropdownOpen ? "rotate-180" : ""} />
                      </button>
                      <AnimatePresence>
                        {dropdownOpen && (
                          <motion.div
                            initial={{ height: 0 }}
                            animate={{ height: "auto" }}
                            exit={{ height: 0 }}
                            className="overflow-hidden ml-4 border-l-2 border-blue-50"
                          >
                            {item.children.map((child) => (
                              <Link
                                key={child.label}
                                href={child.href}
                                onClick={() => { setOpen(false); setDropdownOpen(false); }}
                                className="block px-6 py-2.5 text-gray-600 hover:text-blue-600"
                              >
                                {child.label}
                              </Link>
                            ))}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </>
                  ) : (
                    <Link
                      href={item.href}
                      onClick={() => setOpen(false)}
                      className="block px-4 py-3 rounded-lg hover:bg-blue-600 hover:text-white transition-all text-gray-800"
                    >
                      {item.label}
                    </Link>
                  )}
                </div>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}