import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db/drizzle';
import { servicesTable } from '@/db/schema';
import { requirePermission, unauthorized } from '@/lib/auth';
import { eq } from 'drizzle-orm';
import { z } from 'zod';

const serviceUpdateSchema = z.object({
  title: z.string().min(1).max(255).optional(),
  slug: z.string().min(1).max(255).regex(/^[a-z0-9-]+$/).optional(),
  description: z.string().max(5000).optional(),
  features: z.string().max(5000).optional(),
  fromPrice: z.string().max(50).optional(),
  tag: z.string().max(50).optional(),
  active: z.boolean().optional(),
});

export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  if (!(await requirePermission(req, 'manage_services'))) return unauthorized();
  const { id } = await params;
  const parsed = serviceUpdateSchema.safeParse(await req.json().catch(() => null));
  if (!parsed.success) return NextResponse.json({ error: 'Invalid input' }, { status: 400 });
  await db.update(servicesTable).set(parsed.data).where(eq(servicesTable.id, Number(id)));
  return NextResponse.json({ success: true });
}

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  if (!(await requirePermission(req, 'manage_services'))) return unauthorized();
  const { id } = await params;
  await db.delete(servicesTable).where(eq(servicesTable.id, Number(id)));
  return NextResponse.json({ success: true });
}
