'use client';

import { useEffect, useState } from 'react';
import { Trash2, MailOpen, Mail, RefreshCw } from 'lucide-react';

type Message = { id: number; name: string; email: string; subject?: string; message: string; read: boolean; createdAt: string; };

function authHeaders() {
  return { 'Content-Type': 'application/json', Authorization: `Bearer ${localStorage.getItem('token')}` };
}

export default function ContactsAdminPage() {
  const [rows, setRows]       = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);
  const [expanded, setExpanded] = useState<number | null>(null);

  async function load() {
    setLoading(true);
    const res = await fetch('/api/admin/contacts', { headers: authHeaders() });
    setRows(await res.json());
    setLoading(false);
  }
  useEffect(() => { load(); }, []);

  async function markRead(id: number) {
    await fetch('/api/admin/contacts', { method: 'PATCH', headers: authHeaders(), body: JSON.stringify({ id }) });
    setRows((r) => r.map((m) => m.id === id ? { ...m, read: true } : m));
  }

  async function remove(id: number) {
    if (!confirm('Delete this message?')) return;
    await fetch(`/api/admin/contacts/${id}`, { method: 'DELETE', headers: authHeaders() });
    setRows((r) => r.filter((m) => m.id !== id));
  }

  const unread = rows.filter((r) => !r.read).length;

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-extrabold text-white">Contact Messages</h1>
          <p className="text-slate-400 text-sm mt-1">
            {rows.length} total{unread > 0 && <span className="ml-2 px-2 py-0.5 rounded-full text-[10px] font-bold bg-red-500/15 text-red-400 border border-red-500/25">{unread} unread</span>}
          </p>
        </div>
        <button onClick={load} className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 border border-white/8 text-slate-400 hover:text-white text-sm transition-colors">
          <RefreshCw className="w-3.5 h-3.5" /> Refresh
        </button>
      </div>

      {loading ? (
        <div className="flex justify-center py-20"><div className="w-6 h-6 border-2 border-red-500 border-t-transparent rounded-full animate-spin" /></div>
      ) : rows.length === 0 ? (
        <div className="text-center py-20 text-slate-500 text-sm">No messages yet.</div>
      ) : (
        <div className="flex flex-col gap-3">
          {rows.map((m) => (
            <div key={m.id} className={`group relative bg-linear-to-br from-slate-900 to-slate-800 border rounded-2xl overflow-hidden transition-all ${m.read ? 'border-white/8' : 'border-red-500/20'}`}>
              {!m.read && <div className="absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-red-500/60 to-transparent" />}
              <div className="p-5">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-start gap-3 flex-1 min-w-0">
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 mt-0.5 ${m.read ? 'bg-white/5 text-slate-500' : 'bg-red-500/15 text-red-400'}`}>
                      {m.read ? <MailOpen className="w-4 h-4" /> : <Mail className="w-4 h-4" />}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="text-white font-bold text-sm">{m.name}</span>
                        <span className="text-slate-500 text-xs">{m.email}</span>
                        {!m.read && <span className="px-1.5 py-0.5 rounded-full text-[9px] font-bold bg-red-500/15 text-red-400 border border-red-500/20">NEW</span>}
                      </div>
                      {m.subject && <div className="text-slate-400 text-xs font-medium mt-0.5">{m.subject}</div>}
                      <p className={`text-slate-400 text-sm mt-2 leading-relaxed ${expanded === m.id ? '' : 'line-clamp-2'}`}>{m.message}</p>
                      {m.message.length > 120 && (
                        <button onClick={() => setExpanded(expanded === m.id ? null : m.id)}
                          className="text-xs text-red-400 hover:text-red-300 mt-1 transition-colors">
                          {expanded === m.id ? 'Show less' : 'Read more'}
                        </button>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center gap-1 shrink-0">
                    {!m.read && (
                      <button onClick={() => markRead(m.id)} title="Mark as read"
                        className="p-1.5 rounded-lg text-slate-500 hover:text-green-400 hover:bg-green-400/10 transition-colors">
                        <MailOpen className="w-4 h-4" />
                      </button>
                    )}
                    <button onClick={() => remove(m.id)} title="Delete"
                      className="p-1.5 rounded-lg text-slate-500 hover:text-red-400 hover:bg-red-400/10 transition-colors">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
