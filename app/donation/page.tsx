"use client";

// import { useState } from "react";
// import { donationData } from "@/components/features/donation/donation.data";
import DonationFilter from "@/components/features/donation/donationFilter";
import DonationList from "@/components/features/donation/donationList";
import { useDonations } from "@/components/features/donation/use-donation";

export default function DonationPage() {
    const { activeTab, setActiveTab, data } = useDonations();

    return (
        <>
            <DonationFilter value={activeTab} onChange={setActiveTab} />

            <div className="mt-6">
                <DonationList data={data} />
            </div>
        </>
    );
}
