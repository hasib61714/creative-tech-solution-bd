import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db/drizzle';
import { bookings, servicesTable, portfolioItems, testimonials, contactMessages } from '@/db/schema';
import { requirePermission, unauthorized } from '@/lib/auth';
import { eq, count } from 'drizzle-orm';

export async function GET(req: NextRequest) {
  if (!(await requirePermission(req, 'dashboard'))) return unauthorized();

  const [[bTotal], [bPending], [sTotal], [pTotal], [tPending], [cUnread]] = await Promise.all([
    db.select({ n: count() }).from(bookings),
    db.select({ n: count() }).from(bookings).where(eq(bookings.status, 'pending')),
    db.select({ n: count() }).from(servicesTable).where(eq(servicesTable.active, true)),
    db.select({ n: count() }).from(portfolioItems),
    db.select({ n: count() }).from(testimonials).where(eq(testimonials.status, 'pending')),
    db.select({ n: count() }).from(contactMessages).where(eq(contactMessages.read, false)),
  ]);

  const recent = await db.select().from(bookings)
    .orderBy(bookings.createdAt)
    .limit(5);

  return NextResponse.json({
    bookings:      { total: bTotal.n, pending: bPending.n },
    services:      { active: sTotal.n },
    portfolio:     { total: pTotal.n },
    testimonials:  { pending: tPending.n },
    contacts:      { unread: cUnread.n },
    recentBookings: recent,
  });
}
