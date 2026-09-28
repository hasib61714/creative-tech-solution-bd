import { db, isDatabaseConfigured } from '@/db/drizzle';
import { siteSettings } from '@/db/schema';
import { CONTENT_DEFAULTS, SiteContent } from './content-defaults';

/**
 * Site copy, read once per render on the server.
 *
 * Any failure — no DATABASE_URL, an unreachable database, a table that has not
 * been migrated yet — falls back to the built-in defaults rather than breaking
 * the page. The public site is therefore never down because the database is.
 */
export async function getSiteContent(): Promise<SiteContent> {
  if (!isDatabaseConfigured()) return { ...CONTENT_DEFAULTS };
  try {
    const rows = await db.select().from(siteSettings);
    const stored = Object.fromEntries(
      rows
        // A blank row means "not set", not "render nothing".
        .filter((row) => typeof row.value === 'string' && row.value.trim() !== '')
        .map((row) => [row.key, row.value as string]),
    );
    return { ...CONTENT_DEFAULTS, ...stored } as SiteContent;
  } catch {
    return { ...CONTENT_DEFAULTS };
  }
}

/** Parses the `a|b|c` per-line format used by the editable list fields. */
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
