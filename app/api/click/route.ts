import { NextRequest, NextResponse } from "next/server";
import {prisma} from "@/lib/prisma";
import { v4 as uuidv4 } from "uuid";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);

    const offerId = searchParams.get("offerId");
    const publisherId = searchParams.get("publisherId");
    const domain = searchParams.get("domain");
    const subid = searchParams.get("subid") ?? null;
    const source = searchParams.get("source") ?? null;

    if (!offerId || !publisherId) {
      return NextResponse.json({ error: "Missing params" }, { status: 400 });
    }

    // Identify IP & UA
    const ip =
      req.headers.get("x-forwarded-for")?.split(",")[0] ||
      req.headers.get("x-real-ip") ||
      "0.0.0.0";

    const userAgent = req.headers.get("user-agent") ?? "";

    const clickId = uuidv4();


    // Find domain record
    let domainRecord = null;
    if (domain) {
      domainRecord = await prisma.domain.findFirst({
        where: { domain, publisherId: Number(publisherId) },
      });
    }

    // Create click entry
    const click = await prisma.click.create({
      data: {
        clickId,
        offerId: Number(offerId),
        publisherId: Number(publisherId),
        domainId: domainRecord?.id ?? null,
        ipAddress: ip,
        userAgent,
        subid,
        source,
      },
    });

    // Get redirect URL
    const offer = await prisma.offer.findUnique({
      where: { id: Number(offerId) },
    });

    if (!offer?.landingUrl) {
      return NextResponse.json(
        { error: "Offer missing landing URL" },
        { status: 500 }
      );
    }

    // Add clickId to redirect URL
    const redirectUrl = `${offer.landingUrl}?clickId=${click.clickId}`;

    return NextResponse.redirect(redirectUrl);
  } catch (err) {
    console.error("Click Error:", err);
    return NextResponse.json({ error: "Internal Error" }, { status: 500 });
  }
}
