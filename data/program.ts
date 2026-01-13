export type ProgramItem = {
  title: string;
  slug: string; 
  description: string;
  icon: string;
  active?: boolean;
};

export const PROGRAMS: ProgramItem[] = [
  {
    title: "Basic Learning",
    slug: "basic-learning",
    description: "Belajar logika dan dasar pemrograman dengan cara seru, mudah dipahami, dan sesuai usia anak.",
    icon: "/assets/images/basic-learning.svg",
  },
  {
    title: "Coding Dasar",
    slug: "coding-dasar",
    description:
      "Belajar logika dan dasar pemrograman dengan cara seru, mudah dipahami, dan sesuai usia anak.",
    icon: "/assets/images/icon-coding.svg",
  },
  {
    title: "Roblox Studio",
    slug: "roblox-studio",
    description:
      "Kreasi game seru sambil belajar logika, kreativitas, dan problem solving di Roblox Studio.",
    icon: "/assets/images/icon-game-1.svg",
  },
  {
    title: "Computational Thinking",
    slug: "comp-think",
    description: "Belajar berpikir logis dan menyelesaikan masalah dengan cara yang seru.",
    icon: "/assets/images/comp-think.svg"

  },
  {
    title: "Digital Drawing",
    slug: "digital-drawing",
    description:
      "Menggambar dan berekspresi secara digital untuk melatih imajinasi, kreativitas, dan kepercayaan diri anak.",
    icon: "/assets/images/icon-gambar.svg",
  },
  {
    title: "Robotika & IOT",
    slug: "robotika",
    description:
      "Mengenal teknologi robotik melalui praktik interaktif yang melatih logika dan rasa ingin tahu anak.",
    icon: "/assets/images/icon-robot.svg",
  },
  
];
