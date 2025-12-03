import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const { domainId, token } = await req.json();

    if (!domainId || !token) {
      return NextResponse.json(
        { error: "domainId & token required" },
        { status: 400 }
      );
    }

    const domain = await prisma.domain.findUnique({
      where: { id: domainId },
    });

    if (!domain) {
      return NextResponse.json(
        { error: "Domain not found" },
        { status: 404 }
      );
    }

    if (domain.verifyToken !== token) {
      return NextResponse.json(
        { error: "Invalid verification token" },
        { status: 400 }
      );
    }

    const updated = await prisma.domain.update({
      where: { id: domainId },
      data: { verified: true },
    });

    return NextResponse.json({ success: true, domain: updated });
  } catch (error) {
    console.error("Domain verify error:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
