import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;

  // ✅ Allowed pages without lock
  const publicPaths = ['/'];

  // ✅ Agar public page nahi hai to redirect karo
  if (!publicPaths.includes(path)) {
    // Check localStorage nahi chalega yahan — to cookie use karte hain
    const isUnlocked = request.cookies.get('unlocked')?.value === 'true';

    if (!isUnlocked) {
      return NextResponse.redirect(new URL('/', request.url));
    }
  }

  return NextResponse.next();
}

// ✅ Middleware apply sabhi routes par
export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
};
