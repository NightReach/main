// app/api/offers/route.ts
import { NextResponse } from "next/server";
import {prisma} from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { title, description, payout, advertiserId, landingUrl } = body;

    const offer = await prisma.offer.create({
      data: {
        title,
        description,
        payout: Number(payout),
        advertiserId: Number(advertiserId),
        landingUrl,
      },
    });

    return NextResponse.json(offer);
  } catch (error) {
    console.error("Error creating offer:", error);
    return NextResponse.json({ error: "Failed to create offer" }, { status: 500 });
  }
}

export async function GET() {
  try {
    const offers = await prisma.offer.findMany({
      orderBy: { id: "desc" },
    });

    return NextResponse.json(offers);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch offers" }, { status: 500 });
  }
}
