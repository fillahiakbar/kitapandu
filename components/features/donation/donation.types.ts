export enum DonationStatus {
    open = "open",
    upcoming = "upcoming",
    finished = "finished",
}

export interface DonationAllocation {
    donation_id: string;
    title: string;
    percent: number;
    amount: number;
}

export interface Donation {
    donation_id: string;
    title: string;
    description: string;
    status: DonationStatus;
    target_amount: number;
    collected_amount: number;
    percent: number;
    google_form_url?: string;
    image: string;
    // slug: string;
    start_date?: Date;
    end_date?: Date;
    jumlah_donatur?: number;
    allocations?: DonationAllocation[];
}

export interface Pagination {
    page: number;
    limit: number;
    totalItems: number;
    totalPages: number;
    hasNextPage: boolean;
    hasPrevPage: boolean;
}
