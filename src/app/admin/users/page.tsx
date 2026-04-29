'use client';

import { useEffect, useState } from 'react';
import { Pencil, Plus, ShieldCheck, Trash2, UserCog, X } from 'lucide-react';

type User = {
  id: number;
  name?: string | null;
  email: string;
  avatarUrl?: string | null;
  phone?: string | null;
  details?: string | null;
  role: 'admin' | 'user';
  permissions?: string | null;
  lastLoginAt?: string | null;
  lastLogoutAt?: string | null;
  createdAt: string;
};

type Form = {
  name: string; email: string; password: string; role: 'admin' | 'user';
  avatarUrl: string; phone: string; details: string; permissions: string[];
};
const EMPTY: Form = { name: '', email: '', password: '', role: 'admin', avatarUrl: '', phone: '', details: '', permissions: [] };

const PERMISSION_OPTIONS = [
  { key: 'dashboard', label: 'Dashboard' },
  { key: 'manage_bookings', label: 'Bookings' },
  { key: 'manage_services', label: 'Services' },
  { key: 'manage_portfolio', label: 'Portfolio' },
  { key: 'manage_testimonials', label: 'Testimonials' },
  { key: 'manage_contacts', label: 'Contacts' },
  { key: 'manage_content', label: 'Content' },
  { key: 'manage_settings', label: 'Settings' },
  { key: 'manage_users', label: 'Users' },
  { key: 'send_messages', label: 'Messages' },
];

function parsePermissions(value?: string | null) {
  if (!value) return [];
  try {
    const parsed = JSON.parse(value);
    return Array.isArray(parsed) ? parsed.filter((item): item is string => typeof item === 'string') : [];
  } catch {
    return [];
  }
}

function authHeaders() {
  return { 'Content-Type': 'application/json', Authorization: `Bearer ${localStorage.getItem('token')}` };
}

export default function UsersAdminPage() {
  const [rows, setRows] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState<Form>(EMPTY);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [editing, setEditing] = useState<User | null>(null);

  async function load() {
    setLoading(true);
    const res = await fetch('/api/admin/users', { headers: authHeaders() });
    if (res.ok) setRows(await res.json());
    setLoading(false);
  }

  useEffect(() => {
    void (async () => {
      setLoading(true);
      const res = await fetch('/api/admin/users', { headers: authHeaders() });
      if (res.ok) setRows(await res.json());
      setLoading(false);
    })();
  }, []);

  async function save() {
    if (!form.name || !form.email || (!editing && !form.password)) return;
    setSaving(true);
    setError('');
    const res = await fetch(editing ? `/api/admin/users/${editing.id}` : '/api/admin/users', {
      method: editing ? 'PATCH' : 'POST',
      headers: authHeaders(),
      body: JSON.stringify(form),
    });
    const data = await res.json();
    setSaving(false);
    if (!res.ok) {
      setError(data.error || 'Could not create user');
      return;
    }
    setOpen(false);
    setEditing(null);
    setForm(EMPTY);
    await load();
  }

  function startEdit(user: User) {
    setEditing(user);
    setForm({
      name: user.name || '',
      email: user.email,
      password: '',
      role: user.role,
      avatarUrl: user.avatarUrl || '',
      phone: user.phone || '',
      details: user.details || '',
      permissions: parsePermissions(user.permissions),
    });
    setOpen(true);
  }

  async function changeRole(user: User, role: 'admin' | 'user') {
    const res = await fetch(`/api/admin/users/${user.id}`, {
      method: 'PATCH',
      headers: authHeaders(),
      body: JSON.stringify({ role }),
    });
    if (res.ok) setRows((r) => r.map((x) => x.id === user.id ? { ...x, role } : x));
  }

  async function resetPassword(user: User) {
    const password = prompt(`New password for ${user.email}`);
    if (!password) return;
    await fetch(`/api/admin/users/${user.id}`, {
      method: 'PATCH',
      headers: authHeaders(),
      body: JSON.stringify({ password }),
    });
  }

  async function remove(user: User) {
    if (!confirm(`Delete ${user.email}?`)) return;
    const res = await fetch(`/api/admin/users/${user.id}`, { method: 'DELETE', headers: authHeaders() });
    if (res.ok) setRows((r) => r.filter((x) => x.id !== user.id));
  }

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-extrabold text-white">Users & Admins</h1>
          <p className="text-slate-400 text-sm mt-1">Control who can access the admin panel.</p>
        </div>
        <button type="button" onClick={() => { setEditing(null); setForm(EMPTY); setOpen(true); }}
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-linear-to-r from-red-600 to-blue-700 text-white text-sm font-bold shadow-lg shadow-red-600/20 hover:from-red-500 hover:to-blue-600 transition-all">
          <Plus className="w-4 h-4" /> Add User
        </button>
      </div>

      {loading ? (
        <div className="flex justify-center py-20"><div className="w-6 h-6 border-2 border-red-500 border-t-transparent rounded-full animate-spin" /></div>
      ) : (
        <div className="bg-linear-to-br from-slate-900 to-slate-800 border border-white/8 rounded-2xl overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-white/8 text-[10px] uppercase tracking-widest text-slate-500">
                {['User','Role','Last Login','Last Logout','Created','Actions'].map((h) => (
                  <th key={h} className="px-5 py-3.5 text-left font-semibold">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((u, i) => (
                <tr key={u.id} className={`border-b border-white/5 hover:bg-white/3 transition-colors ${i === rows.length - 1 ? 'border-0' : ''}`}>
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-linear-to-br from-red-600 to-blue-700 flex items-center justify-center overflow-hidden text-white text-sm font-bold shrink-0">
                        {u.avatarUrl ? (
                          // eslint-disable-next-line @next/next/no-img-element
                          <img src={u.avatarUrl} alt={u.name || u.email} className="w-full h-full object-cover" />
                        ) : (u.name || u.email).slice(0, 1).toUpperCase()}
                      </div>
                      <div className="min-w-0">
                        <div className="text-white font-medium">{u.name || 'Unnamed'}</div>
                        <div className="text-slate-400 text-xs truncate">{u.email}</div>
                        {u.phone && <div className="text-slate-500 text-xs">{u.phone}</div>}
                        {u.role !== 'admin' && (
                          <div className="text-blue-300 text-[10px] mt-1">
                            {parsePermissions(u.permissions).length} permissions
                          </div>
                        )}
                      </div>
                    </div>
                  </td>
                  <td className="px-5 py-4">
                    <span className={`px-2.5 py-1 rounded-full text-[10px] font-semibold capitalize border ${u.role === 'admin' ? 'bg-green-500/15 text-green-400 border-green-500/25' : 'bg-slate-500/15 text-slate-400 border-slate-500/25'}`}>
                      {u.role}
                    </span>
                  </td>
                  <td className="px-5 py-4 text-slate-500 text-xs">{u.lastLoginAt ? new Date(u.lastLoginAt).toLocaleString() : 'Never'}</td>
                  <td className="px-5 py-4 text-slate-500 text-xs">{u.lastLogoutAt ? new Date(u.lastLogoutAt).toLocaleString() : 'Never'}</td>
                  <td className="px-5 py-4 text-slate-500 text-xs">{new Date(u.createdAt).toLocaleDateString()}</td>
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-1">
                      <button type="button" onClick={() => changeRole(u, u.role === 'admin' ? 'user' : 'admin')} title={u.role === 'admin' ? 'Make user' : 'Make admin'}
                        className="p-1.5 rounded-lg text-slate-500 hover:text-green-400 hover:bg-green-400/10 transition-colors">
                        <ShieldCheck className="w-4 h-4" />
                      </button>
                      <button type="button" onClick={() => resetPassword(u)} title="Reset password"
                        className="p-1.5 rounded-lg text-slate-500 hover:text-blue-400 hover:bg-blue-400/10 transition-colors">
                        <UserCog className="w-4 h-4" />
                      </button>
                      <button type="button" onClick={() => startEdit(u)} title="Edit profile"
                        className="p-1.5 rounded-lg text-slate-500 hover:text-blue-400 hover:bg-blue-400/10 transition-colors">
                        <Pencil className="w-4 h-4" />
                      </button>
                      <button type="button" onClick={() => remove(u)} title="Delete"
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

      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm">
          <div className="relative w-full max-w-md bg-linear-to-br from-slate-900 to-slate-800 border border-white/8 rounded-2xl p-7 overflow-hidden">
            <div className="absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-red-500/60 to-transparent" />
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-white font-bold text-lg">{editing ? 'Edit User Profile' : 'Add User'}</h2>
              <button type="button" onClick={() => { setOpen(false); setEditing(null); setForm(EMPTY); }} title="Close" className="text-slate-400 hover:text-white"><X className="w-5 h-5" /></button>
            </div>
            <div className="flex flex-col gap-4">
              {[
                { key: 'name', label: 'Name', type: 'text', placeholder: 'Admin name' },
                { key: 'email', label: 'Email', type: 'email', placeholder: 'admin@example.com' },
                { key: 'password', label: editing ? 'New Password (optional)' : 'Password', type: 'password', placeholder: editing ? 'Leave blank to keep current' : 'Temporary password' },
                { key: 'avatarUrl', label: 'Profile Picture URL', type: 'text', placeholder: 'https://...' },
                { key: 'phone', label: 'Phone', type: 'text', placeholder: '+880...' },
              ].map(({ key, label, type, placeholder }) => (
                <div key={key} className="flex flex-col gap-1.5">
                  <label className="text-[10px] font-semibold uppercase tracking-widest text-slate-400">{label}</label>
                  <input type={type} placeholder={placeholder}
                    className="bg-slate-800/60 border border-white/8 focus:border-red-500/40 text-white placeholder-slate-500 rounded-xl px-4 py-2.5 text-sm outline-none transition-colors"
                    value={form[key as keyof Form]}
                    onChange={(e) => setForm((f) => ({ ...f, [key]: e.target.value }))} />
                </div>
              ))}
              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] font-semibold uppercase tracking-widest text-slate-400">Details</label>
                <textarea rows={3} placeholder="Role, notes, responsibilities..."
                  className="bg-slate-800/60 border border-white/8 focus:border-red-500/40 text-white placeholder-slate-500 rounded-xl px-4 py-2.5 text-sm outline-none transition-colors resize-none"
                  value={form.details}
                  onChange={(e) => setForm((f) => ({ ...f, details: e.target.value }))} />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] font-semibold uppercase tracking-widest text-slate-400">Role</label>
                <select aria-label="Role" value={form.role} onChange={(e) => setForm((f) => ({ ...f, role: e.target.value as 'admin' | 'user' }))}
                  className="bg-slate-800/60 border border-white/8 focus:border-red-500/40 text-white rounded-xl px-4 py-2.5 text-sm outline-none transition-colors">
                  <option value="admin">Admin</option>
                  <option value="user">User</option>
                </select>
              </div>
              {form.role !== 'admin' && (
                <div className="flex flex-col gap-2">
                  <label className="text-[10px] font-semibold uppercase tracking-widest text-slate-400">Allowed Powers</label>
                  <div className="grid grid-cols-2 gap-2">
                    {PERMISSION_OPTIONS.map((permission) => {
                      const checked = form.permissions.includes(permission.key);
                      return (
                        <label key={permission.key} className={`flex items-center gap-2 rounded-xl border px-3 py-2 text-xs font-semibold transition-colors ${checked ? 'border-blue-500/40 bg-blue-500/10 text-blue-300' : 'border-white/8 text-slate-400'}`}>
                          <input
                            type="checkbox"
                            checked={checked}
                            onChange={(e) => setForm((f) => ({
                              ...f,
                              permissions: e.target.checked
                                ? [...f.permissions, permission.key]
                                : f.permissions.filter((item) => item !== permission.key),
                            }))}
                          />
                          {permission.label}
                        </label>
                      );
                    })}
                  </div>
                </div>
              )}
              {error && <div className="text-sm text-red-400 bg-red-400/10 border border-red-400/20 rounded-xl px-4 py-3">{error}</div>}
              <div className="flex gap-3 mt-2">
                <button type="button" onClick={() => { setOpen(false); setEditing(null); setForm(EMPTY); }} className="flex-1 py-2.5 rounded-xl border border-white/8 text-slate-400 hover:text-white text-sm transition-colors">Cancel</button>
                <button type="button" onClick={save} disabled={saving || !form.name || !form.email || (!editing && !form.password)}
                  className="flex-1 py-2.5 rounded-xl bg-linear-to-r from-red-600 to-blue-700 text-white text-sm font-bold disabled:opacity-40 transition-all">
                  {saving ? 'Saving...' : editing ? 'Update User' : 'Save User'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
