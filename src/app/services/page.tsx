import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import SiteShell from '@/components/SiteShell';
import { PageHero, Section, TechBadge } from '@/components/ui';
import { getSiteContent } from '@/lib/content';
import { getServices } from '@/lib/services';
import { breadcrumbJsonLd, JsonLd } from '@/lib/structured-data';

export const metadata: Metadata = {
  title: 'Services',
  description:
    'Web development, custom software, e-commerce, AI and automation, UI/UX design, SEO and ongoing maintenance from Creative Tech Solution BD.',
  alternates: { canonical: '/services' },
  openGraph: { url: '/services', title: 'Services | Creative Tech Solution BD' },
};

export const revalidate = 300;

export default async function ServicesPage() {
  const [content, services] = await Promise.all([getSiteContent(), getServices()]);

  return (
    <SiteShell>
      <PageHero
        eyebrow={content.services_badge}
        title={content.services_title}
        subtitle={content.services_subtitle}
      />

      <Section>
        <ul className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {services.map((service) => (
            <li key={service.id}>
              <article className="flex h-full flex-col rounded-2xl border border-slate-200 bg-white p-7 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-slate-300 hover:shadow-lg">
                <div className="flex flex-wrap items-center gap-2">
                  <h2 className="text-lg font-bold text-slate-900">
                    <Link href={`/services/${service.id}`} className="transition-colors hover:text-red-700">
                      {service.title}
                    </Link>
                  </h2>
                  {service.tag && (
                    <span className="rounded-full bg-red-50 px-2 py-0.5 text-[11px] font-semibold text-red-700">
                      {service.tag}
                    </span>
                  )}
                </div>

                <p className="mt-3 text-sm leading-relaxed text-slate-600">{service.summary}</p>

                <p className="mt-4 text-sm text-slate-500">
                  <span className="font-semibold text-slate-700">Who it is for: </span>
                  {service.audience}
                </p>

                <ul className="mt-5 flex flex-col gap-2">
                  {service.benefits.slice(0, 4).map((benefit) => (
                    <li key={benefit} className="flex items-start gap-2 text-sm text-slate-600">
                      <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-red-500" aria-hidden="true" />
                      {benefit}
                    </li>
                  ))}
                </ul>

                <ul className="mt-5 flex flex-wrap gap-1.5">
                  {service.technologies.slice(0, 5).map((tech) => (
                    <li key={tech}>
                      <TechBadge>{tech}</TechBadge>
                    </li>
                  ))}
                </ul>

                <div className="mt-auto flex flex-wrap items-center justify-between gap-3 border-t border-slate-100 pt-5">
                  <span className="text-sm text-slate-500">
                    Indicative from <span className="font-semibold text-slate-900">{service.from}</span>
                  </span>
                  <Link
                    href={`/services/${service.id}`}
                    className="inline-flex items-center gap-1.5 text-sm font-semibold text-red-700 transition-colors hover:text-red-600"
                  >
                    Learn more
                    <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
                  </Link>
                </div>
              </article>
            </li>
          ))}
        </ul>

        <p className="mt-10 text-center text-sm text-slate-500">
          Prices are indicative starting points. Every project is quoted individually after we
          understand the scope.
        </p>
      </Section>

      <JsonLd
        data={breadcrumbJsonLd([
          { name: 'Home', path: '/' },
          { name: 'Services', path: '/services' },
        ])}
      />
    </SiteShell>
  );
}
