// components/features/programs/programs.data.ts

export type ProgramSchedule = {
  id: number;
  title: string;
  programSlug: string;
  age: string;
  period: string;
  schedule: string;
  image: string;
  month: "current" | "next" | "upcoming";
};

export const programs: ProgramSchedule[] = [
  {
    id: 1,
    title: "Roblox Studio",
    programSlug: "roblox-studio-1",
    age: "9–12 Tahun",
    period: "Februari – Maret 2026",
    schedule: "Sabtu | 10.00 – 11.30",
    image: "/images/programs/roblox-1.jpg",
    month: "current",
  },
  {
    id: 2,
    title: "Roblox Studio",
    programSlug: "roblox-studio-2",
    age: "9–12 Tahun",
    period: "Februari – Maret 2026",
    schedule: "Sabtu | 10.00 – 11.30",
    image: "/images/programs/roblox-2.jpg",
    month: "current",
  },
  {
    id: 3,
    title: "Roblox Studio",
    programSlug: "roblox-studio-3",
    age: "7–9 Tahun",
    period: "Februari – Maret 2026",
    schedule: "Senin | 15.30 – 16.30",
    image: "/images/programs/roblox-3.jpg",
    month: "current",
  },
  {
    id: 4,
    title: "Roblox Studio",
    programSlug: "roblox-studio-4",
    age: "9–12 Tahun",
    period: "Maret – April 2026",
    schedule: "Rabu | 16.00 – 17.30",
    image: "/images/programs/roblox-4.jpg",
    month: "next",
  },
  {
    id: 5,
    title: "Roblox Studio",
    programSlug: "roblox-studio-5",
    age: "13–15 Tahun",
    period: "April – Mei 2026",
    schedule: "Jumat | 16.00 – 17.30",
    image: "/images/programs/roblox-5.jpg",
    month: "upcoming",
  },
];
