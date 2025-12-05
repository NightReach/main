import { NextResponse } from "next/server";
import { COOKIE_CONFIG } from "@/lib/auth";

export async function POST() {
  const response = NextResponse.json({
    success: true,
    message: "Logged out successfully",
  });

  // Clear the token cookie
  response.cookies.set("token", "", {
    ...COOKIE_CONFIG,
    maxAge: 0,
  });

  return response;
}