"use client";

import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from "@mui/material";

const categories = ["jadwal", "libur", "event", "informasi umum"];

interface Props {
  open: boolean;
  onClose: () => void;
  onSave: (data: {
    id?: string;
    title: string;
    category: string;
    content: string;
  }) => void;
  initialData?: {
    announcements_id?: string;
    title: string;
    category: string;
    content: string;
  };
}

export default function AnnouncementDialog({
  open,
  onClose,
  onSave,
  initialData,
}: Props) {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [content, setContent] = useState("");

  useEffect(() => {
    if (initialData) {
      setTitle(initialData.title);
      setCategory(initialData.category);
      setContent(initialData.content);
    } else {
      setTitle("");
      setCategory("");
      setContent("");
    }
  }, [initialData]);

  const handleSave = () => {
    if (!title || !category || !content) {
      alert("Semua field wajib diisi");
      return;
    }

    onSave({
      id: initialData?.announcements_id,
      title,
      category,
      content,
    });
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>
        {initialData ? "Edit Pengumuman" : "Tambah Pengumuman"}
      </DialogTitle>
      <DialogContent>
        <TextField
          label="Judul"
          fullWidth
          margin="normal"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <FormControl fullWidth margin="normal">
          <InputLabel>Kategori</InputLabel>
          <Select
            value={category}
            label="Kategori"
            onChange={(e) => setCategory(e.target.value)}
          >
            {categories.map((cat) => (
              <MenuItem key={cat} value={cat}>
                {cat}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <TextField
          label="Isi"
          fullWidth
          multiline
          rows={4}
          margin="normal"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Batal</Button>
        <Button variant="contained" onClick={handleSave}>
          Simpan
        </Button>
      </DialogActions>
    </Dialog>
  );
}
