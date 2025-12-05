import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(req: Request, { params }: any) {
  const { id } = params;

  const sl = await prisma.smartlink.findUnique({ where: { id: Number(id) } });
  if (!sl) return NextResponse.json({ error: "Smartlink not found" }, { status: 404 });

  // Create a click record
  const click = await prisma.click.create({
    data: {
      smartlinkId: Number(id),
      ip: req.headers.get("x-forwarded-for") || "0.0.0.0",
      geo: "UNK",
      device: "unknown"
    }
  });

  // Append click id to offer redirect (MVP: use fallback)
  const redirectUrl =
    sl.fallbackUrl +
    (sl.fallbackUrl.includes("?") ? "&" : "?") +
    "sub1=" +
    click.id;

  return NextResponse.redirect(redirectUrl);
}
