import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getUser } from "@/lib/auth";
import slugify from "slugify";

export async function POST(req: Request) {
  try {
    const user = await getUser();
    if (!user) 
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const { name, vertical, fallbackUrl, offers } = await req.json();

    if (!name) 
      return NextResponse.json({ error: "Name required" }, { status: 400 });

    const slug = slugify(name + "-" + user.id, { lower: true });

    const smartlink = await prisma.smartLink.create({
      data: {
        name,
        slug,
        vertical,
        fallbackUrl,
        publisherId: user.id,
      }
    });

    if (offers && offers.length > 0) {
      await prisma.smartLinkOffer.createMany({
        data: offers.map((offerId: number) => ({
          smartLinkId: smartlink.id,
          offerId,
          weight: 1
        }))
      });
    }

    return NextResponse.json({ ok: true, smartlink });

  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
