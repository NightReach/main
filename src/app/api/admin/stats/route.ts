import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET() {
  try {
    const publishers = await prisma.user.count({
      where: { role: "PUBLISHER" },
    });

    const advertisers = await prisma.user.count({
      where: { role: "ADVERTISER" },
    });

    const offers = await prisma.offer.count();

    const clicks = await prisma.click.count();
    const conversions = await prisma.conversion.count();

    const earningsAgg = await prisma.conversion.aggregate({
      _sum: { payout: true }
    });

    const earnings = earningsAgg._sum.payout || 0;

    return NextResponse.json({
      publishers,
      advertisers,
      offers,
      clicks,
      conversions,
      earnings,
    });
  } catch (err) {
    return NextResponse.json(
      { error: "Failed to load admin stats" },
      { status: 500 }
    );
  }
}
