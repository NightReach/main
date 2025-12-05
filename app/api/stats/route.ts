import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET() {
  const publisherId = 1;
  const clicks = await prisma.click.count({ where: { smartlink: { publisherId } } });
  const conversions = await prisma.conversion.count({ where: { click: { smartlink: { publisherId } } } });
  const earnings = await prisma.conversion.aggregate({ _sum: { payout: true }, where: { click: { smartlink: { publisherId } } } });
  return NextResponse.json({ clicks, conversions, earnings: earnings._sum.payout || 0 });
}
