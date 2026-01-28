import { Router, Request, Response } from 'express';
import {
  createStudentSchema,
  updateStudentSchema,
} from '../validators/students';
import { ZodError } from 'zod';
import { prisma } from '../lib/prisma';
import {
  successResponse,
  errorResponse,
} from '../helper/apiResponse';
import { authMiddleware } from '../middleware/auth';

const router = Router();

/**
 * Get all students (auth required)
 */
router.get('/', authMiddleware, async (_req: Request, res: Response) => {
  try {
    const students = await prisma.students.findMany({
      include: { enrollments: true },
      orderBy: { created_at: 'desc' },
    });

    return successResponse(
      res,
      students,
      'Students fetched successfully'
    );
  } catch (error) {
    return errorResponse(
      res,
      'Failed to fetch students',
      500,
      error instanceof Error ? error.message : error
    );
  }
});

/**
 * Get student by ID (PUBLIC)
 */
router.get('/:id', async (req: Request, res: Response) => {
  try {
    const student = await prisma.students.findUnique({
      where: { student_id: req.params.id },
      include: {
        enrollments: {
          include: { class: true },
        },
      },
    });

    if (!student) {
      return errorResponse(res, 'Student not found', 404);
    }

    return successResponse(
      res,
      student,
      'Student fetched successfully'
    );
  } catch (error) {
    return errorResponse(
      res,
      'Failed to fetch student',
      500,
      error instanceof Error ? error.message : error
    );
  }
});

/**
 * Create student (auth required)
 */
router.post('/', authMiddleware, async (req: Request, res: Response) => {
  try {
    const body = createStudentSchema.parse(req.body);

    const student = await prisma.students.create({
      data: body,
    });

    return successResponse(
      res,
      student,
      'Student created successfully',
      201
    );
  } catch (error) {
    if (error instanceof ZodError) {
      return errorResponse(res, 'Validation failed', 400, error.errors);
    }

    return errorResponse(
      res,
      'Failed to create student',
      500,
      error instanceof Error ? error.message : error
    );
  }
});

/**
 * Update student (auth required)
 */
router.put('/:id', authMiddleware, async (req: Request, res: Response) => {
  try {
    const body = updateStudentSchema.parse(req.body);

    const student = await prisma.students.update({
      where: { student_id: req.params.id },
      data: body,
    });

    return successResponse(
      res,
      student,
      'Student updated successfully'
    );
  } catch (error) {
    if (error instanceof ZodError) {
      return errorResponse(res, 'Validation failed', 400, error.errors);
    }

    return errorResponse(
      res,
      'Failed to update student',
      500,
      error instanceof Error ? error.message : error
    );
  }
});

/**
 * Delete student (auth required)
 */
router.delete('/:id', authMiddleware, async (req: Request, res: Response) => {
  try {
    await prisma.students.delete({
      where: { student_id: req.params.id },
    });

    return successResponse(
      res,
      null,
      'Student deleted successfully'
    );
  } catch (error) {
    return errorResponse(
      res,
      'Failed to delete student',
      500,
      error instanceof Error ? error.message : error
    );
  }
});

export default router;
