"use client";

import { useState } from "react";
import { ScheduleForm } from "../utils/scheduleUtils";

export interface Schedule {
  schedule_id: string;
  class_id: string;
  class_name: string;
  date: string;
}

const initialSchedules: Schedule[] = [
  {
    schedule_id: "1",
    class_id: "class-1",
    class_name: "Kelas Tahsin A",
    date: "2025-01-15",
  },
];

export const useSchedules = () => {
  const [schedules, setSchedules] = useState<Schedule[]>(initialSchedules);

  const addSchedule = (form: ScheduleForm, className: string) => {
    setSchedules((prev) => [
      ...prev,
      {
        schedule_id: crypto.randomUUID(),
        class_id: form.class_id,
        class_name: className,
        date: form.date,
      },
    ]);
  };

  const updateSchedule = (
    id: string,
    form: ScheduleForm,
    className: string,
  ) => {
    setSchedules((prev) =>
      prev.map((s) =>
        s.schedule_id === id
          ? {
              ...s,
              class_id: form.class_id,
              class_name: className,
              date: form.date,
            }
          : s,
      ),
    );
  };

  const deleteSchedule = (id: string) => {
    if (!confirm("Hapus jadwal ini?")) return;
    setSchedules((prev) => prev.filter((s) => s.schedule_id !== id));
  };

  return {
    schedules,
    addSchedule,
    updateSchedule,
    deleteSchedule,
  };
};
