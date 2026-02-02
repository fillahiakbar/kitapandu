// DonationDetailModal.tsx
"use client";

import { Donation, DonationAllocation } from "@/components/features/donation/donation.types";
import { formatDate } from "@/utils/formattedDate";

type Props = {
    donation: Donation;
    onClose: () => void;
};

export default function DonationDetailModal({ donation, onClose }: Props) {
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
            <div className="bg-white rounded-xl w-full max-w-2xl p-8 relative">

                {/* Header */}
                <h2 className="text-2xl font-semibold text-center">
                    Detail Donasi
                </h2>
                <p className="text-center text-gray-500 mt-1">
                    Terima kasih telah berkontribusi untuk pendidikan anak
                </p>

                {/* Status */}
                <div className="mt-6 flex items-start gap-3 bg-green-50 rounded-lg p-4">
                    <div className="flex h-6 w-6 items-center justify-center rounded-full bg-green-500 text-white text-sm">
                        ✓
                    </div>
                    <div>
                        <p className="font-medium text-green-700">
                            Donasi Telah Disalurkan
                        </p>
                        <p className="text-sm text-green-600">
                            Tanggal Selesai: {formatDate(donation.end_date)}
                        </p>
                    </div>
                </div>

                {/* Summary */}
                <div className="mt-4 grid grid-cols-2 gap-4 bg-blue-50 rounded-lg p-4 text-sm">
                    <div>
                        <p className="text-blue-600 font-medium">
                            Total Donasi Terkumpul
                        </p>
                        <p className="text-lg font-semibold text-blue-700">
                            Rp {donation.collected_amount.toLocaleString("id-ID")}
                        </p>
                        <p className="text-gray-500">
                            Jumlah Donatur: {donation.jumlah_donatur}
                        </p>
                    </div>

                    <div className="text-right">
                        <p className="text-blue-600 font-medium">
                            Periode Donasi
                        </p>
                        <p className="text-gray-600">
                            {formatDate(donation.start_date)} - {formatDate(donation.end_date)}
                        </p>
                    </div>
                </div>

                {/* Allocation */}
                <div className="mt-6">
                    <h3 className="font-medium mb-4">
                        Tracking Penyaluran Donasi
                    </h3>

                    <div className="space-y-4">
                        {donation.allocations && donation.allocations.length > 0 ? (
                            donation.allocations.map((item, idx) => (
                                <div key={idx}>
                                    <div className="flex justify-between text-sm mb-1">
                                        <span className="text-gray-700">
                                            {item.title}
                                        </span>
                                        <span className="text-gray-500">
                                            {item.percent}%
                                        </span>
                                    </div>

                                    <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                                        <div
                                            className="h-full bg-blue-600 rounded-full"
                                            style={{ width: `${item.percent}%` }}
                                        />
                                    </div>
                                </div>
                            ))
                        ) : (
                            <p className="text-sm text-gray-500">Tidak ada data penyaluran dana</p>
                        )}
                    </div>
                </div>

                {/* Footer */}
                <div className="mt-8 flex justify-end">
                    <button
                        onClick={onClose}
                        className="px-8 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                    >
                        Tutup
                    </button>
                </div>
            </div>
        </div>
    );
}
