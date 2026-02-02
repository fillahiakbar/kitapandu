import { Announcement } from "../domain/announcement.type";
import { AnnouncementCard } from "./AnnouncementCard";

interface AnnouncementListProps {
  data: Announcement[];
  loading?: boolean;
  error?: string | null;
}

export function AnnouncementList({ data, loading, error }:
  AnnouncementListProps) {
  // console.log('AnnouncementList data:', data);

  if (loading) {
    return (
      <div className="space-y-6">
        {[...Array(3)].map((_, i) => (
          <div
            key={i}
            className="h-32 rounded-lg bg-gray-200 animate-pulse"
          />
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="rounded-lg bg-red-50 p-4 text-red-700">
        <p className="font-semibold">Error loading announcements</p>
        <p className="text-sm">{error}</p>
      </div>
    );
  }

  if (data.length === 0) {
    return (
      <div className="rounded-lg bg-gray-50 p-8 text-center mb-20 text-gray-500">
        <p>No announcements found</p>
      </div>
    );
  }
  return (
    <div className="space-y-6">
      {data.map((item) => (
        <AnnouncementCard key={item.announcements_id} item={item} />
      ))}
    </div>
  );
}
