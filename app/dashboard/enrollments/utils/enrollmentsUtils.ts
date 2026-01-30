export const enrollmentStatuses = ["active", "inactive", "completed"];

export const getEnrollmentStatusLabel = (status: string) => {
  switch (status) {
    case "active":
      return "Aktif";
    case "inactive":
      return "Tidak Aktif";
    case "completed":
      return "Selesai";
    default:
      return status;
  }
};
