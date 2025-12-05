import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  const offers = await prisma.offer.findMany();
  return NextResponse.json(offers);
}

export async function POST(req: Request) {
  const { title, payout } = await req.json();
  const newOffer = await prisma.offer.create({
    data: { title, payout }
  });
  return NextResponse.json(newOffer);
}
