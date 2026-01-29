export const classStatuses = ["DRAFT", "ACTIVE", "INACTIVE"] as const;

export type ClassStatus = (typeof classStatuses)[number];

export interface ClassForm {
  name: string;
  age_range: string;
  period: string;
  status: ClassStatus;
  image?: string;
}

/* ===== API <-> UI MAPPER ===== */
export const apiToUiStatus = (status: string): ClassStatus => {
  switch (status.toLowerCase()) {
    case "active":
      return "ACTIVE";
    case "inactive":
      return "INACTIVE";
    default:
      return "DRAFT";
  }
};

export const uiToApiStatus = (status: ClassStatus): string => {
  return status.toLowerCase();
};

/* ===== UI HELPERS ===== */
export const getStatusLabel = (status: ClassStatus) => {
  switch (status) {
    case "ACTIVE":
      return "Aktif";
    case "INACTIVE":
      return "Nonaktif";
    case "DRAFT":
      return "Draft";
  }
};

export const getStatusColor = (status: ClassStatus) => {
  switch (status) {
    case "ACTIVE":
      return "success";
    case "INACTIVE":
      return "error";
    default:
      return "default";
  }
};
