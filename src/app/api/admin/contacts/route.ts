import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db/drizzle';
import { contactMessages } from '@/db/schema';
import { requirePermission, unauthorized } from '@/lib/auth';
import { desc, eq } from 'drizzle-orm';

export async function GET(req: NextRequest) {
  if (!(await requirePermission(req, 'manage_contacts'))) return unauthorized();
  const rows = await db.select().from(contactMessages).orderBy(desc(contactMessages.createdAt));
  return NextResponse.json(rows);
}

export async function PATCH(req: NextRequest) {
  if (!(await requirePermission(req, 'manage_contacts'))) return unauthorized();
  const { id } = await req.json();
  await db.update(contactMessages).set({ read: true }).where(eq(contactMessages.id, id));
  return NextResponse.json({ success: true });
}
