import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db/drizzle';
import { portfolioItems } from '@/db/schema';
import { verifyToken } from '@/lib/auth';
import { desc } from 'drizzle-orm';

export async function GET(req: NextRequest) {
  if (!verifyToken(req)) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const rows = await db.select().from(portfolioItems).orderBy(desc(portfolioItems.createdAt));
  return NextResponse.json(rows);
}

export async function POST(req: NextRequest) {
  if (!verifyToken(req)) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const { title, category, metric, tag, description } = await req.json();
  if (!title) return NextResponse.json({ error: 'Title required' }, { status: 400 });
  await db.insert(portfolioItems).values({ title, category, metric, tag, description });
  return NextResponse.json({ success: true });
}
