import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET() {
  try {
    const offers = await prisma.offer.findMany({
      select: {
        id: true,
        title: true,
        description: true,
        payout: true,
      },
    });

    return NextResponse.json(offers);
  } catch (e) {
    return NextResponse.json({ error: "Failed to load offers" }, { status: 500 });
  }
}
