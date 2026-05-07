import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db/drizzle';
import { portfolioItems } from '@/db/schema';
import { requirePermission, unauthorized } from '@/lib/auth';
import { eq } from 'drizzle-orm';
import { z } from 'zod';

const portfolioUpdateSchema = z.object({
  title: z.string().min(1).max(255).optional(),
  category: z.string().max(100).optional(),
  metric: z.string().max(255).optional(),
  tag: z.string().max(255).optional(),
  description: z.string().max(5000).optional(),
});

export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  if (!(await requirePermission(req, 'manage_portfolio'))) return unauthorized();
  const { id } = await params;
  const parsed = portfolioUpdateSchema.safeParse(await req.json().catch(() => null));
  if (!parsed.success) return NextResponse.json({ error: 'Invalid input' }, { status: 400 });
  await db.update(portfolioItems).set(parsed.data).where(eq(portfolioItems.id, Number(id)));
  return NextResponse.json({ success: true });
}

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  if (!(await requirePermission(req, 'manage_portfolio'))) return unauthorized();
  const { id } = await params;
  await db.delete(portfolioItems).where(eq(portfolioItems.id, Number(id)));
  return NextResponse.json({ success: true });
}
