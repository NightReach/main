import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

// Simple GEO parser
function getGeo(req: Request) {
  const ip = req.headers.get("x-forwarded-for") || "";
  // TODO: integrate external geo API later
  return "US"; 
}

// Simple device parser
function getDevice(req: Request) {
  const ua = req.headers.get("user-agent") || "";
  if (ua.includes("iPhone") || ua.includes("iPad")) return "iOS";
  if (ua.includes("Android")) return "Android";
  return "Desktop";
}

export async function GET(req: Request, { params }) {
  const publisherId = Number(params.publisherId);

  try {
    const geo = getGeo(req);
    const device = getDevice(req);

    // 1.


cat << 'EOF' > src/app/smartlink/[publisherId]/route.ts
import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

// Simple GEO parser
function getGeo(req: Request) {
  const ip = req.headers.get("x-forwarded-for") || "";
  // TODO: integrate external geo API later
  return "US"; 
}

// Simple device parser
function getDevice(req: Request) {
  const ua = req.headers.get("user-agent") || "";
  if (ua.includes("iPhone") || ua.includes("iPad")) return "iOS";
  if (ua.includes("Android")) return "Android";
  return "Desktop";
}

export async function GET(req: Request, { params }) {
  const publisherId = Number(params.publisherId);

  try {
    const geo = getGeo(req);
    const device = getDevice(req);

    // 1.

cat << 'EOF' > src/app/smartlink/[publisherId]/route.ts
import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

// Simple GEO parser
function getGeo(req: Request) {
  const ip = req.headers.get("x-forwarded-for") || "";
  // TODO: integrate external geo API later
  return "US"; 
}

// Simple device parser
function getDevice(req: Request) {
  const ua = req.headers.get("user-agent") || "";
  if (ua.includes("iPhone") || ua.includes("iPad")) return "iOS";
  if (ua.includes("Android")) return "Android";
  return "Desktop";
}

export async function GET(req: Request, { params }) {
  const publisherId = Number(params.publisherId);

  try {
    const geo = getGeo(req);
    const device = getDevice(req);

    // 1. Fetch offers for publisher
    const offers = await prisma.offer.findMany({
      where: { active: true },
      include: { clicks: true, conversions: true }
    });

    if (offers.length === 0) {
      return NextResponse.redirect("https://google.com");
    }

    // 2. Calculate EPC for each offer
    const weighted = offers.map((offer) => {
      const clicks = offer.clicks.length;
      const revenue = offer.conversions.reduce((sum, c) => sum + c.payout, 0);
      const epc = clicks === 0 ? 0.05 : revenue / clicks; // default EPC fallback

      return {
        id: offer.id,
        url: offer.url,
        weight: epc
      };
    });

    // 3. Weighted random selection
    const totalWeight = weighted.reduce((sum, o) => sum + o.weight, 0);
    let rand = Math.random() * totalWeight;

    let selected = weighted[0];
    for (const offer of weighted) {
      if (rand < offer.weight) {
        selected = offer;
        break;
      }
      rand -= offer.weight;
    }

    // 4. Log click
    const click = await prisma.click.create({
      data: {
        publisherId,
        offerId: selected.id,
        geo,
        device
      }
    });

    // 5. Redirect with click tracking ID
    const redirectUrl = \`\${selected.url}?cid=\${click.id}\`;

    return NextResponse.redirect(redirectUr

cat << 'EOF' > src/app/smartlink/[publisherId]/route.ts
import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

// Simple GEO parser
function getGeo(req: Request) {
  const ip = req.headers.get("x-forwarded-for") || "";
  // TODO: integrate external geo API later
  return "US"; 
}

// Simple device parser
function getDevice(req: Request) {
  const ua = req.headers.get("user-agent") || "";
  if (ua.includes("iPhone") || ua.includes("iPad")) return "iOS";
  if (ua.includes("Android")) return "Android";
  return "Desktop";
}

export async function GET(req: Request, { params }) {
  const publisherId = Number(params.publisherId);

  try {
    const geo = getGeo(req);
    const device = getDevice(req);

    // 1. Fetch offers for publisher
    const offers = await prisma.offer.findMany({
      where: { active: true },
      include: { clicks: true, conversions: true }
    });

    if (offers.length === 0) {
      return NextResponse.redirect("https://google.com");
    }

    // 2. Calculate EPC for each offer
    const weighted = offers.map((offer) => {
      const clicks = offer.clicks.length;
      const revenue = offer.conversions.reduce((sum, c) => sum + c.payout, 0);
      const epc = clicks === 0 ? 0.05 : revenue / clicks; // default EPC fallback

      return {
        id: offer.id,
        url: offer.url,
        weight: epc
      };
    });

    // 3. Weighted random selection
    const totalWeight = weighted.reduce((sum, o) => sum + o.weight, 0);
    let rand = Math.random() * totalWeight;

    let selected = weighted[0];
    for (const offer of weighted) {
      if (rand < offer.weight) {
        selected = offer;
        break;
      }
      rand -= offer.weight;
    }

    // 4. Log click
    const click = await prisma.click.create({
      data: {
        publisherId,
        offerId: selected.id,
        geo,
        device
      }
    });

    // 5. Redirect with click tracking ID
    const redirectUrl = \`\${selected.url}?cid=\${click.id}\`;

    return NextResponse.redirect(redirectUrl, 302);

  } catch (e) {
    return NextResponse.redirect("https://google.com");
  }
}
