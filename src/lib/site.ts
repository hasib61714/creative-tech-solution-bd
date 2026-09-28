/**
 * Central site configuration.
 *
 * Nothing in the application may hardcode a domain. Every absolute URL
 * (metadata, canonical, Open Graph, sitemap, robots, structured data, email
 * links) is derived from `SITE_URL`, which is resolved in this order:
 *
 *   1. NEXT_PUBLIC_SITE_URL  — set this once a custom domain is connected
 *   2. VERCEL_PROJECT_PRODUCTION_URL / VERCEL_URL — the deployment URL
 *   3. http://localhost:3000 — local development
 *
 * Connecting creativetechsolutionbd.com later is therefore a DNS change plus
 * one environment variable, with no code change anywhere.
 */
function resolveSiteUrl(): string {
  const explicit = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  if (explicit) return explicit.replace(/\/+$/, '');

  const vercel =
    process.env.VERCEL_PROJECT_PRODUCTION_URL?.trim() || process.env.VERCEL_URL?.trim();
  if (vercel) return `https://${vercel.replace(/\/+$/, '')}`;

  return 'http://localhost:3000';
}

export const SITE_URL = resolveSiteUrl();

/** Build an absolute URL from a site-relative path. */
export function absoluteUrl(path = '/'): string {
  return new URL(path, `${SITE_URL}/`).toString();
}

export const SITE = {
  name: 'Creative Tech Solution BD',
  shortName: 'CreativeTech BD',
  /** Used as the default meta description and in structured data. */
  description:
    'Creative Tech Solution BD builds websites, web applications, e-commerce stores and AI-powered software for businesses and organisations in Bangladesh.',
  founder: 'Md. Hasibul Hasan',
  locale: 'en_BD',
  githubProfile: 'https://github.com/hasib61714',
} as const;
