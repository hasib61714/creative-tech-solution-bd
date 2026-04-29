import { NextResponse } from 'next/server';
import { db } from '@/db/drizzle';
import { servicesTable } from '@/db/schema';
import { eq } from 'drizzle-orm';

export async function GET() {
  try {
    const rows = await db.select().from(servicesTable).where(eq(servicesTable.active, true));
    return NextResponse.json(rows);
  } catch {
    return NextResponse.json({ error: 'Database unavailable' }, { status: 503 });
  }
}
