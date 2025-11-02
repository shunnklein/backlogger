import { getCookieCache } from "better-auth/cookies";
import { NextRequest, NextResponse } from "next/server";

export async function middleware(request: NextRequest) {
  // Redirect to the main page if no valid better auth session exists in the request
  const session = await getCookieCache(request);
  if (!session) {
    return NextResponse.redirect(new URL("/sign-in", request.url));
  }

  return NextResponse.next();
}

export const config = {
  // Specify the routes the middleware applies to
  matcher: ["/placeholderForRoutesProtectedByAuth"],
};
