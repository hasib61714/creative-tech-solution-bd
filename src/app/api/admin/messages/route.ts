import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db/drizzle';
import { adminMessages, users } from '@/db/schema';
import { getCurrentUser, requirePermission, unauthorized } from '@/lib/auth';
import { desc, eq, or } from 'drizzle-orm';
import { z } from 'zod';

export async function GET(req: NextRequest) {
  const user = await getCurrentUser(req);
  if (!user) return unauthorized();

  const canSend = user.role === 'admin' || user.permissions?.includes('send_messages');
  const rows = canSend
    ? await db.select().from(adminMessages).orderBy(desc(adminMessages.createdAt))
    : await db.select().from(adminMessages)
      .where(or(eq(adminMessages.recipientId, user.id), eq(adminMessages.senderId, user.id)))
      .orderBy(desc(adminMessages.createdAt));

  return NextResponse.json(rows);
}

const messageSchema = z.object({
  recipientId: z.number().int().positive().optional().nullable(),
  subject: z.string().min(1).max(255),
  message: z.string().min(1).max(5000),
  context: z.string().max(100).optional(),
});

export async function POST(req: NextRequest) {
  const sender = await requirePermission(req, 'send_messages');
  if (!sender) return unauthorized();
  const parsed = messageSchema.safeParse(await req.json().catch(() => null));
  if (!parsed.success) return NextResponse.json({ error: 'Invalid input' }, { status: 400 });
  const { recipientId, subject, message, context } = parsed.data;
  if (recipientId) {
    const [recipient] = await db.select({ id: users.id }).from(users).where(eq(users.id, recipientId));
    if (!recipient) return NextResponse.json({ error: 'Recipient not found' }, { status: 400 });
  }
  await db.insert(adminMessages).values({
    senderId: sender.id,
    recipientId: recipientId ?? null,
    subject,
    message,
    context,
  });
  return NextResponse.json({ success: true });
}
