import type { MetadataRoute } from 'next';
import { absoluteUrl } from '@/lib/site';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      // Nothing behind authentication or under /api belongs in an index.
      disallow: ['/admin', '/admin/', '/auth', '/api/'],
    },
    sitemap: absoluteUrl('/sitemap.xml'),
  };
}
