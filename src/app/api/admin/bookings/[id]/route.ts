import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db/drizzle';
import { bookings } from '@/db/schema';
import { requirePermission, unauthorized } from '@/lib/auth';
import { eq } from 'drizzle-orm';
import { z } from 'zod';

const patchSchema = z.object({
  status: z.enum(['pending', 'confirmed', 'cancelled']),
});

export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  if (!(await requirePermission(req, 'manage_bookings'))) return unauthorized();
  const { id } = await params;
  const parsed = patchSchema.safeParse(await req.json().catch(() => null));
  if (!parsed.success) return NextResponse.json({ error: 'Invalid status' }, { status: 400 });
  await db.update(bookings).set({ status: parsed.data.status }).where(eq(bookings.id, Number(id)));
  return NextResponse.json({ success: true });
}

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  if (!(await requirePermission(req, 'manage_bookings'))) return unauthorized();
  const { id } = await params;
  await db.delete(bookings).where(eq(bookings.id, Number(id)));
  return NextResponse.json({ success: true });
}
