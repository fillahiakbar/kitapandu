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

import {
  donationStatuses,
  DonationForm,
  getStatusLabel,
} from "./utils/donationUtils";

interface Props {
  open: boolean;
  onClose: () => void;
  onSave: (data: DonationForm) => void;
  initialData?: DonationForm;
}

export default function DonationDialog({
  open,
  onClose,
  onSave,
  initialData,
}: Props) {
  const [form, setForm] = useState<DonationForm>({
    title: "",
    status: "DRAFT",
    target_amount: 0,
    collected_amount: 0,
    google_form_url: "",
    start_date: "",
    end_date: "",
  });

  useEffect(() => {
    if (initialData) setForm(initialData);
  }, [initialData]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    if (!form.title || !form.target_amount || !form.start_date) {
      alert("Field wajib belum lengkap");
      return;
    }
    onSave({
      ...form,
      target_amount: Number(form.target_amount),
      collected_amount: Number(form.collected_amount),
    });
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle fontWeight={600}>
        {initialData ? "Edit Donasi" : "Tambah Donasi"}
      </DialogTitle>

      <DialogContent>
        <Stack spacing={2} mt={1}>
          <TextField
            label="Judul Donasi"
            name="title"
            value={form.title}
            onChange={handleChange}
            fullWidth
          />

          <TextField
            select
            label="Status"
            name="status"
            value={form.status}
            onChange={handleChange}
            fullWidth
          >
            {donationStatuses.map((status) => (
              <MenuItem key={status} value={status}>
                {getStatusLabel(status)}
              </MenuItem>
            ))}
          </TextField>

          <TextField
            label="Target Dana"
            name="target_amount"
            type="number"
            value={form.target_amount}
            onChange={handleChange}
            fullWidth
          />

          <TextField
            label="Dana Terkumpul"
            name="collected_amount"
            type="number"
            value={form.collected_amount}
            onChange={handleChange}
            fullWidth
          />

          <TextField
            label="Google Form URL"
            name="google_form_url"
            value={form.google_form_url}
            onChange={handleChange}
            fullWidth
          />

          <TextField
            label="Tanggal Mulai"
            name="start_date"
            type="date"
            InputLabelProps={{ shrink: true }}
            value={form.start_date}
            onChange={handleChange}
          />

          <TextField
            label="Tanggal Selesai"
            name="end_date"
            type="date"
            InputLabelProps={{ shrink: true }}
            value={form.end_date}
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
