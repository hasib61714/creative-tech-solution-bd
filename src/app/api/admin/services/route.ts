import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db/drizzle';
import { servicesTable } from '@/db/schema';
import { requirePermission, unauthorized } from '@/lib/auth';
import { desc } from 'drizzle-orm';

export async function GET(req: NextRequest) {
  if (!(await requirePermission(req, 'manage_services'))) return unauthorized();
  const rows = await db.select().from(servicesTable).orderBy(desc(servicesTable.createdAt));
  return NextResponse.json(rows);
}

export async function POST(req: NextRequest) {
  if (!(await requirePermission(req, 'manage_services'))) return unauthorized();
  const { title, slug, description, features, fromPrice, tag } = await req.json();
  if (!title || !slug) return NextResponse.json({ error: 'Title and slug required' }, { status: 400 });
  await db.insert(servicesTable).values({ title, slug, description, features, fromPrice, tag });
  return NextResponse.json({ success: true });
}
