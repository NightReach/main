import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

async function getValue(key: string) {
  const record = await prisma.setting.findUnique({ where: { key } });
  return record?.value || "";
}

export async function GET() {
  const networkName = await getValue("networkName");
  const supportEmail = await getValue("supportEmail");
  const fallbackUrl = await getValue("fallbackUrl");
  const minPayout = await getValue("minPayout");

  return NextResponse.json({
    loaded: true,
    networkName,
    supportEmail,
    fallbackUrl,
    minPayout
  });
}

export async function POST(req: Request) {
  const { key, value } = await req.json();

  await prisma.setting.upsert({
    where: { key },
    update: { value },
    create: { key, value }
  });

  return NextResponse.json({ success: true });
}
