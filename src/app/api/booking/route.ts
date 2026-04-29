import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db/drizzle';
import { bookings } from '@/db/schema';

export async function POST(req: NextRequest) {
  const { service, name, email, phone, date, time, details } = await req.json();
  if (!service || !name || !email || !phone) {
    return NextResponse.json({ error: 'Required fields missing' }, { status: 400 });
  }
  await db.insert(bookings).values({ service, name, email, phone, date, time, details });
  return NextResponse.json({ success: true });
}
