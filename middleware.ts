import { updateSession } from "@/lib/supabase/middleware";
import { type NextRequest } from "next/server";
import { NextResponse } from "next/server";

export async function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  // Define public paths and prefix patterns
  const publicPages = ["/tech-stack", "/projects", "/certifications", "/snake"];
  const publicPathPrefixes = ["/blog", "/manifest,", "/Lua_Resume_v2.1.pdf"];

  // Allow if it's an exact match
  if (publicPages.includes(pathname)) {
    return NextResponse.next();
  }

  // Allow if it starts with any public path prefix (e.g., /blog/*)
  if (publicPathPrefixes.some(prefix => pathname.startsWith(prefix))) {
    return NextResponse.next();
  }

  // Otherwise, require auth
  return await updateSession(request);
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
