import { NextRequest, NextResponse } from 'next/server';

function decodeJwtPayload(token: string): { exp?: number } | null {
  try {
    const payload = token.split('.')[1];
    if (!payload) return null;
    const decoded = atob(payload.replace(/-/g, '+').replace(/_/g, '/'));
    return JSON.parse(decoded);
  } catch {
    return null;
  }
}

function isValidToken(token: string | undefined): boolean {
  if (!token) return false;
  const payload = decodeJwtPayload(token);
  if (!payload) return false;
  if (payload.exp && payload.exp * 1000 < Date.now()) return false;
  return true;
}

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const token = req.cookies.get('auth_token')?.value;
  const valid = isValidToken(token);

  if (pathname.startsWith('/admin')) {
    if (!valid) {
      const res = NextResponse.redirect(new URL('/auth', req.url));
      if (token) res.cookies.set('auth_token', '', { httpOnly: true, path: '/', maxAge: 0 });
      return res;
    }
  }

  if (pathname === '/auth' && valid) {
    return NextResponse.redirect(new URL('/admin', req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*', '/auth'],
};
