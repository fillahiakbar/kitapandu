import { z } from 'zod';

export const createScheduleSchema = z.object({
  class_id: z.string().uuid(),
  date: z.coerce.date(),
});

export const updateScheduleSchema = z.object({
  class_id: z.string().uuid().optional(),
  date: z.coerce.date().optional(),
});

export type createScheduleSchema = z.infer<typeof createScheduleSchema>;
export type updateScheduleSchema = z.infer<typeof updateScheduleSchema>;
