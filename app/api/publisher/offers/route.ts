import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const publisherId = searchParams.get("pubId");

    if (!publisherId) {
      return NextResponse.json(
        { error: "pubId is required" },
        { status: 400 }
      );
    }

    // Fetch all offers from database
    const offers = await prisma.offer.findMany({
      orderBy: { id: "desc" },
    });

    // Generate tracking URLs
    const finalOffers = offers.map((offer) => ({
      id: offer.id,
      title: offer.title,
      description: offer.description,
      payout: offer.payout,
      landingUrl: offer.landingUrl,
      trackingUrl: `${BASE_URL}/api/click?offerId=${offer.id}&pubId=${publisherId}`
    }));

    return NextResponse.json(finalOffers);
  } catch (error) {
    console.error("Publisher Offer API Error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
