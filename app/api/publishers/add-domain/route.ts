import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function POST(req: Request) {
  const { userId, domain } = await req.json();

  if (!userId || !domain) {
    return NextResponse.json({ error: "Missing fields" }, { status: 400 });
  }

  const exists = await prisma.domain.findFirst({
    where: { domain, userId }
  });

  if (exists) {
    return NextResponse.json({ error: "Domain already added" }, { status: 400 });
  }

  const token = Math.random().toString(36).substring(2, 15);

  await prisma.domain.create({
    data: {
      userId,
      domain,
      verifyToken: token,
      verified: false,
    },
  });

  return NextResponse.json({ success: true, verifyToken: token });
}
