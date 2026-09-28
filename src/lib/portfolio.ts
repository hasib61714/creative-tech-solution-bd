import { db, isDatabaseConfigured } from '@/db/drizzle';
import { portfolioItems } from '@/db/schema';
import { desc } from 'drizzle-orm';
import {
  PROJECTS,
  type Project,
  type ProjectCategory,
  type ProjectStatus,
  type ProjectType,
} from './projects';

function slugify(value: string) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

function splitLines(value: string | null | undefined): string[] {
  if (!value) return [];
  return value
    .split('\n')
    .map((line) => line.trim())
    .filter(Boolean);
}

type Row = typeof portfolioItems.$inferSelect;

function rowToProject(row: Row): Project {
  const short = row.shortDescription || row.description || '';
  return {
    slug: row.slug || slugify(row.title),
    title: row.title,
    shortDescription: short,
    fullDescription: splitLines(row.fullDescription || row.description),
    purpose: '',
    features: [],
    category: (row.category as ProjectCategory) || 'Web Development',
    // Accept either newline- or comma-separated input from the admin form.
    technologies: splitLines(row.technologies?.replace(/,/g, '\n')) ,
    githubUrl: row.githubUrl || undefined,
    liveUrl: row.liveUrl || undefined,
    image: row.image || undefined,
    featured: Boolean(row.featured),
    status: (row.status as ProjectStatus) || 'Completed',
    projectType: (row.projectType as ProjectType) || 'Personal Project',
    year: row.year ?? new Date().getFullYear(),
  };
}

/**
 * Portfolio projects, preferring database rows and falling back to the curated
 * records in `lib/projects`.
 *
 * The fallback is what makes a ৳0 deployment possible: with no database at all
 * the portfolio is still complete and correct, and the owner can move to
 * database-managed projects later without any code change.
 */
export async function getProjects(): Promise<Project[]> {
  if (!isDatabaseConfigured()) return PROJECTS;
  try {
    const rows = await db.select().from(portfolioItems).orderBy(desc(portfolioItems.createdAt));
    const usable = rows.filter((row) => row.title);
    if (!usable.length) return PROJECTS;
    return usable.map(rowToProject);
  } catch {
    return PROJECTS;
  }
}

export async function getFeatured(limit = 6): Promise<Project[]> {
  const projects = await getProjects();
  const featured = projects.filter((project) => project.featured);
  return (featured.length ? featured : projects).slice(0, limit);
}

export async function getProject(slug: string): Promise<Project | undefined> {
  const projects = await getProjects();
  return projects.find((project) => project.slug === slug);
}
