import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db/drizzle';
import { users } from '@/db/schema';
import { eq } from 'drizzle-orm';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { z } from 'zod';

const JWT_SECRET = process.env.JWT_SECRET!;

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
});

// In-memory rate limiter: max 10 attempts per IP per 15 minutes
const attempts = new Map<string, { count: number; resetAt: number }>();

export async function POST(req: NextRequest) {
  const ip =
    req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ??
    req.headers.get('x-real-ip') ??
    'unknown';
  const now = Date.now();
  const record = attempts.get(ip);
  if (record) {
    if (now < record.resetAt && record.count >= 10) {
      return NextResponse.json({ error: 'Too many login attempts. Try again in 15 minutes.' }, { status: 429 });
    }
    if (now >= record.resetAt) {
      attempts.set(ip, { count: 1, resetAt: now + 15 * 60 * 1000 });
    } else {
      record.count++;
    }
  } else {
    attempts.set(ip, { count: 1, resetAt: now + 15 * 60 * 1000 });
  }

  const body = await req.json().catch(() => null);
  const parsed = loginSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: 'Invalid email or password format' }, { status: 400 });
  }
  const { email, password } = parsed.data;

  const found = await db.select().from(users).where(eq(users.email, email));
  if (found.length === 0) {
    return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
  }
  const user = found[0];
  const match = await bcrypt.compare(password, user.password);
  if (!match) {
    return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
  }
  await db.update(users).set({ lastLoginAt: new Date() }).where(eq(users.id, user.id));
  const permissions = user.permissions ? JSON.parse(user.permissions) : [];
  const token = jwt.sign(
    { id: user.id, email: user.email, name: user.name, role: user.role, permissions },
    JWT_SECRET,
    { expiresIn: '7d' },
  );

  const response = NextResponse.json({
    user: { id: user.id, email: user.email, name: user.name, role: user.role, avatarUrl: user.avatarUrl, permissions },
  });
  response.cookies.set('auth_token', token, {
    httpOnly: true,
    path: '/',
    maxAge: 7 * 24 * 60 * 60,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
  });
  return response;
}
