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
    age_range: "",
    period: "",
    status: "DRAFT",
    image: "",
  });

  useEffect(() => {
    if (initialData) setForm(initialData);
  }, [initialData]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    if (!form.name || !form.age_range || !form.period) {
      alert("Semua field wajib diisi");
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
            fullWidth
          />

          <TextField
            label="Rentang Umur"
            name="age_range"
            value={form.age_range}
            onChange={handleChange}
            fullWidth
            placeholder="contoh: 7–9 Tahun"
          />

          <TextField
            label="Periode"
            name="period"
            value={form.period}
            onChange={handleChange}
            fullWidth
            placeholder="Jan – Mar 2025"
          />

          <TextField
            select
            label="Status"
            name="status"
            value={form.status}
            onChange={handleChange}
            fullWidth
          >
            {classStatuses.map((status) => (
              <MenuItem key={status} value={status}>
                {getStatusLabel(status)}
              </MenuItem>
            ))}
          </TextField>

          <TextField
            label="URL Gambar (opsional)"
            name="image"
            value={form.image}
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
