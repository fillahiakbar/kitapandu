import { Request, Response, NextFunction } from 'express';
import { verifyToken, JwtPayload } from '../lib/jwt';

/**
 * Extend Express Request with user data
 */
declare global {
  namespace Express {
    interface Request {
      user?: JwtPayload;
    }
  }
}

/**
 * Authentication middleware - verifies JWT token from Authorization header
 * Expects: Authorization: Bearer <token>
 * Only allows users with 'admin' or 'operator' roles
 */
export const authMiddleware = (req: Request, res: Response, next: NextFunction): void => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      res.status(401).json({ error: 'Missing authorization header' });
      return;
    }

    const parts = authHeader.split(' ');
    if (parts.length !== 2 || parts[0] !== 'Bearer') {
      res.status(401).json({ error: 'Invalid authorization header format. Expected: Bearer <token>' });
      return;
    }

    const token = parts[1];
    const payload = verifyToken(token);

    if (!payload) {
      res.status(401).json({ error: 'Invalid or expired token' });
      return;
    }

    // Only allow admin and operator roles
    if (!payload.role || !['admin', 'operator'].includes(payload.role)) {
      res.status(403).json({ error: 'Insufficient permissions. Only users can access this resource.' });
      return;
    }

    req.user = payload;
    next();
  } catch (error) {
    res.status(500).json({ 
      error: 'Authentication error',
      details: error instanceof Error ? error.message : String(error)
    });
  }
};

/**
 * Optional authentication middleware - doesn't fail if token is invalid
 * Useful for routes that work with or without auth
 */
export const optionalAuthMiddleware = (req: Request, res: Response, next: NextFunction): void => {
  try {
    const authHeader = req.headers.authorization;

    if (authHeader) {
      const parts = authHeader.split(' ');
      if (parts.length === 2 && parts[0] === 'Bearer') {
        const token = parts[1];
        const payload = verifyToken(token);
        if (payload) {
          req.user = payload;
        }
      }
    }

    next();
  } catch (error) {
    next();
  }
};
