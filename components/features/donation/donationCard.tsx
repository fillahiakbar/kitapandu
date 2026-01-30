"use client";

import Image from "next/image";
import Link from "next/link";
import { Donation } from "./donation.types";

type Props = {
    donation: Donation;
    onDetail?: (donation: Donation) => void;
};

const DonationCard: React.FC<Props> = ({ donation, onDetail }) => {
    const safeProgress = Math.min(100, Math.max(0, donation.percent));

    const isOpen = donation.status === "open";
    const isUpcoming = donation.status === "upcoming";
    const isSelesai = donation.status === "finished";

    const buttonLabel = isOpen
        ? "Donasi sekarang"
        : isSelesai
            ? "Detail Donasi"
            : "Segera Hadir";

    const href =
        isOpen && donation.google_form_url
            ? donation.google_form_url
            : undefined;

    const handleClick = () => {
        if (isSelesai && onDetail) {
            onDetail(donation);
        }
    };

    const isExternal = isOpen;

    const Button = (
        <button
            onClick={handleClick}
            disabled={isUpcoming}
            className={`
        mt-5 w-fit px-5 py-2 rounded-lg text-sm font-medium transition
        ${isUpcoming
                    ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                    : "bg-blue-600 text-white hover:bg-blue-700"
                }
      `}
        >
            {buttonLabel}
        </button>
    );

    return (
        <div className="flex bg-white rounded-xl shadow-[0_0_10px_rgba(0,0,0,0.15)] overflow-hidden p-6">
            {/* Image */}
            <div className="relative w-1/3 min-h-[140px]">
                <Image
                    src={donation.image}
                    alt={donation.title}
                    fill
                    className="object-cover rounded-lg"
                    sizes="(max-width: 768px) 100vw, 33vw"
                />
            </div>

            {/* Content */}
            <div className="w-2/3 p-5 flex flex-col justify-between">
                <div>
                    <h3 className="text-lg font-semibold text-gray-900">
                        {donation.title}
                    </h3>

                    <p className="text-sm text-gray-600 mt-2 line-clamp-3">
                        {donation.description}
                    </p>

                    <p className="text-lg mt-4 font-semibold text-blue-600">
                        Rp {donation.collected_amount.toLocaleString("id-ID")}
                    </p>

                    <p className="text-sm text-gray-400 line-clamp-3">
                        Terkumpul dari Rp {donation.target_amount.toLocaleString("id-ID")}
                    </p>

                    {/* Progress */}
                    <div className="flex items-center gap-2">
                        <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                            <div
                                className="h-full bg-blue-600 transition-all"
                                style={{ width: `${safeProgress}%` }}
                            />
                        </div>
                        <span className="text-sm font-medium text-gray-700">
                            {safeProgress}%
                        </span>
                    </div>
                </div>

                {/* Button / Link */}
                {href && !isUpcoming ? (
                    <Link
                        href={href}
                        target={isExternal ? "_blank" : undefined}
                        rel={isExternal ? "noopener noreferrer" : undefined}
                    >
                        {Button}
                    </Link>
                ) : (
                    Button
                )}
            </div>
        </div>
    );
};

export default DonationCard;
