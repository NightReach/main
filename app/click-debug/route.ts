import { NextResponse } from "next/server";
import {prisma} from "@/lib/prisma";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);

    const offerId = Number(searchParams.get("offerId"));
    const publisherId = Number(searchParams.get("publisherId"));
    const domain = searchParams.get("domain");

    return NextResponse.json({
      message: "Click-debug route working",
      offerId,
      publisherId,
      domain
    });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
