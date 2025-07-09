import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';

const isPublicRoute = createRouteMatcher([
  '/',         
  '/support(.*)',      
  '/sign-in(.*)',
  '/sign-up(.*)',
]);

export default clerkMiddleware(async (auth, req) => {
  if (!isPublicRoute(req)) {
    auth.protect(); 
  }
});

export const config = {
  matcher: [
    '/((?!_next|favicon.ico|.*\\..*).*)',
    '/(api|trpc)(.*)',
  ],
};
