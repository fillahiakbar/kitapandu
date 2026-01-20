"use client";

export function JadwalForm() {
    return (
        <section id="jadwal" className="py-8 md:py-8 cursor-default">
            <div className="mx-auto max-w-7xl px-4">

                {/* Input form */}
                <p className="mt-3 max-w-2xl text-sm text-gray-600 mb-4">
                    Masukkan nomor absen untuk melihat jadwal anak
                </p>
                <form className="mb-8 flex flex-col gap-3 sm:flex-row sm:items-center mb-45">
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
            </div>
        </section>
    );
}
