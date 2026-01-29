"use client";

import { useEffect, useState } from "react";
import { apiFetch } from "@/lib/api";
import { ProgramForm } from "../utils/programUtils";

export interface Program {
  program_id: string;
  name: string;
  description: string;
  icon?: string;
  image?: string;
  created_at: string;
  updated_at: string;
  classes?: any[];
}

export const usePrograms = () => {
  const [programs, setPrograms] = useState<Program[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchPrograms = async () => {
    setLoading(true);
    try {
      const res = await apiFetch("/programs");
      setPrograms(res.data);
    } finally {
      setLoading(false);
    }
  };

  const addProgram = async (form: ProgramForm) => {
    await apiFetch("/programs", {
      method: "POST",
      body: JSON.stringify(form),
    });
    fetchPrograms();
  };

  const updateProgram = async (id: string, form: ProgramForm) => {
    await apiFetch(`/programs/${id}`, {
      method: "PUT",
      body: JSON.stringify(form),
    });
    fetchPrograms();
  };

  const deleteProgram = async (id: string) => {
    if (!confirm("Hapus program ini?")) return;
    await apiFetch(`/programs/${id}`, {
      method: "DELETE",
    });
    fetchPrograms();
  };

  useEffect(() => {
    fetchPrograms();
  }, []);

  return {
    programs,
    loading,
    addProgram,
    updateProgram,
    deleteProgram,
  };
};
