import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const linkId = searchParams.get("linkId");
  const domain = searchParams.get("domain");

  if (!linkId || !domain) {
    return NextResponse.json({ error: "Missing params" }, { status: 400 });
  }

  await prisma.click.create({
    data: {
      linkId: Number(linkId),
      domain,
    },
  });

  return NextResponse.redirect("https://google.com"); // placeholder
}
