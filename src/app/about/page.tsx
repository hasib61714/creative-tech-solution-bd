import type { Metadata } from 'next';
import {
  FileText, MessageSquare, ShieldCheck, Wrench, Mail,
  Globe, Code2, Bot, Database, Paintbrush, Search,
} from 'lucide-react';
import { GithubIcon } from '@/components/icons';
import SiteShell from '@/components/SiteShell';
import { PageHero, Section, SectionHeading, ButtonLink, TechBadge } from '@/components/ui';
import { getSiteContent, highlightText } from '@/lib/content';
import { SITE } from '@/lib/site';
import { breadcrumbJsonLd, JsonLd } from '@/lib/structured-data';

export const metadata: Metadata = {
  title: 'About',
  description:
    'Creative Tech Solution BD is a technology and digital solutions initiative led by Md. Hasibul Hasan, building websites, software products and AI solutions in Bangladesh.',
  alternates: { canonical: '/about' },
  openGraph: { url: '/about', title: 'About | Creative Tech Solution BD' },
};

export const revalidate = 3600;

/**
 * Every claim on this page is one that can be checked. The previous version
 * listed three team members, a 2020 founding date, a client count and a
 * satisfaction rate — none of which could be verified, so they are gone rather
 * than restyled.
 */
const HOW_WE_WORK = [
  {
    icon: FileText,
    title: 'Scope before code',
    desc: 'A written scope and a fixed quote come first. You know what is being built and what it costs before anything starts.',
  },
  {
    icon: MessageSquare,
    title: 'Direct communication',
    desc: 'You talk to the developer building your project. Questions get answered by the person who can answer them.',
  },
  {
    icon: ShieldCheck,
    title: 'Security as a default',
    desc: 'Hashed passwords, validated inputs, authorisation checked on the server and credentials kept in environment variables.',
  },
  {
    icon: Wrench,
    title: 'Support after launch',
    desc: 'Launch is a milestone, not the end. Fixes and improvements continue on an arrangement agreed up front.',
  },
];

const CAPABILITIES = [
  {
    icon: Globe,
    title: 'Web applications',
    desc: 'Next.js and React front ends with server rendering, and Laravel or Node.js APIs behind them.',
    tech: ['Next.js', 'React', 'TypeScript', 'Laravel', 'Node.js'],
  },
  {
    icon: Code2,
    title: 'Business systems',
    desc: 'Admin panels, ERP-style internal tools and information management systems that replace spreadsheets.',
    tech: ['TypeScript', 'PHP', 'REST APIs'],
  },
  {
    icon: Database,
    title: 'Databases',
    desc: 'Relational schema design and the ORM layer over it, on MySQL, MariaDB, PostgreSQL or Supabase.',
    tech: ['MySQL', 'PostgreSQL', 'Supabase', 'Prisma', 'Drizzle ORM'],
  },
  {
    icon: Bot,
    title: 'Machine learning',
    desc: 'Classification and prediction models trained in Python and served behind an API a web app can call.',
    tech: ['Python', 'scikit-learn', 'FastAPI'],
  },
  {
    icon: Paintbrush,
    title: 'Interface design',
    desc: 'Layout, flow and responsive design worked out before implementation, in Figma and Tailwind CSS.',
    tech: ['Figma', 'Tailwind CSS'],
  },
  {
    icon: Search,
    title: 'SEO & performance',
    desc: 'Technical SEO, structured data, image and bundle optimisation, and Core Web Vitals work.',
    tech: ['Core Web Vitals', 'Schema.org'],
  },
];

export default async function AboutPage() {
  const content = await getSiteContent();
  const title = highlightText(content.about_title, content.about_highlight);

  return (
    <SiteShell>
      <PageHero
        eyebrow={content.about_badge}
        title={
          <>
            {title.before}
            {title.highlight && (
              <span className="bg-linear-to-r from-red-400 to-blue-400 bg-clip-text text-transparent">
                {title.highlight}
              </span>
            )}
            {title.after}
          </>
        }
        subtitle={content.about_subtitle}
      />

      {/* Who you work with — one real person, described accurately. */}
      <Section>
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <h2 className="text-2xl font-bold text-slate-900 sm:text-3xl">{content.about_team_heading}</h2>
            <div className="mt-6 flex flex-col gap-4 text-base leading-relaxed text-slate-700">
              <p>
                Creative Tech Solution BD is led by <strong>Md. Hasibul Hasan</strong>, a full-stack
                developer working across web applications, business systems and machine learning.
              </p>
              <p>
                It is a small operation, and that is stated plainly rather than dressed up as a
                department. There is no sales team between you and the person writing the code, which
                means fewer people to coordinate and no requirement that gets lost being passed along.
              </p>
              <p>
                Where a project needs a skill outside that range, we will say so rather than take the
                work and learn on your budget.
              </p>
            </div>
            <div className="mt-8 flex flex-wrap gap-3">
              <ButtonLink href={SITE.githubProfile} variant="outline" size="md" target="_blank" rel="noopener noreferrer">
                <GithubIcon />
                GitHub profile
              </ButtonLink>
              <ButtonLink href="/contact" variant="primary" size="md">
                <Mail className="h-4 w-4" aria-hidden="true" />
                Get in touch
              </ButtonLink>
            </div>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-6">
            <div className="text-xs font-bold uppercase tracking-widest text-slate-500">Founder &amp; lead developer</div>
            <div className="mt-3 text-xl font-bold text-slate-900">Md. Hasibul Hasan</div>
            <p className="mt-3 text-sm leading-relaxed text-slate-600">
              Full-stack development across Next.js, React, Laravel and Python, with machine-learning
              work served through APIs.
            </p>
            <div className="mt-5 border-t border-slate-200 pt-5">
              <div className="text-xs font-bold uppercase tracking-widest text-slate-500">Based in</div>
              <p className="mt-2 text-sm text-slate-700">{content.contact_address}</p>
            </div>
          </div>
        </div>
      </Section>

      <Section tone="muted">
        <SectionHeading eyebrow="How we work" title={content.about_values_heading} />
        <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {HOW_WE_WORK.map((item) => (
            <li key={item.title} className="flex gap-4 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-slate-100 text-slate-700">
                <item.icon className="h-5 w-5" aria-hidden="true" />
              </span>
              <span>
                <span className="block text-sm font-bold text-slate-900">{item.title}</span>
                <span className="mt-1.5 block text-sm leading-relaxed text-slate-600">{item.desc}</span>
              </span>
            </li>
          ))}
        </ul>
      </Section>

      <Section>
        <SectionHeading
          eyebrow="Capabilities"
          title={content.about_journey_heading}
          subtitle="What we can actually deliver, based on projects that have been built rather than a list of buzzwords."
        />
        <ul className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
          {CAPABILITIES.map((item) => (
            <li key={item.title} className="flex flex-col rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <span className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-red-50 text-red-600">
                <item.icon className="h-5 w-5" aria-hidden="true" />
              </span>
              <span className="text-sm font-bold text-slate-900">{item.title}</span>
              <span className="mt-2 flex-1 text-sm leading-relaxed text-slate-600">{item.desc}</span>
              <span className="mt-4 flex flex-wrap gap-1.5">
                {item.tech.map((tech) => (
                  <TechBadge key={tech}>{tech}</TechBadge>
                ))}
              </span>
            </li>
          ))}
        </ul>
      </Section>

      <JsonLd
        data={breadcrumbJsonLd([
          { name: 'Home', path: '/' },
          { name: 'About', path: '/about' },
        ])}
      />
    </SiteShell>
  );
}
