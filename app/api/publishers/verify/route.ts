import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function POST(req: Request) {
  const { domain, token } = await req.json();

  const record = await prisma.domain.findFirst({
    where: { domain, verifyToken: token }
  });

  if (!record) {
    return NextResponse.json({ error: "Verification failed" }, { status: 400 });
  }

  await prisma.domain.update({
    where: { id: record.id },
    data: { verified: true },
  });

  return NextResponse.json({ success: true });
}
