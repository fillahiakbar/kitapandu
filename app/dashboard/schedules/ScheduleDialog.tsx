"use client";

import React, { useEffect, useState } from "react";
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

interface Props {
  open: boolean;
  onClose: () => void;
  onSave: (form: ScheduleForm, className: string) => void;
  initialData?: ScheduleForm;
}

const dummyClasses = [
  { id: "class-1", name: "Kelas Tahsin A" },
  { id: "class-2", name: "Kelas Tahsin B" },
];

export default function ScheduleDialog({
  open,
  onClose,
  onSave,
  initialData,
}: Props) {
  const [form, setForm] = useState<ScheduleForm>({
    class_id: "",
    date: "",
  });

  useEffect(() => {
    if (initialData) setForm(initialData);
    else setForm({ class_id: "", date: "" });
  }, [initialData]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    if (!form.class_id || !form.date) {
      alert("Kelas dan tanggal wajib diisi");
      return;
    }

    const className =
      dummyClasses.find((c) => c.id === form.class_id)?.name || "-";

    onSave(form, className);
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
            {dummyClasses.map((cls) => (
              <MenuItem key={cls.id} value={cls.id}>
                {cls.name}
              </MenuItem>
            ))}
          </TextField>

          <TextField
            label="Tanggal"
            name="date"
            type="date"
            InputLabelProps={{ shrink: true }}
            value={form.date}
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
