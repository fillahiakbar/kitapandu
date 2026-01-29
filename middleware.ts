import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const token = request.cookies.get("access_token")?.value;

  // 🚫 belum login → redirect
  if (!token) {
    return NextResponse.redirect(new URL("/authentication/login", request.url));
  }

  return NextResponse.next();
}

// 🎯 HANYA PROTECT DASHBOARD
export const config = {
  matcher: ["/dashboard/:path*"],
};
