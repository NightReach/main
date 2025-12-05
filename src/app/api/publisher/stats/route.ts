import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(req: Request) {
  try {
    const publisherId = 1; // TODO: replace when auth is added

    const impressions = await prisma.impression.count({
      where: { publisherId },
    });

    const clicks = await prisma.click.count({
      where: { publisherId },
    });

    const conversions = await prisma.conversion.count({
      where: {
        click: { publisherId },
      },
    });

    const earningsAgg = await prisma.conversion.aggregate({
      where: {
        click: { publisherId },
      },
      _sum: { payout: true },
    });

    const earnings = earningsAgg._sum.payout || 0;

    const ctr = impressions ? (clicks / impressions) * 100 : 0;
    const epc = clicks ? earnings / clicks : 0;

    return NextResponse.json({
      impressions,
      clicks,
      conversions,
      earnings,
      ctr: Number(ctr.toFixed(2)),
      epc: Number(epc.toFixed(2)),
    });
  } catch (err) {
    return NextResponse.json(
      { error: "Failed to load stats" },
      { status: 500 }
    );
  }
}
