import { z } from 'zod';

export const createStudentSchema = z.object({
  student_name: z.string().min(1, 'Student name is required').max(255),
  student_age: z.number().int().min(1).max(120),
  parent_name: z.string().min(1, 'Parent name is required').max(255),
  whatsapp: z.string().regex(/^62\d{9,12}$/, 'Invalid WhatsApp number (format: 62xxx...)'),
});

export const updateStudentSchema = z.object({
  student_name: z.string().min(1).max(255).optional(),
  student_age: z.number().int().min(1).max(120).optional(),
  parent_name: z.string().min(1).max(255).optional(),
  whatsapp: z.string().regex(/^62\d{9,12}$/).optional(),
});

export type CreateStudentInput = z.infer<typeof createStudentSchema>;
export type UpdateStudentInput = z.infer<typeof updateStudentSchema>;
