import { Announcement } from "../domain/announcement.type";
import { Badge } from "@/components/ui/Badge";
import { AnnouncementCategory } from "../domain/announcement.enum";
import { formatDate } from "@/utils/formattedDate"

const categoryVariantMap: Record<AnnouncementCategory, any> = {
  all: "umum",
  jadwal: "jadwal",
  libur: "libur",
  event: "event",
  umum: "umum",
};

const categoryLabelMap: Record<AnnouncementCategory, string> = {
  all: "Umum",
  jadwal: "Jadwal",
  libur: "Libur",
  event: "Event",
  umum: "Umum",
}

export function AnnouncementCard({ item }: { item: Announcement }) {
  return (
    <div className="rounded-2xl bg-white p-6 shadow-sm">
      <Badge variant={categoryVariantMap[item.category]}>{categoryLabelMap[item.category]}</Badge>

      <h3 className="mt-4 text-lg font-semibold">{item.title}</h3>

      <p className="mt-2 text-sm text-gray-600">{item.content}</p>

      <div className="mt-4 border-t pt-3 text-xs text-gray-500">
        Tanggal: {formatDate(item.created_at)}
      </div>
    </div>
  );
}
