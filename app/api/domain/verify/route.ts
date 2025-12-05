import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import dns from "dns/promises";
import { getUser } from "@/lib/auth";

export async function POST(req: Request) {
  try {
    const user = await getUser();
    if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const { domain } = await req.json();
    if (!domain) return NextResponse.json({ error: "Domain required" }, { status: 400 });

    const record = await prisma.domain.findFirst({
      where: { domain, publisherId: user.id }
    });

    if (!record)
      return NextResponse.json({ error: "Domain not found" }, { status: 404 });

    const expected = `nr-verify=${record.verificationToken}`;

    const txtRecords = await dns.resolveTxt(domain).catch(() => []);

    const found = txtRecords.some(arr => arr.join("") === expected);

    if (!found)
      return NextResponse.json({ error: "Verification failed" }, { status: 400 });

    await prisma.domain.update({
      where: { id: record.id },
      data: { verified: true }
    });

    return NextResponse.json({ ok: true });

  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
