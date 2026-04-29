import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';

export default function Navbar() {
  return (
    <nav className="sticky top-0 z-50 bg-white border-b border-slate-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14 gap-2">
          <Link href="/" className="flex-shrink-0 flex items-center gap-2">
            <span className="w-8 h-8 bg-linear-to-br from-red-600 to-red-700 rounded-lg flex items-center justify-center text-white font-black text-sm shadow-md shadow-red-600/20">C</span>
            <span className="font-extrabold text-slate-900 text-base">Creative<span className="text-red-600">Tech</span></span>
          </Link>

          <div className="hidden xl:flex items-center gap-0.5 flex-1 justify-center">
            {[
              { href: '/', label: 'Home' },
              { href: '/services', label: 'Services' },
              { href: '/portfolio', label: 'Portfolio' },
              { href: '/about', label: 'About' },
              { href: '/contact', label: 'Contact' },
            ].map((item) => (
              <Link key={item.href} href={item.href} className="relative px-2.5 py-1.5 rounded-lg text-[12.5px] font-semibold transition-all duration-200 whitespace-nowrap text-slate-600 hover:text-slate-900 hover:bg-slate-100/80">
                {item.label}
              </Link>
            ))}
          </div>

          <div className="hidden xl:flex items-center gap-1.5 flex-shrink-0">
            <Link href="/auth" className="w-8 h-8 flex items-center justify-center rounded-lg border border-slate-200 text-slate-500 hover:border-red-300 hover:text-red-600 transition-all duration-200" title="Sign In">
              <ArrowUpRight className="w-4 h-4" />
            </Link>
            <Link href="/booking" className="flex items-center gap-1.5 px-4 py-1.5 rounded-lg text-[12.5px] font-bold bg-linear-to-r from-red-600 to-red-700 text-white hover:from-red-500 hover:to-red-600 shadow-md shadow-red-600/20 hover:shadow-red-600/35 transition-all duration-200 active:scale-95">
              Get Started
            </Link>
          </div>

          <Link href="/booking" className="xl:hidden flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold bg-linear-to-r from-red-600 to-red-700 text-white shadow-md shadow-red-600/20 transition-all duration-200">
            Get Started
          </Link>
        </div>
      </div>
    </nav>
  );
}
