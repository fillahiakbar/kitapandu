import { Router, Request, Response } from 'express';
import { createStudentSchema, updateStudentSchema } from '../validators/students';
import { ZodError } from 'zod';
import {prisma} from '../lib/prisma';

const router = Router();

// Get all students
router.get('/', async (req: Request, res: Response) => {
  try {
    const students = await prisma.students.findMany({
      include: { enrollments: true },
      orderBy: { created_at: 'desc' },
    });
    res.json(students);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch students' });
  }
});

// Get student by ID
router.get('/:id', async (req: Request, res: Response) => {
  try {
    const student = await prisma.students.findUnique({
      where: { student_id: req.params.id },
      include: { enrollments: { include: { class: true } } },
    });
    if (!student) {
      res.status(404).json({ error: 'Student not found' });
      return;
    }
    res.json(student);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch student' });
  }
});

// Create student
router.post('/', async (req: Request, res: Response) => {
  try {
    const body = createStudentSchema.parse(req.body);
    const student = await prisma.students.create({
      data: body,
    });
    res.status(201).json(student);
  } catch (error) {
    if (error instanceof ZodError) {
      res.status(400).json({ error: error.errors });
      return;
    }
    res.status(500).json({ error: 'Failed to create student' });
  }
});

// Update student
router.put('/:id', async (req: Request, res: Response) => {
  try {
    const body = updateStudentSchema.parse(req.body);
    const student = await prisma.students.update({
      where: { student_id: req.params.id },
      data: body,
    });
    res.json(student);
  } catch (error) {
    if (error instanceof ZodError) {
      res.status(400).json({ error: error.errors });
      return;
    }
    res.status(500).json({ error: 'Failed to update student' });
  }
});

// Delete student
router.delete('/:id', async (req: Request, res: Response) => {
  try {
    await prisma.students.delete({
      where: { student_id: req.params.id },
    });
    res.json({ message: 'Student deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete student' });
  }
});

export default router;
