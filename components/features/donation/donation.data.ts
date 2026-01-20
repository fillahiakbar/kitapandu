import { Donation } from "./donation.types";
import { donationAllocations } from "./donationAllocation.data";

export const donationData: Donation[] = [
    // =====================
    // OPEN
    // =====================
    {
        id: 1,
        name: "Bantuan Korban Banjir",
        description: "Membantu korban banjir dengan kebutuhan pangan dan tempat tinggal.",
        collected: 45000000,
        target: 100000000,
        progress: 45,
        status: "open",
        image: "/assets/images/donations/donation.jpg",
        slug: "bantuan-korban-banjir",
        actionUrl: "#",
    },
    {
        id: 2,
        name: "Pendidikan Anak Desa",
        description: "Dukungan pendidikan untuk anak-anak di daerah terpencil.",
        collected: 80000000,
        target: 150000000,
        progress: 53,
        status: "open",
        image: "/assets/images/donations/donation.jpg",
        slug: "pendidikan-anak-desa",
        actionUrl: "#",
    },
    {
        id: 3,
        name: "Bantuan Medis Gratis",
        description: "Pendanaan layanan medis gratis untuk masyarakat kurang mampu.",
        collected: 30000000,
        target: 90000000,
        progress: 33,
        status: "open",
        image: "/assets/images/donations/donation.jpg",
        slug: "bantuan-medis-gratis",
        actionUrl: "#",
    },

    // =====================
    // UPCOMING
    // =====================
    {
        id: 4,
        name: "Paket Sembako Ramadan",
        description: "Program berbagi paket sembako menjelang bulan Ramadan.",
        collected: 0,
        target: 200000000,
        progress: 0,
        status: "upcoming",
        image: "/assets/images/donations/donation.jpg",
        slug: "paket-sembako-ramadan",
    },
    {
        id: 5,
        name: "Air Bersih untuk Desa",
        description: "Pembangunan akses air bersih di desa terpencil.",
        collected: 0,
        target: 250000000,
        progress: 0,
        status: "upcoming",
        image: "/assets/images/donations/donation.jpg",
        slug: "air-bersih-untuk-desa",
    },
    {
        id: 6,
        name: "Beasiswa Anak Yatim",
        description: "Program beasiswa pendidikan untuk anak yatim.",
        collected: 0,
        target: 120000000,
        progress: 0,
        status: "upcoming",
        image: "/assets/images/donations/donation.jpg",
        slug: "beasiswa-anak-yatim",
    },

    // =====================
    // SELESAI
    // =====================
    {
        id: 7,
        name: "Bantuan Gempa Bumi",
        description: "Respon cepat untuk korban gempa bumi.",
        collected: 100000000,
        target: 100000000,
        progress: 100,
        status: "selesai",
        image: "/assets/images/donations/donation.jpg",
        slug: "bantuan-gempa-bumi",
        allocations: donationAllocations.filter(a => a.donationId === 7),
    },
    {
        id: 8,
        name: "Operasi Gratis",
        description: "Program operasi gratis bagi pasien yang membutuhkan.",
        collected: 85000000,
        target: 85000000,
        progress: 100,
        status: "selesai",
        image: "/assets/images/donations/donation.jpg",
        slug: "operasi-gratis",
        allocations: donationAllocations.filter(a => a.donationId === 8),
    },
    {
        id: 9,
        name: "Donasi Pakaian Musim Dingin",
        description: "Distribusi pakaian musim dingin untuk masyarakat rentan.",
        collected: 60000000,
        target: 60000000,
        progress: 100,
        status: "selesai",
        image: "/assets/images/donations/donation.jpg",
        slug: "donasi-pakaian-musim-dingin",
    },
];
