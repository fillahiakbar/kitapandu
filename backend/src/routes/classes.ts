import { Router, Request, Response } from 'express';
import { prisma } from '../lib/prisma';
import { authMiddleware } from '../middleware/auth';
import { successResponse, errorResponse, paginatedResponse } from '../helper/apiResponse';
import { createClassSchema, updateClassSchema } from '../validators/classes';
import { ZodError } from 'zod';

const router = Router();

router.get('/', async (req: Request, res: Response) => {
  try {
    const page = Math.max(Number(req.query.page) || 1, 1);
    const limit = Math.max(Number(req.query.limit) || 10, 1);

    const totalItems = await prisma.classes.count();

    if (!totalItems) {
      return errorResponse(res, 'No classes found', 404);
    }

    const classes = await prisma.classes.findMany({
      include: { mentor: true, program: true },
      orderBy: { created_at: 'desc' },
      skip: (page - 1) * limit,
      take: limit,
    });

    return paginatedResponse(
      res,
      classes,
      { page, limit, totalItems },
      'Classes fetched successfully'
    );
  } catch (error) {
    return errorResponse(
      res,
      "Failed to fetch allocations",
      500,
      error instanceof Error ? error.message : error
    )
  }
});


router.get('/:id', async (req, res) => {
  try {
    const cls = await prisma.classes.findUnique({
      where: { class_id: req.params.id },
      include: { mentor: true, program: true },
    });
    if (!cls) return errorResponse(res, 'Class not found', 404);
    return successResponse(res, cls, "Classes fetched successfully");
  } catch (error) {
    return errorResponse(
      res,
      "Failed to fetch allocations",
      500,
      error instanceof Error ? error.message : error
    )
  }
});

router.post('/', authMiddleware, async (req, res) => {
  try {
    const data = createClassSchema.parse(req.body);
    const cls = await prisma.classes.create({ data });
    return successResponse(res, cls, 'Class created', 201);
  } catch (error) {
    if (error instanceof ZodError) {
      return errorResponse(res, 'Validation failed', 400, error.errors);
    }
    return errorResponse(
      res,
      "Failed to fetch allocations",
      500,
      error instanceof Error ? error.message : error
    )
  }
});

router.put('/:id', authMiddleware, async (req, res) => {
  try {
    const data = updateClassSchema.parse(req.body);
    const cls = await prisma.classes.update({
      where: { class_id: req.params.id },
      data,
    });
    return successResponse(res, cls, 'Class updated');
  } catch (error) {
    if (error instanceof ZodError) {
      return errorResponse(res, 'Validation failed', 400, error.errors);
    }
    return errorResponse(
      res,
      "Failed to fetch allocations",
      500,
      error instanceof Error ? error.message : error
    )
  }
});

router.delete('/:id', authMiddleware, async (req, res) => {
  try {
    await prisma.classes.delete({ where: { class_id: req.params.id } });
    return successResponse(res, null, 'Class deleted');
  } catch (error) {
    return errorResponse(
      res,
      "Failed to fetch allocations",
      500,
      error instanceof Error ? error.message : error
    )
  }
});

export default router;
