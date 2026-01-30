"use client";

import { useEffect, useState } from "react";
import { apiFetch } from "@/lib/api";
import { DonationAllocation, AllocationForm } from "../utils/allocationUtils";

export const useDonationAllocations = (donationId: string) => {
  const [allocations, setAllocations] = useState<DonationAllocation[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchAllocations = async () => {
    if (!donationId) return;
    setLoading(true);
    try {
      const res = await apiFetch(`/donations/${donationId}/allocations`);
      setAllocations(res.data);
    } finally {
      setLoading(false);
    }
  };

  const addAllocation = async (form: AllocationForm) => {
    await apiFetch(`/donations/${donationId}/allocations`, {
      method: "POST",
      body: JSON.stringify(form),
    });
    fetchAllocations();
  };

  const updateAllocation = async (
    allocationId: string,
    form: AllocationForm,
  ) => {
    await apiFetch(`/donations/${donationId}/allocations/${allocationId}`, {
      method: "PUT",
      body: JSON.stringify(form),
    });
    fetchAllocations();
  };

  const deleteAllocation = async (allocationId: string) => {
    if (!confirm("Hapus alokasi ini?")) return;
    await apiFetch(`/donations/${donationId}/allocations/${allocationId}`, {
      method: "DELETE",
    });
    fetchAllocations();
  };

  useEffect(() => {
    fetchAllocations();
  }, [donationId]);

  return {
    allocations,
    loading,
    addAllocation,
    updateAllocation,
    deleteAllocation,
  };
};
