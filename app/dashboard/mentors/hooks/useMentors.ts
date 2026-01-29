"use client";

import { useEffect, useState } from "react";
import { apiFetch } from "@/lib/api";
import { MentorForm } from "../utils/mentorUtils";

export interface Mentor {
  mentor_id: string;
  name: string;
  contact: string;
  created_at: string;
  updated_at: string;
  classes?: any[];
}

export const useMentors = () => {
  const [mentors, setMentors] = useState<Mentor[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchMentors = async () => {
    setLoading(true);
    try {
      const res = await apiFetch("/mentors");
      setMentors(res.data);
    } finally {
      setLoading(false);
    }
  };

  const addMentor = async (form: MentorForm) => {
    await apiFetch("/mentors", {
      method: "POST",
      body: JSON.stringify(form),
    });
    fetchMentors();
  };

  const updateMentor = async (id: string, form: MentorForm) => {
    await apiFetch(`/mentors/${id}`, {
      method: "PUT",
      body: JSON.stringify(form),
    });
    fetchMentors();
  };

  const deleteMentor = async (id: string) => {
    if (!confirm("Hapus mentor ini?")) return;
    await apiFetch(`/mentors/${id}`, { method: "DELETE" });
    fetchMentors();
  };

  useEffect(() => {
    fetchMentors();
  }, []);

  return {
    mentors,
    loading,
    addMentor,
    updateMentor,
    deleteMentor,
  };
};
