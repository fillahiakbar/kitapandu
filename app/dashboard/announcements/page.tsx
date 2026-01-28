"use client";

import React, { useState } from "react";
import {
  Box,
  Typography,
  Button,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Chip,
} from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

/* =======================
   DUMMY DATA
======================= */
const initialData = [
  {
    id: 1,
    title: "Libur Nasional",
    category: "libur",
    content: "Sekolah libur tanggal 17 Agustus",
  },
  {
    id: 2,
    title: "Perubahan Jadwal",
    category: "jadwal",
    content: "Jadwal belajar dimajukan jam 08.00",
  },
];

const categories = ["libur", "jadwal", "event", "informasi umum"];

export default function AnnouncementsPage() {
  const [rows, setRows] = useState(initialData);
  const [open, setOpen] = useState(false);
  const [editingRow, setEditingRow] = useState<any>(null);

  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [content, setContent] = useState("");

  /* =======================
     HANDLERS
  ======================= */
  const handleAdd = () => {
    setEditingRow(null);
    setTitle("");
    setCategory("");
    setContent("");
    setOpen(true);
  };

  const handleEdit = (row: any) => {
    setEditingRow(row);
    setTitle(row.title);
    setCategory(row.category);
    setContent(row.content);
    setOpen(true);
  };

  const handleDelete = (id: number) => {
    if (!confirm("Hapus pengumuman ini?")) return;
    setRows((prev) => prev.filter((row) => row.id !== id));
  };

  const handleSave = () => {
    if (!title || !category || !content) {
      alert("Semua field wajib diisi");
      return;
    }

    if (editingRow) {
      setRows((prev) =>
        prev.map((row) =>
          row.id === editingRow.id ? { ...row, title, category, content } : row,
        ),
      );
    } else {
      setRows((prev) => [
        ...prev,
        {
          id: Date.now(),
          title,
          category,
          content,
        },
      ]);
    }

    setOpen(false);
  };

  /* =======================
     TABLE COLUMNS
  ======================= */
  const columns: GridColDef[] = [
    {
      field: "title",
      headerName: "Judul",
      flex: 1,
      minWidth: 200,
    },
    {
      field: "category",
      headerName: "Kategori",
      width: 170,
      renderCell: (params) => (
        <Chip
          label={params.value}
          size="small"
          color="info"
          variant="outlined"
        />
      ),
    },
    {
      field: "content",
      headerName: "Isi",
      flex: 2,
      minWidth: 300,
      renderCell: (params) => (
        <Typography noWrap title={params.value}>
          {params.value}
        </Typography>
      ),
    },
    {
      field: "actions",
      headerName: "Aksi",
      width: 130,
      sortable: false,
      renderCell: (params) => (
        <Box display="flex" gap={1}>
          <IconButton
            size="small"
            color="primary"
            onClick={() => handleEdit(params.row)}
          >
            <EditIcon fontSize="small" />
          </IconButton>
          <IconButton
            size="small"
            color="error"
            onClick={() => handleDelete(params.row.id)}
          >
            <DeleteIcon fontSize="small" />
          </IconButton>
        </Box>
      ),
    },
  ];

  return (
    <Box p={3}>
      {/* HEADER */}
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb={3}
      >
        <Typography variant="h4" fontWeight={600}>
          Pengumuman
        </Typography>
        <Button variant="contained" onClick={handleAdd}>
          Tambah Pengumuman
        </Button>
      </Box>

      {/* TABLE */}
      <DataGrid
        rows={rows}
        columns={columns}
        autoHeight
        pageSizeOptions={[5, 10]}
        disableRowSelectionOnClick
        sx={{
          backgroundColor: "#fff",
          borderRadius: 2,
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: "#f5f5f5",
            fontWeight: "bold",
          },
          "& .MuiDataGrid-row:hover": {
            backgroundColor: "#fafafa",
          },
        }}
      />

      {/* MODAL */}
      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle>
          {editingRow ? "Edit Pengumuman" : "Tambah Pengumuman"}
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
          <Button onClick={() => setOpen(false)}>Batal</Button>
          <Button variant="contained" onClick={handleSave}>
            Simpan
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
