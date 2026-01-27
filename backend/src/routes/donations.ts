import { Router, Request, Response } from 'express';
import {
  createDonationSchema,
  updateDonationSchema,
} from '../validators/donations';
import { ZodError } from 'zod';
import { prisma } from '../lib/prisma';
import {
  errorResponse,
  paginatedResponse,
  successResponse,
} from '../helper/apiResponse';
import { authMiddleware } from '../middleware/auth';
import { createDonationAllocationsSchema, updateDonationAllocationSchema } from '../validators/donationAllocation';
import { R } from 'framer-motion/dist/types.d-a9pt5qxk';

const router = Router();

/**
 * Get all donations (paginated)
 */
router.get('/', async (req: Request, res: Response) => {
  try {
    const page = Math.max(Number(req.query.page) || 1, 1);
    const limit = Math.max(Number(req.query.limit) || 10, 1);

    const totalItems = await prisma.donation.count();

    if (totalItems === 0) {
      return errorResponse(res, 'No donation found', 404);
    }

    const donations = await prisma.donation.findMany({
      include: { allocations: true },
      orderBy: { created_at: 'desc' },
      skip: (page - 1) * limit,
      take: limit,
    });

    return paginatedResponse(
      res,
      donations,
      { page, limit, totalItems },
      'Donations fetched successfully'
    );
  } catch (error) {
    return errorResponse(
      res,
      'Failed to fetch donations',
      500,
      error instanceof Error ? error.message : error
    );
  }
});

/**
 * Get donation by ID
 */
router.get('/:id', async (req: Request, res: Response) => {
  try {
    const donation = await prisma.donation.findUnique({
      where: { donation_id: req.params.id },
      include: { allocations: true },
    });

    if (!donation) {
      return errorResponse(res, 'Donation not found', 404);
    }

    return successResponse(res, donation, 'Donation fetched successfully');
  } catch (error) {
    return errorResponse(
      res,
      'Failed to fetch donation',
      500,
      error instanceof Error ? error.message : error
    );
  }
});

/**
 * Create donation
 */
router.post('/', authMiddleware, async (req: Request, res: Response) => {
  try {
    const body = createDonationSchema.parse(req.body);

    const donation = await prisma.donation.create({
      data: {
        ...body,
        collected_amount: 0,
        percent: 0,
      },
      include: { allocations: true },
    });

    return successResponse(
      res,
      donation,
      'Donation created successfully',
      201
    );
  } catch (error) {
    if (error instanceof ZodError) {
      return errorResponse(res, 'Validation failed', 400, error.errors);
    }

    return errorResponse(
      res,
      'Failed to create donation',
      500,
      error instanceof Error ? error.message : error
    );
  }
});

/**
 * Update donation
 */
router.put('/:id', authMiddleware, async (req: Request, res: Response) => {
  try {
    const body = updateDonationSchema.parse(req.body);
    const donation = await prisma.donation.update({
      where: { donation_id: req.params.id },
      data: body,
      include: { allocations: true },
    });

    return successResponse(
      res,
      donation,
      'Donation updated successfully'
    );
  } catch (error) {
    if (error instanceof ZodError) {
      return errorResponse(res, 'Validation failed', 400, error.errors);
    }

    return errorResponse(
      res,
      'Failed to update donation',
      500,
      error instanceof Error ? error.message : error
    );
  }
});

/**
 * Delete donation
 */
router.delete('/:id', authMiddleware, async (req: Request, res: Response) => {
  try {
    await prisma.donation.delete({
      where: { donation_id: req.params.id },
    });

    return successResponse(
      res,
      null,
      'Donation deleted successfully'
    );
  } catch (error) {
    return errorResponse(
      res,
      'Failed to delete donation',
      500,
      error instanceof Error ? error.message : error
    );
  }
});


// Donation allocations 

router.get('/:id/allocations', authMiddleware, async (req: Request, res: Response) => {
  try {
    const page = Math.max(Number(req.query.page) || 1, 1);
    const limit = Math.max(Number(req.query.limit) || 10, 1);

    const totalItems = await prisma.donationAllocation.count();

    if (totalItems === 0) {
      return errorResponse(res, "No allocation yet for this donation", 404);
    }

    const allocation = await prisma.donationAllocation.findMany({
      orderBy: { created_at: 'desc' },
      skip: (page - 1) * limit,
      take: limit,
    });

    return paginatedResponse(
      res,
      allocation,
      { page, limit, totalItems },
      "Allocations fetch successfully"
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

router.get('/:id/allocations/:id', async (req: Request, res: Response) => {
  try {
    const allocation = await prisma.donationAllocation.findUnique({
      where: { donation_allocation_id: req.params.id },
    });

    if (!allocation) {
      return errorResponse(res, 'Allocations not found', 404);
    }

    return successResponse(res, allocation, 'Allocations fetched successfully');
  } catch (error) {
    return errorResponse(
      res,
      'Failed to fetch allocations',
      500,
      error instanceof Error ? error.message : error
    );
  }
});

/**
 * Create donation allocation
 */
router.post(
  '/:id/allocations/',
  authMiddleware,
  async (req: Request, res: Response) => {
    try {
      const allocationsInput = createDonationAllocationsSchema.parse(req.body);

      const donation = await prisma.donation.findUnique({
        where: { donation_id: req.params.id },
      });

      if (!donation) {
        return errorResponse(res, 'Donation not found', 404);
      }

      const allocations = allocationsInput.map((item) => ({
        donation_id: req.params.id,
        title: item.title,
        amount: item.amount,
        percent:
          item.percent ??
          Math.round((item.amount / donation.target_amount) * 100),
      }));

      const totalPercent = allocations.reduce(
        (sum, a) => sum + a.percent,
        0
      );

      if (totalPercent > 100) {
        return errorResponse(
          res,
          'Total allocation percent cannot exceed 100%',
          400
        );
      }

      await prisma.donationAllocation.createMany({
        data: allocations,
      });

      return successResponse(
        res,
        allocations,
        'Donation allocations created successfully',
        201
      );
    } catch (error) {
      if (error instanceof ZodError) {
        return errorResponse(res, 'Validation failed', 400, error.errors);
      }

      return errorResponse(
        res,
        'Failed to create allocations',
        500,
        error instanceof Error ? error.message : error
      );
    }
  }
);

/**
 * Update donation allocation
 * PUT /donations/:donationId/allocations/:allocationId
 */
router.put(
  '/:donationId/allocations/:allocationId',
  authMiddleware,
  async (req: Request, res: Response) => {
    try {
      const body = updateDonationAllocationSchema.parse(req.body);

      const allocation = await prisma.donationAllocation.findUnique({
        where: { donation_allocation_id: req.params.allocationId },
      });

      if (!allocation) {
        return errorResponse(res, 'Donation allocation not found', 404);
      }

      const donation = await prisma.donation.findUnique({
        where: { donation_id: req.params.donationId },
      });

      if (!donation) {
        return errorResponse(res, 'Donation not found', 404);
      }

      const percent =
        body.percent ??
        (body.amount
          ? Math.round((body.amount / donation.target_amount) * 100)
          : allocation.percent);

      const updatedAllocation = await prisma.donationAllocation.update({
        where: { donation_allocation_id: req.params.allocationId },
        data: {
          ...body,
          percent,
        },
      });

      return successResponse(
        res,
        updatedAllocation,
        'Donation allocation updated successfully'
      );
    } catch (error) {
      if (error instanceof ZodError) {
        return errorResponse(res, 'Validation failed', 400, error.errors);
      }

      return errorResponse(
        res,
        'Failed to update donation allocation',
        500,
        error instanceof Error ? error.message : error
      );
    }
  }
);

/**
 * Delete donation allocation
 * DELETE /donations/:donationId/allocations/:allocationId
 */
router.delete(
  '/:donationId/allocations/:allocationId',
  authMiddleware,
  async (req: Request, res: Response) => {
    try {
      const allocation = await prisma.donationAllocation.findUnique({
        where: { donation_allocation_id: req.params.allocationId },
      });

      if (!allocation) {
        return errorResponse(res, 'Donation allocation not found', 404);
      }

      await prisma.donationAllocation.delete({
        where: { donation_allocation_id: req.params.allocationId },
      });

      return successResponse(
        res,
        null,
        'Donation allocation deleted successfully'
      );
    } catch (error) {
      return errorResponse(
        res,
        'Failed to delete donation allocation',
        500,
        error instanceof Error ? error.message : error
      );
    }
  }
);

export default router;
