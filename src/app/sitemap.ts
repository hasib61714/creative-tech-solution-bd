import type { MetadataRoute } from 'next';
import { absoluteUrl } from '@/lib/site';
import { PROJECTS } from '@/lib/projects';

const SERVICE_SLUGS = ['web-development', 'marketing', 'seo', 'ai-solutions', 'design', 'support'];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: absoluteUrl('/'), lastModified: now, changeFrequency: 'weekly', priority: 1 },
    { url: absoluteUrl('/services'), lastModified: now, changeFrequency: 'monthly', priority: 0.9 },
    { url: absoluteUrl('/portfolio'), lastModified: now, changeFrequency: 'weekly', priority: 0.9 },
    { url: absoluteUrl('/about'), lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
    { url: absoluteUrl('/contact'), lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: absoluteUrl('/booking'), lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: absoluteUrl('/privacy'), lastModified: now, changeFrequency: 'yearly', priority: 0.2 },
    { url: absoluteUrl('/terms'), lastModified: now, changeFrequency: 'yearly', priority: 0.2 },
  ];

  const serviceRoutes: MetadataRoute.Sitemap = SERVICE_SLUGS.map((slug) => ({
    url: absoluteUrl(`/services/${slug}`),
    lastModified: now,
    changeFrequency: 'monthly',
    priority: 0.7,
  }));

  const projectRoutes: MetadataRoute.Sitemap = PROJECTS.map((project) => ({
    url: absoluteUrl(`/portfolio/${project.slug}`),
    lastModified: now,
    changeFrequency: 'monthly',
    priority: 0.6,
  }));

  return [...staticRoutes, ...serviceRoutes, ...projectRoutes];
}
