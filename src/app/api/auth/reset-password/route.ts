import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db/drizzle';
import { users } from '@/db/schema';
import { and, eq, gt } from 'drizzle-orm';
import bcrypt from 'bcryptjs';
import { createHash } from 'crypto';

function hashOTP(otp: string) {
  return createHash('sha256').update(otp).digest('hex');
}

  const { otp, password } = await req.json();
  if (!otp || !password) {
    return NextResponse.json({ error: 'OTP and password required' }, { status: 400 });
  }

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
