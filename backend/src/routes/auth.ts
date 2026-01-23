import { Router, Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import { ZodError } from 'zod';
import { loginSchema, signupSchema } from '../validators/auth';
import { generateToken } from '../lib/jwt';
import { prisma } from '../lib/prisma';
import { successResponse } from '../helper/apiResponse';

const router = Router();

/**
 * Login route - authenticate user and return JWT token
 * Only allows users with 'admin' or 'operator' roles
 * Students and Mentors cannot login
 * POST /api/auth/login
 */
router.post('/login', async (req: Request, res: Response) => {
  try {
    const body = loginSchema.parse(req.body);

    // Find user by email 
    const user = await prisma.user.findFirst({
      where: { email: body.email },
    });

    if (!user) {
      res.status(401).json({ error: 'Invalid email or password. Only users can login.' });
      return;
    }

    // Verify user is active
    if (!user.isActive) {
      res.status(403).json({ error: 'User account is inactive' });
      return;
    }

    // Compare password
    const isPasswordValid = await bcrypt.compare(body.password, user.password);

    if (!isPasswordValid) {
      res.status(401).json({ error: 'Invalid email or password. Only users can login.' });
      return;
    }

    // Generate token with role
    const token = generateToken({
      id: user.id,
      email: user.email,
      role: user.role,
    });

    res.json({
      message: 'Login successful',
      token,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
      },
    });
  } catch (error) {
    if (error instanceof ZodError) {
      res.status(400).json({ error: 'Validation failed', details: error.errors });
      return;
    }
    console.error('Login error:', error);
    res.status(500).json({
      error: 'Login failed',
      details: error instanceof Error ? error.message : String(error),
    });
  }
});

/**
 * Signup route - DISABLED
 * Only users (admin/operator) can be created by existing admins
 * Students and Mentors cannot signup
 * POST /api/auth/signup
 */
router.post('/signup', async (req: Request, res: Response) => {
  res.status(403).json({
    error: 'Signup is disabled. Only students can register through the enrollment system. Users must be created by administrators.'
  });
});

export default router;
