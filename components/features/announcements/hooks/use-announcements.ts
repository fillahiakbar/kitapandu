import { useState } from "react";
import { ANNOUNCEMENTS } from "../data/announcements.mock";
import { AnnouncementCategory } from "../domain/announcement.enum";

export function useAnnouncements() {
  const [activeTab, setActiveTab] = useState<AnnouncementCategory>(
    AnnouncementCategory.ALL
  );

  const data =
    activeTab === AnnouncementCategory.ALL
      ? ANNOUNCEMENTS
      : ANNOUNCEMENTS.filter((a) => a.category === activeTab);

  return {
    activeTab,
    setActiveTab,
    data,
  };
}
