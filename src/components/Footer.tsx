import Link from 'next/link';
import Image from 'next/image';
import { Phone, Mail, MapPin } from 'lucide-react';
import { GithubIcon, FacebookIcon, LinkedinIcon, YoutubeIcon } from './icons';
import type { SiteContent } from '@/lib/content-defaults';
import { SITE } from '@/lib/site';

const SERVICE_LINKS = [
  { label: 'Web Development', href: '/services/web-development' },
  { label: 'Custom Software', href: '/services/web-development' },
  { label: 'E-commerce', href: '/services/web-development' },
  { label: 'AI & Automation', href: '/services/ai-solutions' },
  { label: 'UI/UX Design', href: '/services/design' },
  { label: 'SEO', href: '/services/seo' },
];

const COMPANY_LINKS = [
  { label: 'About', href: '/about' },
  { label: 'Portfolio', href: '/portfolio' },
  { label: 'Contact', href: '/contact' },
  { label: 'Get a Quote', href: '/booking' },
  { label: 'Privacy Policy', href: '/privacy' },
  { label: 'Terms of Service', href: '/terms' },
];

/** A placeholder such as '#' is not a social account, so it is not rendered. */
function isRealLink(value: string | undefined) {
  return Boolean(value && /^https?:\/\//i.test(value));
}

export default function Footer({ content }: { content: SiteContent }) {
  const socials = [
    { key: 'facebook', href: content.social_facebook, label: 'Facebook', Icon: FacebookIcon },
    { key: 'linkedin', href: content.social_linkedin, label: 'LinkedIn', Icon: LinkedinIcon },
    { key: 'youtube', href: content.social_youtube, label: 'YouTube', Icon: YoutubeIcon },
  ].filter((item) => isRealLink(item.href));

  return (
    <footer className="bg-slate-950 text-slate-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-4">
          <div className="flex flex-col items-start">
            <Link href="/" className="mb-5" aria-label="Creative Tech Solution BD — home">
              <div className="rounded-xl bg-white px-4 py-2">
                <Image
                  src="/logopng.png"
                  alt="Creative Tech Solution BD"
                  width={485}
                  height={130}
                  className="h-10 w-auto"
                />
              </div>
            </Link>
            <p className="mb-5 text-sm leading-relaxed text-slate-400">{content.brand_tagline}</p>
            <div className="flex gap-2">
              <a
                href={SITE.githubProfile}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub profile"
                className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-slate-400 transition-colors duration-200 hover:border-white/25 hover:text-white"
              >
                <GithubIcon />
              </a>
              {socials.map(({ key, href, label, Icon }) => (
                <a
                  key={key}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-slate-400 transition-colors duration-200 hover:border-blue-500/40 hover:text-blue-400"
                >
                  <Icon />
                </a>
              ))}
            </div>
          </div>

          <nav aria-label="Services">
            <h2 className="mb-5 text-xs font-bold uppercase tracking-widest text-red-400">Services</h2>
            <ul className="flex flex-col gap-3 text-sm text-slate-400">
              {SERVICE_LINKS.map((item) => (
                <li key={item.label}>
                  <Link href={item.href} className="transition-colors duration-200 hover:text-white">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Company">
            <h2 className="mb-5 text-xs font-bold uppercase tracking-widest text-red-400">Company</h2>
            <ul className="flex flex-col gap-3 text-sm text-slate-400">
              {COMPANY_LINKS.map((item) => (
                <li key={item.label}>
                  <Link href={item.href} className="transition-colors duration-200 hover:text-white">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h2 className="mb-5 text-xs font-bold uppercase tracking-widest text-red-400">Contact</h2>
            <ul className="flex flex-col gap-3 text-sm text-slate-400">
              <li>
                <a href={`tel:${content.contact_phone_primary}`} className="flex items-center gap-2 transition-colors duration-200 hover:text-white">
                  <Phone className="h-3.5 w-3.5 shrink-0 text-red-400" aria-hidden="true" />
                  {content.contact_phone_primary}
                </a>
              </li>
              <li>
                <a href={`tel:${content.contact_phone_secondary}`} className="flex items-center gap-2 transition-colors duration-200 hover:text-white">
                  <Phone className="h-3.5 w-3.5 shrink-0 text-red-400" aria-hidden="true" />
                  {content.contact_phone_secondary}
                </a>
              </li>
              <li>
                <a href={`mailto:${content.contact_email}`} className="flex items-start gap-2 break-all transition-colors duration-200 hover:text-white">
                  <Mail className="mt-0.5 h-3.5 w-3.5 shrink-0 text-blue-400" aria-hidden="true" />
                  {content.contact_email}
                </a>
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="mt-0.5 h-3.5 w-3.5 shrink-0 text-red-400" aria-hidden="true" />
                <span>{content.contact_address}</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="border-t border-white/8">
        <div className="max-w-7xl mx-auto flex flex-col items-center justify-between gap-2 px-4 py-4 sm:flex-row sm:px-6 lg:px-8">
          <span className="text-xs text-slate-500">
            &copy; {new Date().getFullYear()} {content.brand_name}. All rights reserved.
          </span>
          <span className="text-xs text-slate-500">Built in Bangladesh</span>
        </div>
      </div>
    </footer>
  );
}
