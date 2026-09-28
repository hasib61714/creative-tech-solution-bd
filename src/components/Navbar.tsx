'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { Menu, X } from 'lucide-react';

const NAV_ITEMS = [
  { href: '/', label: 'Home' },
  { href: '/services', label: 'Services' },
  { href: '/portfolio', label: 'Portfolio' },
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' },
];

export default function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  // Close on Escape, which keyboard users will reach for first.
  useEffect(() => {
    if (!open) return;
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') setOpen(false);
    }
    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [open]);

  function isActive(href: string) {
    return href === '/' ? pathname === '/' : pathname.startsWith(href);
  }

  return (
    <nav aria-label="Main" className="sticky top-0 z-50 border-b border-slate-200 bg-white/95 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between gap-4">
          <Link href="/" className="flex h-full items-center py-2" aria-label="Creative Tech Solution BD — home">
            <Image
              src="/logopng.png"
              alt="Creative Tech Solution BD"
              width={485}
              height={130}
              className="h-10 w-auto sm:h-12"
              priority
            />
          </Link>

          <div className="hidden lg:flex flex-1 items-center justify-center gap-1">
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                aria-current={isActive(item.href) ? 'page' : undefined}
                className={`rounded-lg px-4 py-2 text-sm font-semibold transition-colors duration-200 ${
                  isActive(item.href)
                    ? 'text-red-700 bg-red-50'
                    : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                }`}
              >
                {item.label}
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <Link
              href="/booking"
              className="rounded-lg bg-red-600 px-4 py-2 text-sm font-bold text-white shadow-sm shadow-red-600/20 transition-colors duration-200 hover:bg-red-500 sm:px-5"
            >
              Get a Quote
            </Link>
            <button
              type="button"
              onClick={() => setOpen((value) => !value)}
              aria-expanded={open}
              aria-controls="mobile-nav"
              aria-label={open ? 'Close menu' : 'Open menu'}
              className="lg:hidden rounded-lg border border-slate-200 p-2 text-slate-700 transition-colors hover:bg-slate-100"
            >
              {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </div>

      <div
        id="mobile-nav"
        hidden={!open}
        className="lg:hidden border-t border-slate-200 bg-white"
      >
        <ul className="max-w-7xl mx-auto flex flex-col px-4 py-3 sm:px-6">
          {NAV_ITEMS.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                aria-current={isActive(item.href) ? 'page' : undefined}
                onClick={() => setOpen(false)}
                className={`block rounded-lg px-3 py-3 text-base font-semibold transition-colors ${
                  isActive(item.href) ? 'bg-red-50 text-red-700' : 'text-slate-700 hover:bg-slate-100'
                }`}
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}
