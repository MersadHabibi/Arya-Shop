import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  if (
    request.nextUrl.pathname.startsWith("/profile") ||
    request.nextUrl.pathname.startsWith("/cart")
  ) {
    const token = request.cookies.get("accessToken")?.value;

    if (!token) return NextResponse.redirect(new URL("/auth", request.url));

    // const tokenDecode = jwtDecode(token, { header: true });
  }

  if (request.nextUrl.pathname.startsWith("/auth")) {
    const token = request.cookies.get("accessToken")?.value;

    if (token) return NextResponse.redirect(new URL("/profile", request.url));

    // const tokenDecode = jwtDecode(token, { header: true });
  }
}

export const config = {
  matcher: ["/profile", "/cart", "/auth"],
};
