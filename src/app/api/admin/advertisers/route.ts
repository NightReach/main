import prisma from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function GET() {
  const advertisers = await prisma.user.findMany({
    where: { role: 'ADVERTISER' },
    orderBy: { id: 'desc' }
  });
  return NextResponse.json(advertisers);
}
