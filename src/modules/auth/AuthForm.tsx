'use client';

import { useState } from 'react';
import { LogIn, UserPlus } from 'lucide-react';
import Link from 'next/link';

export default function AuthForm() {
  const [mode, setMode] = useState<'login' | 'register'>('login');
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  async function handleSubmit(e: { preventDefault(): void }) {
    e.preventDefault();
    setError(''); setSuccess(''); setLoading(true);
    try {
      const res = await fetch(`/api/auth/${mode}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || 'Something went wrong');
      } else {
        setSuccess(mode === 'register' ? 'Account created! Please sign in.' : 'Login successful!');
        if (mode === 'login' && data.token) localStorage.setItem('token', data.token);
      }
    } catch {
      setError('Network error — please try again.');
    } finally {
      setLoading(false);
    }
  }

  const switchMode = (m: 'login' | 'register') => { setMode(m); setError(''); setSuccess(''); };

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center px-4 py-16 relative overflow-hidden">
      <div className="absolute inset-0 dot-grid-dark opacity-10" />
      <div className="absolute inset-0 bg-linear-to-t from-slate-950 via-transparent to-slate-950/50" />

      <div className="relative w-full max-w-sm">
        {/* Logo */}
        <Link href="/" className="flex items-center justify-center gap-2 mb-8">
          <span className="w-9 h-9 bg-linear-to-br from-red-600 to-red-700 rounded-lg flex items-center justify-center text-white font-black shadow-lg shadow-red-600/20">C</span>
          <span className="font-extrabold text-white text-lg">Creative<span className="text-red-400">Tech</span></span>
        </Link>

        {/* Badge */}
        <div className="flex justify-center mb-6">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold tracking-widest uppercase bg-red-500/15 text-red-400 border border-red-500/25">
            <span className="w-1.5 h-1.5 rounded-full bg-red-400 animate-pulse" />
            {mode === 'login' ? 'Welcome back' : 'Create your account'}
          </div>
        </div>

        {/* Card */}
        <div className="relative bg-linear-to-br from-slate-900 to-slate-800 border border-white/8 rounded-2xl p-8 overflow-hidden">
          <div className="absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-red-500/60 to-transparent" />

          {/* Tabs */}
          <div className="flex bg-slate-800/60 border border-white/8 rounded-xl p-1 mb-7">
            {(['login', 'register'] as const).map((m) => (
              <button
                key={m}
                type="button"
                onClick={() => switchMode(m)}
                className={`flex-1 py-2 text-sm font-semibold rounded-lg transition-all duration-200 ${mode === m ? 'bg-linear-to-r from-red-600 to-red-700 text-white shadow-md shadow-red-600/20' : 'text-slate-400 hover:text-white'}`}
              >
                {m === 'login' ? 'Sign In' : 'Register'}
              </button>
            ))}
          </div>

          <form className="flex flex-col gap-4" autoComplete="off" onSubmit={handleSubmit}>
            {mode === 'register' && (
              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] font-semibold uppercase tracking-widest text-slate-400">Full Name</label>
                <input type="text" placeholder="Your name" className="bg-slate-800/60 border border-white/8 focus:border-red-500/40 text-white placeholder-slate-500 rounded-xl px-4 py-3 text-sm outline-none transition-colors" value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} required />
              </div>
            )}
            <div className="flex flex-col gap-1.5">
              <label className="text-[10px] font-semibold uppercase tracking-widest text-slate-400">Email</label>
              <input type="email" placeholder="your@email.com" className="bg-slate-800/60 border border-white/8 focus:border-red-500/40 text-white placeholder-slate-500 rounded-xl px-4 py-3 text-sm outline-none transition-colors" value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))} required />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-[10px] font-semibold uppercase tracking-widest text-slate-400">Password</label>
              <input type="password" placeholder="••••••••" className="bg-slate-800/60 border border-white/8 focus:border-red-500/40 text-white placeholder-slate-500 rounded-xl px-4 py-3 text-sm outline-none transition-colors" value={form.password} onChange={e => setForm(f => ({ ...f, password: e.target.value }))} required />
            </div>

            <button type="submit" disabled={loading} className="flex items-center justify-center gap-2 w-full py-3.5 rounded-xl text-sm font-bold bg-linear-to-r from-red-600 via-red-500 to-orange-500 text-white hover:from-red-500 hover:via-red-400 hover:to-orange-400 shadow-lg shadow-red-600/20 transition-all duration-200 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed mt-1">
              {loading ? 'Please wait...' : mode === 'login' ? <><LogIn className="w-4 h-4" /> Sign In</> : <><UserPlus className="w-4 h-4" /> Create Account</>}
            </button>
          </form>

          {error && <div className="mt-4 text-sm text-red-400 bg-red-400/10 border border-red-400/20 rounded-xl px-4 py-3 text-center">{error}</div>}
          {success && <div className="mt-4 text-sm text-green-400 bg-green-400/10 border border-green-400/20 rounded-xl px-4 py-3 text-center">{success}</div>}
        </div>

        <p className="text-center text-xs text-slate-500 mt-6">
          <Link href="/" className="hover:text-slate-300 transition-colors">← Back to Home</Link>
        </p>
      </div>
    </div>
  );
}
