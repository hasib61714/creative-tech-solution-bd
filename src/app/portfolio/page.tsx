import type { Metadata } from 'next';
import { GithubIcon } from '@/components/icons';
import SiteShell from '@/components/SiteShell';
import PortfolioGrid from '@/components/PortfolioGrid';
import { PageHero, Section, ButtonLink } from '@/components/ui';
import { getSiteContent, highlightText } from '@/lib/content';
import { getProjects } from '@/lib/portfolio';
import { SITE } from '@/lib/site';
import { breadcrumbJsonLd, JsonLd } from '@/lib/structured-data';

export const metadata: Metadata = {
  title: 'Portfolio',
  description:
    'Real projects built by Creative Tech Solution BD — web platforms, business systems and machine-learning tools, with public source where the repository is open.',
  alternates: { canonical: '/portfolio' },
  openGraph: { url: '/portfolio', title: 'Portfolio | Creative Tech Solution BD' },
};

export const revalidate = 300;

export default async function PortfolioPage() {
  const [content, projects] = await Promise.all([getSiteContent(), getProjects()]);
  const title = highlightText(content.portfolio_title, content.portfolio_highlight);

  return (
    <SiteShell>
      <PageHero
        eyebrow={content.portfolio_badge}
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
        subtitle={content.portfolio_subtitle}
      />

      <Section>
        <PortfolioGrid projects={projects} />
      </Section>

      <Section tone="muted">
        <div className="mx-auto flex max-w-2xl flex-col items-center gap-5 text-center">
          <GithubIcon className="h-8 w-8 text-slate-700" />
          <h2 className="text-2xl font-bold text-slate-900 sm:text-3xl">Explore our work on GitHub</h2>
          <p className="text-slate-600">
            The repositories behind these projects are public where they can be. Read the code before
            you decide whether to hire us — that is the point of publishing it.
          </p>
          <ButtonLink href={SITE.githubProfile} variant="outline" size="md" target="_blank" rel="noopener noreferrer">
            <GithubIcon />
            github.com/hasib61714
          </ButtonLink>
        </div>
      </Section>

      <JsonLd
        data={breadcrumbJsonLd([
          { name: 'Home', path: '/' },
          { name: 'Portfolio', path: '/portfolio' },
        ])}
      />
    </SiteShell>
  );
}
