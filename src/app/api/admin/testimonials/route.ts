import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db/drizzle';
import { testimonials } from '@/db/schema';
import { requirePermission, unauthorized } from '@/lib/auth';
import { desc } from 'drizzle-orm';
import { z } from 'zod';

const testimonialSchema = z.object({
  name: z.string().min(1).max(255),
  company: z.string().max(255).optional(),
  message: z.string().min(1).max(2000),
  rating: z.number().int().min(1).max(5).optional(),
});

export async function GET(req: NextRequest) {
  if (!(await requirePermission(req, 'manage_testimonials'))) return unauthorized();
  const rows = await db.select().from(testimonials).orderBy(desc(testimonials.createdAt));
  return NextResponse.json(rows);
}

export async function POST(req: NextRequest) {
  if (!(await requirePermission(req, 'manage_testimonials'))) return unauthorized();
  const parsed = testimonialSchema.safeParse(await req.json().catch(() => null));
  if (!parsed.success) return NextResponse.json({ error: 'Invalid input' }, { status: 400 });
  const { name, company, message, rating } = parsed.data;
  await db.insert(testimonials).values({ name, company, message, rating: rating ?? 5 });
  return NextResponse.json({ success: true });
}
