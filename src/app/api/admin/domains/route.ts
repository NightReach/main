import prisma from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function GET() {
  const domains = await prisma.publisherDomain.findMany({
    include: {
      publisher: true
    },
    orderBy: { id: 'desc' }
  });

  return NextResponse.json(domains);
}
