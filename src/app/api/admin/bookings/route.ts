import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db/drizzle';
import { bookings } from '@/db/schema';
import { requirePermission, unauthorized } from '@/lib/auth';
import { desc, count } from 'drizzle-orm';

const PAGE_SIZE = 20;

export async function GET(req: NextRequest) {
  if (!(await requirePermission(req, 'manage_bookings'))) return unauthorized();
  const { searchParams } = req.nextUrl;
  const page = Math.max(1, parseInt(searchParams.get('page') ?? '1', 10));
  const limit = Math.min(100, Math.max(1, parseInt(searchParams.get('limit') ?? String(PAGE_SIZE), 10)));
  const offset = (page - 1) * limit;

  const [rows, [{ total }]] = await Promise.all([
    db.select().from(bookings).orderBy(desc(bookings.createdAt)).limit(limit).offset(offset),
    db.select({ total: count() }).from(bookings),
  ]);
  return NextResponse.json({ data: rows, total, page, totalPages: Math.ceil(total / limit) });
}
