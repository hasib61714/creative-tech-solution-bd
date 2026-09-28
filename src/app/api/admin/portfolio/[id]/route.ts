import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db/drizzle';
import { portfolioItems } from '@/db/schema';
import { requirePermission, unauthorized } from '@/lib/auth';
import { eq } from 'drizzle-orm';
import { portfolioSchema } from '@/lib/validation/portfolio';

const portfolioUpdateSchema = portfolioSchema.partial();

export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  if (!(await requirePermission(req, 'manage_portfolio'))) return unauthorized();
  const { id } = await params;
  const numericId = Number(id);
  if (!Number.isInteger(numericId)) {
    return NextResponse.json({ error: 'Invalid id' }, { status: 400 });
  }
  const parsed = portfolioUpdateSchema.safeParse(await req.json().catch(() => null));
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.issues[0]?.message ?? 'Invalid input' }, { status: 400 });
  }
  await db
    .update(portfolioItems)
    .set({
      ...parsed.data,
      githubUrl: parsed.data.githubUrl || null,
      liveUrl: parsed.data.liveUrl || null,
      updatedAt: new Date(),
    })
    .where(eq(portfolioItems.id, numericId));
  return NextResponse.json({ success: true });
}

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  if (!(await requirePermission(req, 'manage_portfolio'))) return unauthorized();
  const { id } = await params;
  const numericId = Number(id);
  if (!Number.isInteger(numericId)) {
    return NextResponse.json({ error: 'Invalid id' }, { status: 400 });
  }
  await db.delete(portfolioItems).where(eq(portfolioItems.id, numericId));
  return NextResponse.json({ success: true });
}
