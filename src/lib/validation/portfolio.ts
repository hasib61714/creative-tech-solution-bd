import { z } from 'zod';
import { PROJECT_CATEGORIES, PROJECT_STATUSES, PROJECT_TYPES } from '@/lib/projects';

/**
 * The `metric` column is deliberately not accepted here any more. It existed
 * to hold claims like "2x sales growth" that could not be substantiated; the
 * column is kept so old rows are not lost, but nothing new can be written to it.
 */
export const portfolioSchema = z.object({
  title: z.string().min(1).max(255),
  slug: z
    .string()
    .max(255)
    .regex(/^[a-z0-9-]*$/, 'Slug may contain lowercase letters, numbers and hyphens only')
    .optional(),
  category: z.enum(PROJECT_CATEGORIES).optional(),
  shortDescription: z.string().max(500).optional(),
  fullDescription: z.string().max(10000).optional(),
  technologies: z.string().max(1000).optional(),
  githubUrl: z.union([z.string().url().max(500), z.literal('')]).optional(),
  liveUrl: z.union([z.string().url().max(500), z.literal('')]).optional(),
  image: z.string().max(500).optional(),
  featured: z.boolean().optional(),
  status: z.enum(PROJECT_STATUSES).optional(),
  projectType: z.enum(PROJECT_TYPES).optional(),
  year: z.number().int().min(2000).max(2100).optional(),
});

export function slugifyTitle(value: string) {
  return value.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
}
