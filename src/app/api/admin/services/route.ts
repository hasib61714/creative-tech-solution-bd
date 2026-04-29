import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db/drizzle';
import { servicesTable } from '@/db/schema';
import { verifyToken } from '@/lib/auth';
import { desc } from 'drizzle-orm';

export async function GET(req: NextRequest) {
  if (!verifyToken(req)) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const rows = await db.select().from(servicesTable).orderBy(desc(servicesTable.createdAt));
  return NextResponse.json(rows);
}

export async function POST(req: NextRequest) {
  if (!verifyToken(req)) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const { title, slug, description, features, fromPrice, tag } = await req.json();
  if (!title || !slug) return NextResponse.json({ error: 'Title and slug required' }, { status: 400 });
  await db.insert(servicesTable).values({ title, slug, description, features, fromPrice, tag });
  return NextResponse.json({ success: true });
}
