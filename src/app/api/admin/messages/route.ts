import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db/drizzle';
import { adminMessages, users } from '@/db/schema';
import { getCurrentUser, requirePermission, unauthorized } from '@/lib/auth';
import { desc, eq, or } from 'drizzle-orm';

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

export async function POST(req: NextRequest) {
  const sender = await requirePermission(req, 'send_messages');
  if (!sender) return unauthorized();
  const { recipientId, subject, message, context } = await req.json();
  if (!subject || !message) {
    return NextResponse.json({ error: 'Subject and message required' }, { status: 400 });
  }
  if (recipientId) {
    const [recipient] = await db.select({ id: users.id }).from(users).where(eq(users.id, Number(recipientId)));
    if (!recipient) return NextResponse.json({ error: 'Recipient not found' }, { status: 400 });
  }
  await db.insert(adminMessages).values({
    senderId: sender.id,
    recipientId: recipientId ? Number(recipientId) : null,
    subject,
    message,
    context,
  });
  return NextResponse.json({ success: true });
}
