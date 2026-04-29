import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db/drizzle';
import { users } from '@/db/schema';
import { requirePermission, unauthorized } from '@/lib/auth';
import { eq } from 'drizzle-orm';
import bcrypt from 'bcryptjs';

export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const admin = await requirePermission(req, 'manage_users');
  if (!admin) return unauthorized();
  const { id } = await params;
  const userId = Number(id);
  const { name, email, role, password, avatarUrl, phone, details, permissions } = await req.json();

  if (role && !['admin', 'user'].includes(role)) {
    return NextResponse.json({ error: 'Invalid role' }, { status: 400 });
  }
  if (admin.id === userId && role && role !== 'admin') {
    return NextResponse.json({ error: 'You cannot remove your own admin access' }, { status: 400 });
  }

  const update: {
    name?: string;
    email?: string;
    role?: string;
    avatarUrl?: string;
    phone?: string;
    details?: string;
    permissions?: string;
    password?: string;
    resetToken?: null;
    resetTokenExpires?: null;
  } = {};
  if (name !== undefined) update.name = name;
  if (email !== undefined) update.email = email;
  if (role !== undefined) update.role = role;
  if (avatarUrl !== undefined) update.avatarUrl = avatarUrl;
  if (phone !== undefined) update.phone = phone;
  if (details !== undefined) update.details = details;
  if (permissions !== undefined) update.permissions = JSON.stringify(Array.isArray(permissions) ? permissions : []);
  if (password) {
    update.password = await bcrypt.hash(password, 10);
    update.resetToken = null;
    update.resetTokenExpires = null;
  }

  await db.update(users).set(update).where(eq(users.id, userId));
  return NextResponse.json({ success: true });
}

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const admin = await requirePermission(req, 'manage_users');
  if (!admin) return unauthorized();
  const { id } = await params;
  const userId = Number(id);
  if (admin.id === userId) {
    return NextResponse.json({ error: 'You cannot delete your own account' }, { status: 400 });
  }
  await db.delete(users).where(eq(users.id, userId));
  return NextResponse.json({ success: true });
}
