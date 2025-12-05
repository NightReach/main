import prisma from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function GET(req, { params }) {
  const offer = await prisma.offer.findUnique({
    where: { id: Number(params.id) }
  });
  return NextResponse.json(offer);
}

export async function PUT(req, { params }) {
  const { title, payout } = await req.json();
  const offer = await prisma.offer.update({
    where: { id: Number(params.id) },
    data: { title, payout: parseFloat(payout) }
  });
  return NextResponse.json(offer);
}

export async function DELETE(req, { params }) {
  await prisma.offer.delete({
    where: { id: Number(params.id) }
  });
  return NextResponse.json({ success: true });
}
