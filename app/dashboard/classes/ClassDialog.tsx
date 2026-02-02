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

import { classStatuses, ClassForm, getStatusLabel } from "./utils/classUtils";

interface Props {
  open: boolean;
  onClose: () => void;
  onSave: (data: ClassForm) => void;
  initialData?: ClassForm;
}

export default function ClassDialog({
  open,
  onClose,
  onSave,
  initialData,
}: Props) {
  const [form, setForm] = useState<ClassForm>({
    name: "",
    min_age: 1,
    max_age: 2,
    started_at: new Date(),
    ended_at: new Date(),
    status: "DRAFT",
    program_id: "",
    mentor_id: "",
    image: "",
  });

  useEffect(() => {
    if (initialData) setForm(initialData);
  }, [initialData]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    if (name === "min_age" || name === "max_age") {
      setForm({ ...form, [name]: Number(value) });
      return;
    }

    if (name === "started_at" || name === "ended_at") {
      setForm({ ...form, [name]: new Date(value) });
      return;
    }

    setForm({ ...form, [name]: value });
  };

  const handleSubmit = () => {
    if (
      !form.name ||
      !form.program_id ||
      !form.mentor_id ||
      !form.started_at ||
      !form.ended_at ||
      form.min_age > form.max_age
    ) {
      alert("Semua field wajib diisi dengan benar");
      return;
    }
    onSave(form);
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle fontWeight={600}>
        {initialData ? "Edit Kelas" : "Tambah Kelas"}
      </DialogTitle>

      <DialogContent>
        <Stack spacing={2} mt={1}>
          <TextField
            label="Nama Kelas"
            name="name"
            value={form.name}
            onChange={handleChange}
          />

          <TextField
            label="Usia Minimum"
            name="min_age"
            type="number"
            value={form.min_age}
            onChange={handleChange}
          />

          <TextField
            label="Usia Maksimum"
            name="max_age"
            type="number"
            value={form.max_age}
            onChange={handleChange}
          />

          <TextField
            label="Tanggal Mulai"
            name="started_at"
            type="date"
            value={
              form.started_at instanceof Date
                ? form.started_at.toISOString().slice(0, 10)
                : ""
            }
            onChange={handleChange}
            InputLabelProps={{ shrink: true }}
          />

          <TextField
            label="Tanggal Selesai"
            name="ended_at"
            type="date"
            value={
              form.ended_at instanceof Date
                ? form.ended_at.toISOString().slice(0, 10)
                : ""
            }
            onChange={handleChange}
            InputLabelProps={{ shrink: true }}
          />

          <TextField
            label="Program ID"
            name="program_id"
            value={form.program_id}
            onChange={handleChange}
          />

          <TextField
            label="Mentor ID"
            name="mentor_id"
            value={form.mentor_id}
            onChange={handleChange}
          />

          <TextField
            select
            label="Status"
            name="status"
            value={form.status}
            onChange={handleChange}
          >
            {classStatuses.map((status) => (
              <MenuItem key={status} value={status}>
                {getStatusLabel(status)}
              </MenuItem>
            ))}
          </TextField>

          <TextField
            label="URL Gambar"
            name="image"
            value={form.image || ""}
            onChange={handleChange}
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
