"use client";

import { AnnouncementHeader } from "../components/AnnouncementHeader";
import { AnnouncementTabs } from "../components/AnnouncementTabs";
import { AnnouncementList } from "../components/AnnouncementList";
import { useAnnouncements } from "../hooks/use-announcements";

export default function AnnounPage() {
  const { activeTab, setActiveTab, data } = useAnnouncements();

  return (
    <div className="mx-auto max-w-7xl px-4 py-8">
      <AnnouncementHeader />
      <AnnouncementTabs active={activeTab} onChange={setActiveTab} />
      <AnnouncementList data={data} />
    </div>
  );
}
