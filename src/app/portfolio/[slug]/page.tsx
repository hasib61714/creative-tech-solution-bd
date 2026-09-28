import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { ArrowLeft, ExternalLink, Lock, Check } from 'lucide-react';
import { GithubIcon } from '@/components/icons';
import SiteShell from '@/components/SiteShell';
import { Section, StatusBadge, TechBadge, BrowserMockup, ButtonLink } from '@/components/ui';
import { getProject, getProjects } from '@/lib/portfolio';
import { PROJECTS } from '@/lib/projects';
import { breadcrumbJsonLd, JsonLd } from '@/lib/structured-data';

type Params = { params: Promise<{ slug: string }> };

export const revalidate = 300;

/** Pre-render the curated set; database-managed projects render on demand. */
export function generateStaticParams() {
  return PROJECTS.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const project = await getProject(slug);
  if (!project) return { title: 'Project not found' };
  return {
    title: project.title,
    description: project.shortDescription,
    alternates: { canonical: `/portfolio/${project.slug}` },
    openGraph: {
      url: `/portfolio/${project.slug}`,
      title: project.title,
      description: project.shortDescription,
    },
  };
}

export default async function ProjectPage({ params }: Params) {
  const { slug } = await params;
  const project = await getProject(slug);
  if (!project) notFound();

  const related = (await getProjects())
    .filter((item) => item.slug !== project.slug && item.category === project.category)
    .slice(0, 3);

  return (
    <SiteShell>
      <section className="relative overflow-hidden bg-slate-950 py-16 lg:py-20">
        <div className="absolute inset-0 dot-grid-dark opacity-10" />
        <div className="absolute -top-40 -right-40 h-120 w-120 rounded-full bg-red-600/15 blur-3xl" aria-hidden="true" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Link
            href="/portfolio"
            className="inline-flex items-center gap-2 text-sm font-medium text-slate-400 transition-colors hover:text-white"
          >
            <ArrowLeft className="h-4 w-4" aria-hidden="true" />
            All projects
          </Link>

          <div className="mt-8 grid grid-cols-1 gap-10 lg:grid-cols-2 lg:items-center">
            <div>
              <div className="mb-4 flex flex-wrap items-center gap-2">
                <StatusBadge status={project.status} />
                <span className="rounded-full border border-white/15 px-2.5 py-0.5 text-[11px] font-medium text-slate-300">
                  {project.projectType}
                </span>
                <span className="rounded-full border border-white/15 px-2.5 py-0.5 text-[11px] font-medium text-slate-300">
                  {project.category}
                </span>
                <span className="text-[11px] text-slate-400">{project.year}</span>
              </div>
              <h1 className="text-3xl font-extrabold leading-tight tracking-tight text-white text-balance sm:text-4xl lg:text-5xl">
                {project.title}
              </h1>
              <p className="mt-5 max-w-xl text-lg leading-relaxed text-slate-300">
                {project.shortDescription}
              </p>

              <div className="mt-8 flex flex-wrap items-center gap-3">
                {project.githubUrl && (
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-xl bg-white px-5 py-3 text-sm font-semibold text-slate-900 transition-colors hover:bg-slate-100"
                  >
                    <GithubIcon />
                    View source
                  </a>
                )}
                {project.liveUrl && (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-xl border border-white/20 bg-white/10 px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-white/20"
                  >
                    <ExternalLink className="h-4 w-4" aria-hidden="true" />
                    Live demo
                  </a>
                )}
                {!project.githubUrl && project.repositoryNote && (
                  <span className="inline-flex items-center gap-2 rounded-xl border border-white/10 px-4 py-3 text-sm text-slate-400">
                    <Lock className="h-4 w-4" aria-hidden="true" />
                    {project.repositoryNote}
                  </span>
                )}
              </div>
            </div>

            <div className="relative aspect-16/10 overflow-hidden rounded-2xl border border-white/10 bg-slate-900 p-3">
              {project.image ? (
                <Image
                  src={project.image}
                  alt={`${project.title} — project screenshot`}
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
                  priority
                />
              ) : (
                <BrowserMockup label={project.title} className="h-full w-full" />
              )}
            </div>
          </div>
        </div>
      </section>

      <Section>
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-3">
          <div className="lg:col-span-2">
            {project.purpose && (
              <>
                <h2 className="text-2xl font-bold text-slate-900">The problem</h2>
                <p className="mt-4 text-base leading-relaxed text-slate-700">{project.purpose}</p>
              </>
            )}

            {project.fullDescription.length > 0 && (
              <>
                <h2 className="mt-12 text-2xl font-bold text-slate-900">The solution</h2>
                <div className="mt-4 flex flex-col gap-4">
                  {project.fullDescription.map((paragraph) => (
                    <p key={paragraph.slice(0, 40)} className="text-base leading-relaxed text-slate-700">
                      {paragraph}
                    </p>
                  ))}
                </div>
              </>
            )}

            {project.features.length > 0 && (
              <>
                <h2 className="mt-12 text-2xl font-bold text-slate-900">Key features</h2>
                <ul className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
                  {project.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-2.5 text-sm text-slate-700">
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-green-600" aria-hidden="true" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </>
            )}
          </div>

          <aside className="lg:col-span-1">
            <div className="sticky top-24 flex flex-col gap-6 rounded-2xl border border-slate-200 bg-slate-50 p-6">
              <div>
                <h2 className="text-xs font-bold uppercase tracking-widest text-slate-500">Technology</h2>
                <ul className="mt-3 flex flex-wrap gap-1.5">
                  {project.technologies.map((tech) => (
                    <li key={tech}>
                      <TechBadge>{tech}</TechBadge>
                    </li>
                  ))}
                </ul>
              </div>
              <dl className="flex flex-col gap-3 border-t border-slate-200 pt-6 text-sm">
                <div className="flex justify-between gap-4">
                  <dt className="text-slate-500">Status</dt>
                  <dd className="font-medium text-slate-900">{project.status}</dd>
                </div>
                <div className="flex justify-between gap-4">
                  <dt className="text-slate-500">Type</dt>
                  <dd className="font-medium text-slate-900">{project.projectType}</dd>
                </div>
                <div className="flex justify-between gap-4">
                  <dt className="text-slate-500">Category</dt>
                  <dd className="font-medium text-slate-900">{project.category}</dd>
                </div>
                <div className="flex justify-between gap-4">
                  <dt className="text-slate-500">Year</dt>
                  <dd className="font-medium text-slate-900">{project.year}</dd>
                </div>
              </dl>
              <div className="border-t border-slate-200 pt-6">
                <p className="mb-4 text-sm text-slate-600">
                  Want something similar built for your business?
                </p>
                <ButtonLink href="/booking" variant="primary" size="md" className="w-full">
                  Get a quote
                </ButtonLink>
              </div>
            </div>
          </aside>
        </div>
      </Section>

      {related.length > 0 && (
        <Section tone="muted">
          <h2 className="mb-8 text-2xl font-bold text-slate-900">Related projects</h2>
          <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((item) => (
              <li key={item.slug}>
                <Link
                  href={`/portfolio/${item.slug}`}
                  className="flex h-full flex-col rounded-2xl border border-slate-200 bg-white p-6 transition-colors hover:border-slate-400"
                >
                  <span className="text-sm font-bold text-slate-900">{item.title}</span>
                  <span className="mt-2 line-clamp-3 text-sm text-slate-600">{item.shortDescription}</span>
                </Link>
              </li>
            ))}
          </ul>
        </Section>
      )}

      <JsonLd
        data={breadcrumbJsonLd([
          { name: 'Home', path: '/' },
          { name: 'Portfolio', path: '/portfolio' },
          { name: project.title, path: `/portfolio/${project.slug}` },
        ])}
      />
    </SiteShell>
  );
}
