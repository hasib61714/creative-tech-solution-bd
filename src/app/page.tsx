import type { Metadata } from 'next';
import Link from 'next/link';
import {
  Globe, Code2, ShoppingCart, Bot, Paintbrush, Search,
  GitBranch, FileText, MessageSquare, ShieldCheck, Gauge, LifeBuoy,
  ArrowRight,
} from 'lucide-react';
import { GithubIcon } from '@/components/icons';
import SiteShell from '@/components/SiteShell';
import ProjectCard from '@/components/ProjectCard';
import { Section, SectionHeading, Eyebrow, ButtonLink, BrowserMockup, TechBadge } from '@/components/ui';
import { getSiteContent, highlightText, parseListRows } from '@/lib/content';
import { getFeatured } from '@/lib/portfolio';
import { SITE } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Creative Tech Solution BD | Web Development & Digital Solutions',
  description:
    'Creative Tech Solution BD builds websites, web applications, e-commerce stores and AI-powered software for businesses and organisations in Bangladesh.',
  alternates: { canonical: '/' },
};

export const revalidate = 300;

const SERVICES = [
  {
    icon: Globe,
    title: 'Web Development',
    desc: 'Fast, modern websites and web applications, built to the requirements of your business rather than a template.',
    href: '/services/web-development',
    tech: ['Next.js', 'React', 'Laravel'],
  },
  {
    icon: Code2,
    title: 'Custom Software',
    desc: 'Internal tools, admin systems and business platforms that replace spreadsheets and manual record-keeping.',
    href: '/services/web-development',
    tech: ['TypeScript', 'Node.js', 'PHP'],
  },
  {
    icon: ShoppingCart,
    title: 'E-commerce',
    desc: 'Online stores with product management, orders and payment integration for the Bangladeshi market.',
    href: '/services/web-development',
    tech: ['Next.js', 'MySQL', 'Payments'],
  },
  {
    icon: Bot,
    title: 'AI & Automation',
    desc: 'Machine-learning models and AI integrations served behind an API, so they plug into software you already run.',
    href: '/services/ai-solutions',
    tech: ['Python', 'FastAPI', 'AI APIs'],
  },
  {
    icon: Paintbrush,
    title: 'UI/UX Design',
    desc: 'Interface design and prototypes — the layout and flow worked out before a line of code is written.',
    href: '/services/design',
    tech: ['Figma', 'Tailwind CSS'],
  },
  {
    icon: Search,
    title: 'SEO & Maintenance',
    desc: 'Technical SEO, performance work and ongoing maintenance to keep a site fast, indexed and secure.',
    href: '/services/seo',
    tech: ['Core Web Vitals', 'Schema'],
  },
];

const WHY_US = [
  {
    icon: GitBranch,
    title: 'You can read the code',
    desc: 'Our projects are on GitHub, including this website. Judge the work before you commit to it.',
  },
  {
    icon: FileText,
    title: 'Scope and price in writing',
    desc: 'Every project starts with a written scope and a fixed quote. No open-ended hourly billing.',
  },
  {
    icon: MessageSquare,
    title: 'Direct communication',
    desc: 'You speak to the person building your project, not to an account manager relaying messages.',
  },
  {
    icon: ShieldCheck,
    title: 'Secure by default',
    desc: 'Hashed passwords, validated inputs, server-side authorisation and no secrets in client code.',
  },
  {
    icon: Gauge,
    title: 'Built to be fast',
    desc: 'Server rendering, optimised images and a light JavaScript payload — on Bangladeshi mobile networks too.',
  },
  {
    icon: LifeBuoy,
    title: 'Support after launch',
    desc: 'Launch is not the end of the project. Fixes and improvements continue once the site is live.',
  },
];

const PROCESS = [
  { num: '01', title: 'Discovery', desc: 'We work out what the business actually needs, and what it does not.' },
  { num: '02', title: 'Planning', desc: 'Scope, technology and structure agreed in writing, with a fixed price.' },
  { num: '03', title: 'Design & build', desc: 'The interface is designed, then built — with progress you can see.' },
  { num: '04', title: 'Testing', desc: 'Functionality, responsiveness across devices, and basic security checks.' },
  { num: '05', title: 'Launch', desc: 'Deployment and production configuration, including domain and email setup.' },
  { num: '06', title: 'Support', desc: 'Fixes and improvements after launch, on an agreed arrangement.' },
];

const STACK = [
  'Next.js', 'React', 'TypeScript', 'Node.js', 'Express', 'Laravel', 'PHP',
  'Python', 'FastAPI', 'scikit-learn', 'MySQL', 'PostgreSQL', 'Supabase',
  'Prisma', 'Drizzle ORM', 'Tailwind CSS', 'Socket.IO', 'REST APIs',
];

export default async function Home() {
  const [content, featured] = await Promise.all([getSiteContent(), getFeatured(6)]);
  const heroTitle = highlightText(content.home_hero_title, content.home_hero_highlight);
  const trustPoints = parseListRows(content.home_trust_points).map(([value, label, desc]) => ({
    value,
    label,
    desc,
  }));

  return (
    <SiteShell>
      {/* Hero — the visual is a real project preview, not a stock photograph. */}
      <section className="relative overflow-hidden bg-slate-950 py-16 lg:py-24">
        <div className="absolute inset-0 dot-grid-dark opacity-10" />
        <div className="absolute -top-40 -right-40 h-140 w-140 rounded-full bg-red-600/15 blur-3xl" aria-hidden="true" />
        <div className="absolute -bottom-40 -left-40 h-120 w-120 rounded-full bg-blue-700/15 blur-3xl" aria-hidden="true" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
            <div>
              <Eyebrow tone="dark">{content.home_badge}</Eyebrow>
              <h1 className="mt-6 text-4xl font-extrabold leading-[1.08] tracking-tight text-white text-balance sm:text-5xl lg:text-6xl">
                {heroTitle.before}
                {heroTitle.highlight && (
                  <span className="bg-linear-to-r from-red-400 to-blue-400 bg-clip-text text-transparent">
                    {heroTitle.highlight}
                  </span>
                )}
                {heroTitle.after}
              </h1>
              <p className="mt-6 max-w-xl text-lg leading-relaxed text-slate-300">
                {content.home_hero_subtitle}
              </p>
              <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                <ButtonLink href="/booking" variant="primary" size="lg">
                  {content.home_primary_cta}
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </ButtonLink>
                <ButtonLink href="/portfolio" variant="ghostDark" size="lg">
                  {content.home_secondary_cta}
                </ButtonLink>
              </div>
            </div>

            <div className="relative" aria-hidden="true">
              <div className="grid grid-cols-2 gap-4">
                <BrowserMockup label="IMAP — live job tracking" className="col-span-2 aspect-16/9" />
                <BrowserMockup label="HairHub ERP" className="aspect-4/3" />
                <BrowserMockup label="Heart Disease Prediction" className="aspect-4/3" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trust — capabilities, not invented statistics. */}
      <Section tone="muted" className="!py-14">
        <ul className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {trustPoints.map((point) => (
            <li key={point.label} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <div className="text-lg font-bold text-slate-900">{point.value}</div>
              <div className="mt-1 text-sm font-semibold text-red-700">{point.label}</div>
              <p className="mt-2 text-sm leading-relaxed text-slate-600">{point.desc}</p>
            </li>
          ))}
        </ul>
      </Section>

      {/* Services */}
      <Section>
        <SectionHeading
          eyebrow="What we do"
          title={content.home_services_heading}
          subtitle={content.home_services_subtitle}
        />
        <ul className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
          {SERVICES.map((service) => (
            <li key={service.title}>
              <Link
                href={service.href}
                className="group flex h-full flex-col rounded-2xl border border-slate-200 bg-white p-7 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-slate-300 hover:shadow-lg"
              >
                <span className="mb-5 flex h-11 w-11 items-center justify-center rounded-xl bg-red-50 text-red-600 transition-colors group-hover:bg-red-100">
                  <service.icon className="h-5 w-5" aria-hidden="true" />
                </span>
                <span className="text-base font-bold text-slate-900">{service.title}</span>
                <span className="mt-2 flex-1 text-sm leading-relaxed text-slate-600">{service.desc}</span>
                <span className="mt-5 flex flex-wrap gap-1.5">
                  {service.tech.map((tech) => (
                    <TechBadge key={tech}>{tech}</TechBadge>
                  ))}
                </span>
                <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-red-700">
                  Learn more
                  <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </Section>

      {/* Featured projects */}
      <Section tone="muted">
        <SectionHeading
          eyebrow="Our work"
          title={content.home_work_heading}
          subtitle={content.home_work_subtitle}
        />
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {featured.map((project, index) => (
            <ProjectCard key={project.slug} project={project} priority={index < 3} />
          ))}
        </div>
        <div className="mt-10 flex justify-center">
          <ButtonLink href="/portfolio" variant="outline" size="md">
            See all projects
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </ButtonLink>
        </div>
      </Section>

      {/* Why work with us */}
      <Section>
        <SectionHeading eyebrow="Why us" title={content.home_why_heading} />
        <ul className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {WHY_US.map((item) => (
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

      {/* Process */}
      <Section tone="muted">
        <SectionHeading
          eyebrow="Our process"
          title={content.home_process_heading}
          subtitle="The same six steps on every project, so you always know where things stand."
        />
        <ol className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {PROCESS.map((step) => (
            <li key={step.num} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <span className="text-2xl font-black text-slate-300">{step.num}</span>
              <h3 className="mt-3 font-bold text-slate-900">{step.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-600">{step.desc}</p>
            </li>
          ))}
        </ol>
      </Section>

      {/* Stack */}
      <Section>
        <SectionHeading
          eyebrow="Technology"
          title={content.home_stack_heading}
          subtitle={content.home_stack_subtitle}
        />
        <ul className="flex flex-wrap justify-center gap-2">
          {STACK.map((tech) => (
            <li
              key={tech}
              className="rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700"
            >
              {tech}
            </li>
          ))}
        </ul>
      </Section>

      {/* CTA */}
      <section className="relative overflow-hidden bg-slate-950 py-16 lg:py-24">
        <div className="absolute inset-0 dot-grid-dark opacity-10" />
        <div className="absolute -top-32 left-1/4 h-100 w-100 rounded-full bg-red-600/15 blur-3xl" aria-hidden="true" />
        <div className="relative mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
          <Eyebrow tone="dark">{content.home_cta_badge}</Eyebrow>
          <h2 className="mt-6 text-3xl font-extrabold text-white text-balance sm:text-4xl">
            {content.home_cta_title}
          </h2>
          <p className="mt-5 text-lg text-slate-400">{content.home_cta_subtitle}</p>
          <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row">
            <ButtonLink href="/booking" variant="primary" size="lg">
              Get a Quote
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </ButtonLink>
            <ButtonLink href="/contact" variant="ghostDark" size="lg">
              Contact us
            </ButtonLink>
          </div>
          <a
            href={SITE.githubProfile}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-8 inline-flex items-center gap-2 text-sm text-slate-400 transition-colors hover:text-white"
          >
            <GithubIcon />
            Explore our work on GitHub
          </a>
        </div>
      </section>
    </SiteShell>
  );
}
