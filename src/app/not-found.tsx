import Link from 'next/link';
import SiteShell from '@/components/SiteShell';
import { Section, ButtonLink } from '@/components/ui';

export default function NotFound() {
  return (
    <SiteShell>
      <Section>
        <div className="mx-auto flex max-w-xl flex-col items-center gap-6 py-16 text-center">
          <span className="text-6xl font-black text-slate-200">404</span>
          <h1 className="text-3xl font-bold text-slate-900">This page does not exist</h1>
          <p className="text-slate-600">
            The link may be out of date, or the page may have moved. These are the places worth
            trying instead.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <ButtonLink href="/" variant="primary" size="md">
              Back to home
            </ButtonLink>
            <ButtonLink href="/portfolio" variant="outline" size="md">
              See our work
            </ButtonLink>
            <ButtonLink href="/contact" variant="outline" size="md">
              Contact us
            </ButtonLink>
          </div>
          <p className="text-sm text-slate-500">
            Looking for a service?{' '}
            <Link href="/services" className="font-semibold text-red-700 hover:text-red-600">
              Browse all services
            </Link>
            .
          </p>
        </div>
      </Section>
    </SiteShell>
  );
}
