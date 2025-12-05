import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  const advertisers = await prisma.user.findMany({
    where: { role: "ADVERTISER" },
    include: { offers: true }
  });

  return NextResponse.json(advertisers);
}
