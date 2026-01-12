"use client";
import Image from "next/image";
import Link from "next/link";

export function JadwalSection() {
    return (
        <section id="jadwal" className="py-8 md:py-8 cursor-default">
            <div className="mx-auto max-w-7xl px-4">
                <div className="mb-12 flex items-center gap-4">
                    <Link href="/" className="inline-flex items-center rounded-md bg-white px-3 text-sm">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-8 text-gray-400">
                            <path strokeLinecap="round" strokeLinejoin="round" d="m11.25 9-3 3m0 0 3 3m-3-3h7.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                        </svg>
                    </Link>

                    <div className="flex-1">
                        <div className="text-blue-600 font-semibold">Jadwal</div>
                        <h1 className="text-3xl md:text-4xl font-bold leading-tight mt-1">
                            Cek Jadwal Anak
                        </h1>
                        <p className="mt-3 max-w-2xl text-sm text-gray-600">
                            Masukkan nomor absen atau scan QR untuk melihat jadwal anak
                        </p>
                    </div>
                </div>

                {/* Input form */}
                <form className="mb-8 flex flex-col gap-3 sm:flex-row sm:items-center">
                    <input
                        type="text"
                        name="nomorAbsen"
                        placeholder="Masukkan nomor absen"
                        className="flex-1 rounded-md border border-gray-200 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-200"
                    />

                    <button
                        type="submit"
                        className="rounded-md bg-blue-600 px-6 py-3 text-white font-semibold hover:bg-blue-700"
                    >
                        Lihat Jadwal
                    </button>
                </form>

                {/* QR + Image area */}
                <div className="grid grid-cols-1 gap-6 md:grid-cols-3 shadow-xl rounded-md">
                    <div className="flex items-center justify-center p-6">
                        <div className="flex h-56 w-56 items-center justify-center bg-gray-50 text-gray-400">
                            {/* Temporary */}
                            <Image
                                src="/assets/images/qrcode.png"
                                alt="placeholder"
                                width={300}
                                height={300}
                                className="object-contain"
                            />
                        </div>
                    </div>

                    <div className="flex items-center justify-center p-6">
                        <div className="grid grid-rows-2">
                            <h1 className="text-3xl md:text-4xl font-bold leading-tight mt-1">
                                Scan QR Code
                            </h1>
                            <p className="mt-3 max-w-2xl text-sm text-gray-800">
                                Untuk melihat jadwal anak secara cepat dan mudah
                            </p>
                        </div>
                    </div>

                    <div className="flex items-center justify-center">
                        <div className="relative h-75 w-full overflow-hidden">
                            <div className="absolute right-0 -bottom-30 transform -rotate-45 scale-110">
                                <Image
                                    src="/assets/images/hand.png"
                                    alt="hand"
                                    width={520}
                                    height={520}
                                    className="object-contain"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
