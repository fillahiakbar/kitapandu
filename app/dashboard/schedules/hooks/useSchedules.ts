"use client";

import { useEffect, useState } from "react";
import { apiFetch } from "@/lib/api";
import { ScheduleForm } from "../utils/scheduleUtils";

export interface Schedule {
  schedule_id: string;
  class_id: string;
  class_name: string;
  day_of_week: number;
  start_time: string;
  end_time: string;
}

export const useSchedules = () => {
  const [schedules, setSchedules] = useState<Schedule[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchSchedules = async () => {
    setLoading(true);
    try {
      const res = await apiFetch("/schedules");

      const mapped: Schedule[] = res.data.map((s: any) => ({
        schedule_id: s.schedule_id,
        class_id: s.class_id,
        class_name: s.class?.name || "-",
        day_of_week: s.day_of_week,
        start_time: s.start_time,
        end_time: s.end_time,
      }));

      setSchedules(mapped);
    } finally {
      setLoading(false);
    }
  };

  const addSchedule = async (form: ScheduleForm) => {
    await apiFetch("/schedules", {
      method: "POST",
      body: JSON.stringify(form),
    });
    fetchSchedules();
  };

  const updateSchedule = async (id: string, form: ScheduleForm) => {
    await apiFetch(`/schedules/${id}`, {
      method: "PUT",
      body: JSON.stringify(form),
    });
    fetchSchedules();
  };

  const deleteSchedule = async (id: string) => {
    if (!confirm("Hapus jadwal ini?")) return;
    await apiFetch(`/schedules/${id}`, {
      method: "DELETE",
    });
    fetchSchedules();
  };

  useEffect(() => {
    fetchSchedules();
  }, []);

  return {
    schedules,
    loading,
    addSchedule,
    updateSchedule,
    deleteSchedule,
  };
};
