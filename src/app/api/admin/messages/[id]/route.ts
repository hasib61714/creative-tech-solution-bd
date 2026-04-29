import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db/drizzle';
import { adminMessages } from '@/db/schema';
import { getCurrentUser, unauthorized } from '@/lib/auth';
import { eq } from 'drizzle-orm';

export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const user = await getCurrentUser(req);
  if (!user) return unauthorized();
  const { id } = await params;
  await db.update(adminMessages).set({ read: true }).where(eq(adminMessages.id, Number(id)));
  return NextResponse.json({ success: true });
}
