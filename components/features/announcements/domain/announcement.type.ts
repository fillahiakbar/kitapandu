import { AnnouncementCategory } from "./announcement.enum";

export interface Announcement {
  announcements_id: string;
  title: string;
  category: AnnouncementCategory;
  content: string;
  created_at: string;
  updated_at: string;
}

export interface Pagination {
  page: number;
  limit: number;
  totalItems: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
}