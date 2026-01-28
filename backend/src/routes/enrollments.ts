import { Router, Request, Response } from 'express';
import { prisma } from '../lib/prisma';
import { authMiddleware } from '../middleware/auth';
import { successResponse, errorResponse, paginatedResponse } from '../helper/apiResponse';
import { createEnrollmentSchema, updateEnrollmentSchema } from '../validators/enrollments';
import { ZodError } from 'zod';

const router = Router();

router.get('/', async (req: Request, res: Response) => {
  try {
    const page = Math.max(Number(req.query.page) || 1, 1);
    const limit = Math.max(Number(req.query.limit) || 10, 1);

    const totalItems = await prisma.enrollments.count();

    if (!totalItems) {
      return errorResponse(res, 'No enrollments found', 404);
    }

    const enrollments = await prisma.enrollments.findMany({
      include: { student: true, class: true },
      orderBy: { created_at: 'desc' },
      skip: (page - 1) * limit,
      take: limit,
    });

    return paginatedResponse(
      res,
      enrollments,
      { page, limit, totalItems },
      'Enrollments fetched successfully'
    );
  } catch (error) {
    return errorResponse(
      res,
      "Failed to fetch enrollments",
      500,
      error instanceof Error ? error.message : error
    );
  }
});


router.get('/:id', async (req, res) => {
  try {
    const enrollment = await prisma.enrollments.findUnique({
      where: { enrollment_id: req.params.id },
    });
    if (!enrollment) return errorResponse(res, 'Enrollment not found', 404);
    return successResponse(res, enrollment);
  } catch (error) {
    return errorResponse(
      res,
      "Failed to fetch enrollments",
      500,
      error instanceof Error ? error.message : error
    );
  }
});

router.post('/', authMiddleware, async (req, res) => {
  try {
    const data = createEnrollmentSchema.parse(req.body);
    const enrollment = await prisma.enrollments.create({ data });
    return successResponse(res, enrollment, 'Enrollment created', 201);
  } catch (error) {
    if (error instanceof ZodError) {
      return errorResponse(res, "Validation failed", 400, error.errors)
    }

    return errorResponse(
      res,
      "Failed to create enrollment",
      500,
      error instanceof Error ? error.message : error
    )
  }
});

router.put('/:id', authMiddleware, async (req, res) => {
  try {
    const data = updateEnrollmentSchema.parse(req.body);
    const enrollment = await prisma.enrollments.update({
      where: { enrollment_id: req.params.id },
      data,
    });
    return successResponse(res, enrollment, 'Enrollment updated');
  } catch (error) {
    if (error instanceof ZodError) {
      return errorResponse(res, "Validation failed", 400, error.errors);
    }
    return errorResponse(
      res,
      "Failed to update enrollment",
      500,
      error instanceof Error ? error.message : error
    );
  }
});

router.delete('/:id', authMiddleware, async (req, res) => {
  try {
    await prisma.enrollments.delete({ where: { enrollment_id: req.params.id } });
    return successResponse(res, null, 'Enrollment deleted');
  } catch (error) {
    return errorResponse(
      res,
      "Failed to delete enrollment",
      500,
      error instanceof Error ? error.message : error
    );
  }
});

export default router;
