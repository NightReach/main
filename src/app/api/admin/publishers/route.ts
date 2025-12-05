import prisma from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function GET() {
  const publishers = await prisma.user.findMany({
    where: { role: 'PUBLISHER' },
    orderBy: { id: 'desc' }
  });

  return NextResponse.json(publishers);
}
