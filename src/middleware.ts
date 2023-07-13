import { authMiddleware, redirectToSignIn } from '@clerk/nextjs';
import { type NextRequest, NextResponse } from 'next/server';

export const config = {
  matcher: ['/((?!.*\\..*|_next).*)', '/', '/(api|trpc)(.*)'],
};

export default authMiddleware({
  afterAuth(auth, req) {
    if (!auth.isPublicRoute) {
      if (!auth.userId) {
        return redirectToSignIn({ returnBackUrl: req.url });
      }
    }
    return NextResponse.next()
  },
  publicRoutes: [
    '/',
    '/api(.*)',
    '/blog(.*)',
    '/projects',
    '/about',
  ],
});
