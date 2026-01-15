import { Announcement } from "../domain/announcement.type";
import { Badge } from "@/components/ui/Badge";
import { AnnouncementCategory } from "../domain/announcement.enum";

const categoryVariantMap: Record<AnnouncementCategory, any> = {
  all: "umum",
  jadwal: "jadwal",
  libur: "libur",
  event: "event",
  umum: "umum",
};

export function AnnouncementCard({ item }: { item: Announcement }) {
  return (
    <div className="rounded-2xl bg-white p-6 shadow-sm">
      <Badge variant={categoryVariantMap[item.category]}>{item.label}</Badge>

      <h3 className="mt-4 text-lg font-semibold">{item.title}</h3>

      <p className="mt-2 text-sm text-gray-600">{item.description}</p>

      <div className="mt-4 border-t pt-3 text-xs text-gray-500">
        Tanggal: {item.date}
      </div>
    </div>
  );
}
