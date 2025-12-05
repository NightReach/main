import jwt from "jsonwebtoken";
import { NextRequest } from "next/server";

const SECRET = process.env.NEXTAUTH_SECRET!;

if (!SECRET || SECRET.length < 32) {
  throw new Error("NEXTAUTH_SECRET must be at least 32 characters long");
}

export interface JWTPayload {
  id: number;
  email: string;
  role: string;
  iat?: number;
  exp?: number;
}

export function signToken(payload: Omit<JWTPayload, "iat" | "exp">): string {
  return jwt.sign(payload, SECRET, { expiresIn: "7d" });
}

export function verifyToken(token: string): JWTPayload | null {
  try {
    return jwt.verify(token, SECRET) as JWTPayload;
  } catch {
    return null;
  }
}

// Get current user from request
export function getCurrentUser(req: NextRequest): JWTPayload | null {
  const token = req.cookies.get("token")?.value;
  if (!token) return null;
  return verifyToken(token);
}

// Validate password strength
export function validatePassword(password: string): { valid: boolean; message?: string } {
  if (password.length < 8) {
    return { valid: false, message: "Password must be at least 8 characters" };
  }
  if (!/[A-Z]/.test(password)) {
    return { valid: false, message: "Password must contain uppercase letter" };
  }
  if (!/[a-z]/.test(password)) {
    return { valid: false, message: "Password must contain lowercase letter" };
  }
  if (!/[0-9]/.test(password)) {
    return { valid: false, message: "Password must contain a number" };
  }
  return { valid: true };
}

// Validate email
export function validateEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

// Cookie configuration
export const COOKIE_CONFIG = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "lax" as const,
  maxAge: 60 * 60 * 24 * 7, // 7 days
  path: "/",
};