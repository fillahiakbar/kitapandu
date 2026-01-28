"use client";

import React, { useState } from "react";
import {
  Box,
  Typography,
  Button,
  IconButton,
  Stack,
  Chip,
  LinearProgress,
} from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

import { useDonations } from "./hooks/useDonations";
import DonationDialog from "./DonationDialog";
import { getStatusColor, getStatusLabel } from "./utils/donationUtils";

export default function DonationsPage() {
  const { donations, addDonation, updateDonation, deleteDonation } =
    useDonations();

  const [open, setOpen] = useState(false);
  const [editingData, setEditingData] = useState<any>(null);

  const handleSave = (form: any) => {
    if (editingData) {
      updateDonation(editingData.donation_id, form);
    } else {
      addDonation(form);
    }
    setOpen(false);
  };

  const columns: GridColDef[] = [
    { field: "title", headerName: "Judul", flex: 1 },

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
      field: "percent",
      headerName: "Progress",
      width: 200,
      renderCell: (params) => (
        <Box width="100%">
          <LinearProgress variant="determinate" value={params.value} />
          <Typography variant="caption">{params.value}%</Typography>
        </Box>
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
              setEditingData(params.row);
              setOpen(true);
            }}
          >
            <EditIcon />
          </IconButton>
          <IconButton
            color="error"
            onClick={() => deleteDonation(params.row.donation_id)}
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
          Donasi
        </Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => {
            setEditingData(null);
            setOpen(true);
          }}
        >
          Tambah Donasi
        </Button>
      </Stack>

      <DataGrid
        rows={donations}
        columns={columns}
        getRowId={(row) => row.donation_id}
        autoHeight
        pageSizeOptions={[5, 10]}
        disableRowSelectionOnClick
      />

      <DonationDialog
        open={open}
        onClose={() => setOpen(false)}
        onSave={handleSave}
        initialData={editingData}
      />
    </Box>
  );
}
