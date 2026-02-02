import { useEffect, useMemo, useState } from "react";
import { Donation, DonationStatus, Pagination } from "./donation.types";
import { DonationFilterValue } from "./donationFilter"

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL

export function useDonations() {
    const [activeTab, setActiveTab] = useState<DonationFilterValue>(
        "open"
    );

    const [donations, setDonations] = useState<Donation[]>([]);
    const [pagination, setPagination] = useState<Pagination | null>(null);

    const [page, setPage] = useState(1);
    const limit = 25;

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchDonation = async () => {
            try {
                setLoading(true);
                if (!API_BASE_URL) {
                    throw new Error("API base URL is not defined");
                }
                const res = await fetch(
                    `${API_BASE_URL}/donations?page=${page}&limit=${limit}`
                );

                if (!res.ok) {
                    throw new Error(`Failed to fetch donations`);
                }

                const json = await res.json();
                setDonations(json.data);
                setPagination(json.pagination);
                setError(null);
            } catch (err) {
                setError(err instanceof Error ? err.message : "Unknow error");
                setDonations([]);
            } finally {
                setLoading(false);
            }
        };

        fetchDonation();
    }, [page]);

    const filteredDonations = useMemo(() => {
        return donations.filter((a) => a.status === activeTab);
    }, [donations, activeTab]);

    return {
        data: filteredDonations,
        pagination,
        activeTab,
        setActiveTab,
        page,
        setPage,
        loading,
        error
    }
}