'use client';

import { useMemo, useState } from 'react';
import type { Project } from '@/lib/projects';
import ProjectCard from './ProjectCard';

/**
 * Client-side filtering only. The projects themselves are rendered on the
 * server and passed in, so the list is in the HTML for crawlers and appears
 * without waiting for JavaScript.
 */
export default function PortfolioGrid({ projects }: { projects: Project[] }) {
  const [active, setActive] = useState('All');

  const categories = useMemo(() => {
    const used = Array.from(new Set(projects.map((project) => project.category)));
    return ['All', ...used];
  }, [projects]);

  const filtered = active === 'All' ? projects : projects.filter((p) => p.category === active);

  if (!projects.length) {
    return (
      <div className="rounded-2xl border border-dashed border-slate-300 bg-slate-50 p-12 text-center">
        <h3 className="text-lg font-semibold text-slate-900">No projects published yet</h3>
        <p className="mx-auto mt-2 max-w-md text-sm text-slate-600">
          Projects are added from the admin panel. In the meantime you can browse the source of
          everything we build on GitHub.
        </p>
      </div>
    );
  }

  return (
    <>
      {categories.length > 2 && (
        <div className="mb-10 flex flex-wrap gap-2" role="group" aria-label="Filter projects by category">
          {categories.map((category) => {
            const isActive = active === category;
            return (
              <button
                key={category}
                type="button"
                onClick={() => setActive(category)}
                aria-pressed={isActive}
                className={`rounded-lg border px-4 py-2 text-sm font-semibold transition-colors duration-200 ${
                  isActive
                    ? 'border-transparent bg-slate-900 text-white'
                    : 'border-slate-200 bg-white text-slate-600 hover:border-slate-400 hover:text-slate-900'
                }`}
              >
                {category}
              </button>
            );
          })}
        </div>
      )}

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filtered.map((project, index) => (
          <ProjectCard key={project.slug} project={project} priority={index < 3} />
        ))}
      </div>

      {filtered.length === 0 && (
        <p className="py-12 text-center text-sm text-slate-600">
          No projects in this category yet.
        </p>
      )}
    </>
  );
}
