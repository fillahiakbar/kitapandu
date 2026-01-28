import { Router, Request, Response } from 'express';
import { createAnnouncementSchema, updateAnnouncementSchema } from '../validators/announcements';
import { ZodError } from 'zod';
import { prisma } from '../lib/prisma';
import { authMiddleware } from '../middleware/auth';
import { paginatedResponse, errorResponse, successResponse } from '../helper/apiResponse';

const router = Router();

// Get all announcements
router.get('/', async (req: Request, res: Response) => {
  try {
    const page = Math.max(Number(req.query.page) || 1, 1);
    const limit = Math.min(
      Math.max(Number(req.query.limit) || 10, 1),
      100
    );

    const totalItems = await prisma.announcements.count();

    // 404 error code
    if (totalItems === 0) {
      return errorResponse(
        res,
        "No announcements found",
        404,
        null
      );
    }

    const announcements = await prisma.announcements.findMany({
      orderBy: { created_at: "desc" },
      skip: (page - 1) * limit,
      take: limit,
    });

    return paginatedResponse(
      res,
      announcements,
      {
        page,
        limit,
        totalItems,
      },
      "Announcements fetched successfully"
    );
  } catch (error) {
    return errorResponse(
      res,
      "Failed to fetch announcement",
      500,
      error instanceof Error ? error.message : error
    );
  }
});

// Get announcement by ID
router.get('/:id', async (req: Request, res: Response) => {
  try {
    const announcement = await prisma.announcements.findUnique({
      where: { announcements_id: req.params.id },
    });

    if (!announcement) {
      return errorResponse(
        res,
        "No announcements found",
        404,
        null
      )
    }
    return successResponse(
      res,
      announcement
    );
  } catch (error) {
    return errorResponse(
      res,
      "Failed to fetch announcement",
      500,
      error instanceof Error ? error.message : error
    );
  }
});

// Create announcement (protected)
router.post('/', authMiddleware, async (req: Request, res: Response) => {
  try {
    const body = createAnnouncementSchema.parse(req.body);
    const announcement = await prisma.announcements.create({
      data: body,
    });
    return successResponse(
      res,
      announcement,
      "Announcement created successfully"
    );
  } catch (error) {
    if (error instanceof ZodError) {
      return errorResponse(
        res,
        "validation failed",
        400,
        error.errors
      );
    }
    return errorResponse(
      res,
      "Failed to create announcement",
      500,
      error instanceof Error ? error.message : error
    );
  }
});

// Update announcement (protected)
router.put('/:id', authMiddleware, async (req: Request, res: Response) => {
  try {
    const body = updateAnnouncementSchema.parse(req.body);
    const announcement = await prisma.announcements.update({
      where: { announcements_id: req.params.id },
      data: body,
    });
    return successResponse(
      res,
      announcement,
      "Announcement updated successfully"
    );
  } catch (error) {
    if (error instanceof ZodError) {
      return errorResponse(
        res,
        "Validation failed",
        400,
        error.errors
      );
    }
    return errorResponse(
      res,
      "Failed to update announcement",
      500,
      error instanceof Error ? error.message : error
    );
  }
});

// Delete announcement (protected)
router.delete('/:id', authMiddleware, async (req: Request, res: Response) => {
  try {
    await prisma.announcements.delete({
      where: { announcements_id: req.params.id },
    });
    return successResponse(
      res,
      null,
      "Announcement deleted successfully"
    );
  } catch (error) {
    return errorResponse(
      res,
      "Failed to delete announcement",
      500,
      error instanceof Error ? error.message : error
    );
  }
});

export default router;
