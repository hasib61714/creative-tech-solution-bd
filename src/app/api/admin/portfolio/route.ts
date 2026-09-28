import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db/drizzle';
import { portfolioItems } from '@/db/schema';
import { requirePermission, unauthorized } from '@/lib/auth';
import { desc } from 'drizzle-orm';
import { portfolioSchema, slugifyTitle } from '@/lib/validation/portfolio';
export async function GET(req: NextRequest) {
  if (!(await requirePermission(req, 'manage_portfolio'))) return unauthorized();
  const rows = await db.select().from(portfolioItems).orderBy(desc(portfolioItems.createdAt));
  return NextResponse.json(rows);
}

export async function POST(req: NextRequest) {
  if (!(await requirePermission(req, 'manage_portfolio'))) return unauthorized();
  const parsed = portfolioSchema.safeParse(await req.json().catch(() => null));
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.issues[0]?.message ?? 'Invalid input' }, { status: 400 });
  }
  const data = parsed.data;
  await db.insert(portfolioItems).values({
    ...data,
    slug: data.slug || slugifyTitle(data.title),
    githubUrl: data.githubUrl || null,
    liveUrl: data.liveUrl || null,
  });
  return NextResponse.json({ success: true });
}
