import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db/drizzle';
import { contactMessages } from '@/db/schema';
import { verifyToken } from '@/lib/auth';
import { desc, eq } from 'drizzle-orm';

export async function GET(req: NextRequest) {
  if (!verifyToken(req)) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const rows = await db.select().from(contactMessages).orderBy(desc(contactMessages.createdAt));
  return NextResponse.json(rows);
}

export async function PATCH(req: NextRequest) {
  if (!verifyToken(req)) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const { id } = await req.json();
  await db.update(contactMessages).set({ read: true }).where(eq(contactMessages.id, id));
  return NextResponse.json({ success: true });
}
