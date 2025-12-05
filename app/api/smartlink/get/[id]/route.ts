import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getUser } from "@/lib/auth";

export async function GET(req: Request, { params }: any) {
  try {
    const user = await getUser();
    if (!user)
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const { id } = params;

    const smartlink = await prisma.smartLink.findFirst({
      where: { id: Number(id), publisherId: user.id },
      include: {
        offers: {
          include: { offer: true }
        },
        _count: { select: { clicks: true, conversions: true } }
      }
    });

    if (!smartlink)
      return NextResponse.json({ error: "Not found" }, { status: 404 });

    return NextResponse.json({ ok: true, smartlink });

  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}