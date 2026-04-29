import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db/drizzle';
import { users } from '@/db/schema';
import { requirePermission, unauthorized } from '@/lib/auth';
import { desc } from 'drizzle-orm';

export async function GET(req: NextRequest) {
  if (!(await requirePermission(req, 'send_messages'))) return unauthorized();
  const rows = await db.select({
    id: users.id,
    name: users.name,
    email: users.email,
  }).from(users).orderBy(desc(users.createdAt));
  return NextResponse.json(rows);
}
