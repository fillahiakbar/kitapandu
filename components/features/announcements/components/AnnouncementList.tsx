import { Announcement } from "../domain/announcement.type";
import { AnnouncementCard } from "./AnnouncementCard";

export function AnnouncementList({ data }: { data: Announcement[] }) {
  return (
    <div className="space-y-6">
      {data.map((item) => (
        <AnnouncementCard key={item.id} item={item} />
      ))}
    </div>
  );
}
