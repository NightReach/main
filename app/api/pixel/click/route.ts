// app/api/pixel/click/route.ts
import { NextResponse } from "next/server";
import db from "@/lib/db";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { domain, publisherId } = body;

    // look up publisher by domain to validate publisherId (optional)
    const dom = await db.domain.findUnique({ where: { url: domain } });
    const publisher = dom ? dom.publisherId : publisherId ?? 1;

    await db.click.create({
      data: {
        publisherId: publisher,
        domain,
        ip: req.headers.get("x-forwarded-for") ?? "",
        userAgent: req.headers.get("user-agent") ?? "",
        referer: req.headers.get("referer") ?? "",
      },
    });

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ ok: false }, { status: 500 });
  }
}
