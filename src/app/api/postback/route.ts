import { NextResponse } from "next/server";
import crypto from "crypto";
import prisma from "@/lib/prisma";

function verifySignature(secret: string, params: URLSearchParams) {
  const sig = params.get("sig");
  if (!sig) return false;

  const baseString =
    `offer_id=${params.get("offer_id")}` +
    `&pub_id=${params.get("pub_id")}` +
    `&payout=${params.get("payout")}` +
    `&click_id=${params.get("click_id")}`;

  const expected = crypto
    .createHmac("sha256", secret)
    .update(baseString)
    .digest("hex");

  return expected === sig;
}

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);

  const offerId = Number(searchParams.get("offer_id"));
  const publisherId = Number(searchParams.get("pub_id"));
  const payout = parseFloat(searchParams.get("payout") || "0");
  const clickId = searchParams.get("click_id");
  const advertiserId = Number(searchParams.get("adv_id")); // required

  if (!offerId || !publisherId || !advertiserId) {
    return NextResponse.json({ error: "Missing required params" }, { status: 400 });
  }

  // pull advertiser secret
  const advertiser = await prisma.user.findUnique({
    where: { id: advertiserId },
    select: { postbackSecret: true }
  });

  if (!advertiser?.postbackSecret) {
    return NextResponse.json({ error: "No advertiser secret" }, { status: 403 });
  }

  // verify signature
  if (!verifySignature(advertiser.postbackSecret, searchParams)) {
    return NextResponse.json({ error: "Invalid signature" }, { status: 403 });
  }

  // log conversion
  const data = await prisma.conversion.create({
    data: {
      offerId,
      publisherId,
      payout,
      externalId: clickId
    }
  });

  return NextResponse.json({ success: true, conversion: data });
}
import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);

  const offerId = Number(searchParams.get("offer_id"));
  const publisherId = Number(searchParams.get("pub_id"));
  const payout = parseFloat(searchParams.get("payout") || "0");
  const clickId = searchParams.get("click_id");

  if (!offerId || !publisherId) {
    return NextResponse.json({ error: "Missing required params" }, { status: 400 });
  }

  try {
    const data = await prisma.conversion.create({
      data: {
        offerId,
        publisherId,
        payout,
        externalId: clickId
      }
    });

    return NextResponse.json({ success: true, conversion: data });
  } catch (err) {
    console.error("Postback error:", err);
    return NextResponse.json({ error: "DB failure" }, { status: 500 });
  }
}

