'use client';

import { useEffect, useState } from 'react';
import { CheckCircle2, XCircle, Trash2, Plus, Star, X } from 'lucide-react';

type Testimonial = { id: number; name: string; company?: string; message: string; rating: number; status: string; };
type Form = { name: string; company: string; message: string; rating: number; };
const EMPTY: Form = { name: '', company: '', message: '', rating: 5 };

const STATUS_STYLES: Record<string, string> = {
  pending:  'bg-amber-500/15 text-amber-400 border border-amber-500/25',
  approved: 'bg-green-500/15 text-green-400 border border-green-500/25',
  rejected: 'bg-red-500/15  text-red-400  border border-red-500/25',
};

function authHeaders() {
  return { 'Content-Type': 'application/json', Authorization: `Bearer ${localStorage.getItem('token')}` };
}

export default function TestimonialsPage() {
  const [rows, setRows]       = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen]       = useState(false);
  const [form, setForm]       = useState<Form>(EMPTY);
  const [saving, setSaving]   = useState(false);

  async function load() {
    setLoading(true);
    const res = await fetch('/api/admin/testimonials', { headers: authHeaders() });
    setRows(await res.json());
    setLoading(false);
  }
  useEffect(() => { load(); }, []);

  async function setStatus(id: number, status: string) {
    await fetch(`/api/admin/testimonials/${id}`, { method: 'PATCH', headers: authHeaders(), body: JSON.stringify({ status }) });
    setRows((r) => r.map((t) => t.id === id ? { ...t, status } : t));
  }

  async function remove(id: number) {
    if (!confirm('Delete this testimonial?')) return;
    await fetch(`/api/admin/testimonials/${id}`, { method: 'DELETE', headers: authHeaders() });
    setRows((r) => r.filter((t) => t.id !== id));
  }

  async function save() {
    if (!form.name || !form.message) return;
    setSaving(true);
    await fetch('/api/admin/testimonials', { method: 'POST', headers: authHeaders(), body: JSON.stringify(form) });
    setSaving(false);
    setOpen(false);
    setForm(EMPTY);
    load();
  }

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-extrabold text-white">Testimonials</h1>
          <p className="text-slate-400 text-sm mt-1">{rows.length} total</p>
        </div>
        <button onClick={() => setOpen(true)}
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-linear-to-r from-red-600 to-red-700 text-white text-sm font-bold shadow-lg shadow-red-600/20 hover:from-red-500 hover:to-red-600 transition-all">
          <Plus className="w-4 h-4" /> Add
        </button>
      </div>

      {loading ? (
        <div className="flex justify-center py-20"><div className="w-6 h-6 border-2 border-red-500 border-t-transparent rounded-full animate-spin" /></div>
      ) : rows.length === 0 ? (
        <div className="text-center py-20 text-slate-500 text-sm">No testimonials yet.</div>
      ) : (
        <div className="flex flex-col gap-3">
          {rows.map((t) => (
            <div key={t.id} className="group relative bg-linear-to-br from-slate-900 to-slate-800 border border-white/8 rounded-2xl p-5 hover:border-red-500/20 transition-all overflow-hidden">
              <div className="absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-red-500/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-3 mb-2">
                    <div>
                      <div className="text-white font-bold text-sm">{t.name}</div>
                      {t.company && <div className="text-slate-500 text-xs">{t.company}</div>}
                    </div>
                    <div className="flex gap-0.5">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star key={i} className={`w-3 h-3 ${i < t.rating ? 'text-amber-400 fill-amber-400' : 'text-slate-600'}`} />
                      ))}
                    </div>
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-semibold capitalize ${STATUS_STYLES[t.status] ?? STATUS_STYLES.pending}`}>{t.status}</span>
                  </div>
                  <p className="text-slate-400 text-sm leading-relaxed">&ldquo;{t.message}&rdquo;</p>
                </div>
                <div className="flex items-center gap-1 shrink-0">
                  {t.status !== 'approved' && (
                    <button onClick={() => setStatus(t.id, 'approved')} title="Approve"
                      className="p-1.5 rounded-lg text-slate-500 hover:text-green-400 hover:bg-green-400/10 transition-colors">
                      <CheckCircle2 className="w-4 h-4" />
                    </button>
                  )}
                  {t.status !== 'rejected' && (
                    <button onClick={() => setStatus(t.id, 'rejected')} title="Reject"
                      className="p-1.5 rounded-lg text-slate-500 hover:text-amber-400 hover:bg-amber-400/10 transition-colors">
                      <XCircle className="w-4 h-4" />
                    </button>
                  )}
                  <button onClick={() => remove(t.id)} title="Delete"
                    className="p-1.5 rounded-lg text-slate-500 hover:text-red-400 hover:bg-red-400/10 transition-colors">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm">
          <div className="relative w-full max-w-md bg-linear-to-br from-slate-900 to-slate-800 border border-white/8 rounded-2xl p-7 overflow-hidden">
            <div className="absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-red-500/60 to-transparent" />
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-white font-bold text-lg">Add Testimonial</h2>
              <button onClick={() => setOpen(false)} className="text-slate-400 hover:text-white"><X className="w-5 h-5" /></button>
            </div>
            <div className="flex flex-col gap-4">
              {[
                { key: 'name',    label: 'Client Name', placeholder: 'John Doe' },
                { key: 'company', label: 'Company',     placeholder: 'Acme Corp (optional)' },
              ].map(({ key, label, placeholder }) => (
                <div key={key} className="flex flex-col gap-1.5">
                  <label className="text-[10px] font-semibold uppercase tracking-widest text-slate-400">{label}</label>
                  <input type="text" placeholder={placeholder}
                    className="bg-slate-800/60 border border-white/8 focus:border-red-500/40 text-white placeholder-slate-500 rounded-xl px-4 py-2.5 text-sm outline-none transition-colors"
                    value={form[key as 'name' | 'company']}
                    onChange={(e) => setForm((f) => ({ ...f, [key]: e.target.value }))} />
                </div>
              ))}
              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] font-semibold uppercase tracking-widest text-slate-400">Rating</label>
                <div className="flex gap-1">
                  {[1,2,3,4,5].map((n) => (
                    <button key={n} type="button" onClick={() => setForm((f) => ({ ...f, rating: n }))}
                      className="p-1 transition-colors">
                      <Star className={`w-5 h-5 ${n <= form.rating ? 'text-amber-400 fill-amber-400' : 'text-slate-600'}`} />
                    </button>
                  ))}
                </div>
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] font-semibold uppercase tracking-widest text-slate-400">Message</label>
                <textarea rows={4} placeholder="Their feedback..."
                  className="bg-slate-800/60 border border-white/8 focus:border-red-500/40 text-white placeholder-slate-500 rounded-xl px-4 py-2.5 text-sm outline-none transition-colors resize-none"
                  value={form.message} onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))} />
              </div>
              <div className="flex gap-3 mt-2">
                <button onClick={() => setOpen(false)} className="flex-1 py-2.5 rounded-xl border border-white/8 text-slate-400 hover:text-white text-sm transition-colors">Cancel</button>
                <button onClick={save} disabled={saving || !form.name || !form.message}
                  className="flex-1 py-2.5 rounded-xl bg-linear-to-r from-red-600 to-red-700 text-white text-sm font-bold disabled:opacity-40 transition-all">
                  {saving ? 'Saving...' : 'Save'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
