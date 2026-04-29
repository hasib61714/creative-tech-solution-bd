import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db/drizzle';
import { users } from '@/db/schema';
import { eq } from 'drizzle-orm';
import { createHash } from 'crypto';

function hashOTP(otp: string) {
  return createHash('sha256').update(otp).digest('hex');
}

export async function POST(req: NextRequest) {
  const { email } = await req.json();
  if (!email) return NextResponse.json({ error: 'Email required' }, { status: 400 });

  const [user] = await db.select({ id: users.id }).from(users).where(eq(users.email, email));
  if (!user) return NextResponse.json({ success: true });

  // Generate 6-digit OTP
  const otp = Math.floor(100000 + Math.random() * 900000).toString();
  const expires = new Date(Date.now() + 1000 * 60 * 10); // 10 minutes expiry
  await db.update(users)
    .set({ resetToken: hashOTP(otp), resetTokenExpires: expires })
    .where(eq(users.id, user.id));

  // TODO: Send OTP to user's email here (implement email sending logic)

  return NextResponse.json({
    success: true,
    otp: process.env.NODE_ENV === 'production' ? undefined : otp,
  });
}
