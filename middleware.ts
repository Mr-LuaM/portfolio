import { updateSession } from "@/lib/supabase/middleware";  // Keep this import if you want some routes to require authentication
import { type NextRequest } from "next/server";
import { NextResponse } from "next/server";

export async function middleware(request: NextRequest) {
  // Exclude public pages like /tech-stack, /about, etc. from authentication
  const publicPages = ["/tech-stack", "/about", "/contact"];  // Add more public paths if needed
  
  if (publicPages.includes(request.nextUrl.pathname)) {
    return NextResponse.next();  // Allow public pages without authentication
  }

  return await updateSession(request);  // Call updateSession for other protected pages
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",  // Match all paths except static assets
  ],
};
