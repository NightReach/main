import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

// 1x1 transparent GIF (base64)
const PIXEL = Buffer.from(
  "R0lGODlhAQABAIABAP///wAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==",
  "base64"
);

export async function GET(req: Request, { params }) {
  const clickId = Number(params.clickId);

  if (!clickId) {
    return new NextResponse("Invalid pixel", { status: 400 });
  }

  try {
    // Save impression in DB
    await prisma.impression.create({
      data: {
        clickId
      }
    });

    // Return 1x1 pixel image
    return new NextResponse(PIXEL, {
      status: 200,
      headers: {
        "Content-Type": "image/gif",
        "Content-Length": PIXEL.length.toString(),
        "Cache-Control": "no-cache, no-store, must-revalidate",
      },
    });

  } catch (e) {
    return

cat << 'EOF' > src/app/t/[clickId]/route.ts
import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

// 1x1 transparent GIF (base64)
const PIXEL = Buffer.from(
  "R0lGODlhAQABAIABAP///wAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==",
  "base64"
);

export async function GET(req: Request, { params }) {
  const clickId = Number(params.clickId);

  if (!clickId) {
    return new NextResponse("Invalid pixel", { status: 400 });
  }

  try {
    // Save impression in DB
    await prisma.impression.create({
      data: {
        clickId
      }
    });

    // Return 1x1 pixel image
    return new NextResponse(PIXEL, {
      status: 200,
      headers: {
        "Content-Type": "image/gif",
        "Content-Length": PIXEL.length.toString(),
        "Cache-Control": "no-cache, no-store, must-revalidate",
      },
    });

  } catch (e) {
    return new NextResponse("Error", { status: 500 });
  }
}
