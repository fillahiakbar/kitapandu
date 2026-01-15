import { AnnouncementCategory } from "./announcement.enum";

export interface Announcement {
  id: string;
  title: string;
  description: string;
  date: string;
  category: AnnouncementCategory;
  label: string;
}
