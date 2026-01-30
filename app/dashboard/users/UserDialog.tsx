"use client";

import { useEffect, useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  MenuItem,
  Stack,
} from "@mui/material";
import { UserForm, UserRole, getRoleLabel } from "./utils/userUtils";

interface Props {
  open: boolean;
  onClose: () => void;
  onSave: (data: UserForm) => void;
  initialData?: UserForm;
}

const roles: UserRole[] = ["admin", "operator"];

export default function UserDialog({
  open,
  onClose,
  onSave,
  initialData,
}: Props) {
  const [form, setForm] = useState<UserForm>({
    email: "",
    name: "",
    role: "operator",
    password: "",
  });

  useEffect(() => {
    if (initialData) {
      setForm({ ...initialData, password: "" });
    }
  }, [initialData]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    if (!form.email || !form.name) {
      alert("Field wajib belum lengkap");
      return;
    }
    onSave(form);
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle fontWeight={600}>
        {initialData ? "Edit User" : "Tambah User"}
      </DialogTitle>

      <DialogContent>
        <Stack spacing={2} mt={1}>
          <TextField
            label="Nama"
            name="name"
            value={form.name}
            onChange={handleChange}
          />

          <TextField
            label="Email"
            name="email"
            value={form.email}
            onChange={handleChange}
            disabled={!!initialData}
          />

          <TextField
            select
            label="Role"
            name="role"
            value={form.role}
            onChange={handleChange}
          >
            {roles.map((role) => (
              <MenuItem key={role} value={role}>
                {getRoleLabel(role)}
              </MenuItem>
            ))}
          </TextField>

          {!initialData && (
            <TextField
              label="Password"
              name="password"
              type="password"
              value={form.password}
              onChange={handleChange}
            />
          )}
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
