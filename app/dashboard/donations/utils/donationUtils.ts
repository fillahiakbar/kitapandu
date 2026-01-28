export const donationStatuses = [
  "DRAFT",
  "ACTIVE",
  "COMPLETED",
  "CANCELLED",
] as const;

export type DonationStatus = (typeof donationStatuses)[number];

export interface DonationForm {
  title: string;
  status: DonationStatus;
  target_amount: number;
  collected_amount: number;
  google_form_url: string;
  start_date: string;
  end_date: string;
}

export const getStatusLabel = (status: DonationStatus) => {
  switch (status) {
    case "DRAFT":
      return "Draft";
    case "ACTIVE":
      return "Aktif";
    case "COMPLETED":
      return "Selesai";
    case "CANCELLED":
      return "Dibatalkan";
    default:
      return status;
  }
};

export const getStatusColor = (status: DonationStatus) => {
  switch (status) {
    case "ACTIVE":
      return "success";
    case "COMPLETED":
      return "primary";
    case "CANCELLED":
      return "error";
    default:
      return "default";
  }
};
