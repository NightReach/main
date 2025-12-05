import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(_: Request, { params }: any) {
  const id = Number(params.id);

  const advertiser = await prisma.user.findUnique({
    where: { id },
    include: { offers: true }
  });

  return NextResponse.json(advertiser);
}
