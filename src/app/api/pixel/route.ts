import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

// 1x1 GIF bytes
const GIF_1x1 = Buffer.from(
  "47494638396101000100800000ffffff00000021f90401000001002c00000000010001000002024401003b",
  "hex"
);

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);

    const offerId = Number(searchParams.get("offer_id"));
    const publisherId = Number(searchParams.get("pub_id"));
    const geo = searchParams.get("geo") || "unknown";
    const device = searchParams.get("device") || "unknown";

    if (offerId && publisherId) {
      await prisma.impression.create({
        data: { offerId, publisherId, geo, device }
      });
    }

  } catch (err) {
    console.error("Pixel log error:", err);
  }

  return new Response(GIF_1x1, {
    headers: {
      "Content-Type": "image/gif",
      "Cache-Control": "no-cache, no-store, must-revalidate"
    }
  });
}

