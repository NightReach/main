import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getUser } from "@/lib/auth";

export async function GET() {
  try {
    const user = await getUser();
    if (!user)
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const smartlinks = await prisma.smartLink.findMany({
      where: { publisherId: user.id },
      include: {
        _count: { select: { clicks: true, conversions: true } }
      },
      orderBy: { id: "desc" }
    });

    return NextResponse.json({ ok: true, smartlinks });

  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
