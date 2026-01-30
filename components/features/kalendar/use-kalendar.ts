'use client';

import { useEffect, useMemo, useState } from 'react';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export type KalendarRow = {
  id: string;
  kelas: string;
  tanggal: string;
  mentor: string;
  status: 'active' | 'inactive';
};

type Pagination = {
  page: number;
  limit: number;
  totalItems: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
};

export function useSchedules() {
  const [data, setData] = useState<KalendarRow[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [search, setSearch] = useState('');

  const [pagination, setPagination] = useState<Pagination | null>(null);

  useEffect(() => {
    const fetchSchedules = async () => {
      try {
        setLoading(true);

        const res = await fetch(
          `${API_BASE_URL}/schedules?page=${page}&limit=${limit}`
        );

        if (!res.ok) {
          throw new Error('Failed to fetch schedules');
        }

        const json = await res.json();

        const mapped: KalendarRow[] = json.data.map((item: any) => ({
          id: item.schedule_id,
          kelas: item.class.name,
          mentor: item.class.mentor.name,
          tanggal: new Date(item.date).toLocaleDateString('id-ID'),
          status: item.class.status,
        }));

        setData(mapped);
        setPagination(json.pagination);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error');
        setData([]);
      } finally {
        setLoading(false);
      }
    };

    fetchSchedules();
  }, [page, limit]);

  // 🔎 client-side filtering
  const filteredData = useMemo(() => {
    if (!search) return data;

    return data.filter(item =>
      `${item.kelas} ${item.mentor}`
        .toLowerCase()
        .includes(search.toLowerCase())
    );
  }, [data, search]);

  return {
    data: filteredData,
    loading,
    error,
    page,
    setPage,
    limit,
    setLimit,
    search,
    setSearch,
    pagination,
  };
}
