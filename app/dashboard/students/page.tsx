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

import { useStudents } from "./hooks/useStudents";
import StudentDialog from "./StudentDialog";

export default function StudentsPage() {
  const { students, addStudent, updateStudent, deleteStudent } = useStudents();

  const [open, setOpen] = useState(false);
  const [editingData, setEditingData] = useState<any>(null);

  const handleSave = (form: any) => {
    if (editingData) {
      updateStudent(editingData.student_id, form);
    } else {
      addStudent(form);
    }
    setOpen(false);
  };

  const columns: GridColDef[] = [
    { field: "student_name", headerName: "Nama Siswa", flex: 1 },
    {
      field: "student_age",
      headerName: "Umur",
      width: 100,
      align: "center",
    },
    { field: "parent_name", headerName: "Nama Orang Tua", flex: 1 },
    {
      field: "whatsapp",
      headerName: "WhatsApp",
      width: 160,
      renderCell: (params) => (
        <Chip label={params.value} size="small" color="success" />
      ),
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
              setEditingData({
                student_id: params.row.student_id,
                student_name: params.row.student_name,
                student_age: String(params.row.student_age),
                parent_name: params.row.parent_name,
                whatsapp: params.row.whatsapp,
              });
              setOpen(true);
            }}
          >
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
      <Stack direction="row" justifyContent="space-between" mb={2}>
        <Typography variant="h4" fontWeight={600}>
          Data Siswa
        </Typography>

        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => {
            setEditingData(null);
            setOpen(true);
          }}
        >
          Tambah Siswa
        </Button>
      </Stack>

      <DataGrid
        rows={students}
        columns={columns}
        getRowId={(row) => row.student_id}
        autoHeight
        pageSizeOptions={[5, 10]}
        disableRowSelectionOnClick
      />

      <StudentDialog
        open={open}
        onClose={() => setOpen(false)}
        onSave={handleSave}
        initialData={editingData}
      />
    </Box>
  );
}
