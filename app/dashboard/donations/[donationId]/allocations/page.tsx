"use client";

import { useParams } from "next/navigation";
import { useState } from "react";
import { Box, Typography, Button, IconButton, Stack } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";

import { useDonationAllocations } from "../../hooks/useDonationAllocations";
import AllocationDialog from "../../AllocationDialog";

export default function DonationAllocationsPage() {
  const { donationId } = useParams<{ donationId: string }>();
  const { allocations, addAllocation, updateAllocation, deleteAllocation } =
    useDonationAllocations(donationId);

  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<any>(null);

  const columns: GridColDef[] = [
    { field: "title", headerName: "Judul", flex: 1 },
    { field: "amount", headerName: "Jumlah", width: 150 },
    { field: "percent", headerName: "Persen (%)", width: 120 },
    {
      field: "actions",
      headerName: "Aksi",
      width: 120,
      renderCell: (params) => (
        <>
          <IconButton
            onClick={() => {
              setEditing(params.row);
              setOpen(true);
            }}
          >
            <EditIcon />
          </IconButton>
          <IconButton
            color="error"
            onClick={() => deleteAllocation(params.row.donation_allocation_id)}
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
          Alokasi Donasi
        </Typography>

        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => {
            setEditing(null);
            setOpen(true);
          }}
        >
          Tambah Alokasi
        </Button>
      </Stack>

      <DataGrid
        rows={allocations}
        getRowId={(row) => row.donation_allocation_id}
        columns={columns}
        autoHeight
      />

      <AllocationDialog
        open={open}
        onClose={() => setOpen(false)}
        initialData={editing}
        onSave={(form) => {
          if (editing) {
            updateAllocation(editing.donation_allocation_id, form);
          } else {
            addAllocation(form);
          }
          setOpen(false);
        }}
      />
    </Box>
  );
}
