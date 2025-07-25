import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

const isProtectedRoute = createRouteMatcher([
  "/onboarding(.*)",
  "/organization(.*)",
  "/project(.*)",
  "/issue(.*)",
]);

export default clerkMiddleware((auth, req) => {
  const pathname = req.nextUrl.pathname;

  // Allow these routes even without active org
  const orgBySlugRoute = /^\/organization\/[^\/]+$/;
  const allowedWithoutOrgRoute = /^\/(onboarding|project\/create|project\/[^\/]+|)$/;

  // If not signed in and hitting a protected route → redirect to sign in
  if (!auth().userId && isProtectedRoute(req)) {
    return auth().redirectToSignIn();
  }

  // If signed in but no active org → only allow specific routes
  if (
    auth().userId &&
    !auth().orgId &&
    !allowedWithoutOrgRoute.test(pathname) &&
    !orgBySlugRoute.test(pathname)
  ) {
    return NextResponse.redirect(new URL("/onboarding", req.url));
  }

  return NextResponse.next();
});

export const config = {
  matcher: [
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    "/(api|trpc)(.*)",
  ],
};
