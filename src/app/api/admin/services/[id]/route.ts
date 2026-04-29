import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db/drizzle';
import { servicesTable } from '@/db/schema';
import { requirePermission, unauthorized } from '@/lib/auth';
import { eq } from 'drizzle-orm';

export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  if (!(await requirePermission(req, 'manage_services'))) return unauthorized();
  const { id } = await params;
  const { title, slug, description, features, fromPrice, tag, active } = await req.json();
  await db.update(servicesTable).set({ title, slug, description, features, fromPrice, tag, active }).where(eq(servicesTable.id, Number(id)));
  return NextResponse.json({ success: true });
}

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  if (!(await requirePermission(req, 'manage_services'))) return unauthorized();
  const { id } = await params;
  await db.delete(servicesTable).where(eq(servicesTable.id, Number(id)));
  return NextResponse.json({ success: true });
}
