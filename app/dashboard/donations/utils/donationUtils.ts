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

/* ===== API <-> UI STATUS MAPPER ===== */
// API: open | completed | cancelled
export const apiToUiStatus = (status: string): DonationStatus => {
  switch (status.toLowerCase()) {
    case "open":
      return "ACTIVE";
    case "completed":
      return "COMPLETED";
    case "cancelled":
      return "CANCELLED";
    default:
      return "DRAFT";
  }
};

export const uiToApiStatus = (status: DonationStatus): string => {
  switch (status) {
    case "ACTIVE":
      return "open";
    case "COMPLETED":
      return "completed";
    case "CANCELLED":
      return "cancelled";
    default:
      return "draft";
  }
};

/* ===== UI HELPERS ===== */
export const getStatusLabel = (status: DonationStatus) => {
  switch (status) {
    case "ACTIVE":
      return "Aktif";
    case "COMPLETED":
      return "Selesai";
    case "CANCELLED":
      return "Dibatalkan";
    case "DRAFT":
      return "Draft";
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
