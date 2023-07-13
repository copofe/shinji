import { authMiddleware } from '@clerk/nextjs';
import { type NextRequest, NextResponse } from 'next/server';

export const config = {
  matcher: ['/((?!.*\\..*|_next).*)', '/', '/(api|trpc)(.*)'],
};

async function beforeAuthMiddleware(req: NextRequest) {
  return NextResponse.next();
}

export default authMiddleware({
  beforeAuth: beforeAuthMiddleware,
  publicRoutes: [
    '/',
    '/api(.*)',
    '/blog(.*)',
    '/projects',
    '/about',
  ],
});
