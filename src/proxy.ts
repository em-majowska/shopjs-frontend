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
      const requestHeaders = new Headers(request.headers);
      requestHeaders.set(
        "x-error-message",
        "Vous n'avez pas les autorisations nécessaires pour accéder à cette page.",
      );

      return NextResponse.next({
        request: {
          headers: requestHeaders,
        },
      });
    }
  }

  return NextResponse.next();
}
export const config = {
  matcher: ["/payment", "/admin"],
};
