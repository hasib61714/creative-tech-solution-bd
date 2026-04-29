'use client';

import { useEffect, useState } from 'react';
import { Save } from 'lucide-react';

type Fields = {
  hero_headline: string; hero_sub: string;
  stat_projects: string; stat_clients: string; stat_years: string; stat_satisfaction: string;
  cta_headline: string; cta_sub: string;
};

const DEFAULTS: Fields = {
  hero_headline:    'Grow Your Business with Smart Digital Solutions',
  hero_sub:         'We build websites, run marketing campaigns, and automate workflows — so you can focus on running your business.',
  stat_projects:    '150+',
  stat_clients:     '80+',
  stat_years:       '5',
  stat_satisfaction:'98%',
  cta_headline:     'Ready to Grow Your Business?',
  cta_sub:          'Book a free 30-minute strategy call and get a custom plan for your business.',
};

const FIELDS: { key: keyof Fields; label: string; multi?: boolean }[] = [
  { key: 'hero_headline',    label: 'Hero Headline' },
  { key: 'hero_sub',         label: 'Hero Subtext', multi: true },
  { key: 'stat_projects',    label: 'Projects Stat (e.g. 150+)' },
  { key: 'stat_clients',     label: 'Clients Stat (e.g. 80+)' },
  { key: 'stat_years',       label: 'Years Stat (e.g. 5)' },
  { key: 'stat_satisfaction',label: 'Satisfaction Stat (e.g. 98%)' },
  { key: 'cta_headline',     label: 'CTA Headline' },
  { key: 'cta_sub',          label: 'CTA Subtext', multi: true },
];

function authHeaders() {
  return { 'Content-Type': 'application/json', Authorization: `Bearer ${localStorage.getItem('token')}` };
}

export default function ContentPage() {
  const [form, setForm]     = useState<Fields>(DEFAULTS);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving]   = useState(false);
  const [saved, setSaved]     = useState(false);

  useEffect(() => {
    fetch('/api/admin/settings', { headers: authHeaders() })
      .then((r) => r.json())
      .then((data) => {
        setForm((f) => ({ ...f, ...Object.fromEntries(Object.entries(data).filter(([k]) => k in DEFAULTS)) } as Fields));
        setLoading(false);
      });
  }, []);

  async function save() {
    setSaving(true);
    await fetch('/api/admin/settings', { method: 'PUT', headers: authHeaders(), body: JSON.stringify(form) });
    setSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  }

  if (loading) return (
    <div className="flex justify-center py-20"><div className="w-6 h-6 border-2 border-red-500 border-t-transparent rounded-full animate-spin" /></div>
  );

  return (
    <div className="p-8 max-w-2xl">
      <div className="mb-8">
        <h1 className="text-2xl font-extrabold text-white">Homepage Content</h1>
        <p className="text-slate-400 text-sm mt-1">Edit the text that appears on your homepage.</p>
      </div>

      <div className="relative bg-linear-to-br from-slate-900 to-slate-800 border border-white/8 rounded-2xl p-7 flex flex-col gap-5 overflow-hidden">
        <div className="absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-red-500/60 to-transparent" />

        {FIELDS.map(({ key, label, multi }) => (
          <div key={key} className="flex flex-col gap-1.5">
            <label className="text-[10px] font-semibold uppercase tracking-widest text-slate-400">{label}</label>
            {multi ? (
              <textarea rows={3} className="bg-slate-800/60 border border-white/8 focus:border-red-500/40 text-white rounded-xl px-4 py-3 text-sm outline-none transition-colors resize-none"
                value={form[key]} onChange={(e) => setForm((f) => ({ ...f, [key]: e.target.value }))} />
            ) : (
              <input type="text" className="bg-slate-800/60 border border-white/8 focus:border-red-500/40 text-white rounded-xl px-4 py-3 text-sm outline-none transition-colors"
                value={form[key]} onChange={(e) => setForm((f) => ({ ...f, [key]: e.target.value }))} />
            )}
          </div>
        ))}

        <button onClick={save} disabled={saving}
          className="flex items-center justify-center gap-2 w-full py-3 rounded-xl bg-linear-to-r from-red-600 to-red-700 text-white text-sm font-bold shadow-lg shadow-red-600/20 hover:from-red-500 hover:to-red-600 disabled:opacity-50 transition-all mt-2">
          <Save className="w-4 h-4" />
          {saving ? 'Saving...' : saved ? 'Saved!' : 'Save Changes'}
        </button>
      </div>
    </div>
  );
}
