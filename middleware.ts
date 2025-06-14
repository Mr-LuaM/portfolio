import { updateSession } from "@/lib/supabase/middleware";
import { type NextRequest } from "next/server";
import { NextResponse } from "next/server";

export async function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  // Define public paths and prefix patterns
  const publicPages = ["/tech-stack", "/projects", "/certifications"];
  const publicPathPrefixes = ["/blog"];

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
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",  // Exclude static files
  ],
};
