import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getUser } from "@/lib/auth";

export async function POST(req: Request) {
  try {
    const user = await getUser();
    if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const { domain } = await req.json();

    if (!domain) {
      return NextResponse.json({ error: "Domain is required" }, { status: 400 });
    }

    const exists = await prisma.domain.findFirst({
      where: { domain, publisherId: user.id }
    });

    if (exists) {
      return NextResponse.json({ error: "Domain already exists" }, { status: 400 });
    }

    const verificationToken = Math.random().toString(36).substring(2, 15);

    await prisma.domain.create({
      data: {
        domain,
        publisherId: user.id,
        verificationToken,
      }
    });

    return NextResponse.json({ ok: true, verificationToken });

  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
