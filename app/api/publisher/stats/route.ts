import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(req: Request) {
  try {
    const publisherId = 1; // TODO: replace with auth user id

    // Summary
    const totalClicks = await prisma.click.count({
      where: { publisherId },
    });

    const totalConversions = await prisma.conversion.count({
      where: {
        click: { publisherId }
      },
    });

    const conversions = await prisma.conversion.findMany({
        where: { click: { publisherId } },
        include: { offer: true },
      });
      
      // Sum the payout amounts
      const totalEarnings = conversions.reduce(
        (sum, c) => sum + (c.offer?.payout ?? 0),
        0
      );

    // Domains overview
    const domains = await prisma.domain.findMany({
      where: { publisherId },
      include: {
        clicks: {
          include: {
            conversions: true
          }
        }
      }
    });

    const domainStats = domains.map(d => ({
      id: d.id,
      domain: d.domain,
      clicks: d.clicks.length,
      conversions: d.clicks.reduce((sum, c) => sum + c.conversions.length, 0),
      epc:
        d.clicks.length === 0
          ? 0
          : d.clicks.reduce((sum, c) => sum + c.conversions.length, 0) /
            d.clicks.length,
    }));

    // Latest clicks log
    const recentClicks = await prisma.click.findMany({
      where: { publisherId },
      include: { offer: true, domain: true },
      orderBy: { createdAt: "desc" },
      take: 20,
    });

    return NextResponse.json({
      summary: {
        totalClicks,
        totalConversions,
        totalEarnings:
          totalConversions * 1, // TEMP until payout query refined
      },
      domainStats,
      recentClicks,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
