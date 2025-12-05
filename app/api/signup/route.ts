import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import prisma from "@/lib/prisma";
import { validateEmail, validatePassword } from "@/lib/auth";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { email, password, role, name } = body;

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

    const passwordCheck = validatePassword(password);
    if (!passwordCheck.valid) {
      return NextResponse.json(
        { error: passwordCheck.message },
        { status: 400 }
      );
    }

    if (!["advertiser", "publisher"].includes(role?.toLowerCase())) {
      return NextResponse.json(
        { error: "Role must be either 'advertiser' or 'publisher'" },
        { status: 400 }
      );
    }

    // Check if user exists
    const existingUser = await prisma.user.findUnique({
      where: { email: email.toLowerCase() },
    });

    if (existingUser) {
      return NextResponse.json(
        { error: "An account with this email already exists" },
        { status: 409 }
      );
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 12);

    // Create user
    const user = await prisma.user.create({
      data: {
        email: email.toLowerCase(),
        password: hashedPassword,
        role: role.toUpperCase(), // Store as "ADVERTISER" or "PUBLISHER"
        name: name || null,
      },
      select: {
        id: true,
        email: true,
        role: true,
        name: true,
        createdAt: true,
      },
    });

    return NextResponse.json(
      {
        success: true,
        message: "Account created successfully",
        user,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Signup error:", error);
    return NextResponse.json(
      { error: "An error occurred during signup. Please try again." },
      { status: 500 }
    );
  }
}