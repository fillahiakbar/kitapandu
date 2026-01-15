import Link from "next/link";

export function AnnouncementHeader() {
  return (
    <div className="mb-12 flex items-center gap-4">
      <Link
        href="/"
        className="inline-flex items-center rounded-md bg-white px-3"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          strokeWidth={1.5}
          stroke="currentColor"
          className="size-8 text-gray-400"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="m11.25 9-3 3m0 0 3 3m-3-3h7.5"
          />
        </svg>
      </Link>

      <div className="flex-1">
        <div className="text-blue-600 font-semibold">Program</div>
        <h1 className="text-4xl font-bold">Pengumuman</h1>
        <p className="mt-3 max-w-2xl text-sm text-gray-600">
          Informasi penting seputar kegiatan dari jadwal belajar KITAPANDU
        </p>
      </div>
    </div>
  );
}
