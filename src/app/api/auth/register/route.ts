import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db/drizzle';
import { users } from '@/db/schema';
import { count, eq } from 'drizzle-orm';
import bcrypt from 'bcryptjs';
import { PERMISSIONS } from '@/lib/auth';

export async function POST(req: NextRequest) {
  const { name, email, password } = await req.json();
  if (!name || !email || !password) {
    return NextResponse.json({ error: 'All fields required' }, { status: 400 });
  }
  const exists = await db.select().from(users).where(eq(users.email, email));
  if (exists.length > 0) {
    return NextResponse.json({ error: 'Email already registered' }, { status: 400 });
  }
  const [{ n }] = await db.select({ n: count() }).from(users);
  if (n > 0) {
    return NextResponse.json({ error: 'Registration is disabled. Ask an admin to create your account.' }, { status: 403 });
  }
  const hashed = await bcrypt.hash(password, 10);
  await db.insert(users).values({ name, email, password: hashed, role: 'admin', permissions: JSON.stringify([...PERMISSIONS]) });
  return NextResponse.json({ success: true, role: 'admin' });
}
