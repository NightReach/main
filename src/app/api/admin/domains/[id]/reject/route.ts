import prisma from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function POST(req, { params }) {
  await prisma.publisherDomain.update({
    where: { id: Number(params.id) },
    data: { status: 'REJECTED' }
  });

  return NextResponse.json({ success: true });
}
