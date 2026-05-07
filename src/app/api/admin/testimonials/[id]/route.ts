import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db/drizzle';
import { testimonials } from '@/db/schema';
import { requirePermission, unauthorized } from '@/lib/auth';
import { eq } from 'drizzle-orm';
import { z } from 'zod';

const patchSchema = z.object({
  status: z.enum(['pending', 'approved', 'rejected']),
});

export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  if (!(await requirePermission(req, 'manage_testimonials'))) return unauthorized();
  const { id } = await params;
  const parsed = patchSchema.safeParse(await req.json().catch(() => null));
  if (!parsed.success) return NextResponse.json({ error: 'Invalid status' }, { status: 400 });
  await db.update(testimonials).set({ status: parsed.data.status }).where(eq(testimonials.id, Number(id)));
  return NextResponse.json({ success: true });
}

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  if (!(await requirePermission(req, 'manage_testimonials'))) return unauthorized();
  const { id } = await params;
  await db.delete(testimonials).where(eq(testimonials.id, Number(id)));
  return NextResponse.json({ success: true });
}
