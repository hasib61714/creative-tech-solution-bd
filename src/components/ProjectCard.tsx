import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, ExternalLink } from 'lucide-react';
import { GithubIcon } from './icons';
import type { Project } from '@/lib/projects';
import { BrowserMockup, StatusBadge, TechBadge } from './ui';

/**
 * A project card only renders the links a project actually has. There are no
 * placeholder buttons: a missing repository means no GitHub button, not a
 * button that goes nowhere.
 */
export default function ProjectCard({ project, priority = false }: { project: Project; priority?: boolean }) {
  return (
    <article className="group flex flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-slate-300 hover:shadow-lg">
      <div className="relative aspect-16/10 overflow-hidden bg-slate-950 p-4">
        {project.image ? (
          <Image
            src={project.image}
            alt={`${project.title} — project screenshot`}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
            className="object-cover"
            priority={priority}
          />
        ) : (
          <BrowserMockup label={project.title} className="h-full w-full" />
        )}
      </div>

      <div className="flex flex-1 flex-col gap-3 p-6">
        <div className="flex flex-wrap items-center gap-2">
          <StatusBadge status={project.status} />
          <span className="text-[11px] font-medium text-slate-500">{project.projectType}</span>
          <span className="text-[11px] text-slate-400">· {project.year}</span>
        </div>

        <h3 className="text-lg font-bold leading-snug text-slate-900">
          <Link href={`/portfolio/${project.slug}`} className="transition-colors hover:text-red-700">
            {project.title}
          </Link>
        </h3>

        <p className="flex-1 text-sm leading-relaxed text-slate-600">{project.shortDescription}</p>

        {project.technologies.length > 0 && (
          <ul className="flex flex-wrap gap-1.5">
            {project.technologies.slice(0, 5).map((tech) => (
              <li key={tech}>
                <TechBadge>{tech}</TechBadge>
              </li>
            ))}
          </ul>
        )}

        <div className="mt-2 flex flex-wrap items-center gap-4 border-t border-slate-100 pt-4">
          <Link
            href={`/portfolio/${project.slug}`}
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-red-700 transition-colors hover:text-red-600"
          >
            View case study
            <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
          </Link>
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-slate-600 transition-colors hover:text-slate-900"
            >
              <GithubIcon className="h-3.5 w-3.5" />
              GitHub
              <span className="sr-only"> repository for {project.title} (opens in a new tab)</span>
            </a>
          )}
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-slate-600 transition-colors hover:text-slate-900"
            >
              <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
              Live demo
              <span className="sr-only"> for {project.title} (opens in a new tab)</span>
            </a>
          )}
        </div>
      </div>
    </article>
  );
}
