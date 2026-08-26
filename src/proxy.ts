import { NextRequest, NextResponse } from "next/server";

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  if (pathname === "/payment") {
    const token = request.cookies.get("token")?.value;

    if (!token) {
      return NextResponse.redirect(new URL("/users/login", request.url));
    }
  }

  if (pathname === "/admin") {
    const token = request.cookies.get("token")?.value;

    if (!token) {
      return NextResponse.redirect(new URL("/users/login", request.url));
    }

    const isAdmin = request.cookies.get("isAdmin")?.value;
    if (!isAdmin) {
      return NextResponse.rewrite(new URL("/users/login", request.url));
    }
  }
}
export const config = {
  matcher: ["/payment", "/admin"],
};
