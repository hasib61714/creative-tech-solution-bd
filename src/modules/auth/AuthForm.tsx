'use client';

import { useState } from 'react';
import { KeyRound, LogIn, UserPlus } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useSiteContent } from '@/lib/useSiteContent';

export default function AuthForm() {
  const router = useRouter();
  const content = useSiteContent();
  const [mode, setMode] = useState<'login' | 'forgot' | 'reset'>('login');
  const [form, setForm] = useState({ name: '', email: '', password: '', otp: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  async function handleSubmit(e: { preventDefault(): void }) {
    e.preventDefault();
    setError(''); setSuccess(''); setLoading(true);
    try {
      const endpoint =
        mode === 'forgot' ? '/api/auth/forgot-password'
        : mode === 'reset' ? '/api/auth/reset-password'
        : `/api/auth/login`;
      const payload = { ...form };
      if (mode === 'reset') {
        payload.otp = form.otp;
        delete payload.token;
      }
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || 'Something went wrong');
      } else {
        if (mode === 'forgot') {
          setSuccess(data.otp
            ? `OTP (dev only): ${data.otp}`
            : 'An OTP has been sent to your email if it exists.');
          setMode('reset');
          return;
        }
        if (mode === 'reset') {
          setSuccess('Password changed. Please sign in.');
          setMode('login');
          setForm((f) => ({ ...f, password: '', otp: '' }));
          return;
        }
        setSuccess('Login successful!');
        if (mode === 'login' && data.token) {
          localStorage.setItem('token', data.token);
          router.replace('/admin');
        }
      }
    } catch {
      setError('Network error — please try again.');
    } finally {
      setLoading(false);
    }
  }

  const switchMode = (m: 'login' | 'forgot' | 'reset') => { setMode(m); setError(''); setSuccess(''); };

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center px-4 py-16 relative overflow-hidden">
      <div className="absolute inset-0 dot-grid-dark opacity-10" />
      <div className="absolute inset-0 bg-linear-to-t from-slate-950 via-transparent to-slate-950/50" />

      <div className="relative w-full max-w-sm">
        {/* Logo */}
        <Link href="/" className="flex justify-center mb-8">
          <div className="bg-white rounded-xl px-4 py-2">
            <Image src="/logopng.png" alt="Creative Tech Solution BD" width={485} height={130} className="h-10 w-auto" />
          </div>
        </Link>

        {/* Badge */}
        <div className="flex justify-center mb-6">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold tracking-widest uppercase bg-red-500/15 text-red-400 border border-red-500/25">
            <span className="w-1.5 h-1.5 rounded-full bg-red-400 animate-pulse" />
            {mode === 'login' ? content.auth_badge_login : content.auth_badge_recovery}
          </div>
        </div>

        {/* Card */}
        <div className="relative bg-linear-to-br from-slate-900 to-slate-800 border border-white/8 rounded-2xl p-8 overflow-hidden">
          <div className="absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-red-500/60 to-transparent" />

          {/* Tabs */}
          <div className="flex bg-slate-800/60 border border-white/8 rounded-xl p-1 mb-7">
            <button
              type="button"
              onClick={() => switchMode('login')}
              className={`flex-1 py-2 text-sm font-semibold rounded-lg transition-all duration-200 ${mode === 'login' ? 'bg-linear-to-r from-red-600 to-blue-700 text-white shadow-md shadow-red-600/20' : 'text-slate-400 hover:text-white'}`}
            >
              Sign In
            </button>
          </div>

          <form className="flex flex-col gap-4" autoComplete="off" onSubmit={handleSubmit}>
            {/* ...no register form... */}
            {mode === 'reset' && (
              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] font-semibold uppercase tracking-widest text-slate-400">OTP</label>
                <input type="text" placeholder="Enter 6-digit OTP" className="bg-slate-800/60 border border-white/8 focus:border-red-500/40 text-white placeholder-slate-500 rounded-xl px-4 py-3 text-sm outline-none transition-colors" value={form.otp} onChange={e => setForm(f => ({ ...f, otp: e.target.value }))} required />
              </div>
            )}
            {mode !== 'reset' && (
            <div className="flex flex-col gap-1.5">
              <label className="text-[10px] font-semibold uppercase tracking-widest text-slate-400">Email</label>
              <input type="email" placeholder="your@email.com" className="bg-slate-800/60 border border-white/8 focus:border-red-500/40 text-white placeholder-slate-500 rounded-xl px-4 py-3 text-sm outline-none transition-colors" value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))} required />
            </div>
            )}
            {mode !== 'forgot' && (
            <div className="flex flex-col gap-1.5">
              <label className="text-[10px] font-semibold uppercase tracking-widest text-slate-400">Password</label>
              <input type="password" placeholder="New or existing password" className="bg-slate-800/60 border border-white/8 focus:border-red-500/40 text-white placeholder-slate-500 rounded-xl px-4 py-3 text-sm outline-none transition-colors" value={form.password} onChange={e => setForm(f => ({ ...f, password: e.target.value }))} required />
            </div>
            )}

            <button type="submit" disabled={loading} className="flex items-center justify-center gap-2 w-full py-3.5 rounded-xl text-sm font-bold bg-linear-to-r from-red-600 to-blue-700 text-white hover:from-red-500 hover:to-blue-600 shadow-lg shadow-red-600/20 transition-all duration-200 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed mt-1">
              {loading ? 'Please wait...'
                : mode === 'login' ? <><LogIn className="w-4 h-4" /> Sign In</>
                : <><KeyRound className="w-4 h-4" /> {mode === 'forgot' ? 'Get OTP' : 'Reset Password'}</>}
            </button>
          </form>

          <div className="mt-4 flex justify-center gap-4 text-xs text-slate-500">
            {mode !== 'forgot' && <button type="button" onClick={() => switchMode('forgot')} className="hover:text-slate-300">Forgot password?</button>}
            {mode !== 'login' && <button type="button" onClick={() => switchMode('login')} className="hover:text-slate-300">Back to sign in</button>}
            {mode !== 'reset' && <button type="button" onClick={() => switchMode('reset')} className="hover:text-slate-300">Have a token?</button>}
          </div>

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
