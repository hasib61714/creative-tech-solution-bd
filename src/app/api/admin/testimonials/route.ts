import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db/drizzle';
import { testimonials } from '@/db/schema';
import { verifyToken } from '@/lib/auth';
import { desc } from 'drizzle-orm';

export async function GET(req: NextRequest) {
  if (!verifyToken(req)) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const rows = await db.select().from(testimonials).orderBy(desc(testimonials.createdAt));
  return NextResponse.json(rows);
}

export async function POST(req: NextRequest) {
  if (!verifyToken(req)) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const { name, company, message, rating } = await req.json();
  if (!name || !message) return NextResponse.json({ error: 'Name and message required' }, { status: 400 });
  await db.insert(testimonials).values({ name, company, message, rating: rating ?? 5 });
  return NextResponse.json({ success: true });
}
