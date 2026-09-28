import type { Metadata } from 'next';
import SiteShell from '@/components/SiteShell';
import { PageHero, Section } from '@/components/ui';
import { getSiteContent } from '@/lib/content';

export const metadata: Metadata = {
  title: 'Terms of Service',
  description:
    'The terms that apply to using this website and to engaging Creative Tech Solution BD for development work.',
  alternates: { canonical: '/terms' },
};

export const revalidate = 86400;

export default async function TermsPage() {
  const content = await getSiteContent();

  return (
    <SiteShell>
      <PageHero
        eyebrow="Legal"
        title="Terms of Service"
        subtitle="The terms that apply to this website and to work we take on."
      />
      <Section>
        <div className="mx-auto flex max-w-3xl flex-col gap-8 text-slate-700">
          <p className="text-sm text-slate-500">Last updated: {new Date().getFullYear()}</p>

          <section>
            <h2 className="text-xl font-bold text-slate-900">Using this website</h2>
            <p className="mt-3 leading-relaxed">
              The content here is provided for information. We keep it accurate, but nothing on this
              site is a contractual offer on its own — a project is only agreed once both sides have
              accepted a written quote.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-900">Quotes and pricing</h2>
            <p className="mt-3 leading-relaxed">
              Any prices shown are indicative starting points, not fixed prices. Every project is
              quoted individually once the scope is understood. The written quote is what applies,
              and it sets out the deliverable, the timeline and the payment schedule.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-900">Scope and changes</h2>
            <p className="mt-3 leading-relaxed">
              Work is delivered against the agreed written scope. Additions outside that scope are
              quoted separately before they are started, so the price never changes without your
              agreement.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-900">Ownership</h2>
            <p className="mt-3 leading-relaxed">
              On completion and final payment, the code written for your project and the accounts it
              runs on are yours. Third-party libraries and services used in a project remain under
              their own licences and terms.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-900">Cancellation</h2>
            <p className="mt-3 leading-relaxed">
              Either side may end a project in writing. Work already completed at that point is
              payable; work not yet started is not. Anything already delivered and paid for is
              handed over.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-900">Liability</h2>
            <p className="mt-3 leading-relaxed">
              We build and test carefully, but no software is guaranteed free of defects. Our
              liability for any project is limited to the amount paid for that project. Defects in
              the agreed scope are fixed at no additional cost.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-900">Questions</h2>
            <p className="mt-3 leading-relaxed">
              Email{' '}
              <a href={`mailto:${content.contact_email}`} className="font-semibold text-red-700 hover:text-red-600">
                {content.contact_email}
              </a>{' '}
              with anything that is unclear before you commit to a project.
            </p>
          </section>
        </div>
      </Section>
    </SiteShell>
  );
}
