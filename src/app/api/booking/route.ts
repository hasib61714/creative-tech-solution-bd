import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db/drizzle';
import { bookings } from '@/db/schema';
import { sendBookingNotification } from '@/lib/email';
import { z } from 'zod';

const bookingSchema = z.object({
  service: z.string().min(1).max(255),
  name: z.string().min(1).max(255),
  email: z.string().email().max(255),
  phone: z.string().min(1).max(50),
  date: z.string().max(50).optional(),
  time: z.string().max(50).optional(),
  details: z.string().max(2000).optional(),
});

export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => null);
  const parsed = bookingSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: 'Invalid input' }, { status: 400 });
  }
  const { service, name, email, phone, date, time, details } = parsed.data;
  try {
    await db.insert(bookings).values({ service, name, email, phone, date, time, details });
  } catch {
    // Never surface a raw database error to a visitor.
    return NextResponse.json(
      { error: 'We could not save your request right now. Please call or email us directly.' },
      { status: 503 },
    );
  }
  void sendBookingNotification({ service, name, email, phone, date, time, details });
  return NextResponse.json({ success: true });
}
