import { Program } from "./program.types"
import { programClass } from "./programClass.data"

export const programData: Program[] = [
    {
        program_id: "1",
        name: "Roblox Studio",
        description: "Kreasi game seru sambil belajar logika, kreativitas, dan problem solving di Roblox Studio.",
        icon: "/assets/image/icon-game-1.svg",
        image: "/assets/images/programs/learning.jpg",
        classes: programClass.filter(a => a.program_id === "1"),
    },
    {
        program_id: "2",
        name: "Coding Dasar",
        description: "Belajar logika dan dasar pemrograman dengan cara seru, mudah dipahami, dan sesuai usia anak.",
        icon: "/assets/image/icon-game-1.svg",
        image: "/assets/images/programs/learning.jpg",
        classes: programClass.filter(a => a.program_id === "1"),
    }
]