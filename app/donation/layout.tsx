import Link from "next/link";

export default function ProgramsLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <main className="mx-auto max-w-7xl px-4 py-8">
            <div className="mb-12 flex items-center gap-4">
                <Link
                    href="/"
                    className="inline-flex items-center rounded-md bg-white px-3 text-sm"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="size-8 text-gray-400"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="m11.25 9-3 3m0 0 3 3m-3-3h7.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                        />
                    </svg>
                </Link>

                <div className="flex-1">
                    <div className="text-blue-600 font-semibold">Program</div>
                    <h1 className="text-3xl md:text-4xl font-bold leading-tight mt-1">
                        Donasi
                    </h1>
                </div>
            </div>

            {children}
        </main>
    );
}
