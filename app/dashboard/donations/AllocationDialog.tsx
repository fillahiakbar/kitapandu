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
import { AllocationForm } from "./utils/allocationUtils";

interface Props {
  open: boolean;
  onClose: () => void;
  onSave: (data: AllocationForm) => void;
  initialData?: AllocationForm;
}

export default function AllocationDialog({
  open,
  onClose,
  onSave,
  initialData,
}: Props) {
  const [form, setForm] = useState<AllocationForm>({
    title: "",
    amount: 0,
    percent: 0,
  });

  useEffect(() => {
    if (initialData) setForm(initialData);
  }, [initialData]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    if (!form.title || !form.amount || !form.percent) {
      alert("Field wajib belum lengkap");
      return;
    }
    onSave({
      ...form,
      amount: Number(form.amount),
      percent: Number(form.percent),
    });
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle fontWeight={600}>
        {initialData ? "Edit Alokasi" : "Tambah Alokasi"}
      </DialogTitle>

      <DialogContent>
        <Stack spacing={2} mt={1}>
          <TextField
            label="Judul Alokasi"
            name="title"
            value={form.title}
            onChange={handleChange}
          />
          <TextField
            label="Jumlah Dana"
            name="amount"
            type="number"
            value={form.amount}
            onChange={handleChange}
          />
          <TextField
            label="Persentase (%)"
            name="percent"
            type="number"
            value={form.percent}
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
