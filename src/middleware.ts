import { NextResponse } from "next/server";

export function middleware(request: Request) {
  const url = new URL(request.url);

  if (url.pathname.startsWith("/admin")) {
    const role = request.headers.get("x-user-role");

    if (role !== "admin") {
      return NextResponse.redirect(new URL("/login", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"]
};

