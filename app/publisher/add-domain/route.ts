import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const { publisherId, domain } = await req.json();

    if (!publisherId || !domain) {
      return NextResponse.json(
        { error: "publisherId and domain required" },
        { status: 400 }
      );
    }

    const newDomain = await prisma.domain.create({
      data: {
        publisherId,
        url: domain,
        verifyToken: Math.random().toString(36).substring(2, 15),
        verified: false
      },
    });

    return NextResponse.json({ success: true, domain: newDomain });
  } catch (error) {
    console.error("Add domain error:
