import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db/drizzle';
import { portfolioItems } from '@/db/schema';
import { requirePermission, unauthorized } from '@/lib/auth';
import { eq } from 'drizzle-orm';

export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  if (!(await requirePermission(req, 'manage_portfolio'))) return unauthorized();
  const { id } = await params;
  const { title, category, metric, tag, description } = await req.json();
  await db.update(portfolioItems).set({ title, category, metric, tag, description }).where(eq(portfolioItems.id, Number(id)));
  return NextResponse.json({ success: true });
}

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  if (!(await requirePermission(req, 'manage_portfolio'))) return unauthorized();
  const { id } = await params;
  await db.delete(portfolioItems).where(eq(portfolioItems.id, Number(id)));
  return NextResponse.json({ success: true });
}
