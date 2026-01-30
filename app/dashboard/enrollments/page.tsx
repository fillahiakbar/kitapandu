"use client";

import { Box, Button, Typography, IconButton } from "@mui/material";
import { DataGrid, GridColDef, GridRenderCellParams } from "@mui/x-data-grid";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useState } from "react";

import { useEnrollments, Enrollment } from "./hooks/useEnrollments";
import EnrollmentDialog from "./EnrollmentDialog";

export default function EnrollmentsPage() {
  const { enrollments, loading, saveEnrollment, deleteEnrollment } =
    useEnrollments();

  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<Enrollment | null>(null);

  const columns: GridColDef[] = [
    {
      field: "student",
      headerName: "Siswa",
      flex: 1,
      renderCell: (params: GridRenderCellParams<any, Enrollment>) =>
        params.row.student.student_name,
    },
    {
      field: "class",
      headerName: "Kelas",
      flex: 1,
      renderCell: (params: GridRenderCellParams<any, Enrollment>) =>
        params.row.class.name,
    },
    {
      field: "status",
      headerName: "Status",
      width: 120,
    },
    {
      field: "actions",
      headerName: "Aksi",
      width: 120,
      sortable: false,
      renderCell: (params: GridRenderCellParams<any, Enrollment>) => (
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
            onClick={() => deleteEnrollment(params.row.enrollment_id)}
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
        <Typography variant="h4">Enrollments</Typography>
        <Button
          variant="contained"
          onClick={() => {
            setEditing(null);
            setOpen(true);
          }}
        >
          Tambah Enrollment
        </Button>
      </Box>

      <DataGrid
        rows={enrollments}
        getRowId={(row) => row.enrollment_id}
        columns={columns}
        loading={loading}
        autoHeight
        pageSizeOptions={[5, 10]}
        disableRowSelectionOnClick
      />

      <EnrollmentDialog
        open={open}
        onClose={() => setOpen(false)}
        initialData={editing ?? undefined}
        onSave={async (data) => {
          await saveEnrollment(data);
          setOpen(false);
        }}
      />
    </Box>
  );
}
