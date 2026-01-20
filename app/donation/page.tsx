"use client";

import { useState } from "react";
import { donationData } from "@/components/features/donation/donation.data";
import DonationFilter from "@/components/features/donation/donationFilter";
import DonationList from "@/components/features/donation/donationList";

export default function DonationPage() {
    const [status, setStatus] = useState<
        "open" | "upcoming" | "selesai"
    >("open");

    const filteredDonations = donationData.filter((d) => d.status === status);

    return (
        <>
            <DonationFilter value={status} onChange={setStatus} />

            <div className="mt-6">
                <DonationList donations={filteredDonations} />
            </div>
        </>
    );
}
