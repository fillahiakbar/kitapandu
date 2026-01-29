"use client";

import { useEffect, useState } from "react";
import { apiFetch } from "@/lib/api";
import { StudentForm } from "../utils/studentUtils";

export interface Student {
  student_id: string;
  student_name: string;
  student_age: number;
  parent_name: string;
  whatsapp: string;
}

export const useStudents = () => {
  const [students, setStudents] = useState<Student[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchStudents = async () => {
    setLoading(true);
    try {
      const res = await apiFetch("/students");
      setStudents(res.data);
    } finally {
      setLoading(false);
    }
  };

  const addStudent = async (form: StudentForm) => {
    await apiFetch("/students", {
      method: "POST",
      body: JSON.stringify({
        ...form,
        student_age: Number(form.student_age),
      }),
    });
    fetchStudents();
  };

  const updateStudent = async (id: string, form: StudentForm) => {
    await apiFetch(`/students/${id}`, {
      method: "PUT",
      body: JSON.stringify({
        ...form,
        student_age: Number(form.student_age),
      }),
    });
    fetchStudents();
  };

  const deleteStudent = async (id: string) => {
    if (!confirm("Hapus data siswa ini?")) return;
    await apiFetch(`/students/${id}`, {
      method: "DELETE",
    });
    fetchStudents();
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  return {
    students,
    loading,
    addStudent,
    updateStudent,
    deleteStudent,
  };
};
