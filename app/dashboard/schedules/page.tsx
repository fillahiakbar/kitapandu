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

import { useSchedules } from "./hooks/useSchedules";
import ScheduleDialog from "./ScheduleDialog";

export default function SchedulesPage() {
  const { schedules, addSchedule, updateSchedule, deleteSchedule } =
    useSchedules();

  const [open, setOpen] = useState(false);
  const [editingData, setEditingData] = useState<any>(null);

  const handleSave = (form: any, className: string) => {
    if (editingData) {
      updateSchedule(editingData.schedule_id, form, className);
    } else {
      addSchedule(form, className);
    }
    setOpen(false);
  };

  const columns: GridColDef[] = [
    {
      field: "class_name",
      headerName: "Kelas",
      flex: 1,
    },
    {
      field: "date",
      headerName: "Tanggal",
      width: 160,
      renderCell: (params) => (
        <Chip
          label={params.value}
          color="primary"
          variant="outlined"
          size="small"
        />
      ),
    },
    {
      field: "actions",
      headerName: "Aksi",
      width: 130,
      sortable: false,
      renderCell: (params) => (
        <>
          <IconButton
            color="primary"
            onClick={() => {
              setEditingData({
                class_id: params.row.class_id,
                date: params.row.date,
                schedule_id: params.row.schedule_id,
              });
              setOpen(true);
            }}
          >
            <EditIcon />
          </IconButton>
          <IconButton
            color="error"
            onClick={() => deleteSchedule(params.row.schedule_id)}
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
          Jadwal Kelas
        </Typography>

        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => {
            setEditingData(null);
            setOpen(true);
          }}
        >
          Tambah Jadwal
        </Button>
      </Stack>

      <DataGrid
        rows={schedules}
        columns={columns}
        getRowId={(row) => row.schedule_id}
        autoHeight
        pageSizeOptions={[5, 10]}
        disableRowSelectionOnClick
      />

      <ScheduleDialog
        open={open}
        onClose={() => setOpen(false)}
        onSave={handleSave}
        initialData={editingData}
      />
    </Box>
  );
}
