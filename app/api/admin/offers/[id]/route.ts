import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(_: Request, { params }: any) {
  const offer = await prisma.offer.findUnique({
    where: { id: Number(params.id) }
  });
  return NextResponse.json(offer);
}

export async function PUT(req: Request, { params }: any) {
  const { title, payout } = await req.json();
  const updated = await prisma.offer.update({
    where: { id: Number(params.id) },
    data: { title, payout }
  });
  return NextResponse.json(updated);
}
