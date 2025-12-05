import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const publisherId = searchParams.get("publisherId");

    if (!publisherId) {
      return NextResponse.json({ error: "Missing publisherId" }, { status: 400 });
    }

    const publisher = Number(publisherId);

    // --------------------------
    // 1. FETCH RAW CLICK DATA
    // --------------------------
    const clicks = await prisma.click.findMany({
      where: { publisherId: publisher },
      select: {
        id: true,
        clickId: true,
        createdAt: true,
        ipAddress: true,
        userAgent: true,
        source: true,
        subid: true,
        Domain: {
          select: { domain: true }
        },
        offer: {
          select: {
            id: true,
            title: true,
            payout: true
          }
        }
      },
      orderBy: { createdAt: "desc" }
    });

    // --------------------------
    // 2. FETCH RAW CONVERSIONS
    // --------------------------
    const conversions = await prisma.conversion.findMany({
      where: { click: { publisherId: publisher } },
      select: {
        id: true,
        createdAt: true,
        offer: {
          select: {
            id: true,
            title: true,
            payout: true
          }
        },
        click: {
          select: {
            clickId: true
          }
        }
      },
      orderBy: { createdAt: "desc" }
    });

    // --------------------------
    // 3. BUILD SUMMARY STATS
    // --------------------------
    const totalClicks = clicks.length;
    const totalConversions = conversions.length;

    // sum payout from each conversion
    const totalRevenue = conversions.reduce(
      (sum, c) => sum + (c.offer?.payout ?? 0),
      0
    );

    const cr = totalClicks > 0 ? (totalConversions / totalClicks) * 100 : 0; // Conversion Rate %
    const epc = totalClicks > 0 ? totalRevenue / totalClicks : 0; // Earnings Per Click

    // --------------------------
    // 4. GROUP BY OFFER FOR Table
    // --------------------------
    const offerStats: Record<number, any> = {};

    for (const click of clicks) {
      const o = click.offer;
      if (!offerStats[o.id]) {
        offerStats[o.id] = {
          offerId: o.id,
          title: o.title,
          payout: o.payout,
          clicks: 0,
          conversions: 0,
          revenue: 0
        };
      }
      offerStats[o.id].clicks++;
    }

    for (const conv of conversions) {
      const o = conv.offer;
      if (!offerStats[o.id]) continue; // safety
      offerStats[o.id].conversions++;
      offerStats[o.id].revenue += o.payout;
    }

    const offersArray = Object.values(offerStats);

    // --------------------------
    // 5. FINAL API RESPONSE
    // --------------------------
    return NextResponse.json({
      ok: true,
      summary: {
        totalClicks,
        totalConversions,
        totalRevenue,
        cr: Number(cr.toFixed(2)),
        epc: Number(epc.toFixed(4))
      },
      offers: offersArray,
      clicks,       // include full click log
      conversions   // include full conversion log
    });

  } catch (err) {
    console.error("Stats API Error:", err);
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}
