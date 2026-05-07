import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db/drizzle';
import { contactMessages } from '@/db/schema';
import { sendContactNotification } from '@/lib/email';
import { z } from 'zod';

const contactSchema = z.object({
  name: z.string().min(1).max(255),
  email: z.string().email().max(255),
  subject: z.string().max(255).optional(),
  message: z.string().min(1).max(5000),
});

export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => null);
  const parsed = contactSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: 'Name, valid email, and message are required' }, { status: 400 });
  }
  const { name, email, subject, message } = parsed.data;
  await db.insert(contactMessages).values({ name, email, subject, message });
  void sendContactNotification({ name, email, subject, message });
  return NextResponse.json({ success: true });
}
