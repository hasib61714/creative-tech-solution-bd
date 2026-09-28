import type { Metadata } from 'next';
import SiteShell from '@/components/SiteShell';
import { PageHero, Section } from '@/components/ui';
import { getSiteContent } from '@/lib/content';

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description:
    'What information Creative Tech Solution BD collects through this website, why it is collected, and how to have it removed.',
  alternates: { canonical: '/privacy' },
};

export const revalidate = 86400;

export default async function PrivacyPage() {
  const content = await getSiteContent();

  return (
    <SiteShell>
      <PageHero
        eyebrow="Legal"
        title="Privacy Policy"
        subtitle="What this website collects, why, and how to have it removed."
      />
      <Section>
        <div className="prose-slate mx-auto flex max-w-3xl flex-col gap-8 text-slate-700">
          <p className="text-sm text-slate-500">Last updated: {new Date().getFullYear()}</p>

          <section>
            <h2 className="text-xl font-bold text-slate-900">What we collect</h2>
            <p className="mt-3 leading-relaxed">
              We only collect what you type into a form on this site. The contact form records your
              name, email address, an optional phone number, an optional subject and your message.
              The quote request form records your name, email address, phone number, the service you
              selected, an optional budget range, an optional preferred date and time, and any
              project details you add.
            </p>
            <p className="mt-3 leading-relaxed">
              We do not run advertising trackers, and we do not sell or share your details with
              anyone.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-900">Why we collect it</h2>
            <p className="mt-3 leading-relaxed">
              Solely to reply to your enquiry and, if you go ahead, to deliver the work. Submissions
              are stored in our own database and may be forwarded to our own email address so we see
              them promptly.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-900">Cookies</h2>
            <p className="mt-3 leading-relaxed">
              The public site sets no tracking or advertising cookies. A single session cookie is
              set only when an administrator signs in to the admin panel, and it exists purely to
              keep that person signed in.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-900">How long we keep it</h2>
            <p className="mt-3 leading-relaxed">
              Enquiries are kept while they are useful for the conversation or the project. You can
              ask us to delete yours at any time and we will do so.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-900">Third-party services</h2>
            <p className="mt-3 leading-relaxed">
              This site is hosted by a third-party hosting provider, which processes requests and
              may keep standard server logs. If email notifications are enabled, an email provider
              handles the delivery of those notifications.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-900">Contact</h2>
            <p className="mt-3 leading-relaxed">
              To ask what we hold about you, or to have it deleted, email{' '}
              <a href={`mailto:${content.contact_email}`} className="font-semibold text-red-700 hover:text-red-600">
                {content.contact_email}
              </a>{' '}
              or call {content.contact_phone_primary}.
            </p>
          </section>
        </div>
      </Section>
    </SiteShell>
  );
}
