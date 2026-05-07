import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db/drizzle';
import { users } from '@/db/schema';
import { verifyToken } from '@/lib/auth';
import { eq } from 'drizzle-orm';

export async function POST(req: NextRequest) {
  const user = verifyToken(req);
  if (user) {
    await db.update(users).set({ lastLogoutAt: new Date() }).where(eq(users.id, user.id));
  }
  const response = NextResponse.json({ success: true });
  response.cookies.set('auth_token', '', { httpOnly: true, path: '/', maxAge: 0 });
  return response;
}
