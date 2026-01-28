"use client";

import { useState } from "react";
import { StudentForm } from "../utils/studentUtils";

export interface Student {
  student_id: string;
  student_name: string;
  student_age: number;
  parent_name: string;
  whatsapp: string;
}

const initialStudents: Student[] = [
  {
    student_id: "1",
    student_name: "Ahmad Fauzi",
    student_age: 10,
    parent_name: "Budi",
    whatsapp: "081234567890",
  },
];

export const useStudents = () => {
  const [students, setStudents] = useState<Student[]>(initialStudents);
  const [loading, setLoading] = useState(false);

  const addStudent = (form: StudentForm) => {
    setStudents((prev) => [
      ...prev,
      {
        student_id: crypto.randomUUID(),
        student_name: form.student_name,
        student_age: Number(form.student_age),
        parent_name: form.parent_name,
        whatsapp: form.whatsapp,
      },
    ]);
  };

  const updateStudent = (id: string, form: StudentForm) => {
    setStudents((prev) =>
      prev.map((s) =>
        s.student_id === id
          ? {
              ...s,
              student_name: form.student_name,
              student_age: Number(form.student_age),
              parent_name: form.parent_name,
              whatsapp: form.whatsapp,
            }
          : s,
      ),
    );
  };

  const deleteStudent = (id: string) => {
    if (!confirm("Hapus data siswa ini?")) return;
    setStudents((prev) => prev.filter((s) => s.student_id !== id));
  };

  return {
    students,
    loading,
    addStudent,
    updateStudent,
    deleteStudent,
  };
};
