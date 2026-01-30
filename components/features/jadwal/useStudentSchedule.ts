import { useState } from "react";
import { Enrollment } from "./jadwal.types";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL

export function useStudentSchedule() {
  const [data, setData] = useState<Enrollment[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchByStudentCode = async (code: string) => {
    setLoading(true);
    setError(null);

    try {
      const res = await fetch(
        `${API_BASE_URL}/students/${code}`
      );

      if (!res.ok) throw new Error("Data siswa tidak ditemukan");

      const json = await res.json();
      setData(json.data.enrollments);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Terjadi kesalahan");
      setData([]);
    } finally {
      setLoading(false);
    }
  };

  return {
    data,
    loading,
    error,
    fetchByStudentCode,
  };
}
