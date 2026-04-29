'use client';

import { useEffect, useState } from 'react';
import { MailCheck, Plus, Send, X } from 'lucide-react';

type Message = {
  id: number;
  senderId: number;
  recipientId?: number | null;
  subject: string;
  message: string;
  context?: string | null;
  read: boolean;
  createdAt: string;
};

type User = { id: number; name?: string | null; email: string };
type Form = { recipientId: string; subject: string; message: string; context: string };
const EMPTY: Form = { recipientId: '', subject: '', message: '', context: 'general' };

function authHeaders() {
  return { 'Content-Type': 'application/json', Authorization: `Bearer ${localStorage.getItem('token')}` };
}

export default function AdminMessagesPage() {
  const [rows, setRows] = useState<Message[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState<Form>(EMPTY);
  const [saving, setSaving] = useState(false);

  async function load() {
    const [messagesRes, usersRes] = await Promise.all([
      fetch('/api/admin/messages', { headers: authHeaders() }),
      fetch('/api/admin/message-users', { headers: authHeaders() }),
    ]);
    if (messagesRes.ok) setRows(await messagesRes.json());
    if (usersRes.ok) setUsers(await usersRes.json());
  }

  useEffect(() => {
    void (async () => {
      const [messagesRes, usersRes] = await Promise.all([
        fetch('/api/admin/messages', { headers: authHeaders() }),
        fetch('/api/admin/message-users', { headers: authHeaders() }),
      ]);
      if (messagesRes.ok) setRows(await messagesRes.json());
      if (usersRes.ok) setUsers(await usersRes.json());
    })();
  }, []);

  async function send() {
    if (!form.subject || !form.message) return;
    setSaving(true);
    const res = await fetch('/api/admin/messages', {
      method: 'POST',
      headers: authHeaders(),
      body: JSON.stringify({ ...form, recipientId: form.recipientId || null }),
    });
    setSaving(false);
    if (!res.ok) return;
    setOpen(false);
    setForm(EMPTY);
    await load();
  }

  async function markRead(message: Message) {
    await fetch(`/api/admin/messages/${message.id}`, { method: 'PATCH', headers: authHeaders() });
    setRows((items) => items.map((item) => item.id === message.id ? { ...item, read: true } : item));
  }

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-extrabold text-white">Admin Messages</h1>
          <p className="text-slate-400 text-sm mt-1">Send task notes, order updates, and internal messages to permitted users.</p>
        </div>
        <button type="button" onClick={() => setOpen(true)}
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-linear-to-r from-red-600 to-blue-700 text-white text-sm font-bold shadow-lg shadow-red-600/20 hover:from-red-500 hover:to-blue-600 transition-all">
          <Plus className="w-4 h-4" /> New Message
        </button>
      </div>

      <div className="flex flex-col gap-3">
        {rows.length === 0 ? (
          <div className="text-center py-20 text-slate-500 text-sm">No messages yet.</div>
        ) : rows.map((m) => (
          <div key={m.id} className={`relative bg-linear-to-br from-slate-900 to-slate-800 border rounded-2xl p-5 ${m.read ? 'border-white/8' : 'border-blue-500/30'}`}>
            <div className="flex items-start justify-between gap-4">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <h2 className="text-white font-bold text-sm">{m.subject}</h2>
                  {m.context && <span className="px-2 py-0.5 rounded-full text-[10px] bg-blue-500/15 text-blue-300 border border-blue-500/20">{m.context}</span>}
                  {!m.read && <span className="px-2 py-0.5 rounded-full text-[10px] bg-red-500/15 text-red-300 border border-red-500/20">NEW</span>}
                </div>
                <p className="text-slate-400 text-sm leading-relaxed">{m.message}</p>
                <div className="text-slate-600 text-xs mt-3">{new Date(m.createdAt).toLocaleString()}</div>
              </div>
              {!m.read && (
                <button type="button" onClick={() => markRead(m)} title="Mark read"
                  className="p-2 rounded-lg text-slate-500 hover:text-green-400 hover:bg-green-400/10 transition-colors">
                  <MailCheck className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm">
          <div className="relative w-full max-w-lg bg-linear-to-br from-slate-900 to-slate-800 border border-white/8 rounded-2xl p-7 overflow-hidden">
            <div className="absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-red-500/60 to-transparent" />
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-white font-bold text-lg">Send Message</h2>
              <button type="button" onClick={() => setOpen(false)} title="Close" className="text-slate-400 hover:text-white"><X className="w-5 h-5" /></button>
            </div>
            <div className="flex flex-col gap-4">
              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] font-semibold uppercase tracking-widest text-slate-400">Recipient</label>
                <select aria-label="Recipient" value={form.recipientId} onChange={(e) => setForm((f) => ({ ...f, recipientId: e.target.value }))}
                  className="bg-slate-800/60 border border-white/8 focus:border-red-500/40 text-white rounded-xl px-4 py-2.5 text-sm outline-none transition-colors">
                  <option value="">Everyone</option>
                  {users.map((user) => <option key={user.id} value={user.id}>{user.name || user.email}</option>)}
                </select>
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] font-semibold uppercase tracking-widest text-slate-400">Context</label>
                <input type="text" value={form.context} onChange={(e) => setForm((f) => ({ ...f, context: e.target.value }))}
                  className="bg-slate-800/60 border border-white/8 focus:border-red-500/40 text-white rounded-xl px-4 py-2.5 text-sm outline-none transition-colors" />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] font-semibold uppercase tracking-widest text-slate-400">Subject</label>
                <input type="text" value={form.subject} onChange={(e) => setForm((f) => ({ ...f, subject: e.target.value }))}
                  className="bg-slate-800/60 border border-white/8 focus:border-red-500/40 text-white rounded-xl px-4 py-2.5 text-sm outline-none transition-colors" />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] font-semibold uppercase tracking-widest text-slate-400">Message</label>
                <textarea rows={5} value={form.message} onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
                  className="bg-slate-800/60 border border-white/8 focus:border-red-500/40 text-white rounded-xl px-4 py-2.5 text-sm outline-none transition-colors resize-none" />
              </div>
              <button type="button" onClick={send} disabled={saving || !form.subject || !form.message}
                className="flex items-center justify-center gap-2 py-2.5 rounded-xl bg-linear-to-r from-red-600 to-blue-700 text-white text-sm font-bold disabled:opacity-40 transition-all">
                <Send className="w-4 h-4" /> {saving ? 'Sending...' : 'Send Message'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
