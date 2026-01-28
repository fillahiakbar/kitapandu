"use client";

import { useState } from "react";
import { ClassForm, ClassStatus } from "../utils/classUtils";

export interface Class {
  class_id: string;
  program_id: string;
  mentor_id: string;
  name: string;
  age_range: string;
  period: string;
  status: ClassStatus;
  image?: string;
}

const initialClasses: Class[] = [
  {
    class_id: "1",
    program_id: "program-1",
    mentor_id: "mentor-1",
    name: "Kelas Tahsin A",
    age_range: "7–9 Tahun",
    period: "Jan – Mar 2025",
    status: "ACTIVE",
  },
];

export const useClasses = () => {
  const [classes, setClasses] = useState<Class[]>(initialClasses);

  const addClass = (form: ClassForm) => {
    setClasses((prev) => [
      ...prev,
      {
        class_id: crypto.randomUUID(),
        program_id: "program-dummy",
        mentor_id: "mentor-dummy",
        ...form,
      },
    ]);
  };

  const updateClass = (id: string, form: ClassForm) => {
    setClasses((prev) =>
      prev.map((c) => (c.class_id === id ? { ...c, ...form } : c)),
    );
  };

  const deleteClass = (id: string) => {
    if (!confirm("Hapus kelas ini?")) return;
    setClasses((prev) => prev.filter((c) => c.class_id !== id));
  };

  return {
    classes,
    addClass,
    updateClass,
    deleteClass,
  };
};
