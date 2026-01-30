"use client";

import { useEffect, useState } from "react";
import { apiFetch } from "@/lib/api";

export interface StudentOption {
  student_id: string;
  student_name: string;
}

export function useStudentsOptions() {
  const [students, setStudents] = useState<StudentOption[]>([]);

  useEffect(() => {
    apiFetch("/students").then((res) => setStudents(res.data));
  }, []);

  return students;
}
