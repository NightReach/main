import { NextResponse } from "next/server";

export async function GET() {
  // TODO: replace with real session ID
  const publisherId = 1;

  const url = \`https://yourdomain.com/smartlink/\${publisherId}\`;

  return NextResponse.json({ url });
}
