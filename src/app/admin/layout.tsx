'use client';

import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';
import NextImage from 'next/image';
import {
  LayoutDashboard, CalendarDays, Wrench, Image, MessageSquare,
  FileText, Settings, LogOut, Inbox, Users, Send,
} from 'lucide-react';
import type { Permission } from '@/lib/auth';

const nav = [
  { href: '/admin',              Icon: LayoutDashboard, label: 'Dashboard',    exact: true, permission: 'dashboard' },
  { href: '/admin/bookings',     Icon: CalendarDays,    label: 'Bookings',     permission: 'manage_bookings' },
  { href: '/admin/services',     Icon: Wrench,          label: 'Services',     permission: 'manage_services' },
  { href: '/admin/portfolio',    Icon: Image,           label: 'Portfolio',    permission: 'manage_portfolio' },
  { href: '/admin/testimonials', Icon: MessageSquare,   label: 'Testimonials', permission: 'manage_testimonials' },
  { href: '/admin/contacts',     Icon: Inbox,           label: 'Contacts',     permission: 'manage_contacts' },
  { href: '/admin/messages',     Icon: Send,            label: 'Messages',     permission: 'send_messages' },
  { href: '/admin/content',      Icon: FileText,        label: 'Content',      permission: 'manage_content' },
  { href: '/admin/settings',     Icon: Settings,        label: 'Settings',     permission: 'manage_settings' },
  { href: '/admin/users',        Icon: Users,           label: 'Users',        permission: 'manage_users' },
];

type CurrentUser = { role: string; permissions?: Permission[] };

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const router   = useRouter();
  const pathname = usePathname();
  const [ready, setReady] = useState(false);
  const [user, setUser] = useState<CurrentUser | null>(null);

  useEffect(() => {
    void (async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        router.replace('/auth');
        return;
      }
      const res = await fetch('/api/admin/me', {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) {
        localStorage.removeItem('token');
        router.replace('/auth');
        return;
      }
      const data = await res.json();
      setUser(data.user);
      setReady(true);
    })();
  }, [router]);

  async function logout() {
    const token = localStorage.getItem('token');
    if (token) {
      await fetch('/api/auth/logout', {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}` },
      }).catch(() => {});
    }
    localStorage.removeItem('token');
    router.push('/auth');
  }

  if (!ready) return (
    <div className="min-h-screen bg-white flex items-center justify-center">
      <div className="w-6 h-6 border-2 border-red-600 border-t-blue-700 rounded-full animate-spin" />
    </div>
  );

  return (
    <div className="min-h-screen bg-slate-950 flex text-slate-900">
      {/* Sidebar */}
      <aside className="w-60 bg-white border-r border-slate-200 flex flex-col shrink-0 fixed inset-y-0 left-0 z-30 shadow-sm">
        <div className="p-4 border-b border-slate-200 flex flex-col items-center">
          <Link href="/" className="flex items-center py-2">
            <NextImage src="/logopng.png" alt="Creative Tech Solution BD" width={485} height={130} className="h-12 w-auto" />
          </Link>
          <div className="mt-2 text-[9px] font-semibold uppercase tracking-widest text-blue-700">Admin Panel</div>
        </div>

        <nav className="flex-1 p-2 flex flex-col gap-0.5 overflow-y-auto">
          {nav.filter((item) => user?.role === 'admin' || user?.permissions?.includes(item.permission as Permission)).map(({ href, Icon, label, exact }) => {
            const active = exact ? pathname === href : pathname.startsWith(href);
            return (
              <Link key={href} href={href}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-150 ${
                  active ? 'bg-linear-to-r from-red-50 to-blue-50 text-red-600 border border-red-200 shadow-sm' : 'text-slate-600 hover:text-blue-700 hover:bg-blue-50 border border-transparent'
                }`}>
                <Icon className={`w-4 h-4 shrink-0 ${active ? 'text-blue-700' : ''}`} />
                {label}
              </Link>
            );
          })}
        </nav>

        <div className="p-2 border-t border-slate-200">
          <button type="button" onClick={logout}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-slate-600 hover:text-red-600 hover:bg-red-50 transition-all duration-150">
            <LogOut className="w-4 h-4 shrink-0" />
            Sign Out
          </button>
        </div>
      </aside>

      {/* Main */}
      <main className="flex-1 ml-60 overflow-auto min-h-screen bg-[radial-gradient(circle_at_top_right,rgba(37,99,235,0.16),transparent_35%),radial-gradient(circle_at_top_left,rgba(220,38,38,0.16),transparent_30%)]">
        {children}
      </main>
    </div>
  );
}
