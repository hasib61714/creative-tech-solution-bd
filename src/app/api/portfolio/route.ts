import { NextResponse } from 'next/server';
import { db } from '@/db/drizzle';
import { portfolioItems } from '@/db/schema';
import { desc } from 'drizzle-orm';

export async function GET() {
  try {
    const rows = await db.select().from(portfolioItems).orderBy(desc(portfolioItems.createdAt));
    return NextResponse.json(rows);
  } catch {
    return NextResponse.json([]);
  }
}
