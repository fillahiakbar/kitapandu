"use client";

import { useEffect, useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Stack,
  MenuItem,
} from "@mui/material";

import { ScheduleForm } from "./utils/scheduleUtils";
import { apiFetch } from "@/lib/api";

interface Props {
  open: boolean;
  onClose: () => void;
  onSave: (form: ScheduleForm) => void;
  initialData?: ScheduleForm;
}

interface ClassOption {
  class_id: string;
  name: string;
}

const DAYS = [
  { value: 0, label: "Minggu" },
  { value: 1, label: "Senin" },
  { value: 2, label: "Selasa" },
  { value: 3, label: "Rabu" },
  { value: 4, label: "Kamis" },
  { value: 5, label: "Jumat" },
  { value: 6, label: "Sabtu" },
];

export default function ScheduleDialog({
  open,
  onClose,
  onSave,
  initialData,
}: Props) {
  const [form, setForm] = useState<ScheduleForm>({
    class_id: "",
    day_of_week: 1,
    start_time: "",
    end_time: "",
  });

  const [classes, setClasses] = useState<ClassOption[]>([]);

  const fetchClasses = async () => {
    const res = await apiFetch("/classes");
    setClasses(res.data);
  };

  useEffect(() => {
    fetchClasses();
  }, []);

  useEffect(() => {
    if (initialData) setForm(initialData);
    else {
      setForm({
        class_id: "",
        day_of_week: 1,
        start_time: "",
        end_time: "",
      });
    }
  }, [initialData]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setForm({
      ...form,
      [name]:
        name === "day_of_week" ? Number(value) : value,
    });
  };

  const handleSubmit = () => {
    if (
      !form.class_id ||
      !form.start_time ||
      !form.end_time
    ) {
      alert("Semua field wajib diisi");
      return;
    }

    onSave(form);
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle fontWeight={600}>
        {initialData ? "Edit Jadwal" : "Tambah Jadwal"}
      </DialogTitle>

      <DialogContent>
        <Stack spacing={2} mt={1}>
          <TextField
            select
            label="Kelas"
            name="class_id"
            value={form.class_id}
            onChange={handleChange}
            fullWidth
          >
            {classes.map((cls) => (
              <MenuItem key={cls.class_id} value={cls.class_id}>
                {cls.name}
              </MenuItem>
            ))}
          </TextField>

          <TextField
            select
            label="Hari"
            name="day_of_week"
            value={form.day_of_week}
            onChange={handleChange}
            fullWidth
          >
            {DAYS.map((day) => (
              <MenuItem key={day.value} value={day.value}>
                {day.label}
              </MenuItem>
            ))}
          </TextField>

          <TextField
            label="Jam Mulai"
            name="start_time"
            type="time"
            InputLabelProps={{ shrink: true }}
            value={form.start_time}
            onChange={handleChange}
            fullWidth
          />

          <TextField
            label="Jam Selesai"
            name="end_time"
            type="time"
            InputLabelProps={{ shrink: true }}
            value={form.end_time}
            onChange={handleChange}
            fullWidth
          />
        </Stack>
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose}>Batal</Button>
        <Button variant="contained" onClick={handleSubmit}>
          Simpan
        </Button>
      </DialogActions>
    </Dialog>
  );
}
