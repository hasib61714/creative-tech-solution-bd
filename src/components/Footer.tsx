import Link from 'next/link';
import { Phone, Mail, MapPin } from 'lucide-react';

function IconFacebook() {
  return (
    <svg viewBox="0 0 24 24" className="w-3.5 h-3.5" fill="currentColor" aria-hidden="true">
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  );
}
function IconLinkedin() {
  return (
    <svg viewBox="0 0 24 24" className="w-3.5 h-3.5" fill="currentColor" aria-hidden="true">
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect x="2" y="9" width="4" height="12" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  );
}
function IconYoutube() {
  return (
    <svg viewBox="0 0 24 24" className="w-3.5 h-3.5" fill="currentColor" aria-hidden="true">
      <path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46a2.78 2.78 0 0 0-1.95 1.96A29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58A2.78 2.78 0 0 0 3.41 19.6C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.95-1.95A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z" />
      <polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" fill="white" />
    </svg>
  );
}

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          <div className="md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <span className="w-8 h-8 bg-linear-to-br from-red-600 to-red-700 rounded-lg flex items-center justify-center text-white font-black text-sm">C</span>
              <span className="font-extrabold text-white text-base">Creative<span className="text-red-400">Tech</span></span>
            </div>
            <p className="text-sm text-slate-400 leading-relaxed mb-5">
              Grow your business with smart digital solutions. Serving businesses across Bangladesh since 2020.
            </p>
            <div className="flex gap-2">
              <a href="#" title="Facebook" className="w-8 h-8 bg-white/5 border border-white/10 rounded-lg flex items-center justify-center text-slate-400 hover:border-red-500/40 hover:text-red-400 transition-all duration-200">
                <IconFacebook />
              </a>
              <a href="#" title="LinkedIn" className="w-8 h-8 bg-white/5 border border-white/10 rounded-lg flex items-center justify-center text-slate-400 hover:border-red-500/40 hover:text-red-400 transition-all duration-200">
                <IconLinkedin />
              </a>
              <a href="#" title="YouTube" className="w-8 h-8 bg-white/5 border border-white/10 rounded-lg flex items-center justify-center text-slate-400 hover:border-red-500/40 hover:text-red-400 transition-all duration-200">
                <IconYoutube />
              </a>
            </div>
          </div>

          <div>
            <div className="text-xs font-semibold uppercase tracking-widest text-red-400 mb-4">Services</div>
            <div className="flex flex-col gap-2.5 text-sm text-slate-400">
              {['Web Development', 'Digital Marketing', 'SEO', 'AI Solutions', 'UI/UX Design', '24/7 Support'].map((s) => (
                <Link key={s} href="/services" className="hover:text-white transition-colors duration-200">{s}</Link>
              ))}
            </div>
          </div>

          <div>
            <div className="text-xs font-semibold uppercase tracking-widest text-red-400 mb-4">Company</div>
            <div className="flex flex-col gap-2.5 text-sm text-slate-400">
              {[
                { label: 'About Us', href: '/about' },
                { label: 'Portfolio', href: '/portfolio' },
                { label: 'Contact', href: '/contact' },
                { label: 'Book a Call', href: '/booking' },
                { label: 'Sign In', href: '/auth' },
              ].map((item) => (
                <Link key={item.label} href={item.href} className="hover:text-white transition-colors duration-200">{item.label}</Link>
              ))}
            </div>
          </div>

          <div>
            <div className="text-xs font-semibold uppercase tracking-widest text-red-400 mb-4">Contact</div>
            <div className="flex flex-col gap-3 text-sm text-slate-400">
              <span className="flex items-center gap-2"><Phone className="w-3.5 h-3.5 text-red-400 shrink-0" /> +880 1700-000000</span>
              <span className="flex items-center gap-2"><Mail className="w-3.5 h-3.5 text-red-400 shrink-0" /> info@creativetechbd.com</span>
              <span className="flex items-center gap-2"><MapPin className="w-3.5 h-3.5 text-red-400 shrink-0" /> Dhaka, Bangladesh</span>
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-white/6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex flex-col sm:flex-row justify-between items-center gap-2">
          <span className="text-xs text-slate-500">&copy; {new Date().getFullYear()} CreativeTechSolutionBD. All rights reserved.</span>
          <span className="text-xs text-slate-500">Built with ❤️ in Bangladesh</span>
        </div>
      </div>
    </footer>
  );
}
