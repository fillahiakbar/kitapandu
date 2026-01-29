"use client";

import { useEffect, useState } from "react";
import { apiFetch } from "@/lib/api";
import {
  ClassForm,
  ClassStatus,
  apiToUiStatus,
  uiToApiStatus,
} from "../utils/classUtils";

export interface Class {
  class_id: string;
  program_id: string;
  mentor_id: string;
  name: string;
  age_range: string;
  period: string;
  status: ClassStatus;
  image?: string;
  created_at: string;
  updated_at: string;
  mentor?: any;
  program?: any;
}

export const useClasses = () => {
  const [classes, setClasses] = useState<Class[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchClasses = async () => {
    setLoading(true);
    try {
      const res = await apiFetch("/classes");

      const mapped = res.data.map((item: any) => ({
        ...item,
        status: apiToUiStatus(item.status),
      }));

      setClasses(mapped);
    } finally {
      setLoading(false);
    }
  };

  const addClass = async (form: ClassForm) => {
    await apiFetch("/classes", {
      method: "POST",
      body: JSON.stringify({
        ...form,
        status: uiToApiStatus(form.status),
      }),
    });
    fetchClasses();
  };

  const updateClass = async (id: string, form: ClassForm) => {
    await apiFetch(`/classes/${id}`, {
      method: "PUT",
      body: JSON.stringify({
        ...form,
        status: uiToApiStatus(form.status),
      }),
    });
    fetchClasses();
  };

  const deleteClass = async (id: string) => {
    if (!confirm("Hapus kelas ini?")) return;
    await apiFetch(`/classes/${id}`, { method: "DELETE" });
    fetchClasses();
  };

  useEffect(() => {
    fetchClasses();
  }, []);

  return {
    classes,
    loading,
    addClass,
    updateClass,
    deleteClass,
  };
};
