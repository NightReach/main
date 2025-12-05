import { NextResponse } from "next/server";
import { verifyUser } from "@/lib/auth";

export async function POST(req: Request) {
  const { email, password } = await req.json();

  const result = await verifyUser(email, password);
  if (!result) {
    return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
  }

  return NextResponse.json(result);
}
