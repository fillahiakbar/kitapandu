"use client";

import DonationCard from "./donationCard";
import { Donation } from "./donation.data";

type Props = {
    donations: Donation[];
};

const DonationList = ({ donations }: Props) => {
    return (
        <div className="space-y-6">
            {donations.map((donation) => (
                <DonationCard
                    key={donation.id}
                    donation={donation}
                />
            ))}
        </div>
    );
};

export default DonationList;
