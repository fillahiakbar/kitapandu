"use client";

import { useState } from "react";
import { DonationForm, DonationStatus } from "../utils/donationUtils";

export interface Donation {
  donation_id: string;
  title: string;
  status: DonationStatus;
  target_amount: number;
  collected_amount: number;
  percent: number;
  google_form_url: string;
  start_date: string;
  end_date: string;
}

const initialDonations: Donation[] = [
  {
    donation_id: "1",
    title: "Donasi Renovasi Masjid",
    status: "ACTIVE",
    target_amount: 10000000,
    collected_amount: 3500000,
    percent: 35,
    google_form_url: "https://forms.gle/example",
    start_date: "2025-01-01",
    end_date: "2025-03-01",
  },
];

export const useDonations = () => {
  const [donations, setDonations] = useState<Donation[]>(initialDonations);

  const addDonation = (form: DonationForm) => {
    const percent = Math.floor(
      (form.collected_amount / form.target_amount) * 100,
    );

    setDonations((prev) => [
      ...prev,
      {
        donation_id: crypto.randomUUID(),
        ...form,
        percent,
      },
    ]);
  };

  const updateDonation = (id: string, form: DonationForm) => {
    const percent = Math.floor(
      (form.collected_amount / form.target_amount) * 100,
    );

    setDonations((prev) =>
      prev.map((d) => (d.donation_id === id ? { ...d, ...form, percent } : d)),
    );
  };

  const deleteDonation = (id: string) => {
    if (!confirm("Hapus donasi ini?")) return;
    setDonations((prev) => prev.filter((d) => d.donation_id !== id));
  };

  return {
    donations,
    addDonation,
    updateDonation,
    deleteDonation,
  };
};
