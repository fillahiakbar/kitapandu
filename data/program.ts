export type ProgramItem = {
  title: string;
  description: string;
  icon: string;
  active?: boolean;
};

export const PROGRAMS: ProgramItem[] = [
  {
    title: "Coding Dasar",
    description:
      "Belajar logika dan dasar pemrograman dengan cara seru, mudah dipahami, dan sesuai usia anak.",
    icon: "/assets/images/icon-coding.svg",
  },
  {
    title: "Roblox Studio",
    description:
      "Kreasi game seru sambil belajar logika, kreativitas, dan problem solving di Roblox Studio.",
    icon: "/assets/images/icon-game.svg",
  },
  {
    title: "Digital Drawing",
    description:
      "Menggambar dan berekspresi secara digital untuk melatih imajinasi, kreativitas, dan kepercayaan diri anak.",
    icon: "/assets/images/icon-gambar.svg",
  },
  {
    title: "Robotika",
    description:
      "Mengenal teknologi robotik melalui praktik interaktif yang melatih logika dan rasa ingin tahu anak.",
    icon: "/assets/images/icon-robot.svg",
  },
];
