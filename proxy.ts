import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { defaultLocale, locales } from "@/lib/i18n-config";

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname === "/ja" || pathname.startsWith("/ja/")) {
    request.nextUrl.pathname = pathname.replace(/^\/ja/, `/${defaultLocale}`);
    return NextResponse.redirect(request.nextUrl);
  }

  const pathnameHasLocale = locales.some(
    (locale) =>
      pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`,
  );
  if (pathnameHasLocale) return;

  request.nextUrl.pathname = `/${defaultLocale}${pathname === "/" ? "" : pathname}`;
  return NextResponse.redirect(request.nextUrl);
}

export const config = {
  matcher: ["/((?!_next|studio|api|.*\\..*).*)"],
};
