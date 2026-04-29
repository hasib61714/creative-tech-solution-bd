'use client';

import { useEffect, useState } from 'react';
import { Plus, Trash2, ToggleLeft, ToggleRight, X } from 'lucide-react';

type Service = {
  id: number; title: string; slug: string; description?: string;
  features?: string; fromPrice?: string; tag?: string; active: boolean;
};

type Form = { title: string; slug: string; description: string; features: string; fromPrice: string; tag: string };
const EMPTY: Form = { title: '', slug: '', description: '', features: '', fromPrice: '', tag: '' };

function authHeaders() {
  return { 'Content-Type': 'application/json', Authorization: `Bearer ${localStorage.getItem('token')}` };
}

function slugify(s: string) { return s.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, ''); }

export default function ServicesAdminPage() {
  const [rows, setRows]     = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen]     = useState(false);
  const [form, setForm]     = useState<Form>(EMPTY);
  const [saving, setSaving] = useState(false);

  async function load() {
    setLoading(true);
    const res = await fetch('/api/admin/services', { headers: authHeaders() });
    setRows(await res.json());
    setLoading(false);
  }
  useEffect(() => {
    void (async () => {
      setLoading(true);
      const res = await fetch('/api/admin/services', { headers: authHeaders() });
      setRows(await res.json());
      setLoading(false);
    })();
  }, []);

  async function save() {
    if (!form.title || !form.slug) return;
    setSaving(true);
    await fetch('/api/admin/services', { method: 'POST', headers: authHeaders(), body: JSON.stringify(form) });
    setSaving(false);
    setOpen(false);
    setForm(EMPTY);
    load();
  }

  async function toggleActive(s: Service) {
    await fetch(`/api/admin/services/${s.id}`, {
      method: 'PUT', headers: authHeaders(),
      body: JSON.stringify({ ...s, active: !s.active }),
    });
    setRows((r) => r.map((x) => x.id === s.id ? { ...x, active: !x.active } : x));
  }

  async function remove(id: number) {
    if (!confirm('Delete this service?')) return;
    await fetch(`/api/admin/services/${id}`, { method: 'DELETE', headers: authHeaders() });
    setRows((r) => r.filter((x) => x.id !== id));
  }

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-extrabold text-white">Services</h1>
          <p className="text-slate-400 text-sm mt-1">{rows.length} services</p>
        </div>
        <button type="button" onClick={() => setOpen(true)}
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-linear-to-r from-red-600 to-blue-700 text-white text-sm font-bold shadow-lg shadow-red-600/20 hover:from-red-500 hover:to-blue-600 transition-all">
          <Plus className="w-4 h-4" /> Add Service
        </button>
      </div>

      {loading ? (
        <div className="flex justify-center py-20"><div className="w-6 h-6 border-2 border-red-500 border-t-transparent rounded-full animate-spin" /></div>
      ) : rows.length === 0 ? (
        <div className="text-center py-20 text-slate-500 text-sm">No services yet. Add one to get started.</div>
      ) : (
        <div className="bg-linear-to-br from-slate-900 to-slate-800 border border-white/8 rounded-2xl overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-white/8 text-[10px] uppercase tracking-widest text-slate-500">
                {['Title','Slug','Price','Tag','Status','Actions'].map((h) => (
                  <th key={h} className="px-5 py-3.5 text-left font-semibold">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((s, i) => (
                <tr key={s.id} className={`border-b border-white/5 hover:bg-white/3 transition-colors ${i === rows.length - 1 ? 'border-0' : ''}`}>
                  <td className="px-5 py-4 text-white font-medium">{s.title}</td>
                  <td className="px-5 py-4 text-slate-400 font-mono text-xs">{s.slug}</td>
                  <td className="px-5 py-4 text-slate-400">{s.fromPrice || '—'}</td>
                  <td className="px-5 py-4">
                    {s.tag ? <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-red-500/15 text-red-400 border border-red-500/20">{s.tag}</span> : <span className="text-slate-600">—</span>}
                  </td>
                  <td className="px-5 py-4">
                    <span className={`px-2.5 py-1 rounded-full text-[10px] font-semibold ${s.active ? 'bg-green-500/15 text-green-400 border border-green-500/25' : 'bg-slate-500/15 text-slate-400 border border-slate-500/25'}`}>
                      {s.active ? 'Active' : 'Inactive'}
                    </span>
                  </td>
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-1">
                      <button type="button" onClick={() => toggleActive(s)} title={s.active ? 'Deactivate' : 'Activate'}
                        className="p-1.5 rounded-lg text-slate-500 hover:text-amber-400 hover:bg-amber-400/10 transition-colors">
                        {s.active ? <ToggleRight className="w-4 h-4" /> : <ToggleLeft className="w-4 h-4" />}
                      </button>
                      <button type="button" onClick={() => remove(s.id)} title="Delete"
                        className="p-1.5 rounded-lg text-slate-500 hover:text-red-400 hover:bg-red-400/10 transition-colors">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Add Modal */}
      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm">
          <div className="relative w-full max-w-lg bg-linear-to-br from-slate-900 to-slate-800 border border-white/8 rounded-2xl p-7 overflow-hidden">
            <div className="absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-red-500/60 to-transparent" />
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-white font-bold text-lg">Add Service</h2>
              <button type="button" onClick={() => setOpen(false)} title="Close" className="text-slate-400 hover:text-white transition-colors"><X className="w-5 h-5" /></button>
            </div>
            <div className="flex flex-col gap-4">
              {[
                { key: 'title', label: 'Title', placeholder: 'Web Development' },
                { key: 'slug',  label: 'Slug',  placeholder: 'web-development' },
                { key: 'fromPrice', label: 'Starting Price', placeholder: '৳15,000' },
                { key: 'tag',   label: 'Badge Tag', placeholder: 'Popular' },
              ].map(({ key, label, placeholder }) => (
                <div key={key} className="flex flex-col gap-1.5">
                  <label className="text-[10px] font-semibold uppercase tracking-widest text-slate-400">{label}</label>
                  <input
                    type="text" placeholder={placeholder}
                    className="bg-slate-800/60 border border-white/8 focus:border-red-500/40 text-white placeholder-slate-500 rounded-xl px-4 py-2.5 text-sm outline-none transition-colors"
                    value={form[key as keyof Form]}
                    onChange={(e) => {
                      const val = e.target.value;
                      setForm((f) => ({
                        ...f,
                        [key]: val,
                        ...(key === 'title' ? { slug: slugify(val) } : {}),
                      }));
                    }}
                  />
                </div>
              ))}
              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] font-semibold uppercase tracking-widest text-slate-400">Description</label>
                <textarea rows={3} placeholder="Brief description..."
                  className="bg-slate-800/60 border border-white/8 focus:border-red-500/40 text-white placeholder-slate-500 rounded-xl px-4 py-2.5 text-sm outline-none transition-colors resize-none"
                  value={form.description} onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))} />
              </div>
              <div className="flex gap-3 mt-2">
                <button type="button" onClick={() => setOpen(false)} className="flex-1 py-2.5 rounded-xl border border-white/8 text-slate-400 hover:text-white text-sm transition-colors">Cancel</button>
                <button type="button" onClick={save} disabled={saving || !form.title || !form.slug}
                  className="flex-1 py-2.5 rounded-xl bg-linear-to-r from-red-600 to-blue-700 text-white text-sm font-bold disabled:opacity-40 transition-all">
                  {saving ? 'Saving...' : 'Save Service'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
