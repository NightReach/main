import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  const publishers = await prisma.user.findMany({
    where: { role: "PUBLISHER" },
    include: { domains: true }
  });

  return NextResponse.json(publishers);
}
