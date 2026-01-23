import { Router, Request, Response } from 'express';
import { createAnnouncementSchema, updateAnnouncementSchema } from '../validators/announcements';
import { ZodError } from 'zod';
import { prisma } from '../lib/prisma';
import { authMiddleware } from '../middleware/auth';
import { paginatedResponse, errorResponse } from '../helper/apiResponse';

const router = Router();

// Get all announcements
router.get('/', async (req: Request, res: Response) => {
  try {
    const page = Math.max(Number(req.query.page) || 1, 1);
    const limit = Math.min(
      Math.max(Number(req.query.limit) || 10, 1),
      100
    );

    const [announcements, totalItems] = await Promise.all([
      prisma.announcements.findMany({
        orderBy: { created_at: "desc" },
        skip: (page - 1) * limit,
        take: limit,
      }),
      prisma.announcements.count(),
    ]);

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
      res.status(404).json({ error: 'Announcement not found' });
      return;
    }
    res.json(announcement);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch announcement' });
  }
});

// Create announcement (protected)
router.post('/', authMiddleware, async (req: Request, res: Response) => {
  try {
    const body = createAnnouncementSchema.parse(req.body);
    const announcement = await prisma.announcements.create({
      data: body,
    });
    res.status(201).json(announcement);
  } catch (error) {
    if (error instanceof ZodError) {
      res.status(400).json({ error: error.errors });
      return;
    }
    res.status(500).json({ error: 'Failed to create announcement' });
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
    res.json(announcement);
  } catch (error) {
    if (error instanceof ZodError) {
      res.status(400).json({ error: error.errors });
      return;
    }
    res.status(500).json({ error: 'Failed to update announcement' });
  }
});

// Delete announcement (protected)
router.delete('/:id', authMiddleware, async (req: Request, res: Response) => {
  try {
    await prisma.announcements.delete({
      where: { announcements_id: req.params.id },
    });
    res.json({ message: 'Announcement deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete announcement' });
  }
});

export default router;
