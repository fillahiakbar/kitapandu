"use client";

import { useState } from "react";
import {
  Box,
  Typography,
  Button,
  IconButton,
  Stack,
  Chip,
} from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

import { useClasses } from "./hooks/useClasses";
import ClassDialog from "./ClassDialog";
import { getStatusLabel, getStatusColor } from "./utils/classUtils";

export default function ClassesPage() {
  const { classes, addClass, updateClass, deleteClass } = useClasses();

  const [open, setOpen] = useState(false);
  const [editingData, setEditingData] = useState<any>(null);

  const handleSave = (form: any) => {
    if (editingData) {
      updateClass(editingData.class_id, form);
    } else {
      addClass(form);
    }
    setOpen(false);
  };

  const columns: GridColDef[] = [
    { field: "name", headerName: "Nama Kelas", flex: 1 },
    { field: "age_range", headerName: "Umur", width: 150 },
    { field: "period", headerName: "Periode", width: 150 },
    {
      field: "status",
      headerName: "Status",
      width: 140,
      renderCell: (params) => (
        <Chip
          label={getStatusLabel(params.value)}
          color={getStatusColor(params.value)}
          size="small"
        />
      ),
    },
    {
      field: "actions",
      headerName: "Aksi",
      width: 120,
      renderCell: (params) => (
        <>
          <IconButton
            onClick={() => {
              setEditingData(params.row);
              setOpen(true);
            }}
          >
            <EditIcon />
          </IconButton>
          <IconButton
            color="error"
            onClick={() => deleteClass(params.row.class_id)}
          >
            <DeleteIcon />
          </IconButton>
        </>
      ),
    },
  ];

  return (
    <Box p={3}>
      <Stack direction="row" justifyContent="space-between" mb={2}>
        <Typography variant="h4" fontWeight={600}>
          Daftar Kelas
        </Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => {
            setEditingData(null);
            setOpen(true);
          }}
        >
          Tambah Kelas
        </Button>
      </Stack>

      <DataGrid
        rows={classes}
        columns={columns}
        getRowId={(row) => row.class_id}
        autoHeight
        pageSizeOptions={[5, 10]}
      />

      <ClassDialog
        open={open}
        onClose={() => setOpen(false)}
        onSave={handleSave}
        initialData={editingData}
      />
    </Box>
  );
}
