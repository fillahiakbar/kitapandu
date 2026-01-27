import { Router, Request, Response } from 'express';
import { prisma } from '../lib/prisma';
import { ZodError } from 'zod';
import { authMiddleware } from '../middleware/auth';
import {
  successResponse,
  errorResponse,
  paginatedResponse,
} from '../helper/apiResponse';
import {
  createMentorSchema,
  updateMentorSchema,
} from '../validators/mentors';
import { error } from 'console';

const router = Router();

/**
 * GET all mentors (paginated) - PUBLIC
 */
router.get('/', async (req: Request, res: Response) => {
  try {
    const page = Math.max(Number(req.query.page) || 1, 1);
    const limit = Math.max(Number(req.query.limit) || 10, 1);

    const totalItems = await prisma.mentors.count();

    if (totalItems === 0) {
      return errorResponse(res, 'No mentors found', 404);
    }

    const mentors = await prisma.mentors.findMany({
      include: { classes: true },
      orderBy: { created_at: 'desc' },
      skip: (page - 1) * limit,
      take: limit,
    });

    return paginatedResponse(
      res,
      mentors,
      { page, limit, totalItems },
      'Mentors fetched successfully'
    );
  } catch (error) {
    return errorResponse(res,
      'Failed to fetch mentors',
      500,
      error instanceof Error ? error.message : error);
  }
});

/**
 * GET mentor by ID - PUBLIC
 */
router.get('/:id', async (req: Request, res: Response) => {
  try {
    const mentor = await prisma.mentors.findUnique({
      where: { mentor_id: req.params.id },
      include: { classes: true },
    });

    if (!mentor) {
      return errorResponse(res, 'Mentor not found', 404);
    }

    return successResponse(res, mentor);
  } catch (error) {
    return errorResponse(res,
      'Failed to fetch mentors',
      500,
      error instanceof Error ? error.message : error);
  }
});

/**
 * CREATE mentor - AUTH
 */
router.post('/', authMiddleware, async (req: Request, res: Response) => {
  try {
    const data = createMentorSchema.parse(req.body);
    const mentor = await prisma.mentors.create({ data });

    return successResponse(res, mentor, 'Mentor created successfully', 201);
  } catch (error) {
    if (error instanceof ZodError) {
      return errorResponse(res, 'Validation failed', 400, error.errors);
    }
    return errorResponse(res, 'Failed to create mentor', 500, error instanceof Error ? error.message : error);
  }
});

/**
 * UPDATE mentor - AUTH
 */
router.put('/:id', authMiddleware, async (req: Request, res: Response) => {
  try {
    const data = updateMentorSchema.parse(req.body);

    const mentor = await prisma.mentors.update({
      where: { mentor_id: req.params.id },
      data,
    });

    return successResponse(res, mentor, 'Mentor updated successfully');
  } catch {
    if (error instanceof ZodError) {
      return errorResponse(
        res,
        "validation failed",
        400,
        error.errors
      );
    }
    return errorResponse(res, 'Failed to update mentor', 500, error instanceof Error ? error.message : error);
  }
});

/**
 * DELETE mentor - AUTH
 */
router.delete('/:id', authMiddleware, async (req: Request, res: Response) => {
  try {
    await prisma.mentors.delete({
      where: { mentor_id: req.params.id },
    });

    return successResponse(res, null, 'Mentor deleted successfully');
  } catch (error) {
    return errorResponse(res, 'Failed to delete mentor', 500, error instanceof Error ? error.message : error);
  }
});

export default router;
