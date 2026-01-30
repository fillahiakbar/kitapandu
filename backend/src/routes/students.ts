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
 * GET /
 * Fetches a list of all students.
 * Requires authentication.
 * Includes related enrollment data for each student.
 * Returns students ordered by newest first.
 * Handles server errors gracefully.
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
 * GET /:id
 * Fetches a single student by its unique ID.
 * Includes enrollments with related class details.
 * Returns 404 if the student is not found.
 * Handles server errors gracefully.
 */
router.get('/:id', async (req: Request, res: Response) => {
  try {
    const student = await prisma.students.findUnique({
      where: { student_id: req.params.id },
      include: {
        enrollments: {
          where: {
            status: 'active',
          },
          include: {
            class: {
              include: {
                mentor: {
                  select: {
                    mentor_id: true,
                    name: true,
                  },
                },
                schedules: {
                  orderBy: {
                    date: 'asc',
                  },
                },
              },
            },
          },
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
 * POST /
 * Creates a new student record.
 * Requires authentication and validates request body using Zod.
 * Returns the created student with a 201 status code on success.
 * Handles validation and server errors.
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
 * PUT /:id
 * Updates an existing student by its unique ID.
 * Requires authentication and validates request body using Zod.
 * Returns the updated student on success.
 * Handles validation and server errors.
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
 * DELETE /:id
 * Deletes a student by its unique ID.
 * Requires authentication.
 * Returns a success message on successful deletion.
 * Handles server errors gracefully.
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
