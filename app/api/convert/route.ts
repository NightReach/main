import {prisma} from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const clickId = Number(req.nextUrl.searchParams.get("clickId"));
    const offerId = Number(req.nextUrl.searchParams.get("offerId")); // optional
    const debug = req.nextUrl.searchParams.get("debug");

    if (!clickId) {
      return NextResponse.json({ error: "Missing clickId" }, { status: 400 });
    }

    // Check click exists
    const click = await prisma.click.findUnique({
      where: { id: clickId },
    });

    if (!click) {
      return NextResponse.json({ error: "Invalid clickId" }, { status: 400 });
    }

    // Log conversion
    const conversion = await prisma.conversion.create({
      data: {
        clickId,
        offerId: offerId || click.offerId, // auto-fallback
      },
    });

    if (debug) {
      return NextResponse.json({
        message: "TEST MODE — Conversion logged",
        conversion,
      });
    }

    return NextResponse.json({ success: true, conversion });

  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Server Error" }, { status: 500 });
  }
}
