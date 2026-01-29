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

import { ProgramForm } from "./utils/programUtils";

interface Props {
  open: boolean;
  onClose: () => void;
  onSave: (data: ProgramForm) => void;
  initialData?: ProgramForm;
}

export default function ProgramDialog({
  open,
  onClose,
  onSave,
  initialData,
}: Props) {
  const [form, setForm] = useState<ProgramForm>({
    name: "",
    description: "",
    icon: "",
    image: "",
  });

  useEffect(() => {
    if (initialData) setForm(initialData);
    else
      setForm({
        name: "",
        description: "",
        icon: "",
        image: "",
      });
  }, [initialData]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    if (!form.name || !form.description) {
      alert("Nama dan deskripsi wajib diisi");
      return;
    }
    onSave(form);
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle fontWeight={600}>
        {initialData ? "Edit Program" : "Tambah Program"}
      </DialogTitle>

      <DialogContent>
        <Stack spacing={2} mt={1}>
          <TextField
            label="Nama Program"
            name="name"
            value={form.name}
            onChange={handleChange}
            fullWidth
          />

          <TextField
            label="Deskripsi"
            name="description"
            value={form.description}
            onChange={handleChange}
            multiline
            rows={3}
            fullWidth
          />

          <TextField
            label="Icon"
            name="icon"
            value={form.icon}
            onChange={handleChange}
            fullWidth
          />

          <TextField
            label="Image URL"
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
