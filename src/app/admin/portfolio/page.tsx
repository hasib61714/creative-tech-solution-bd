'use client';

import { useEffect, useState } from 'react';
import { Plus, Trash2, X } from 'lucide-react';

type Item = { id: number; title: string; category?: string; metric?: string; tag?: string; description?: string; };
type Form = { title: string; category: string; metric: string; tag: string; description: string; };
const EMPTY: Form = { title: '', category: '', metric: '', tag: '', description: '' };
const CATEGORIES = ['Web', 'Marketing', 'Design', 'AI', 'SEO'];

function authHeaders() {
  return { 'Content-Type': 'application/json', Authorization: `Bearer ${localStorage.getItem('token')}` };
}

export default function PortfolioAdminPage() {
  const [rows, setRows]       = useState<Item[]>([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen]       = useState(false);
  const [form, setForm]       = useState<Form>(EMPTY);
  const [saving, setSaving]   = useState(false);

  async function load() {
    setLoading(true);
    const res = await fetch('/api/admin/portfolio', { headers: authHeaders() });
    setRows(await res.json());
    setLoading(false);
  }
  useEffect(() => { load(); }, []);

  async function save() {
    if (!form.title) return;
    setSaving(true);
    await fetch('/api/admin/portfolio', { method: 'POST', headers: authHeaders(), body: JSON.stringify(form) });
    setSaving(false);
    setOpen(false);
    setForm(EMPTY);
    load();
  }

  async function remove(id: number) {
    if (!confirm('Delete this project?')) return;
    await fetch(`/api/admin/portfolio/${id}`, { method: 'DELETE', headers: authHeaders() });
    setRows((r) => r.filter((x) => x.id !== id));
  }

  const field = (key: keyof Form, label: string, placeholder: string) => (
    <div key={key} className="flex flex-col gap-1.5">
      <label className="text-[10px] font-semibold uppercase tracking-widest text-slate-400">{label}</label>
      <input type="text" placeholder={placeholder}
        className="bg-slate-800/60 border border-white/8 focus:border-red-500/40 text-white placeholder-slate-500 rounded-xl px-4 py-2.5 text-sm outline-none transition-colors"
        value={form[key]} onChange={(e) => setForm((f) => ({ ...f, [key]: e.target.value }))} />
    </div>
  );

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-extrabold text-white">Portfolio</h1>
          <p className="text-slate-400 text-sm mt-1">{rows.length} projects</p>
        </div>
        <button onClick={() => setOpen(true)}
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-linear-to-r from-red-600 to-red-700 text-white text-sm font-bold shadow-lg shadow-red-600/20 hover:from-red-500 hover:to-red-600 transition-all">
          <Plus className="w-4 h-4" /> Add Project
        </button>
      </div>

      {loading ? (
        <div className="flex justify-center py-20"><div className="w-6 h-6 border-2 border-red-500 border-t-transparent rounded-full animate-spin" /></div>
      ) : rows.length === 0 ? (
        <div className="text-center py-20 text-slate-500 text-sm">No projects yet.</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {rows.map((p) => (
            <div key={p.id} className="group relative bg-linear-to-br from-slate-900 to-slate-800 border border-white/8 rounded-2xl p-5 hover:border-red-500/20 transition-all overflow-hidden">
              <div className="absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-red-500/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="flex items-start justify-between gap-3 mb-3">
                <div>
                  <div className="text-white font-bold text-sm">{p.title}</div>
                  {p.category && <div className="text-[10px] text-red-400 font-semibold uppercase tracking-widest mt-0.5">{p.category}</div>}
                </div>
                <button onClick={() => remove(p.id)} className="p-1.5 rounded-lg text-slate-600 hover:text-red-400 hover:bg-red-400/10 transition-colors shrink-0">
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
              {p.metric && <div className="text-sm font-bold text-transparent bg-linear-to-r from-red-400 via-orange-300 to-amber-300 bg-clip-text mb-1">{p.metric}</div>}
              {p.tag && <div className="text-[10px] text-slate-500 font-mono mb-2">{p.tag}</div>}
              {p.description && <p className="text-slate-400 text-xs leading-relaxed">{p.description}</p>}
            </div>
          ))}
        </div>
      )}

      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm">
          <div className="relative w-full max-w-md bg-linear-to-br from-slate-900 to-slate-800 border border-white/8 rounded-2xl p-7 overflow-hidden">
            <div className="absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-red-500/60 to-transparent" />
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-white font-bold text-lg">Add Project</h2>
              <button onClick={() => setOpen(false)} className="text-slate-400 hover:text-white"><X className="w-5 h-5" /></button>
            </div>
            <div className="flex flex-col gap-4">
              {field('title',  'Title',        'E-commerce Platform')}
              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] font-semibold uppercase tracking-widest text-slate-400">Category</label>
                <select className="bg-slate-800/60 border border-white/8 focus:border-red-500/40 text-white rounded-xl px-4 py-2.5 text-sm outline-none transition-colors"
                  value={form.category} onChange={(e) => setForm((f) => ({ ...f, category: e.target.value }))}>
                  <option value="">Select…</option>
                  {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>
              {field('metric', 'Result / Metric', '2x Sales Growth')}
              {field('tag',    'Tech Stack',       'Next.js · MySQL')}
              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] font-semibold uppercase tracking-widest text-slate-400">Description</label>
                <textarea rows={3} placeholder="Brief description of the project..."
                  className="bg-slate-800/60 border border-white/8 focus:border-red-500/40 text-white placeholder-slate-500 rounded-xl px-4 py-2.5 text-sm outline-none transition-colors resize-none"
                  value={form.description} onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))} />
              </div>
              <div className="flex gap-3 mt-2">
                <button onClick={() => setOpen(false)} className="flex-1 py-2.5 rounded-xl border border-white/8 text-slate-400 hover:text-white text-sm transition-colors">Cancel</button>
                <button onClick={save} disabled={saving || !form.title}
                  className="flex-1 py-2.5 rounded-xl bg-linear-to-r from-red-600 to-red-700 text-white text-sm font-bold disabled:opacity-40 transition-all">
                  {saving ? 'Saving...' : 'Save Project'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
