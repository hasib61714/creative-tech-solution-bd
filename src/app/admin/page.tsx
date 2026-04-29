'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import {
  CalendarDays, Wrench, Image, MessageSquare, FileText,
  Settings, Inbox, ChevronRight, TrendingUp,
} from 'lucide-react';

type Stats = {
  bookings:     { total: number; pending: number };
  services:     { active: number };
  portfolio:    { total: number };
  testimonials: { pending: number };
  contacts:     { unread: number };
  recentBookings: { id: number; name: string; service: string; status: string; createdAt: string }[];
};

const STATUS_STYLES: Record<string, string> = {
  pending:   'bg-amber-500/15 text-amber-400',
  confirmed: 'bg-green-500/15 text-green-400',
  cancelled: 'bg-red-500/15 text-red-400',
};

function authHeaders() {
  return { Authorization: `Bearer ${localStorage.getItem('token')}` };
}

export default function AdminPage() {
  const [stats, setStats] = useState<Stats | null>(null);

  useEffect(() => {
    fetch('/api/admin/stats', { headers: authHeaders() })
      .then((r) => r.json())
      .then(setStats)
      .catch(() => {});
  }, []);

  const cards = [
    { href: '/admin/bookings',     Icon: CalendarDays,  label: 'Bookings',     value: stats?.bookings.total,       badge: stats?.bookings.pending ? `${stats.bookings.pending} pending` : null },
    { href: '/admin/services',     Icon: Wrench,        label: 'Services',     value: stats?.services.active,      badge: null },
    { href: '/admin/portfolio',    Icon: Image,         label: 'Portfolio',    value: stats?.portfolio.total,      badge: null },
    { href: '/admin/testimonials', Icon: MessageSquare, label: 'Testimonials', value: stats?.testimonials.pending, badge: stats?.testimonials.pending ? 'need review' : null },
    { href: '/admin/contacts',     Icon: Inbox,         label: 'Messages',     value: stats?.contacts.unread,      badge: stats?.contacts.unread ? 'unread' : null },
    { href: '/admin/content',      Icon: FileText,      label: 'Content',      value: null,                        badge: null },
    { href: '/admin/settings',     Icon: Settings,      label: 'Settings',     value: null,                        badge: null },
  ];

  return (
    <div className="p-8">
      <div className="mb-8">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold tracking-widest uppercase bg-red-500/15 text-red-400 border border-red-500/25 mb-3">
          <span className="w-1.5 h-1.5 rounded-full bg-red-400 animate-pulse" />
          Admin
        </div>
        <h1 className="text-2xl font-extrabold text-white">Dashboard</h1>
        <p className="text-slate-400 mt-1 text-sm">Overview of your website activity.</p>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 mb-8">
        {cards.map(({ href, Icon, label, value, badge }) => (
          <Link key={href} href={href}
            className="group relative flex flex-col bg-linear-to-br from-slate-900 to-slate-800 border border-white/8 rounded-2xl p-4 hover:border-red-500/30 hover:-translate-y-0.5 transition-all duration-200 overflow-hidden">
            <div className="absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-red-500/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="flex items-center justify-between mb-3">
              <div className="w-8 h-8 rounded-lg bg-red-500/15 border border-red-500/20 flex items-center justify-center text-red-400 group-hover:scale-110 transition-transform">
                <Icon className="w-4 h-4" />
              </div>
              <ChevronRight className="w-3.5 h-3.5 text-slate-600 group-hover:text-red-400 transition-colors" />
            </div>
            <div className="text-2xl font-extrabold text-white mb-0.5">
              {value !== null && value !== undefined ? value : <span className="text-slate-600 text-lg">—</span>}
            </div>
            <div className="text-xs text-slate-500 font-medium">{label}</div>
            {badge && (
              <div className="mt-2 text-[9px] font-bold uppercase tracking-wide text-red-400 bg-red-500/10 border border-red-500/20 rounded-full px-2 py-0.5 w-fit">
                {badge}
              </div>
            )}
          </Link>
        ))}
      </div>

      {/* Recent bookings */}
      <div className="relative bg-linear-to-br from-slate-900 to-slate-800 border border-white/8 rounded-2xl overflow-hidden">
        <div className="absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-red-500/40 to-transparent" />
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/6">
          <div className="flex items-center gap-2 text-white font-bold text-sm">
            <TrendingUp className="w-4 h-4 text-red-400" /> Recent Bookings
          </div>
          <Link href="/admin/bookings" className="text-xs text-red-400 hover:text-red-300 transition-colors flex items-center gap-1">
            View all <ChevronRight className="w-3 h-3" />
          </Link>
        </div>
        {!stats ? (
          <div className="flex justify-center py-10"><div className="w-5 h-5 border-2 border-red-500 border-t-transparent rounded-full animate-spin" /></div>
        ) : stats.recentBookings.length === 0 ? (
          <div className="text-center py-10 text-slate-500 text-sm">No bookings yet.</div>
        ) : (
          <table className="w-full text-sm">
            <thead>
              <tr className="text-[10px] uppercase tracking-widest text-slate-600">
                {['Client','Service','Status','Date'].map((h) => (
                  <th key={h} className="px-6 py-3 text-left font-semibold">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {stats.recentBookings.map((b, i) => (
                <tr key={b.id} className={`hover:bg-white/3 transition-colors ${i < stats.recentBookings.length - 1 ? 'border-b border-white/5' : ''}`}>
                  <td className="px-6 py-3 text-white font-medium">{b.name}</td>
                  <td className="px-6 py-3 text-slate-400">{b.service}</td>
                  <td className="px-6 py-3">
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-semibold capitalize ${STATUS_STYLES[b.status] ?? STATUS_STYLES.pending}`}>{b.status}</span>
                  </td>
                  <td className="px-6 py-3 text-slate-500 text-xs">{new Date(b.createdAt).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
