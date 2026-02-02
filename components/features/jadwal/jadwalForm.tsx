"use client";

import { useState } from "react";
import { useStudentSchedule } from "./useStudentSchedule";
import { getDayName } from "@/utils/dayOfWeek";

export function JadwalForm() {
  const [code, setCode] = useState("");
  const { data, loading, error, fetchByStudentCode } =
    useStudentSchedule();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    fetchByStudentCode(code);
  };

  return (
    <section id="jadwal" className="py-8 md:py-8 cursor-default">
      <div className="mx-auto max-w-7xl px-4">

        <p className="mt-3 max-w-2xl text-sm text-gray-600 mb-4">
          Masukkan nomor absen untuk melihat jadwal anak
        </p>

        <form
          onSubmit={handleSubmit}
          className="mb-8 flex flex-col gap-3 sm:flex-row sm:items-center mb-45"
        >
          <input
            type="text"
            placeholder="Masukkan nomor absen"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            className="flex-1 rounded-md border border-gray-200 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-200"
          />

          <button
            type="submit"
            disabled={loading}
            className="rounded-md bg-blue-600 px-6 py-3 text-white font-semibold hover:bg-blue-700 disabled:opacity-60"
          >
            {loading ? "Memuat..." : "Lihat Jadwal"}
          </button>
        </form>

        {error && <p className="text-sm text-red-600">{error}</p>}

        {data.map((enrollment, idx) => (
          <div
            key={idx}
            className="rounded-lg border border-gray-200 p-4 mb-4"
          >
            <h3 className="font-semibold">
              Kelas: {enrollment.class.name}
            </h3>

            <p className="text-sm text-gray-600">
              Mentor: {enrollment.class.mentor.name ?? "-"}
            </p>

            <ul className="mt-3 space-y-1">
              {enrollment.class.schedules.map((s) => (
                <li key={s.schedule_id} className="text-sm">
                  {getDayName(s.day_of_week)} | {s.start_time} - {s.end_time}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}
