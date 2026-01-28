import { useState, useEffect } from "react";

export interface Announcement {
  id: number;
  title: string;
  category: string;
  content: string;
  createdAt: string;
  updatedAt: string;
}

export const useAnnouncements = () => {
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchAnnouncements = async () => {
    setLoading(true);
    const res = await fetch("/api/announcements");
    const data = await res.json();
    setAnnouncements(data);
    setLoading(false);
  };

  const deleteAnnouncement = async (id: number) => {
    if (!confirm("Yakin ingin menghapus pengumuman ini?")) return;
    await fetch(`/api/announcements/${id}`, { method: "DELETE" });
    fetchAnnouncements();
  };

  const saveAnnouncement = async (announcement: {
    id?: number;
    title: string;
    category: string;
    content: string;
  }) => {
    const method = announcement.id ? "PATCH" : "POST";
    const url = announcement.id
      ? `/api/announcements/${announcement.id}`
      : "/api/announcements";

    await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(announcement),
    });

    fetchAnnouncements();
  };

  useEffect(() => {
    fetchAnnouncements();
  }, []);

  return {
    announcements,
    loading,
    fetchAnnouncements,
    deleteAnnouncement,
    saveAnnouncement,
  };
};
