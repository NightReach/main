import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

function normalizeDomain(domain: string) {
  return domain
    .replace(/^https?:\/\//, "")      // remove http/https
    .replace(/^www\./, "")            // remove www.
    .split("/")[0]                    // remove path
    .trim();
}

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);

    const offerId = Number(searchParams.get("offerId"));
    const publisherId = Number(searchParams.get("publisherId"));
    const domain = searchParams.get("domain");
    const subid = searchParams.get("subid") ?? null;
    const source = searchParams.get("source") ?? null;

    if (!offerId || !publisherId || !domain) {
      return NextResponse.json({ error: "Missing params" }, { status: 400 });
    }

    // Normalize domain
    const normalized = normalizeDomain(domain);

    // Match domain OR "www." + domain (failsafe)
    const domainRecord = await prisma.domain.findFirst({
      where: {
        publisherId,
        OR: [
          { domain: normalized },
          { domain: "www." + normalized },
        ],
      },
    });

    if (!domainRecord) {
      return NextResponse.json(
        { error: "Invalid domain", normalized },
        { status: 400 }
      );
    }

    // Identify IP & user agent
    const ip =
      req.headers.get("x-forwarded-for")?.split(",")[0] ||
      req.headers.get("x-real-ip") ||
      "0.0.0.0";

    const userAgent = req.headers.get("user-agent") ?? "";

    const clickId = crypto.randomUUID();

    // Create click
    const click = await prisma.click.create({
      data: {
        clickId,
        offerId,
        publisherId,
        domainId: domainRecord.id,
        ipAddress: ip,
        userAgent,
        subid,
        source,
      },
    });

    // Fetch offer landing URL
    const offer = await prisma.offer.findUnique({
      where: { id: offerId },
    });

    if (!offer?.landingUrl) {
      return NextResponse.json(
        { error: "Offer missing landing URL" },
        { status: 500 }
      );
    }

    // Attach clickId to redirect URL
    const redirectUrl = `${offer.landingUrl}?clickId=${click.clickId}`;

    return NextResponse.redirect(redirectUrl);
  } catch (err) {
    console.error("Click Error:", err);
    return NextResponse.json({ error: "Internal Error" }, { status: 500 });
  }
}
