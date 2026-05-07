import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db/drizzle';
import { contactMessages } from '@/db/schema';
import { requirePermission, unauthorized } from '@/lib/auth';
import { desc, eq, count } from 'drizzle-orm';
import { z } from 'zod';

const markReadSchema = z.object({ id: z.number().int().positive() });

const PAGE_SIZE = 20;

export async function GET(req: NextRequest) {
  if (!(await requirePermission(req, 'manage_contacts'))) return unauthorized();
  const { searchParams } = req.nextUrl;
  const page = Math.max(1, parseInt(searchParams.get('page') ?? '1', 10));
  const limit = Math.min(100, Math.max(1, parseInt(searchParams.get('limit') ?? String(PAGE_SIZE), 10)));
  const offset = (page - 1) * limit;

  const [rows, [{ total }]] = await Promise.all([
    db.select().from(contactMessages).orderBy(desc(contactMessages.createdAt)).limit(limit).offset(offset),
    db.select({ total: count() }).from(contactMessages),
  ]);
  return NextResponse.json({ data: rows, total, page, totalPages: Math.ceil(total / limit) });
}

export async function PATCH(req: NextRequest) {
  if (!(await requirePermission(req, 'manage_contacts'))) return unauthorized();
  const parsed = markReadSchema.safeParse(await req.json().catch(() => null));
  if (!parsed.success) return NextResponse.json({ error: 'Invalid id' }, { status: 400 });
  await db.update(contactMessages).set({ read: true }).where(eq(contactMessages.id, parsed.data.id));
  return NextResponse.json({ success: true });
}
