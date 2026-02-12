import { AnnouncementCategory } from "../domain/announcement.enum";
import { Announcement } from "../domain/announcement.type";

export const ANNOUNCEMENTS: Announcement[] = [
  {
    announcements_id: "1",
    title: "Perubahan Jadwal Kelas Roblox Studio",
    content:
      "Kelas hari Sabtu, 15 Februari 2026 dipindahkan ke Minggu, 16 Februari 2026 pukul 10.00–11.30.",
    date: "12 Februari 2026",
    category: AnnouncementCategory.JADWAL,
    label: "Perubahan Jadwal",
  },
  {
    announcements_id: "2",
    title: "Libur Kelas Hari Raya",
    content:
      "Seluruh kegiatan belajar diliburkan pada tanggal 10–11 April 2026. Kelas kembali aktif 12 April 2026.",
    date: "5 April 2026",
    category: AnnouncementCategory.LIBUR,
    label: "Libur",
  },
  {
    announcements_id: "3",
    title: "Kompetisi Coding Anak",
    content:
      "KITAPANDU akan mengadakan kompetisi coding untuk anak-anak di bulan Mei.",
    date: "28 April 2026",
    category: AnnouncementCategory.EVENT,
    label: "Event",
  },
];
