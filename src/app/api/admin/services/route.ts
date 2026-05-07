import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db/drizzle';
import { servicesTable } from '@/db/schema';
import { requirePermission, unauthorized } from '@/lib/auth';
import { desc } from 'drizzle-orm';
import { z } from 'zod';

const serviceSchema = z.object({
  title: z.string().min(1).max(255),
  slug: z.string().min(1).max(255).regex(/^[a-z0-9-]+$/, 'Slug must be lowercase alphanumeric with hyphens'),
  description: z.string().max(5000).optional(),
  features: z.string().max(5000).optional(),
  fromPrice: z.string().max(50).optional(),
  tag: z.string().max(50).optional(),
});

export async function GET(req: NextRequest) {
  if (!(await requirePermission(req, 'manage_services'))) return unauthorized();
  const rows = await db.select().from(servicesTable).orderBy(desc(servicesTable.createdAt));
  return NextResponse.json(rows);
}

export async function POST(req: NextRequest) {
  if (!(await requirePermission(req, 'manage_services'))) return unauthorized();
  const parsed = serviceSchema.safeParse(await req.json().catch(() => null));
  if (!parsed.success) return NextResponse.json({ error: 'Invalid input' }, { status: 400 });
  const { title, slug, description, features, fromPrice, tag } = parsed.data;
  await db.insert(servicesTable).values({ title, slug, description, features, fromPrice, tag });
  return NextResponse.json({ success: true });
}
