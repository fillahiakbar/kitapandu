"use client";

import React, { useState } from "react";
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

import { useStudents } from "./hooks/useStudents";
import StudentDialog from "./StudentDialog";

export default function StudentsPage() {
  const { students, addStudent, updateStudent, deleteStudent } = useStudents();

  const [open, setOpen] = useState(false);
  const [editingData, setEditingData] = useState<any>(null);

  const handleAdd = () => {
    setEditingData(null);
    setOpen(true);
  };

  const handleEdit = (row: any) => {
    setEditingData(row);
    setOpen(true);
  };

  const handleSave = (form: any) => {
    if (editingData) {
      updateStudent(editingData.student_id, form);
    } else {
      addStudent(form);
    }
    setOpen(false);
  };

  const columns: GridColDef[] = [
    {
      field: "student_name",
      headerName: "Nama Siswa",
      flex: 1,
      minWidth: 180,
    },
    {
      field: "student_age",
      headerName: "Umur",
      width: 100,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "parent_name",
      headerName: "Nama Orang Tua",
      flex: 1,
      minWidth: 180,
    },
    {
      field: "whatsapp",
      headerName: "WhatsApp",
      width: 160,
      renderCell: (params) => (
        <Chip
          label={params.value}
          size="small"
          color="success"
          variant="outlined"
        />
      ),
    },
    {
      field: "actions",
      headerName: "Aksi",
      width: 130,
      sortable: false,
      align: "center",
      renderCell: (params) => (
        <>
          <IconButton color="primary" onClick={() => handleEdit(params.row)}>
            <EditIcon />
          </IconButton>
          <IconButton
            color="error"
            onClick={() => deleteStudent(params.row.student_id)}
          >
            <DeleteIcon />
          </IconButton>
        </>
      ),
    },
  ];

  return (
    <Box p={3}>
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        mb={2}
      >
        <Typography variant="h4" fontWeight={600}>
          Data Siswa
        </Typography>

        <Button variant="contained" startIcon={<AddIcon />} onClick={handleAdd}>
          Tambah Siswa
        </Button>
      </Stack>

      <Box
        sx={{
          backgroundColor: "white",
          borderRadius: 2,
          boxShadow: 1,
        }}
      >
        <DataGrid
          rows={students}
          columns={columns}
          getRowId={(row) => row.student_id}
          autoHeight
          pageSizeOptions={[5, 10]}
          disableRowSelectionOnClick
          sx={{
            border: "none",
            "& .MuiDataGrid-columnHeaders": {
              backgroundColor: "#f5f5f5",
              fontWeight: "bold",
            },
            "& .MuiDataGrid-row:hover": {
              backgroundColor: "#fafafa",
            },
          }}
        />
      </Box>

      <StudentDialog
        open={open}
        onClose={() => setOpen(false)}
        onSave={handleSave}
        initialData={editingData}
      />
    </Box>
  );
}
