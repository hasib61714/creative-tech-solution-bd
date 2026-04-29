import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db/drizzle';
import { contactMessages } from '@/db/schema';

export async function POST(req: NextRequest) {
  const { name, email, subject, message } = await req.json();
  if (!name || !email || !message) {
    return NextResponse.json({ error: 'Name, email, and message are required' }, { status: 400 });
  }
  await db.insert(contactMessages).values({ name, email, subject, message });
  return NextResponse.json({ success: true });
}
