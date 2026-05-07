import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db/drizzle';
import { users } from '@/db/schema';
import { and, eq, gt } from 'drizzle-orm';
import bcrypt from 'bcryptjs';
import { createHash } from 'crypto';
import { z } from 'zod';

function hashOTP(otp: string) {
  return createHash('sha256').update(otp).digest('hex');
}

const resetSchema = z.object({
  otp: z.string().length(6),
  password: z.string().min(8).max(128),
});

export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => null);
  const parsed = resetSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: 'OTP and password (min 8 chars) required' }, { status: 400 });
  }
  const { otp, password } = parsed.data;

  const [user] = await db.select({ id: users.id }).from(users).where(and(
    eq(users.resetToken, hashOTP(otp)),
    gt(users.resetTokenExpires, new Date()),
  ));
  if (!user) return NextResponse.json({ error: 'Invalid or expired OTP' }, { status: 400 });

  await db.update(users)
    .set({
      password: await bcrypt.hash(password, 10),
      resetToken: null,
      resetTokenExpires: null,
    })
    .where(eq(users.id, user.id));

  return NextResponse.json({ success: true });
}
