"use client";

import { useEffect, useState } from "react";
import { apiFetch } from "@/lib/api";
import {
  DonationForm,
  DonationStatus,
  apiToUiStatus,
  uiToApiStatus,
} from "../utils/donationUtils";

export interface Donation {
  donation_id: string;
  title: string;
  status: DonationStatus;
  target_amount: number;
  collected_amount: number;
  percent: number;
  google_form_url: string;
  image?: string | null;
  start_date: string;
  end_date: string;
  created_at: string;
  updated_at: string;
  allocations?: any[];
}

export const useDonations = () => {
  const [donations, setDonations] = useState<Donation[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchDonations = async () => {
    setLoading(true);
    try {
      const res = await apiFetch("/donations");

      const mapped = res.data.map((item: any) => ({
        ...item,
        status: apiToUiStatus(item.status),
      }));

      setDonations(mapped);
    } finally {
      setLoading(false);
    }
  };

  const addDonation = async (form: DonationForm) => {
    await apiFetch("/donations", {
      method: "POST",
      body: JSON.stringify({
        ...form,
        status: uiToApiStatus(form.status),
      }),
    });
    fetchDonations();
  };

  const updateDonation = async (id: string, form: DonationForm) => {
    await apiFetch(`/donations/${id}`, {
      method: "PUT",
      body: JSON.stringify({
        ...form,
        status: uiToApiStatus(form.status),
      }),
    });
    fetchDonations();
  };

  const deleteDonation = async (id: string) => {
    if (!confirm("Hapus donasi ini?")) return;
    await apiFetch(`/donations/${id}`, { method: "DELETE" });
    fetchDonations();
  };

  useEffect(() => {
    fetchDonations();
  }, []);

  return {
    donations,
    loading,
    addDonation,
    updateDonation,
    deleteDonation,
  };
};
