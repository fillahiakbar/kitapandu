export const announcementCategories = [
  "jadwal",
  "libur",
  "event",
  "informasi umum",
];

export const getCategoryLabel = (category: string) => {
  switch (category) {
    case "jadwal":
      return "Jadwal";
    case "libur":
      return "Libur";
    case "event":
      return "Event";
    case "informasi umum":
      return "Informasi Umum";
    default:
      return category;
  }
};
