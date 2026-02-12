import { AnnouncementCategory } from "./announcement.enum";

export interface Announcement {
  announcements_id: string;
  title: string;
  category: AnnouncementCategory;
  content: string;
  date: string;
  label: string;
}

export interface Pagination {
  page: number;
  limit: number;
  totalItems: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
}