'use client';

import { useEffect, useState } from 'react';
import { Save } from 'lucide-react';
import { CONTENT_DEFAULTS, CONTENT_GROUPS, SiteContent } from '@/lib/content-defaults';

function authHeaders() {
  return { 'Content-Type': 'application/json', Authorization: `Bearer ${localStorage.getItem('token')}` };
}

export default function ContentPage() {
  const [form, setForm] = useState<SiteContent>({ ...CONTENT_DEFAULTS });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    fetch('/api/admin/settings', { headers: authHeaders() })
      .then((r) => r.json())
      .then((data) => {
        setForm((f) => ({ ...f, ...Object.fromEntries(Object.entries(data).filter(([k]) => k in CONTENT_DEFAULTS)) } as SiteContent));
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
    <div className="p-8 max-w-4xl">
      <div className="mb-8">
        <h1 className="text-2xl font-extrabold text-white">Website Content</h1>
        <p className="text-slate-400 text-sm mt-1">Control public page text, contact details, footer content, and page headings.</p>
      </div>

      <div className="flex flex-col gap-5">
        {CONTENT_GROUPS.map((group) => (
          <section key={group.title} className="relative bg-linear-to-br from-slate-900 to-slate-800 border border-white/8 rounded-2xl p-7 overflow-hidden">
            <div className="absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-red-500/60 to-transparent" />
            <div className="mb-6">
              <h2 className="text-white font-bold text-base">{group.title}</h2>
              <p className="text-slate-500 text-xs mt-1">{group.description}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {group.fields.map(({ key, label, multi }) => (
                <div key={key} className={`flex flex-col gap-1.5 ${multi ? 'md:col-span-2' : ''}`}>
                  <label className="text-[10px] font-semibold uppercase tracking-widest text-slate-400">{label}</label>
                  {multi ? (
                    <textarea rows={4} className="bg-slate-800/60 border border-white/8 focus:border-red-500/40 text-white rounded-xl px-4 py-3 text-sm outline-none transition-colors resize-y min-h-24"
                      value={form[key]} onChange={(e) => setForm((f) => ({ ...f, [key]: e.target.value }))} />
                  ) : (
                    <input type="text" className="bg-slate-800/60 border border-white/8 focus:border-red-500/40 text-white rounded-xl px-4 py-3 text-sm outline-none transition-colors"
                      value={form[key]} onChange={(e) => setForm((f) => ({ ...f, [key]: e.target.value }))} />
                  )}
                </div>
              ))}
            </div>
          </section>
        ))}

        <button type="button" onClick={save} disabled={saving}
          className="sticky bottom-4 flex items-center justify-center gap-2 w-full py-3 rounded-xl bg-linear-to-r from-red-600 to-blue-700 text-white text-sm font-bold shadow-lg shadow-red-600/20 hover:from-red-500 hover:to-blue-600 disabled:opacity-50 transition-all">
          <Save className="w-4 h-4" />
          {saving ? 'Saving...' : saved ? 'Saved!' : 'Save All Content'}
        </button>
      </div>
    </div>
  );
}
