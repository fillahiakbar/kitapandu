"use client";

import { useState } from "react";
import DonationCard from "./donationCard";
import DonationDetailModal from "./donationDetailModal";
import { Donation } from "./donation.types";

interface DonationsListProps {
    data: Donation[];
    loading?: boolean;
    error?: string | null;
}

export function DonationList({ data, loading, error }: DonationsListProps) {

    if (loading) {
        return (
            <div className="space-y-6">
                {[...Array(3)].map((_, i) => (
                    <div
                        key={i}
                        className="h-32 rounded-lg bg-gray-200 animate-pulse"
                    />
                ))}
            </div>
        )
    }

    if (error) {
        return (
            <div className="rounded-lg bg-red-50 p-4 text-red-700">
                <p className="font-semibold">Error loading donations</p>
                <p className="text-sm">{error}</p>
            </div>
        );
    }

    if (data.length == 0) {
        return (
            <div className="rounded-lg bg-gray-50 p-8 text-center mb-20 text-gray-500">
                <p>No donations found</p>
            </div>
        );
    }

    const [selectedDonation, setSelectedDonation] = useState<Donation | null>(null);
    return (
        <>
            <div className="space-y-6">
                {data.map((item) => (
                    <DonationCard
                        key={item.donation_id}
                        donation={item}
                        onDetail={setSelectedDonation}
                    />
                ))}
            </div>
            {selectedDonation && (
                <DonationDetailModal
                    donation={selectedDonation}
                    onClose={() => setSelectedDonation(null)}
                />
            )}
        </>
    );
};

export default DonationList;
