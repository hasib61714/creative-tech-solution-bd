'use client';

import { useEffect, useState } from 'react';
import { CheckCircle2, XCircle, Trash2, RefreshCw } from 'lucide-react';

type Booking = {
  id: number; service: string; name: string; email: string; phone: string;
  date?: string; time?: string; details?: string; status: string; createdAt: string;
};

const STATUS_STYLES: Record<string, string> = {
  pending:   'bg-amber-500/15 text-amber-400 border border-amber-500/25',
  confirmed: 'bg-green-500/15 text-green-400 border border-green-500/25',
  cancelled: 'bg-red-500/15 text-red-400 border border-red-500/25',
};

function authHeaders() {
  return { 'Content-Type': 'application/json', Authorization: `Bearer ${localStorage.getItem('token')}` };
}

export default function BookingsPage() {
  const [rows, setRows]       = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);

  async function load() {
    setLoading(true);
    const res = await fetch('/api/admin/bookings', { headers: authHeaders() });
    setRows(await res.json());
    setLoading(false);
  }

  useEffect(() => { load(); }, []);

  async function updateStatus(id: number, status: string) {
    await fetch(`/api/admin/bookings/${id}`, {
      method: 'PATCH', headers: authHeaders(), body: JSON.stringify({ status }),
    });
    setRows((r) => r.map((b) => b.id === id ? { ...b, status } : b));
  }

  async function remove(id: number) {
    if (!confirm('Delete this booking?')) return;
    await fetch(`/api/admin/bookings/${id}`, { method: 'DELETE', headers: authHeaders() });
    setRows((r) => r.filter((b) => b.id !== id));
  }

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-extrabold text-white">Bookings</h1>
          <p className="text-slate-400 text-sm mt-1">{rows.length} total requests</p>
        </div>
        <button onClick={load} className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 border border-white/8 text-slate-400 hover:text-white text-sm transition-colors">
          <RefreshCw className="w-3.5 h-3.5" /> Refresh
        </button>
      </div>

      {loading ? (
        <div className="flex justify-center py-20"><div className="w-6 h-6 border-2 border-red-500 border-t-transparent rounded-full animate-spin" /></div>
      ) : rows.length === 0 ? (
        <div className="text-center py-20 text-slate-500 text-sm">No bookings yet.</div>
      ) : (
        <div className="bg-linear-to-br from-slate-900 to-slate-800 border border-white/8 rounded-2xl overflow-hidden">
          <div className="absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-red-500/40 to-transparent" />
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-white/8 text-[10px] uppercase tracking-widest text-slate-500">
                {['Service','Client','Contact','Date / Time','Status','Actions'].map((h) => (
                  <th key={h} className="px-5 py-3.5 text-left font-semibold">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((b, i) => (
                <tr key={b.id} className={`border-b border-white/5 hover:bg-white/3 transition-colors ${i === rows.length - 1 ? 'border-0' : ''}`}>
                  <td className="px-5 py-4 text-white font-medium">{b.service}</td>
                  <td className="px-5 py-4">
                    <div className="text-white font-medium">{b.name}</div>
                    {b.details && <div className="text-slate-500 text-xs mt-0.5 max-w-48 truncate">{b.details}</div>}
                  </td>
                  <td className="px-5 py-4 text-slate-400">
                    <div>{b.email}</div>
                    <div className="text-xs">{b.phone}</div>
                  </td>
                  <td className="px-5 py-4 text-slate-400">
                    {b.date ? <><div>{b.date}</div><div className="text-xs">{b.time}</div></> : <span className="text-slate-600">—</span>}
                  </td>
                  <td className="px-5 py-4">
                    <span className={`px-2.5 py-1 rounded-full text-[10px] font-semibold capitalize ${STATUS_STYLES[b.status] ?? STATUS_STYLES.pending}`}>
                      {b.status}
                    </span>
                  </td>
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-1">
                      {b.status !== 'confirmed' && (
                        <button onClick={() => updateStatus(b.id, 'confirmed')} title="Confirm"
                          className="p-1.5 rounded-lg text-slate-500 hover:text-green-400 hover:bg-green-400/10 transition-colors">
                          <CheckCircle2 className="w-4 h-4" />
                        </button>
                      )}
                      {b.status !== 'cancelled' && (
                        <button onClick={() => updateStatus(b.id, 'cancelled')} title="Cancel"
                          className="p-1.5 rounded-lg text-slate-500 hover:text-amber-400 hover:bg-amber-400/10 transition-colors">
                          <XCircle className="w-4 h-4" />
                        </button>
                      )}
                      <button onClick={() => remove(b.id)} title="Delete"
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
    </div>
  );
}
