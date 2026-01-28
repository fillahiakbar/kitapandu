export const classStatuses = ["DRAFT", "ACTIVE", "INACTIVE"] as const;

export type ClassStatus = (typeof classStatuses)[number];

export interface ClassForm {
  name: string;
  age_range: string;
  period: string;
  status: ClassStatus;
  image?: string;
}

export const getStatusLabel = (status: ClassStatus) => {
  switch (status) {
    case "ACTIVE":
      return "Aktif";
    case "INACTIVE":
      return "Nonaktif";
    case "DRAFT":
      return "Draft";
    default:
      return status;
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
