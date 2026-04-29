'use client';

import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';
import NextImage from 'next/image';
import {
  LayoutDashboard, CalendarDays, Wrench, Image, MessageSquare,
  FileText, Settings, LogOut, Inbox,
} from 'lucide-react';

const nav = [
  { href: '/admin',              Icon: LayoutDashboard, label: 'Dashboard',    exact: true },
  { href: '/admin/bookings',     Icon: CalendarDays,    label: 'Bookings' },
  { href: '/admin/services',     Icon: Wrench,          label: 'Services' },
  { href: '/admin/portfolio',    Icon: Image,           label: 'Portfolio' },
  { href: '/admin/testimonials', Icon: MessageSquare,   label: 'Testimonials' },
  { href: '/admin/contacts',     Icon: Inbox,           label: 'Messages' },
  { href: '/admin/content',      Icon: FileText,        label: 'Content' },
  { href: '/admin/settings',     Icon: Settings,        label: 'Settings' },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const router   = useRouter();
  const pathname = usePathname();
  const [ready, setReady] = useState(false);

  useEffect(() => {
    void (async () => {
      if (!localStorage.getItem('token')) router.replace('/auth');
      else setReady(true);
    })();
  }, [router]);

  function logout() {
    localStorage.removeItem('token');
    router.push('/auth');
  }

  if (!ready) return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center">
      <div className="w-6 h-6 border-2 border-red-500 border-t-transparent rounded-full animate-spin" />
    </div>
  );

  return (
    <div className="min-h-screen bg-slate-950 flex">
      {/* Sidebar */}
      <aside className="w-56 bg-slate-900 border-r border-white/6 flex flex-col shrink-0 fixed inset-y-0 left-0 z-30">
        <div className="p-4 border-b border-white/6 flex flex-col items-center">
          <Link href="/" className="flex items-center py-2">
            <NextImage src="/logopng.png" alt="Creative Tech Solution BD" width={485} height={130} className="h-12 w-auto" />
          </Link>
          <div className="mt-2 text-[9px] font-semibold uppercase tracking-widest text-red-400/70">Admin Panel</div>
        </div>

        <nav className="flex-1 p-2 flex flex-col gap-0.5 overflow-y-auto">
          {nav.map(({ href, Icon, label, exact }) => {
            const active = exact ? pathname === href : pathname.startsWith(href);
            return (
              <Link key={href} href={href}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-150 ${
                  active ? 'bg-red-500/15 text-red-400 border border-red-500/20' : 'text-slate-400 hover:text-white hover:bg-white/5 border border-transparent'
                }`}>
                <Icon className="w-4 h-4 shrink-0" />
                {label}
              </Link>
            );
          })}
        </nav>

        <div className="p-2 border-t border-white/6">
          <button type="button" onClick={logout}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-slate-400 hover:text-red-400 hover:bg-red-500/10 transition-all duration-150">
            <LogOut className="w-4 h-4 shrink-0" />
            Sign Out
          </button>
        </div>
      </aside>

      {/* Main */}
      <main className="flex-1 ml-56 overflow-auto min-h-screen">
        {children}
      </main>
    </div>
  );
}
