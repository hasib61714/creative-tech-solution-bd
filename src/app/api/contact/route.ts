import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db/drizzle';
import { contactMessages } from '@/db/schema';
import { sendContactNotification } from '@/lib/email';
import { z } from 'zod';

const contactSchema = z.object({
  name: z.string().min(1).max(255),
  email: z.string().email().max(255),
  phone: z.string().max(50).optional(),
  subject: z.string().max(255).optional(),
  message: z.string().min(1).max(5000),
});

export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => null);
  const parsed = contactSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: 'Name, valid email, and message are required' }, { status: 400 });
  }
  const { name, email, phone, subject, message } = parsed.data;
  try {
    await db.insert(contactMessages).values({ name, email, phone, subject, message });
  } catch {
    // Never surface a raw database error to a visitor.
    return NextResponse.json(
      { error: 'We could not save your message right now. Please email us directly.' },
      { status: 503 },
    );
  }
  void sendContactNotification({ name, email, phone, subject, message });
  return NextResponse.json({ success: true });
}
