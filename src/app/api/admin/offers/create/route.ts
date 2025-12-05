import prisma from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function POST(req) {
  const { title, payout } = await req.json();

  const offer = await prisma.offer.create({
    data: { title, payout: parseFloat(payout) }
  });

  return NextResponse.json(offer);
}
