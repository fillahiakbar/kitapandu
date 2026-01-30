"use client";

import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useStudentsOptions } from "./hooks/useStudentsOptions";
import { useClassesOptions } from "./hooks/useClassesOptions";

interface Props {
  open: boolean;
  onClose: () => void;
  onSave: (data: {
    id?: string;
    student_id: string;
    class_id: string;
    status: string;
  }) => void;
  initialData?: any;
}

export default function EnrollmentDialog({
  open,
  onClose,
  onSave,
  initialData,
}: Props) {
  const students = useStudentsOptions();
  const classes = useClassesOptions();

  const [studentId, setStudentId] = useState("");
  const [classId, setClassId] = useState("");
  const [status, setStatus] = useState("active");

  useEffect(() => {
    if (initialData) {
      setStudentId(initialData.student_id);
      setClassId(initialData.class_id);
      setStatus(initialData.status);
    }
  }, [initialData]);

  const handleSave = () => {
    if (!studentId || !classId) {
      alert("Student dan Class wajib dipilih");
      return;
    }

    onSave({
      id: initialData?.enrollment_id,
      student_id: studentId,
      class_id: classId,
      status,
    });
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>
        {initialData ? "Edit Enrollment" : "Tambah Enrollment"}
      </DialogTitle>

      <DialogContent>
        <FormControl fullWidth margin="normal">
          <InputLabel>Siswa</InputLabel>
          <Select
            value={studentId}
            label="Siswa"
            onChange={(e) => setStudentId(e.target.value)}
          >
            {students.map((s) => (
              <MenuItem key={s.student_id} value={s.student_id}>
                {s.student_name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl fullWidth margin="normal">
          <InputLabel>Kelas</InputLabel>
          <Select
            value={classId}
            label="Kelas"
            onChange={(e) => setClassId(e.target.value)}
          >
            {classes.map((c) => (
              <MenuItem key={c.class_id} value={c.class_id}>
                {c.name} ({c.period})
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl fullWidth margin="normal">
          <InputLabel>Status</InputLabel>
          <Select
            value={status}
            label="Status"
            onChange={(e) => setStatus(e.target.value)}
          >
            <MenuItem value="active">Active</MenuItem>
            <MenuItem value="completed">Completed</MenuItem>
            <MenuItem value="cancelled">Cancelled</MenuItem>
          </Select>
        </FormControl>
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
