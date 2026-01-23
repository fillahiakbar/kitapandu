import jwt, { SignOptions } from 'jsonwebtoken';
import { JWT_SECRET, JWT_EXPIRY } from "../helper/env";

export interface JwtPayload {
  id: string;
  email: string;
  role: 'admin' | 'operator';
  iat?: number;
  exp?: number;
}

if (!JWT_SECRET) {
  throw new Error("JWT_SECRET is missing")
}

if (!JWT_EXPIRY) {
  throw new Error("JWT_EXPIRY is missing")
}

/**
 * Generate JWT token
 */
export const generateToken = (payload: Omit<JwtPayload, 'iat' | 'exp'>): string => {
  return jwt.sign(payload, JWT_SECRET, {
    expiresIn: JWT_EXPIRY
  } as SignOptions);
};

/**
 * Verify JWT token
 */
export const verifyToken = (token: string): JwtPayload | null => {
  try {
    const decoded = jwt.verify(token, JWT_SECRET) as JwtPayload;
    return decoded;
  } catch (error) {
    console.error('JWT verification failed:', error instanceof Error ? error.message : String(error));
    return null;
  }
};

/**
 * Decode token without verification (use with caution)
 */
export const decodeToken = (token: string): JwtPayload | null => {
  try {
    const decoded = jwt.decode(token) as JwtPayload | null;
    return decoded;
  } catch (error) {
    return null;
  }
};
