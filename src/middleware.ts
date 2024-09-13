import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  if (request.nextUrl.pathname.startsWith("/profile")) {
    const token = request.cookies.get("accessToken")?.value;

    if (!token) return NextResponse.redirect(new URL("/auth", request.url));

    // const tokenDecode = jwtDecode(token, { header: true });
  }
}

export const config = {
  matcher: "/profile",
};
