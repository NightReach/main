import { NextResponse } from "next/server";
import {prisma} from "@/lib/prisma";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const publisherId = searchParams.get("publisherId")
      ? Number(searchParams.get("publisherId"))
      : undefined;

    // Filter if publisherId is passed
    const clickFilter = publisherId ? { publisherId } : {};
    const conversionFilter = publisherId
      ? { click: { publisherId } }
      : {};

    const clicks = await prisma.click.groupBy({
      by: ["createdAt"],
      _count: { id: true },
      where: clickFilter,
    });

    const conversions = await prisma.conversion.groupBy({
      by: ["createdAt"],
      _count: { id: true },
      where: conversionFilter,
    });

    return NextResponse.json({
      clicks,
      conversions,
    });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
