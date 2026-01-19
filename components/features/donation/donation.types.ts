export type DonationStatus = "open" | "upcoming" | "selesai";

export interface DonationAllocation {
    donationId: number; 
    label: string;
    percentage: number;
    amount: number;
}

export interface Donation {
    id: number;
    name: string;
    description: string;
    collected: number;
    target: number;
    progress: number;
    status: DonationStatus;
    image: string;
    slug: string;
    actionUrl?: string;
    tanggal_dibuka?: Date;
    tanggal_ditutup?: Date;
    jumlah_donatur?: number;
    allocations?: DonationAllocation[];
}
