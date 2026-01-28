import { z } from 'zod';
import { ClassStatus } from '@prisma/client';

export const createClassSchema = z.object({
  program_id: z.string().uuid(),
  mentor_id: z.string().uuid(),
  name: z.string().min(1).max(255),
  age_range: z.string(),
  period: z.string(),
  status: z.nativeEnum(ClassStatus),
  image: z.string().optional(),
});

export const updateClassSchema = z.object({
  program_id: z.string().uuid().optional(),
  mentor_id: z.string().uuid().optional(),
  name: z.string().min(1).max(255).optional(),
  age_range: z.string().optional(),
  period: z.string().optional(),
  status: z.nativeEnum(ClassStatus).optional(),
  image: z.string().optional(),
});

export type createClassSchema = z.infer<typeof createClassSchema>;
export type updateClassSchema = z.infer<typeof updateClassSchema>;
