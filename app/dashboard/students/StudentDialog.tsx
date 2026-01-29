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
} from "@mui/material";

import { StudentForm, studentFormDefault } from "./utils/studentUtils";

interface Props {
  open: boolean;
  onClose: () => void;
  onSave: (form: StudentForm) => void;
  initialData?: StudentForm;
}

export default function StudentDialog({
  open,
  onClose,
  onSave,
  initialData,
}: Props) {
  const [form, setForm] = useState<StudentForm>(studentFormDefault);

  useEffect(() => {
    if (initialData) setForm(initialData);
    else setForm(studentFormDefault);
  }, [initialData]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    if (
      !form.student_name ||
      !form.student_age ||
      !form.parent_name ||
      !form.whatsapp
    ) {
      alert("Semua field wajib diisi");
      return;
    }
    onSave(form);
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle fontWeight={600}>
        {initialData ? "Edit Siswa" : "Tambah Siswa"}
      </DialogTitle>

      <DialogContent>
        <Stack spacing={2} mt={1}>
          <TextField
            label="Nama Siswa"
            name="student_name"
            value={form.student_name}
            onChange={handleChange}
            fullWidth
          />
          <TextField
            label="Umur"
            name="student_age"
            type="number"
            value={form.student_age}
            onChange={handleChange}
            fullWidth
          />
          <TextField
            label="Nama Orang Tua"
            name="parent_name"
            value={form.parent_name}
            onChange={handleChange}
            fullWidth
          />
          <TextField
            label="No WhatsApp"
            name="whatsapp"
            value={form.whatsapp}
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
