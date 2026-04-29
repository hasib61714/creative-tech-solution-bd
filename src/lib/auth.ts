import jwt from 'jsonwebtoken';
import { NextResponse } from 'next/server';
import { NextRequest } from 'next/server';
import { db } from '@/db/drizzle';
import { users } from '@/db/schema';
import { eq } from 'drizzle-orm';

export const PERMISSIONS = [
  'dashboard',
  'manage_bookings',
  'manage_services',
  'manage_portfolio',
  'manage_testimonials',
  'manage_contacts',
  'manage_content',
  'manage_settings',
  'manage_users',
  'send_messages',
] as const;

export type Permission = typeof PERMISSIONS[number];
export type AuthUser = {
  id: number;
  email: string;
  role: string;
  name?: string | null;
  permissions?: Permission[];
};

export function verifyToken(req: NextRequest): AuthUser | null {
  const auth = req.headers.get('Authorization');
  if (!auth?.startsWith('Bearer ')) return null;
  try {
    return jwt.verify(auth.slice(7), process.env.JWT_SECRET!) as AuthUser;
  } catch {
    return null;
  }
}

export function requireAdmin(req: NextRequest): AuthUser | null {
  const user = verifyToken(req);
  if (!user || user.role !== 'admin') return null;
  return user;
}

function parsePermissions(value?: string | null): Permission[] {
  if (!value) return [];
  try {
    const parsed = JSON.parse(value);
    if (!Array.isArray(parsed)) return [];
    return parsed.filter((item): item is Permission => PERMISSIONS.includes(item));
  } catch {
    return [];
  }
}

export async function getCurrentUser(req: NextRequest): Promise<AuthUser | null> {
  const tokenUser = verifyToken(req);
  if (!tokenUser) return null;
  const [row] = await db.select({
    id: users.id,
    email: users.email,
    name: users.name,
    role: users.role,
    permissions: users.permissions,
  }).from(users).where(eq(users.id, tokenUser.id));
  if (!row) return null;
  return {
    id: row.id,
    email: row.email,
    name: row.name,
    role: row.role,
    permissions: row.role === 'admin' ? [...PERMISSIONS] : parsePermissions(row.permissions),
  };
}

export async function requirePermission(req: NextRequest, permission: Permission): Promise<AuthUser | null> {
  const user = await getCurrentUser(req);
  if (!user) return null;
  if (user.role === 'admin' || user.permissions?.includes(permission)) return user;
  return null;
}

export function unauthorized() {
  return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
}
