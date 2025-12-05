import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET() {
  const offers = await prisma.offer.findMany();

  if (!offers.length) {
    return NextResponse.json({ error: "No offers" }, { status: 404 });
  }

  const random = offers[Math.floor(Math.random() * offers.length)];

  return NextResponse.json(random);
}
