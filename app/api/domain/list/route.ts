import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getUser } from "@/lib/auth";

export async function GET() {
  try {
    const user = await getUser();
    if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const domains = await prisma.domain.findMany({
      where: { publisherId: user.id },
      orderBy: { createdAt: "desc" }
    });

    return NextResponse.json({ ok: true, domains });

  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
