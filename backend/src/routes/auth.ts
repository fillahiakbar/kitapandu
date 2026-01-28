import { Router, Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import { ZodError } from 'zod';
import { loginSchema, signupSchema } from '../validators/auth';
import { generateToken, getTokenExpiration, getTokenJti } from '../lib/jwt';
import { blacklistToken } from '../lib/tokenBlacklist';
import { prisma } from '../lib/prisma';
import { successResponse, errorResponse } from '../helper/apiResponse';
import { requiredAdmin, authMiddleware } from '../middleware/auth';

const router = Router();

/**
 * Login route - authenticate user and return JWT token
 * POST /api/auth/login
 */
router.post('/login', async (req: Request, res: Response) => {
  try {
    const body = loginSchema.parse(req.body);

    const user = await prisma.user.findFirst({
      where: { email: body.email },
    });

    if (!user) {
      return errorResponse(
        res,
        'Invalid email or password',
        401
      );
    }

    if (!user.isActive) {
      return errorResponse(
        res,
        'User account is inactive',
        403
      );
    }

    const isPasswordValid = await bcrypt.compare(
      body.password,
      user.password
    );

    if (!isPasswordValid) {
      return errorResponse(
        res,
        'Invalid email or password',
        401
      );
    }

    const token = generateToken({
      id: user.id,
      email: user.email,
      role: user.role,
    });

    return successResponse(
      res,
      {
        token,
        user: {
          id: user.id,
          email: user.email,
          name: user.name,
          role: user.role,
        },
      },
      'Login successful'
    );
  } catch (error) {
    if (error instanceof ZodError) {
      return errorResponse(
        res,
        'Validation failed',
        400,
        error.errors
      );
    }

    console.error('Login error:', error);

    return errorResponse(
      res,
      'Login failed',
      500,
      error instanceof Error ? error.message : String(error)
    );
  }
});

/**
 * Logout route
 * POST /api/auth/logout
 */
router.post('/logout', authMiddleware, async (req: Request, res: Response) => {
  try {
    const authHeader = req.headers.authorization;
    const userId = req.user?.id;

    if (authHeader) {
      const token = authHeader.split(' ')[1];
      const jti = getTokenJti(token);
      const expiration = getTokenExpiration(token);

      if (jti && expiration) {
        // Add JTI to blacklist with user ID for audit trail
        await blacklistToken(jti, expiration, userId);
      }
    }

    return successResponse(res, null, 'Logout successful');
  } catch (error) {
    console.error('Logout error:', error);
    return errorResponse(
      res,
      'Logout failed',
      500,
      error instanceof Error ? error.message : String(error)
    );
  }
});

// create a new user
router.post('/signup', requiredAdmin, async (req, res) => {
  try {
    const body = signupSchema.parse(req.body);
    const hashedPassword = await bcrypt.hash(body.password, 10);
    const user = await prisma.user.create({
      data: {
        email: body.email,
        name: body.name,
        password: hashedPassword
      }
    });
    return successResponse(
      res,
      {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
      },
      "User created successfully"
    );
  } catch (error) {
    if (error instanceof ZodError) {
      return errorResponse(
        res, "validation failed", 400, error.errors
      );
    }
    return errorResponse(
      res,
      "Failed to create user",
      500,
      error instanceof Error ? error.message : error
    );
  }
});

export default router;
