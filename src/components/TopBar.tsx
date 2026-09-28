import { Phone, Mail, Clock } from 'lucide-react';
import type { SiteContent } from '@/lib/content-defaults';

export default function TopBar({ content }: { content: SiteContent }) {
  return (
    <div className="bg-slate-950 border-b border-white/6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-9 items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <a
              href={`tel:${content.contact_phone_primary}`}
              className="flex items-center gap-1.5 text-[11px] text-slate-300 transition-colors duration-200 hover:text-white"
            >
              <Phone className="h-3 w-3 text-red-400" aria-hidden="true" />
              <span className="hidden sm:inline">{content.contact_phone_primary}</span>
              <span className="sm:hidden">Call us</span>
            </a>
            <span className="hidden md:block h-3 w-px bg-white/20" />
            <a
              href={`mailto:${content.contact_email}`}
              className="hidden items-center gap-1.5 text-[11px] text-slate-300 transition-colors duration-200 hover:text-white md:flex"
            >
              <Mail className="h-3 w-3 text-blue-400" aria-hidden="true" />
              {content.contact_email}
            </a>
          </div>
          <div className="hidden items-center gap-1.5 text-[11px] text-slate-400 lg:flex">
            <Clock className="h-3 w-3 text-slate-500" aria-hidden="true" />
            <span>{content.contact_hours}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
