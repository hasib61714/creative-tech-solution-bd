import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { CheckCircle2, ChevronRight, CalendarDays, MessageSquare } from 'lucide-react';
import SiteShell from '@/components/SiteShell';
import { Section, TechBadge, ButtonLink } from '@/components/ui';
import { getSiteContent } from '@/lib/content';
import { getService, SERVICE_SLUGS } from '@/lib/services';
import { breadcrumbJsonLd, JsonLd } from '@/lib/structured-data';

type Params = { params: Promise<{ serviceId: string }> };

export const revalidate = 300;

export function generateStaticParams() {
  return SERVICE_SLUGS.map((serviceId) => ({ serviceId }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { serviceId } = await params;
  const service = await getService(serviceId);
  if (!service) return { title: 'Service not found' };
  return {
    title: service.title,
    description: service.summary,
    alternates: { canonical: `/services/${service.id}` },
    openGraph: { url: `/services/${service.id}`, title: service.title, description: service.summary },
  };
}

const PROCESS_STEPS = [
  'Discovery — we work through what you need and what success looks like',
  'Written scope and fixed quote, agreed before any work starts',
  'Design and build, with progress you can see as it happens',
  'Testing, launch, and an agreed support arrangement afterwards',
];

const FAQS = [
  {
    q: 'How long does a project take?',
    a: 'It depends entirely on scope. A landing page is usually days; a web application is weeks. You get a timeline in writing with the quote, before anything is committed.',
  },
  {
    q: 'What happens after launch?',
    a: 'Fixes to anything that was in the agreed scope are covered. Ongoing maintenance — updates, monitoring, new features — runs on a separate arrangement that is agreed up front.',
  },
  {
    q: 'Do I own the code?',
    a: 'Yes. On completion and final payment the code and the accounts it runs on are yours, and you are free to take them to another developer.',
  },
  {
    q: 'How do payments work?',
    a: 'Normally split across milestones rather than all up front, so payment follows delivery. The exact split is part of the written quote.',
  },
];

export default async function ServiceDetailPage({ params }: Params) {
  const { serviceId } = await params;
  const [content, service] = await Promise.all([getSiteContent(), getService(serviceId)]);
  if (!service) notFound();

  return (
    <SiteShell>
      <Section>
        <nav aria-label="Breadcrumb" className="mb-8">
          <ol className="flex items-center gap-2 text-sm text-slate-500">
            <li>
              <Link href="/services" className="transition-colors hover:text-red-700">
                Services
              </Link>
            </li>
            <li aria-hidden="true">
              <ChevronRight className="h-3.5 w-3.5 text-slate-300" />
            </li>
            <li className="font-medium text-slate-900" aria-current="page">
              {service.title}
            </li>
          </ol>
        </nav>

        <div className="grid grid-cols-1 gap-10 lg:grid-cols-3">
          <div className="flex flex-col gap-10 lg:col-span-2">
            <header>
              <span className="inline-flex items-center rounded-full bg-red-50 px-3 py-1 text-[11px] font-semibold uppercase tracking-widest text-red-700">
                {service.category}
              </span>
              <h1 className="mt-4 text-3xl font-extrabold tracking-tight text-slate-900 text-balance sm:text-4xl">
                {service.title}
              </h1>
              <p className="mt-5 text-base leading-relaxed text-slate-700">{service.description}</p>
              <p className="mt-4 rounded-xl border border-slate-200 bg-slate-50 p-4 text-sm text-slate-700">
                <span className="font-semibold">Who it is for: </span>
                {service.audience}
              </p>
            </header>

            <section>
              <h2 className="text-xl font-bold text-slate-900">What is included</h2>
              <ul className="mt-5 flex flex-col gap-3">
                {service.benefits.map((benefit) => (
                  <li key={benefit} className="flex items-start gap-3 text-sm text-slate-700">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-green-600" aria-hidden="true" />
                    {benefit}
                  </li>
                ))}
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-bold text-slate-900">Technologies</h2>
              <ul className="mt-4 flex flex-wrap gap-1.5">
                {service.technologies.map((tech) => (
                  <li key={tech}>
                    <TechBadge>{tech}</TechBadge>
                  </li>
                ))}
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-bold text-slate-900">{content.service_detail_process_heading}</h2>
              <ol className="mt-5 flex flex-col gap-3">
                {PROCESS_STEPS.map((step, index) => (
                  <li
                    key={step}
                    className="flex items-start gap-4 rounded-2xl border border-slate-200 bg-slate-50 p-4"
                  >
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-slate-900 text-sm font-bold text-white">
                      {index + 1}
                    </span>
                    <span className="pt-1 text-sm text-slate-700">{step}</span>
                  </li>
                ))}
              </ol>
            </section>

            <section>
              <h2 className="text-xl font-bold text-slate-900">{content.service_detail_pricing_heading}</h2>
              <p className="mt-2 text-sm text-slate-500">
                Starting points, not fixed prices — the quote follows the scope.
              </p>
              <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-3">
                {service.packages.map((pkg) => (
                  <div
                    key={pkg.name}
                    className={`flex flex-col gap-3 rounded-2xl p-5 ${
                      pkg.highlight ? 'border-2 border-red-500 bg-white' : 'border border-slate-200 bg-white'
                    }`}
                  >
                    {pkg.highlight && (
                      <span className="w-fit rounded-full bg-red-50 px-2 py-0.5 text-[10px] font-semibold text-red-700">
                        Most requested
                      </span>
                    )}
                    <div className="text-sm font-semibold text-slate-900">{pkg.name}</div>
                    <div className="text-xl font-extrabold text-slate-900">{pkg.price}</div>
                    <ul className="flex flex-col gap-1.5">
                      {pkg.features.map((feature) => (
                        <li key={feature} className="flex items-start gap-2 text-xs text-slate-600">
                          <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-red-500" aria-hidden="true" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </section>

            <section>
              <h2 className="text-xl font-bold text-slate-900">{content.service_detail_faq_heading}</h2>
              <div className="mt-5 flex flex-col gap-2">
                {FAQS.map((faq) => (
                  <details key={faq.q} className="group rounded-2xl border border-slate-200 bg-slate-50">
                    <summary className="flex cursor-pointer list-none items-center justify-between px-5 py-4 text-sm font-semibold text-slate-900">
                      {faq.q}
                      <ChevronRight
                        className="h-4 w-4 text-red-600 transition-transform group-open:rotate-90"
                        aria-hidden="true"
                      />
                    </summary>
                    <p className="px-5 pb-4 text-sm leading-relaxed text-slate-600">{faq.a}</p>
                  </details>
                ))}
              </div>
            </section>
          </div>

          <aside className="lg:col-span-1">
            <div className="sticky top-24 rounded-2xl border border-slate-200 bg-slate-50 p-7">
              <span className="inline-flex items-center rounded-full bg-red-50 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-widest text-red-700">
                Free consultation
              </span>
              <h2 className="mt-4 text-lg font-bold text-slate-900">{content.service_detail_sidebar_title}</h2>
              <p className="mt-2 text-sm leading-relaxed text-slate-600">
                {content.service_detail_sidebar_subtitle}
              </p>
              <div className="mt-6 flex flex-col gap-3">
                <ButtonLink href="/booking" variant="primary" size="md" className="w-full">
                  <CalendarDays className="h-4 w-4" aria-hidden="true" />
                  Request a quote
                </ButtonLink>
                <ButtonLink href="/contact" variant="outline" size="md" className="w-full">
                  <MessageSquare className="h-4 w-4" aria-hidden="true" />
                  Ask a question
                </ButtonLink>
              </div>
            </div>
          </aside>
        </div>
      </Section>

      <JsonLd
        data={breadcrumbJsonLd([
          { name: 'Home', path: '/' },
          { name: 'Services', path: '/services' },
          { name: service.title, path: `/services/${service.id}` },
        ])}
      />
    </SiteShell>
  );
}
