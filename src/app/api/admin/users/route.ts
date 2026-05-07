import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db/drizzle';
import { users } from '@/db/schema';
import { requirePermission, unauthorized } from '@/lib/auth';
import { desc, eq, count } from 'drizzle-orm';
import bcrypt from 'bcryptjs';
import { z } from 'zod';

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

const PAGE_SIZE = 20;

export async function GET(req: NextRequest) {
  if (!(await requirePermission(req, 'manage_users'))) return unauthorized();
  const { searchParams } = req.nextUrl;
  const page = Math.max(1, parseInt(searchParams.get('page') ?? '1', 10));
  const limit = Math.min(100, Math.max(1, parseInt(searchParams.get('limit') ?? String(PAGE_SIZE), 10)));
  const offset = (page - 1) * limit;

  const [rows, [{ total }]] = await Promise.all([
    db.select(publicColumns).from(users).orderBy(desc(users.createdAt)).limit(limit).offset(offset),
    db.select({ total: count() }).from(users),
  ]);
  return NextResponse.json({ data: rows, total, page, totalPages: Math.ceil(total / limit) });
}

const createUserSchema = z.object({
  name: z.string().min(1).max(255),
  email: z.string().email().max(255),
  password: z.string().min(8).max(128),
  role: z.enum(['admin', 'user']),
  avatarUrl: z.string().url().max(500).optional().or(z.literal('')),
  phone: z.string().max(50).optional(),
  details: z.string().max(2000).optional(),
  permissions: z.array(z.string()).optional(),
});

export async function POST(req: NextRequest) {
  if (!(await requirePermission(req, 'manage_users'))) return unauthorized();
  const parsed = createUserSchema.safeParse(await req.json().catch(() => null));
  if (!parsed.success) {
    return NextResponse.json({ error: 'Invalid input' }, { status: 400 });
  }
  const { name, email, password, role, avatarUrl, phone, details, permissions } = parsed.data;
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
