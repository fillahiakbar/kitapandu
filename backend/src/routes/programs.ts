import { Router, Request, Response } from 'express';
import { createProgramSchema, updateProgramSchema } from '../validators/programs';
import { ZodError } from 'zod';
import prisma from '../lib/prisma';

const router = Router();

// Get all programs
router.get('/', async (req: Request, res: Response) => {
  try {
    const programs = await prisma.programs.findMany({
      include: { classes: true },
      orderBy: { created_at: 'desc' },
    });
    res.json(programs);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch programs' });
  }
});

// Get program by ID
router.get('/:id', async (req: Request, res: Response) => {
  try {
    const program = await prisma.programs.findUnique({
      where: { program_id: req.params.id },
      include: { classes: true },
    });
    if (!program) {
      res.status(404).json({ error: 'Program not found' });
      return;
    }
    res.json(program);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch program' });
  }
});

// Create program
router.post('/', async (req: Request, res: Response) => {
  try {
    const body = createProgramSchema.parse(req.body);
    const program = await prisma.programs.create({
      data: body,
      include: { classes: true },
    });
    res.status(201).json(program);
  } catch (error) {
    if (error instanceof ZodError) {
      res.status(400).json({ error: error.errors });
      return;
    }
    res.status(500).json({ error: 'Failed to create program' });
  }
});

// Update program
router.put('/:id', async (req: Request, res: Response) => {
  try {
    const body = updateProgramSchema.parse(req.body);
    const program = await prisma.programs.update({
      where: { program_id: req.params.id },
      data: body,
      include: { classes: true },
    });
    res.json(program);
  } catch (error) {
    if (error instanceof ZodError) {
      res.status(400).json({ error: error.errors });
      return;
    }
    res.status(500).json({ error: 'Failed to update program' });
  }
});

// Delete program
router.delete('/:id', async (req: Request, res: Response) => {
  try {
    await prisma.programs.delete({
      where: { program_id: req.params.id },
    });
    res.json({ message: 'Program deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete program' });
  }
});

export default router;
