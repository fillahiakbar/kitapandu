import Link from "next/link";
import { formatDate } from "@/utils/formattedDate";
import { getDayName } from "@/utils/dayOfWeek";

interface PageProps {
  params: Promise<{
    program_id: string;
  }>;
}

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export default async function ProgramPage({ params }: PageProps) {
  const { program_id } = await params;

  const res = await fetch(
    `${API_BASE_URL}/programs/class/${program_id}`,
    { cache: "no-store" }
  );

  const json = await res.json();

  const classes = json.data;
  const program = classes[0]?.program;

  return (
    <div className="mx-auto max-w-7xl px-4 py-8">
      <div className="mb-12 flex items-center gap-4">
        <Link
          href="/programs"
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
            {program.name}
          </h1>
        </div>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {classes.map((item: any) => (
          <div
            key={item.class_id}
            className="flex flex-col rounded-xl border border-gray-200 bg-white shadow-sm hover:shadow-md transition-shadow"
          >
            {/* Image */}
            <div className="relative h-40 w-full overflow-hidden rounded-t-xl bg-gray-100">
              <img
                src={item.image || "/assets/images/class-placeholder.jpg"}
                alt={item.name}
                className="h-full w-full object-cover"
              />
            </div>

            {/* Content */}
            <div className="flex flex-col p-5 flex-grow">
              <h3 className="text-lg font-semibold text-gray-900">
                {item.name}
              </h3>

              <div className="mt-2 space-y-1 text-sm text-gray-600">
                <div>
                  <span className="font-medium">Usia:</span> {`${item.min_age} - ${item.max_age}`}
                </div>
                <div>
                  <span className="font-medium">Periode:</span> {`${formatDate(item.started_at)} - ${formatDate(item.ended_at)}`}
                </div>
                <div>
                  <span className="font-medium">Jadwal:</span> {`${getDayName(item.schedules[0].day_of_week)} | ${item.schedules[0].start_time} - ${item.schedules[0].end_time}`}
                </div>
              </div>

              {/* Action */}
              <Link
                href={`/register?class_id=${item.class_id}`}
                className="mt-3 inline-flex items-center justify-center rounded-md bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700 transition-colors"
              >
                Daftar Sekarang
              </Link>

            </div>
          </div>
        ))}
      </div>

    </div>
  );
}
