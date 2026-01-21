import { Router, Request, Response } from 'express';
import {
  createDonationSchema,
  updateDonationSchema,
  createDonationAllocationSchema,
} from '../validators/donations';
import { ZodError } from 'zod';
import prisma from '../lib/prisma';

const router = Router();

// Get all donations
router.get('/', async (req: Request, res: Response) => {
  try {
    const donations = await prisma.donation.findMany({
      include: { allocations: true },
      orderBy: { created_at: 'desc' },
    });
    res.json(donations);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch donations' });
  }
});

// Get donation by ID
router.get('/:id', async (req: Request, res: Response) => {
  try {
    const donation = await prisma.donation.findUnique({
      where: { donation_id: req.params.id },
      include: { allocations: true },
    });
    if (!donation) {
      res.status(404).json({ error: 'Donation not found' });
      return;
    }
    res.json(donation);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch donation' });
  }
});

// Create donation
router.post('/', async (req: Request, res: Response) => {
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
    res.status(201).json(donation);
  } catch (error) {
    if (error instanceof ZodError) {
      res.status(400).json({ error: error.errors });
      return;
    }
    res.status(500).json({ error: 'Failed to create donation' });
  }
});

// Update donation
router.put('/:id', async (req: Request, res: Response) => {
  try {
    const body = updateDonationSchema.parse(req.body);
    const donation = await prisma.donation.update({
      where: { donation_id: req.params.id },
      data: body,
      include: { allocations: true },
    });
    res.json(donation);
  } catch (error) {
    if (error instanceof ZodError) {
      res.status(400).json({ error: error.errors });
      return;
    }
    res.status(500).json({ error: 'Failed to update donation' });
  }
});

// Delete donation
router.delete('/:id', async (req: Request, res: Response) => {
  try {
    await prisma.donation.delete({
      where: { donation_id: req.params.id },
    });
    res.json({ message: 'Donation deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete donation' });
  }
});

// Create donation allocation
router.post('/:id/allocations', async (req: Request, res: Response) => {
  try {
    const body = createDonationAllocationSchema.parse({
      ...req.body,
      donation_id: req.params.id,
    });
    
    // Get donation to calculate percent if not provided
    const donation = await prisma.donation.findUnique({
      where: { donation_id: req.params.id },
    });
    
    if (!donation) {
      res.status(404).json({ error: 'Donation not found' });
      return;
    }
    
    const percent = body.percent || Math.round((body.amount / donation.target_amount) * 100);
    
    const allocation = await prisma.donationAllocation.create({
      data: {
        ...body,
        percent,
      },
    });
    res.status(201).json(allocation);
  } catch (error) {
    if (error instanceof ZodError) {
      res.status(400).json({ error: error.errors });
      return;
    }
    res.status(500).json({ error: 'Failed to create allocation' });
  }
});

export default router;
