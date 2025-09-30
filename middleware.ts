// middleware.ts
import { type NextRequest } from 'next/server'
import { updateSession } from './utils/supabase/middleware'

/**
 * This middleware runs before every request that matches the `matcher` below.
 * Here, it delegates to Supabase's `updateSession` logic (see utils/supabase/middleware.ts).
 */
export async function middleware(request: NextRequest) {
  return await updateSession(request)
}

/**
 * ✅ Match only the protected routes
 * - /dashboard and all nested paths
 *
 * If later you want to protect more routes, just add them here, e.g.:
 * matcher: ['/dashboard/:path*', '/account/:path*']
 */
export const config = {
  matcher: ['/dashboard/:path*'],
}
