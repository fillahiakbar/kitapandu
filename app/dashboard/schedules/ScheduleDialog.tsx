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
