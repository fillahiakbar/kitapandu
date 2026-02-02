import { useEffect, useState } from "react";
import { Program } from "./program.types";

interface Pagination {
  page: number;
  limit: number;
  totalItems: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
}

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export function usePrograms() {
  const [programs, setPrograms] = useState<Program[]>([]);
  const [pagination, setPagination] = useState<Pagination | null>(null);

  const [page, setPage] = useState(1);
  const limit = 10;

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPrograms = async () => {
      try {
        setLoading(true);

        if (!API_BASE_URL) {
          throw new Error("API base URL is not defined");
        }

        const res = await fetch(
          `${API_BASE_URL}/programs?page=${page}&limit=${limit}`
        );

        if (!res.ok) {
          throw new Error("Failed to fetch programs");
        }

        const json = await res.json();

        setPrograms(json.data ?? []);
        setPagination(json.pagination ?? null);
        setError(null);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Unknown error occurred"
        );
        setPrograms([]);
      } finally {
        setLoading(false);
      }
    };

    fetchPrograms();
  }, [page]);

  return {
    data: programs,
    pagination,
    page,
    setPage,
    loading,
    error,
  };
}
