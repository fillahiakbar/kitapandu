import { useEffect, useMemo, useState } from "react";
import { AnnouncementCategory } from "../domain/announcement.enum";
import { Announcement, Pagination } from "../domain/announcement.type";
const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export function useAnnouncements() {
  const [activeTab, setActiveTab] = useState<AnnouncementCategory>(
    AnnouncementCategory.ALL
  );

  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [pagination, setPagination] = useState<Pagination | null>(null);

  const [page, setPage] = useState(1);
  const limit = 10;

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAnnouncements = async () => {
      try {
        setLoading(true);
        if (!API_BASE_URL) {
          throw new Error("API base URL is not defined");
        }

        const res = await fetch(
          `${API_BASE_URL}/announcements?page=${page}&limit=${limit}`
        );

        if (!res.ok) {
          throw new Error(`Failed to fetch announcements`);
        }

        const json = await res.json();

        setAnnouncements(json.data);
        setPagination(json.pagination);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Unknown error");
        setAnnouncements([]);
      } finally {
        setLoading(false);
      }
    };

    fetchAnnouncements();
  }, [page]);

  const filteredAnnouncements = useMemo(() => {
    if (activeTab === AnnouncementCategory.ALL) {
      return announcements;
    }
    return announcements.filter((a) => a.category === activeTab);
  }, [announcements, activeTab]);


  return {
    // data
    data: filteredAnnouncements,
    pagination,

    // category tabs
    activeTab,
    setActiveTab,

    // pagination controls
    page,
    setPage,

    // status
    loading,
    error,
  };
}
