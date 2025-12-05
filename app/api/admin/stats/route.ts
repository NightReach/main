import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const totalClicks = await prisma.click.count();
    const totalConversions = await prisma.conversion.count();

    const payoutData = await prisma.conversion.aggregate({
      _sum: { payout: true }
    });

    return NextResponse.json({
      totalClicks,
      totalConversions,
      totalPayout: payoutData._sum.payout || 0
    });

  } catch (e) {
    return NextResponse.json({ error: "Failed to load stats" }, { status: 500 });
  }
}
