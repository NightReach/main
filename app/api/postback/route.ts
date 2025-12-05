import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(req: NextRequest) {
  try {
    const clickId = Number(req.nextUrl.searchParams.get("clickId"));
    const payout = Number(req.nextUrl.searchParams.get("amount") || "0");
    const status = req.nextUrl.searchParams.get("status") || "approved";

    if (!clickId) {
      return NextResponse.json(
        { error: "Missing clickId" },
        { status: 400 }
      );
    }

    const click = await prisma.click.findUnique({ where: { id: clickId } });

    if (!click) {
      return NextResponse.json(
        { error: "Click not found" }, 
        { status: 404 }
      );
    }

    const conversion = await prisma.conversion.upsert({
      where: { clickId },
      update: { payout, status },
      create: {
        clickId,
        payout,
        status,
      },
    });

    return NextResponse.json({ success: true, conversion });
  } catch (e) {
    return NextResponse.json(
      { error: "Server error", detail: e.message },
      { status: 500 }
    );
  }
}
