import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getGeoByIP, parseUserAgent } from "@/lib/utils";
import { randomWeighted } from "@/lib/weights";

export async function GET(req: Request, { params }: any) {
  try {
    const slug = params.slug;

    const smartlink = await prisma.smartLink.findUnique({
      where: { slug },
      include: {
        offers: {
          include: {
            offer: true
          }
        }
      }
    });

    if (!smartlink) {
      return NextResponse.json({ error: "SmartLink not found" }, { status: 404 });
    }

    // Extract request data
    const ip = req.headers.get("x-forwarded-for") || "0.0.0.0";
    const userAgent = req.headers.get("user-agent") || "";
    const geo = getGeoByIP(ip);
    const device = parseUserAgent(userAgent);

    // Select best offer
    const selected = selectOffer(smartlink.offers, geo, device);

    if (!selected) {
      return NextResponse.redirect(smartlink.fallbackUrl || "https://google.com");
    }

    // Record click
    await prisma.click.create({
      data: {
        smartLinkId: smartlink.id,
        offerId: selected.offerId,
        ip,
        userAgent,
        country: geo.country,
        device
      }
    });

    return NextResponse.redirect(selected.offer.url);

  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

// Core selection logic
function selectOffer(offers: any[], geo: any, device: string) {
  const filtered = offers.filter(o => {
    const f = o.offer;
    const geoMatch = !f.geo || f.geo.includes(geo.country);
    const deviceMatch = !f.device || f.device.includes(device);
    return geoMatch && deviceMatch;
  });

  if (filtered.length === 0) return null;

  return randomWeighted(
    filtered.map(f => ({
      weight: f.weight || 1,
      value: f
    }))
  );
}
