export const getDayName = (day: number, locale: "id" | "en" = "id") => {
  const map = {
    id: ["", "Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu", "Minggu"],
    en: ["", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
  }

  return map[locale][day] ?? "-"
}
