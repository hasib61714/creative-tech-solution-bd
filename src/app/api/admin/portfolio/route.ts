import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db/drizzle';
import { portfolioItems } from '@/db/schema';
import { requirePermission, unauthorized } from '@/lib/auth';
import { desc } from 'drizzle-orm';
import { z } from 'zod';

const portfolioSchema = z.object({
  title: z.string().min(1).max(255),
  category: z.string().max(100).optional(),
  metric: z.string().max(255).optional(),
  tag: z.string().max(255).optional(),
  description: z.string().max(5000).optional(),
});

export async function GET(req: NextRequest) {
  if (!(await requirePermission(req, 'manage_portfolio'))) return unauthorized();
  const rows = await db.select().from(portfolioItems).orderBy(desc(portfolioItems.createdAt));
  return NextResponse.json(rows);
}

export async function POST(req: NextRequest) {
  if (!(await requirePermission(req, 'manage_portfolio'))) return unauthorized();
  const parsed = portfolioSchema.safeParse(await req.json().catch(() => null));
  if (!parsed.success) return NextResponse.json({ error: 'Invalid input' }, { status: 400 });
  const { title, category, metric, tag, description } = parsed.data;
  await db.insert(portfolioItems).values({ title, category, metric, tag, description });
  return NextResponse.json({ success: true });
}
