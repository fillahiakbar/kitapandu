"use client";

import { useState } from "react";
import {
  Box,
  Typography,
  Button,
  IconButton,
  Stack,
  Avatar,
} from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

import { usePrograms } from "./hooks/usePrograms";
import ProgramDialog from "./ProgramDialog";

export default function ProgramsPage() {
  const { programs, addProgram, updateProgram, deleteProgram } = usePrograms();

  const [open, setOpen] = useState(false);
  const [editingData, setEditingData] = useState<any>(null);

  const handleSave = (form: any) => {
    if (editingData) {
      updateProgram(editingData.program_id, form);
    } else {
      addProgram(form);
    }
    setOpen(false);
  };

  const columns: GridColDef[] = [
    {
      field: "icon",
      headerName: "",
      width: 80,
      renderCell: (params) => <Avatar>{params.value || "📘"}</Avatar>,
    },
    {
      field: "name",
      headerName: "Nama Program",
      flex: 1,
    },
    {
      field: "description",
      headerName: "Deskripsi",
      flex: 2,
    },
    {
      field: "actions",
      headerName: "Aksi",
      width: 120,
      sortable: false,
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
            onClick={() => deleteProgram(params.row.program_id)}
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
          Program
        </Typography>

        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => {
            setEditingData(null);
            setOpen(true);
          }}
        >
          Tambah Program
        </Button>
      </Stack>

      <DataGrid
        rows={programs}
        columns={columns}
        getRowId={(row) => row.program_id}
        autoHeight
        pageSizeOptions={[5, 10]}
        disableRowSelectionOnClick
      />

      <ProgramDialog
        open={open}
        onClose={() => setOpen(false)}
        onSave={handleSave}
        initialData={editingData}
      />
    </Box>
  );
}
