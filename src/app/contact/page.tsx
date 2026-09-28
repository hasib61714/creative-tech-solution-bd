import type { Metadata } from 'next';
import { Phone, Mail, MapPin, Clock, MessageCircle } from 'lucide-react';
import SiteShell from '@/components/SiteShell';
import ContactForm from '@/components/ContactForm';
import { PageHero, Section } from '@/components/ui';
import { getSiteContent, highlightText } from '@/lib/content';
import { breadcrumbJsonLd, JsonLd } from '@/lib/structured-data';

export const metadata: Metadata = {
  title: 'Contact',
  description:
    'Contact Creative Tech Solution BD by phone, email or WhatsApp, or send a message describing your project and we will reply with a scope and a price.',
  alternates: { canonical: '/contact' },
  openGraph: { url: '/contact', title: 'Contact | Creative Tech Solution BD' },
};

export const revalidate = 3600;

export default async function ContactPage() {
  const content = await getSiteContent();
  const title = highlightText(content.contact_title, content.contact_highlight);

  const details = [
    {
      icon: Phone,
      label: 'Phone',
      value: `${content.contact_phone_primary} / ${content.contact_phone_secondary}`,
      href: `tel:${content.contact_phone_primary}`,
    },
    { icon: Mail, label: 'Email', value: content.contact_email, href: `mailto:${content.contact_email}` },
    { icon: MapPin, label: 'Address', value: content.contact_address },
    { icon: Clock, label: 'Hours', value: content.contact_hours },
  ];

  return (
    <SiteShell>
      <PageHero
        eyebrow={content.contact_badge}
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
        subtitle={content.contact_subtitle}
      />

      <Section>
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          <div className="flex flex-col gap-4">
            <ul className="flex flex-col gap-4">
              {details.map((item) => {
                const body = (
                  <>
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-slate-100 text-red-600">
                      <item.icon className="h-4.5 w-4.5" aria-hidden="true" />
                    </span>
                    <span>
                      <span className="block text-[11px] font-semibold uppercase tracking-widest text-slate-500">
                        {item.label}
                      </span>
                      <span className="mt-1 block text-sm font-medium text-slate-800">{item.value}</span>
                    </span>
                  </>
                );
                return (
                  <li key={item.label}>
                    {item.href ? (
                      <a
                        href={item.href}
                        className="flex items-start gap-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition-colors hover:border-slate-400"
                      >
                        {body}
                      </a>
                    ) : (
                      <div className="flex items-start gap-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                        {body}
                      </div>
                    )}
                  </li>
                );
              })}
            </ul>

            <a
              href={`https://wa.me/${content.whatsapp_number}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 rounded-xl bg-[#25D366] px-4 py-3 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-[#1fad55]"
            >
              <MessageCircle className="h-4 w-4" aria-hidden="true" />
              Chat on WhatsApp
            </a>
          </div>

          <div className="lg:col-span-2">
            <h2 className="sr-only">Send us a message</h2>
            <ContactForm
              successTitle={content.contact_success_title}
              successText={content.contact_success_text}
            />
          </div>
        </div>
      </Section>

      <JsonLd
        data={breadcrumbJsonLd([
          { name: 'Home', path: '/' },
          { name: 'Contact', path: '/contact' },
        ])}
      />
    </SiteShell>
  );
}
