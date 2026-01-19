"use client";

import { useState } from "react";
import DonationCard from "./donationCard";
import DonationDetailModal from "./DonationDetailModal";
import { Donation } from "./donation.types";

type Props = {
    donations: Donation[];
};

const DonationList = ({ donations }: Props) => {
    const [selectedDonation, setSelectedDonation] = useState<Donation | null>(null);
    return (
        <>
            <div className="space-y-6">
                {donations.map((donation) => (
                    <DonationCard
                        key={donation.id}
                        donation={donation}
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
