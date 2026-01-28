import { Router, Request, Response } from 'express';
import {
  createProgramSchema,
  updateProgramSchema,
} from '../validators/programs';
import { ZodError } from 'zod';
import { prisma } from '../lib/prisma';
import {
  successResponse,
  errorResponse,
  paginatedResponse,
} from '../helper/apiResponse';
import { authMiddleware } from '../middleware/auth';

const router = Router();

/**
 * Get all programs (paginated)
 * GET /programs?page=1&limit=10
 */
router.get('/', async (req: Request, res: Response) => {
  try {
    const page = Math.max(Number(req.query.page) || 1, 1);
    const limit = Math.max(Number(req.query.limit) || 10, 1);

    const totalItems = await prisma.programs.count();

    if (totalItems === 0) {
      return errorResponse(res, 'No programs found', 404);
    }

    const programs = await prisma.programs.findMany({
      include: { classes: true },
      orderBy: { created_at: 'desc' },
      skip: (page - 1) * limit,
      take: limit,
    });

    return paginatedResponse(
      res,
      programs,
      { page, limit, totalItems },
      'Programs fetched successfully'
    );
  } catch (error) {
    return errorResponse(
      res,
      'Failed to fetch programs',
      500,
      error instanceof Error ? error.message : error
    );
  }
});

/**
 * Get program by ID
 * GET /programs/:id
 */
router.get('/:id', async (req: Request, res: Response) => {
  try {
    const program = await prisma.programs.findUnique({
      where: { program_id: req.params.id },
      include: { classes: true },
    });

    if (!program) {
      return errorResponse(res, 'Program not found', 404);
    }

    return successResponse(
      res,
      program,
      'Program fetched successfully'
    );
  } catch (error) {
    return errorResponse(
      res,
      'Failed to fetch program',
      500,
      error instanceof Error ? error.message : error
    );
  }
});

/**
 * Create program (auth required)
 */
router.post('/', authMiddleware, async (req: Request, res: Response) => {
  try {
    const body = createProgramSchema.parse(req.body);

    const program = await prisma.programs.create({
      data: body,
    });

    return successResponse(
      res,
      program,
      'Program created successfully',
      201
    );
  } catch (error) {
    if (error instanceof ZodError) {
      return errorResponse(res, 'Validation failed', 400, error.errors);
    }

    return errorResponse(
      res,
      'Failed to create program',
      500,
      error instanceof Error ? error.message : error
    );
  }
});

/**
 * Update program (auth required)
 */
router.put('/:id', authMiddleware, async (req: Request, res: Response) => {
  try {
    const body = updateProgramSchema.parse(req.body);

    const program = await prisma.programs.update({
      where: { program_id: req.params.id },
      data: body,
      include: { classes: true },
    });

    return successResponse(
      res,
      program,
      'Program updated successfully'
    );
  } catch (error) {
    if (error instanceof ZodError) {
      return errorResponse(res, 'Validation failed', 400, error.errors);
    }

    return errorResponse(
      res,
      'Failed to update program',
      500,
      error instanceof Error ? error.message : error
    );
  }
});

/**
 * Delete program (auth required)
 */
router.delete('/:id', authMiddleware, async (req: Request, res: Response) => {
  try {
    await prisma.programs.delete({
      where: { program_id: req.params.id },
    });

    return successResponse(
      res,
      null,
      'Program deleted successfully'
    );
  } catch (error) {
    return errorResponse(
      res,
      'Failed to delete program',
      500,
      error instanceof Error ? error.message : error
    );
  }
});

export default router;
