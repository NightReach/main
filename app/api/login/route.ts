import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import prisma from "@/lib/prisma";
import { signToken, validateEmail, COOKIE_CONFIG } from "@/lib/auth";

// Rate limiting (simple in-memory, use Redis in production)
const loginAttempts = new Map<string, { count: number; resetAt: number }>();

function checkRateLimit(email: string): boolean {
  const now = Date.now();
  const attempts = loginAttempts.get(email);

  if (!attempts || now > attempts.resetAt) {
    loginAttempts.set(email, { count: 1, resetAt: now + 15 * 60 * 1000 });
    return true;
  }

  if (attempts.count >= 5) {
    return false;
  }

  attempts.count++;
  return true;
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { email, password } = body;

    // Validation
    if (!email || !password) {
      return NextResponse.json(
        { error: "Email and password are required" },
        { status: 400 }
      );
    }

    if (!validateEmail(email)) {
      return NextResponse.json(
        { error: "Invalid email format" },
        { status: 400 }
      );
    }

    // Rate limiting
    if (!checkRateLimit(email.toLowerCase())) {
      return NextResponse.json(
        { error: "Too many login attempts. Please try again in 15 minutes." },
        { status: 429 }
      );
    }

    // Find user
    const user = await prisma.user.findUnique({
      where: { email: email.toLowerCase() },
    });

    if (!user) {
      return NextResponse.json(
        { error: "Invalid email or password" },
        { status: 401 }
      );
    }

    // Verify password
    const validPassword = await bcrypt.compare(password, user.password);

    if (!validPassword) {
      return NextResponse.json(
        { error: "Invalid email or password" },
        { status: 401 }
      );
    }

    // Generate token
    const token = signToken({
      id: user.id,
      email: user.email,
      role: user.role,
    });

    console.log("Login successful for:", user.email, "Role:", user.role);

    // Create response
    const response = NextResponse.json({
      success: true,
      message: "Login successful",
      user: {
        id: user.id,
        email: user.email,
        role: user.role,
        name: user.name,
      },
    });

    // Set cookie
    response.cookies.set("token", token, COOKIE_CONFIG);

    // Clear rate limit on successful login
    loginAttempts.delete(email.toLowerCase());

    return response;
  } catch (error) {
    console.error("Login error:", error);
    return NextResponse.json(
      { error: "An error occurred during login. Please try again." },
      { status: 500 }
    );
  }
}