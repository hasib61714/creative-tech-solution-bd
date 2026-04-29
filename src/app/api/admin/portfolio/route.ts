import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db/drizzle';
import { portfolioItems } from '@/db/schema';
import { requirePermission, unauthorized } from '@/lib/auth';
import { desc } from 'drizzle-orm';

export async function GET(req: NextRequest) {
  if (!(await requirePermission(req, 'manage_portfolio'))) return unauthorized();
  const rows = await db.select().from(portfolioItems).orderBy(desc(portfolioItems.createdAt));
  return NextResponse.json(rows);
}

export async function POST(req: NextRequest) {
  if (!(await requirePermission(req, 'manage_portfolio'))) return unauthorized();
  const { title, category, metric, tag, description } = await req.json();
  if (!title) return NextResponse.json({ error: 'Title required' }, { status: 400 });
  await db.insert(portfolioItems).values({ title, category, metric, tag, description });
  return NextResponse.json({ success: true });
}
