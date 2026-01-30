"use client";

import { useEffect, useState } from "react";
import { apiFetch } from "@/lib/api";

export interface Enrollment {
  enrollment_id: string;
  student_id: string;
  class_id: string;
  status: string;
  register_at: string;
  confirmed_at: string | null;
  started_at: string | null;
  ended_at: string | null;

  student: {
    student_id: string;
    student_name: string;
  };

  class: {
    class_id: string;
    name: string;
    period: string;
  };
}

export function useEnrollments() {
  const [enrollments, setEnrollments] = useState<Enrollment[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchEnrollments = async () => {
    setLoading(true);
    try {
      const res = await apiFetch("/enrollments");
      setEnrollments(res.data);
    } finally {
      setLoading(false);
    }
  };

  const saveEnrollment = async (payload: {
    id?: string;
    student_id: string;
    class_id: string;
    status: string;
  }) => {
    if (payload.id) {
      await apiFetch(`/enrollments/${payload.id}`, {
        method: "PUT",
        body: JSON.stringify(payload),
      });
    } else {
      await apiFetch("/enrollments", {
        method: "POST",
        body: JSON.stringify(payload),
      });
    }

    await fetchEnrollments();
  };

  const deleteEnrollment = async (id: string) => {
    if (!confirm("Yakin ingin menghapus enrollment ini?")) return;

    await apiFetch(`/enrollments/${id}`, {
      method: "DELETE",
    });

    await fetchEnrollments();
  };

  useEffect(() => {
    fetchEnrollments();
  }, []);

  return {
    enrollments,
    loading,
    saveEnrollment,
    deleteEnrollment,
  };
}
