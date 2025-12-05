import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { verifyToken } from "@/lib/auth";

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const token = req.cookies.get("token")?.value;

  // Public paths that don't require authentication
  const publicPaths = ["/", "/login", "/signup"];
  const isPublicPath = publicPaths.some(path => pathname === path);

  // If it's a public path, allow access
  if (isPublicPath) {
    // If user is already logged in and tries to access login/signup, redirect to dashboard
    if (token && (pathname === "/login" || pathname === "/signup")) {
      const decoded = verifyToken(token);
      if (decoded) {
        const role = decoded.role.toLowerCase();
        return NextResponse.redirect(new URL(`/${role}/dashboard`, req.url));
      }
    }
    return NextResponse.next();
  }

  // Protected routes require authentication
  if (!token) {
    const loginUrl = new URL("/login", req.url);
    loginUrl.searchParams.set("redirect", pathname);
    return NextResponse.redirect(loginUrl);
  }

  // Verify token
  const decoded = verifyToken(token);
  if (!decoded) {
    const response = NextResponse.redirect(new URL("/login", req.url));
    response.cookies.delete("token");
    return response;
  }

  // Role-based access control
  const role = decoded.role.toLowerCase();

  // Check if user is trying to access their own role's routes
  if (pathname.startsWith("/advertiser") && role !== "advertiser") {
    return NextResponse.redirect(new URL(`/${role}/dashboard`, req.url));
  }

  if (pathname.startsWith("/publisher") && role !== "publisher") {
    return NextResponse.redirect(new URL(`/${role}/dashboard`, req.url));
  }

  // Add user info to headers for server components
  const response = NextResponse.next();
  response.headers.set("x-user-id", decoded.id.toString());
  response.headers.set("x-user-role", decoded.role);
  response.headers.set("x-user-email", decoded.email);

  return response;
}

export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public files (public folder)
     * - api routes (handled separately)
     */
    "/advertiser/:path*",
    "/publisher/:path*",
  ],
};