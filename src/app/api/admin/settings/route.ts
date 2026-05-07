import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db/drizzle';
import { siteSettings } from '@/db/schema';
import { requirePermission, unauthorized } from '@/lib/auth';
import { z } from 'zod';

const settingsSchema = z.record(z.string().min(1).max(100), z.string().max(10000));

async function canManageSettings(req: NextRequest) {
  return (await requirePermission(req, 'manage_content')) || (await requirePermission(req, 'manage_settings'));
}

export async function GET(req: NextRequest) {
  if (!(await canManageSettings(req))) return unauthorized();
  const rows = await db.select().from(siteSettings);
  const settings = Object.fromEntries(rows.map((r) => [r.key, r.value]));
  return NextResponse.json(settings);
}

export async function PUT(req: NextRequest) {
  if (!(await canManageSettings(req))) return unauthorized();
  const body = await req.json().catch(() => null);
  const parsed = settingsSchema.safeParse(body);
  if (!parsed.success) return NextResponse.json({ error: 'Invalid input' }, { status: 400 });
  for (const [key, value] of Object.entries(parsed.data)) {
    await db
      .insert(siteSettings)
      .values({ key, value })
      .onDuplicateKeyUpdate({ set: { value } });
  }
  return NextResponse.json({ success: true });
}
