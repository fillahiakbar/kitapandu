"use client";

import React, { useState } from "react";
import {
  Box,
  Typography,
  Button,
  IconButton,
  CircularProgress,
} from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

import { useAnnouncements } from "./hooks/useAnnouncements";
import AnnouncementDialog from "./AnnouncementDialog";

export default function AnnouncementsPage() {
  const { announcements, loading, saveAnnouncement, deleteAnnouncement } =
    useAnnouncements();

  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<any>(null);

  const columns: GridColDef[] = [
    { field: "title", headerName: "Judul", flex: 1 },
    { field: "category", headerName: "Kategori", width: 150 },
    { field: "content", headerName: "Isi", flex: 2 },
    {
      field: "actions",
      headerName: "Aksi",
      width: 120,
      sortable: false,
      renderCell: (params) => (
        <>
          <IconButton
            size="small"
            onClick={() => {
              setEditing(params.row);
              setOpen(true);
            }}
          >
            <EditIcon />
          </IconButton>
          <IconButton
            size="small"
            color="error"
            onClick={() => deleteAnnouncement(params.row.announcements_id)}
          >
            <DeleteIcon />
          </IconButton>
        </>
      ),
    },
  ];

  return (
    <Box p={3}>
      <Box display="flex" justifyContent="space-between" mb={2}>
        <Typography variant="h4">Pengumuman</Typography>
        <Button
          variant="contained"
          onClick={() => {
            setEditing(null);
            setOpen(true);
          }}
        >
          Tambah Pengumuman
        </Button>
      </Box>

      {loading ? (
        <CircularProgress />
      ) : (
        <DataGrid
          rows={announcements}
          getRowId={(row) => row.announcements_id}
          columns={columns}
          autoHeight
          pageSizeOptions={[5, 10]}
          disableRowSelectionOnClick
        />
      )}

      <AnnouncementDialog
        open={open}
        onClose={() => setOpen(false)}
        initialData={editing}
        onSave={async (data) => {
          await saveAnnouncement(data);
          setOpen(false);
        }}
      />
    </Box>
  );
}
