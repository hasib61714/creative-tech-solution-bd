import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db/drizzle';
import { contactMessages } from '@/db/schema';
import { requirePermission, unauthorized } from '@/lib/auth';
import { eq } from 'drizzle-orm';

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  if (!(await requirePermission(req, 'manage_contacts'))) return unauthorized();
  const { id } = await params;
  await db.delete(contactMessages).where(eq(contactMessages.id, Number(id)));
  return NextResponse.json({ success: true });
}
