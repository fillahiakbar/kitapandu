"use client";

import { useEffect, useState } from "react";
import { apiFetch } from "@/lib/api";

export interface Announcement {
  announcements_id: string;
  title: string;
  category: string;
  content: string;
  created_at: string;
  updated_at: string;
}

export function useAnnouncements() {
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [loading, setLoading] = useState(false);

  /* ===== GET ===== */
  const fetchAnnouncements = async () => {
    setLoading(true);
    try {
      const res = await apiFetch("/announcements");
      setAnnouncements(res.data);
    } finally {
      setLoading(false);
    }
  };

  /* ===== POST / PUT ===== */
  const saveAnnouncement = async (payload: {
    id?: string;
    title: string;
    category: string;
    content: string;
  }) => {
    if (payload.id) {
      await apiFetch(`/announcements/${payload.id}`, {
        method: "PUT",
        body: JSON.stringify(payload),
      });
    } else {
      await apiFetch("/announcements", {
        method: "POST",
        body: JSON.stringify(payload),
      });
    }

    await fetchAnnouncements();
  };

  /* ===== DELETE ===== */
  const deleteAnnouncement = async (id: string) => {
    if (!confirm("Yakin ingin menghapus pengumuman ini?")) return;

    await apiFetch(`/announcements/${id}`, {
      method: "DELETE",
    });

    await fetchAnnouncements();
  };

  useEffect(() => {
    fetchAnnouncements();
  }, []);

  return {
    announcements,
    loading,
    saveAnnouncement,
    deleteAnnouncement,
  };
}
