import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db/drizzle';
import { users } from '@/db/schema';
import { requirePermission, unauthorized } from '@/lib/auth';
import { desc, eq } from 'drizzle-orm';
import bcrypt from 'bcryptjs';

const publicColumns = {
  id: users.id,
  email: users.email,
  name: users.name,
  avatarUrl: users.avatarUrl,
  phone: users.phone,
  details: users.details,
  role: users.role,
  permissions: users.permissions,
  lastLoginAt: users.lastLoginAt,
  lastLogoutAt: users.lastLogoutAt,
  createdAt: users.createdAt,
  updatedAt: users.updatedAt,
};

export async function GET(req: NextRequest) {
  if (!(await requirePermission(req, 'manage_users'))) return unauthorized();
  const rows = await db.select(publicColumns).from(users).orderBy(desc(users.createdAt));
  return NextResponse.json(rows);
}

export async function POST(req: NextRequest) {
  if (!(await requirePermission(req, 'manage_users'))) return unauthorized();
  const { name, email, password, role, avatarUrl, phone, details, permissions } = await req.json();
  if (!name || !email || !password) {
    return NextResponse.json({ error: 'Name, email, and password required' }, { status: 400 });
  }
  if (!['admin', 'user'].includes(role)) {
    return NextResponse.json({ error: 'Invalid role' }, { status: 400 });
  }
  const exists = await db.select({ id: users.id }).from(users).where(eq(users.email, email));
  if (exists.length) {
    return NextResponse.json({ error: 'Email already registered' }, { status: 400 });
  }
  const hashed = await bcrypt.hash(password, 10);
  await db.insert(users).values({
    name,
    email,
    password: hashed,
    role,
    avatarUrl,
    phone,
    details,
    permissions: JSON.stringify(Array.isArray(permissions) ? permissions : []),
  });
  return NextResponse.json({ success: true });
}
