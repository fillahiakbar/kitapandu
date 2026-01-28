"use client";

import { useState } from "react";
import { ProgramForm } from "../utils/programUtils";

export interface Program {
  program_id: string;
  name: string;
  description: string;
  icon?: string;
  image?: string;
}

const initialPrograms: Program[] = [
  {
    program_id: "1",
    name: "Tahsin Anak",
    description: "Program perbaikan bacaan Al-Qur'an untuk anak-anak",
    icon: "📘",
    image: "",
  },
];

export const usePrograms = () => {
  const [programs, setPrograms] = useState<Program[]>(initialPrograms);

  const addProgram = (form: ProgramForm) => {
    setPrograms((prev) => [
      ...prev,
      {
        program_id: crypto.randomUUID(),
        ...form,
      },
    ]);
  };

  const updateProgram = (id: string, form: ProgramForm) => {
    setPrograms((prev) =>
      prev.map((p) => (p.program_id === id ? { ...p, ...form } : p)),
    );
  };

  const deleteProgram = (id: string) => {
    if (!confirm("Hapus program ini?")) return;
    setPrograms((prev) => prev.filter((p) => p.program_id !== id));
  };

  return {
    programs,
    addProgram,
    updateProgram,
    deleteProgram,
  };
};
