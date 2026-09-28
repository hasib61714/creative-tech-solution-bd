import { NextResponse } from 'next/server';
import { getProjects } from '@/lib/portfolio';

/**
 * Public read of the portfolio. Served from the same loader the pages use, so
 * it falls back to the curated project records when no database is configured
 * rather than returning an empty list.
 */
export async function GET() {
  const projects = await getProjects();
  return NextResponse.json(projects, {
    headers: { 'Cache-Control': 'public, s-maxage=300, stale-while-revalidate=600' },
  });
}
