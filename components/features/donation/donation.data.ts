import { Donation, DonationStatus } from "./donation.types";
import { donationAllocations } from "./donationAllocation.data";

export const donationData: Donation[] = [
    // =====================
    // OPEN
    // =====================
    {
        donation_id: "thisuuid1",
        title: "Bantuan Korban Banjir",
        description: "Membantu korban banjir dengan kebutuhan pangan dan tempat tinggal.",
        collected_amount: 45000000,
        target_amount: 100000000,
        percent: 45,
        status: DonationStatus.open,
        image: "/assets/images/donations/donation.jpg",
        // slug: "bantuan-korban-banjir",
        google_form_url: "#",
    },
    {
        donation_id: "thisuuid2",
        title: "Pendidikan Anak Desa",
        description: "Dukungan pendidikan untuk anak-anak di daerah terpencil.",
        collected_amount: 80000000,
        target_amount: 150000000,
        percent: 53,
        status: DonationStatus.open,
        image: "/assets/images/donations/donation.jpg",
        // slug: "pendidikan-anak-desa",
        google_form_url: "#",
    },
    {
        donation_id: "thisuuid3",
        title: "Bantuan Medis Gratis",
        description: "Pendanaan layanan medis gratis untuk masyarakat kurang mampu.",
        collected_amount: 30000000,
        target_amount: 90000000,
        percent: 33,
        status: DonationStatus.open,
        image: "/assets/images/donations/donation.jpg",
        // slug: "bantuan-medis-gratis",
        google_form_url: "#",
    },

    // =====================
    // UPCOMING
    // =====================
    {
        donation_id: "thisuuid4",
        title: "Paket Sembako Ramadan",
        description: "Program berbagi paket sembako menjelang bulan Ramadan.",
        collected_amount: 0,
        target_amount: 200000000,
        percent: 0,
        status: DonationStatus.upcoming,
        image: "/assets/images/donations/donation.jpg",
        // slug: "paket-sembako-ramadan",
    },
    {
        donation_id: "thisuuid5",
        title: "Air Bersih untuk Desa",
        description: "Pembangunan akses air bersih di desa terpencil.",
        collected_amount: 0,
        target_amount: 250000000,
        percent: 0,
        status: DonationStatus.upcoming,
        image: "/assets/images/donations/donation.jpg",
        // slug: "air-bersih-untuk-desa",
    },
    {
        donation_id: "thisuuid6",
        title: "Beasiswa Anak Yatim",
        description: "Program beasiswa pendidikan untuk anak yatim.",
        collected_amount: 0,
        target_amount: 120000000,
        percent: 0,
        status: DonationStatus.upcoming,
        image: "/assets/images/donations/donation.jpg",
        // slug: "beasiswa-anak-yatim",
    },

    // =====================
    // SELESAI
    // =====================
    {
        donation_id: "thisuuid7",
        title: "Bantuan Gempa Bumi",
        description: "Respon cepat untuk korban gempa bumi.",
        collected_amount: 100000000,
        target_amount: 100000000,
        percent: 100,
        status: DonationStatus.finished,
        image: "/assets/images/donations/donation.jpg",
        // slug: "bantuan-gempa-bumi",
        allocations: donationAllocations.filter(a => a.donation_id === "thisuuid7"),
    },
    {
        donation_id: "thisuuid8",
        title: "Operasi Gratis",
        description: "Program operasi gratis bagi pasien yang membutuhkan.",
        collected_amount: 85000000,
        target_amount: 85000000,
        percent: 100,
        status: DonationStatus.finished,
        image: "/assets/images/donations/donation.jpg",
        // slug: "operasi-gratis",
        allocations: donationAllocations.filter(a => a.donation_id === "thisuuid8"),
    },
    {
        donation_id: "thisuuid9",
        title: "Donasi Pakaian Musim Dingin",
        description: "Distribusi pakaian musim dingin untuk masyarakat rentan.",
        collected_amount: 60000000,
        target_amount: 60000000,
        percent: 100,
        status: DonationStatus.finished,
        image: "/assets/images/donations/donation.jpg",
        // slug: "donasi-pakaian-musim-dingin",
    },
];
