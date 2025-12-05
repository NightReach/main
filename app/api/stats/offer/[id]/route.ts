import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const offerId = Number(params.id);

    if (!offerId) {
      return NextResponse.json({ error: "Invalid offerId" }, { status: 400 });
    }

    // Basic fetches
    const clicks = await prisma.click.findMany({
      where: { offerId },
      select: { id: true, ipAddress: true, createdAt: true },
    });

    const conversions = await prisma.conversion.findMany({
      where: { offerId },
      select: {
        id: true,
        createdAt: true,
        offer: { select: { payout: true } },
      },
    });

    return NextResponse.json({
      offerId,
      clicks,
      conversions,
    });
  } catch (error) {
    console.error("Stats Offer Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
