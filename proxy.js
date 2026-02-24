import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server'

const isPublicRoute = createRouteMatcher([
  '/sign-in(.*)',
  '/sign-up(.*)',
  '/'
])

export default clerkMiddleware(async (auth, req) => {
  // wrap protect call to avoid blowing up the entire site if Clerk is misconfigured
  if (!isPublicRoute(req)) {
    try {
      await auth.protect();
    } catch (err) {
      // log error server-side (Vercel will capture console.error output)
      console.error("Clerk middleware protection failed", err);
      // don't rethrow; let the request continue so that our layout/page-level
      // guards can handle unauthorized users instead of crashing the app.
    }
  }
})

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
}