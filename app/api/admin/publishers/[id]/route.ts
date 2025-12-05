import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(_: Request, { params }: any) {
  const id = Number(params.id);

  const publisher = await prisma.user.findUnique({
    where: { id },
    include: { domains: true }
  });

  return NextResponse.json(publisher);
}
