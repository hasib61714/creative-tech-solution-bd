import { db } from '@/db/drizzle';
import { siteSettings } from '@/db/schema';
import { CONTENT_DEFAULTS, SiteContent } from './content-defaults';

export async function getSiteContent(): Promise<SiteContent> {
  try {
    const rows = await db.select().from(siteSettings);
    const stored = Object.fromEntries(rows.map((r) => [r.key, r.value ?? '']));
    return { ...CONTENT_DEFAULTS, ...stored } as SiteContent;
  } catch {
    return { ...CONTENT_DEFAULTS };
  }
}

export function parseListRows(value: string) {
  return value
    .split('\n')
    .map((line) => line.split('|').map((part) => part.trim()))
    .filter((parts) => parts.some(Boolean));
}

export function highlightText(text: string, highlight: string) {
  if (!highlight || !text.includes(highlight)) {
    return { before: text, highlight: '', after: '' };
  }
  const [before, ...rest] = text.split(highlight);
  return { before, highlight, after: rest.join(highlight) };
}
