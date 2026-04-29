import Link from 'next/link';
import Image from 'next/image';

export default function Navbar() {
  return (
    <nav className="sticky top-0 z-50 bg-white border-b border-slate-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-6">

          {/* Logo */}
          <Link href="/" className="flex items-center h-full py-2">
            <Image
              src="/logopng.png"
              alt="Creative Tech Solution BD"
              width={485}
              height={130}
              className="h-12 w-auto"
              priority
            />
          </Link>

          {/* Nav Links */}
          <div className="hidden xl:flex items-center gap-1 flex-1 justify-center">
            {[
              { href: '/',          label: 'Home' },
              { href: '/services',  label: 'Services' },
              { href: '/portfolio', label: 'Portfolio' },
              { href: '/about',     label: 'About' },
              { href: '/contact',   label: 'Contact' },
            ].map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="px-4 py-2 rounded-lg text-sm font-semibold text-slate-600 hover:text-red-600 hover:bg-red-50 transition-all duration-200 whitespace-nowrap"
              >
                {item.label}
              </Link>
            ))}
          </div>

          {/* CTA Button */}
          <div className="hidden xl:flex items-center gap-2 shrink-0">
            <Link
              href="/booking"
              className="px-5 py-2 rounded-lg text-sm font-bold bg-linear-to-r from-red-600 to-blue-700 text-white hover:from-red-500 hover:to-blue-600 shadow-md shadow-red-600/20 transition-all duration-200 active:scale-95"
            >
              Get Started
            </Link>
          </div>

          {/* Mobile CTA */}
          <Link
            href="/booking"
            className="xl:hidden px-4 py-2 rounded-lg text-sm font-bold bg-linear-to-r from-red-600 to-blue-700 text-white shadow-md shadow-red-600/20 transition-all duration-200"
          >
            Get Started
          </Link>

        </div>
      </div>
    </nav>
  );
}
