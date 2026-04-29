import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db/drizzle';
import { siteSettings } from '@/db/schema';
import { verifyToken } from '@/lib/auth';

export async function GET(req: NextRequest) {
  if (!verifyToken(req)) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const rows = await db.select().from(siteSettings);
  const settings = Object.fromEntries(rows.map((r) => [r.key, r.value]));
  return NextResponse.json(settings);
}

export async function PUT(req: NextRequest) {
  if (!verifyToken(req)) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const body: Record<string, string> = await req.json();
  for (const [key, value] of Object.entries(body)) {
    await db
      .insert(siteSettings)
      .values({ key, value })
      .onDuplicateKeyUpdate({ set: { value } });
  }
  return NextResponse.json({ success: true });
}
