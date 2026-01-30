"use client";

import { useState, useEffect } from "react";
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

import { useUsers } from "./hooks/useUsers";
import UserDialog from "./UserDialog";
import { User, UserForm, getRoleLabel } from "./utils/userUtils";
import {jwtDecode}from "jwt-decode";

interface JwtPayload {
  role: "admin" | "operator";
}

export default function UsersPage() {
  const { users, addUser, updateUser, deleteUser } = useUsers();

  const [open, setOpen] = useState(false);
  const [editingData, setEditingData] = useState<User | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const token = document.cookie
      .split("; ")
      .find((c) => c.startsWith("access_token="))
      ?.split("=")[1];

    if (token) {
      const decoded = jwtDecode<JwtPayload>(token);
      setIsAdmin(decoded.role === "admin");
    }
  }, []);

  const handleSave = (form: UserForm) => {
    if (editingData) {
      updateUser(editingData.id, form);
    } else {
      addUser(form);
    }
    setOpen(false);
  };

  const columns: GridColDef[] = [
    { field: "name", headerName: "Nama", flex: 1 },
    { field: "email", headerName: "Email", flex: 1 },
    {
      field: "role",
      headerName: "Role",
      width: 120,
      renderCell: (params) => (
        <Chip label={getRoleLabel(params.value)} size="small" />
      ),
    },
    {
      field: "actions",
      headerName: "Aksi",
      width: 120,
      renderCell: (params) =>
        isAdmin && (
          <>
            <IconButton
              onClick={() => {
                setEditingData(params.row);
                setOpen(true);
              }}
            >
              <EditIcon />
            </IconButton>
            <IconButton color="error" onClick={() => deleteUser(params.row.id)}>
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
          Users
        </Typography>

        {isAdmin && (
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={() => {
              setEditingData(null);
              setOpen(true);
            }}
          >
            Tambah User
          </Button>
        )}
      </Stack>

      <DataGrid
        rows={users}
        columns={columns}
        getRowId={(row) => row.id}
        autoHeight
        pageSizeOptions={[5, 10]}
      />

      <UserDialog
        open={open}
        onClose={() => setOpen(false)}
        onSave={handleSave}
        initialData={
          editingData
            ? {
                email: editingData.email,
                name: editingData.name,
                role: editingData.role,
              }
            : undefined
        }
      />
    </Box>
  );
}
