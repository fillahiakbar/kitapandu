"use client";

import { useState } from "react";
import { MentorForm } from "../utils/mentorUtils";

export interface Mentor {
  mentor_id: string;
  name: string;
  contact: string;
}

const initialMentors: Mentor[] = [
  {
    mentor_id: "1",
    name: "Ust. Ahmad",
    contact: "081234567890",
  },
];

export const useMentors = () => {
  const [mentors, setMentors] = useState<Mentor[]>(initialMentors);

  const addMentor = (form: MentorForm) => {
    setMentors((prev) => [
      ...prev,
      {
        mentor_id: crypto.randomUUID(),
        ...form,
      },
    ]);
  };

  const updateMentor = (id: string, form: MentorForm) => {
    setMentors((prev) =>
      prev.map((m) => (m.mentor_id === id ? { ...m, ...form } : m)),
    );
  };

  const deleteMentor = (id: string) => {
    if (!confirm("Hapus mentor ini?")) return;
    setMentors((prev) => prev.filter((m) => m.mentor_id !== id));
  };

  return {
    mentors,
    addMentor,
    updateMentor,
    deleteMentor,
  };
};
