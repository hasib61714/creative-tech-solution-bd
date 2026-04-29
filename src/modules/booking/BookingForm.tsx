'use client';

import { useState, Fragment } from 'react';
import { Check, ChevronRight, ArrowLeft, CalendarCheck, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { useSiteContent } from '@/lib/useSiteContent';

const services = ['Web Development', 'Digital Marketing', 'SEO', 'AI Solutions', 'UI/UX Design', '24/7 Support'];
const steps = ['Service', 'Your Info', 'Date & Time', 'Confirm'];

export default function BookingForm() {
  const content = useSiteContent();
  const [step, setStep] = useState(0);
  const [selectedService, setSelectedService] = useState('');
  const [info, setInfo] = useState({ name: '', email: '', phone: '', details: '' });
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  async function handleBooking() {
    setLoading(true); setError('');
    try {
      const res = await fetch('/api/booking', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ service: selectedService, ...info, date, time }),
      });
      const data = await res.json();
      if (!res.ok) setError(data.error || 'Something went wrong');
      else setSuccess(true);
    } catch {
      setError('Network error — please try again.');
    } finally {
      setLoading(false);
    }
  }

  function startOver() {
    setStep(0); setSelectedService('');
    setInfo({ name: '', email: '', phone: '', details: '' });
    setDate(''); setTime(''); setError(''); setSuccess(false);
  }

  const canNext =
    (step === 0 && !!selectedService) ||
    (step === 1 && !!(info.name && info.email && info.phone)) ||
    (step === 2 && !!(date && time));

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col relative overflow-hidden">
      <div className="absolute inset-0 dot-grid-dark opacity-10 pointer-events-none" />
      <div className="absolute inset-0 bg-linear-to-b from-slate-950 via-slate-900/30 to-slate-950 pointer-events-none" />

      {/* Top bar */}
      <header className="relative z-10 flex items-center justify-end px-6 sm:px-10 py-4 border-b border-white/6 shrink-0">
        <Link href="/" className="text-xs text-slate-500 hover:text-slate-300 transition-colors">
          ← {content.booking_back_label}
        </Link>
      </header>

      {/* Main */}
      <main className="relative z-10 flex-1 flex items-center justify-center px-4 py-10">
        <div className="w-full max-w-2xl">

          {success ? (
            /* ── Success Screen ── */
            <div className="relative bg-linear-to-br from-slate-900 to-slate-800 border border-white/8 rounded-2xl p-10 overflow-hidden text-center">
              <div className="absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-blue-500/60 to-transparent" />
              <div className="w-16 h-16 rounded-full bg-linear-to-br from-red-600 to-blue-700 flex items-center justify-center mx-auto mb-6 shadow-lg shadow-red-600/20">
                <CalendarCheck className="w-8 h-8 text-white" />
              </div>
                <h2 className="text-2xl font-extrabold text-white mb-2">{content.booking_success_title}</h2>
              <p className="text-slate-400 text-sm leading-relaxed mb-1">
                Thank you, <span className="text-white font-semibold">{info.name}</span>.
              </p>
              <p className="text-slate-400 text-sm leading-relaxed mb-8">
                {content.booking_success_text} We&apos;ll use <span className="text-white font-semibold">{info.email}</span> for your{' '}
                <span className="text-white font-semibold">{selectedService}</span> consultation.
              </p>
              <div className="bg-slate-800/60 border border-white/8 rounded-xl p-4 mb-8 text-left flex flex-col gap-2.5 text-sm max-w-sm mx-auto">
                {[
                  { label: 'Service', value: selectedService },
                  { label: 'Date',    value: date },
                  { label: 'Time',    value: time },
                ].map(({ label, value }) => (
                  <div key={label} className="flex justify-between gap-4">
                    <span className="text-slate-500">{label}</span>
                    <span className="text-white font-medium">{value}</span>
                  </div>
                ))}
              </div>
              <div className="flex flex-col sm:flex-row gap-3 max-w-sm mx-auto">
                <Link href="/"
                  className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-bold bg-linear-to-r from-red-600 to-blue-700 text-white hover:from-red-500 hover:to-blue-600 shadow-lg shadow-red-600/20 transition-all duration-200 active:scale-95">
                {content.booking_back_label} <ArrowRight className="w-4 h-4" />
                </Link>
                <button type="button" onClick={startOver}
                  className="flex-1 py-3 rounded-xl text-sm font-semibold border border-white/8 text-slate-400 hover:text-white hover:border-white/20 transition-all duration-200">
                  Book Another
                </button>
              </div>
            </div>
          ) : (
            <>
              {/* ── Logo ── */}
              <div className="flex justify-center mb-6">
                <Link href="/">
                  <div className="bg-white rounded-xl px-4 py-2">
                    <Image src="/logopng.png" alt="Creative Tech Solution BD" width={485} height={130} className="h-10 w-auto" />
                  </div>
                </Link>
              </div>

              {/* ── Page Title ── */}
              <div className="text-center mb-8">
                <h1 className="text-3xl sm:text-4xl font-extrabold text-white mb-2">{content.booking_title}</h1>
                <p className="text-slate-400 text-sm">{content.booking_subtitle}</p>
              </div>

              {/* ── Step Indicators ── */}
              <div className="flex items-start mb-8">
                {steps.map((s, i) => (
                  <Fragment key={s}>
                    <div className="flex flex-col items-center gap-2 shrink-0">
                      <div className={`w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold border-2 transition-all duration-300 ${
                        i < step  ? 'bg-linear-to-br from-red-600 to-blue-700 border-transparent text-white shadow-lg shadow-red-600/20'
                        : i === step ? 'border-red-500 text-red-400 bg-red-500/10'
                        : 'border-white/10 text-slate-600'
                      }`}>
                        {i < step ? <Check className="w-4 h-4" /> : i + 1}
                      </div>
                      <span className={`text-[11px] font-semibold whitespace-nowrap leading-none ${
                        i === step ? 'text-white' : i < step ? 'text-red-400' : 'text-slate-600'
                      }`}>{s}</span>
                    </div>
                    {i < steps.length - 1 && (
                      <div className={`flex-1 h-px mt-4.5 mx-3 transition-colors duration-300 ${
                        i < step ? 'bg-linear-to-r from-red-500/60 to-blue-500/40' : 'bg-white/8'
                      }`} />
                    )}
                  </Fragment>
                ))}
              </div>

              {/* ── Card ── */}
              <div className="relative bg-linear-to-br from-slate-900 to-slate-800 border border-white/8 rounded-2xl overflow-hidden">
                <div className="absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-red-500/60 to-transparent" />

                <div className="p-8">
                  {/* Badge */}
                  <div className="flex justify-center mb-6">
                    <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold tracking-widest uppercase bg-red-500/15 text-red-400 border border-red-500/25">
                      <span className="w-1.5 h-1.5 rounded-full bg-red-400 animate-pulse" />
                      {content.booking_badge}
                    </div>
                  </div>

                  {/* Step 0 — Service */}
                  {step === 0 && (
                    <div>
                      <p className="text-white font-semibold text-base mb-5">Select a Service</p>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {services.map((s) => (
                          <button key={s} type="button" onClick={() => setSelectedService(s)}
                            className={`text-left px-5 py-4 rounded-xl border text-sm font-medium transition-all duration-200 ${
                              selectedService === s
                                ? 'border-red-500/50 bg-linear-to-br from-red-500/15 to-blue-500/10 text-white shadow-md shadow-red-500/10'
                                : 'border-white/8 text-slate-400 hover:border-white/20 hover:text-white hover:bg-white/3'
                            }`}>
                            <span className="flex items-center gap-2">
                              {selectedService === s && <Check className="w-3.5 h-3.5 text-red-400 shrink-0" />}
                              {s}
                            </span>
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Step 1 — Info */}
                  {step === 1 && (
                    <div>
                      <p className="text-white font-semibold text-base mb-5">Your Information</p>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                        {[
                          { key: 'name',  label: 'Full Name', type: 'text',  placeholder: 'Your name' },
                          { key: 'phone', label: 'Phone',     type: 'text',  placeholder: '+880 ...' },
                        ].map(({ key, label, type, placeholder }) => (
                          <div key={key} className="flex flex-col gap-1.5">
                            <label className="text-[10px] font-semibold uppercase tracking-widest text-slate-400">{label}</label>
                            <input type={type} placeholder={placeholder}
                              className="bg-slate-800/60 border border-white/8 focus:border-red-500/40 text-white placeholder-slate-500 rounded-xl px-4 py-3 text-sm outline-none transition-colors"
                              value={info[key as keyof typeof info]}
                              onChange={e => setInfo({ ...info, [key]: e.target.value })} />
                          </div>
                        ))}
                      </div>
                      <div className="flex flex-col gap-1.5 mb-4">
                        <label className="text-[10px] font-semibold uppercase tracking-widest text-slate-400">Email</label>
                        <input type="email" placeholder="your@email.com"
                          className="bg-slate-800/60 border border-white/8 focus:border-red-500/40 text-white placeholder-slate-500 rounded-xl px-4 py-3 text-sm outline-none transition-colors"
                          value={info.email} onChange={e => setInfo({ ...info, email: e.target.value })} />
                      </div>
                      <div className="flex flex-col gap-1.5">
                        <label className="text-[10px] font-semibold uppercase tracking-widest text-slate-400">
                          Project Details <span className="normal-case font-normal tracking-normal text-slate-600">(optional)</span>
                        </label>
                        <textarea rows={3} placeholder="Tell us about your project..."
                          className="bg-slate-800/60 border border-white/8 focus:border-red-500/40 text-white placeholder-slate-500 rounded-xl px-4 py-3 text-sm outline-none transition-colors resize-none"
                          value={info.details} onChange={e => setInfo({ ...info, details: e.target.value })} />
                      </div>
                    </div>
                  )}

                  {/* Step 2 — Date & Time */}
                  {step === 2 && (
                    <div>
                      <p className="text-white font-semibold text-base mb-5">Pick a Date &amp; Time</p>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="flex flex-col gap-1.5">
                          <label htmlFor="booking-date" className="text-[10px] font-semibold uppercase tracking-widest text-slate-400">Preferred Date</label>
                          <input id="booking-date" type="date" title="Preferred date"
                            className="bg-slate-800/60 border border-white/8 focus:border-red-500/40 text-white rounded-xl px-4 py-3 text-sm outline-none transition-colors scheme-dark"
                            value={date} onChange={e => setDate(e.target.value)} />
                        </div>
                        <div className="flex flex-col gap-1.5">
                          <label htmlFor="booking-time" className="text-[10px] font-semibold uppercase tracking-widest text-slate-400">Preferred Time</label>
                          <input id="booking-time" type="time" title="Preferred time"
                            className="bg-slate-800/60 border border-white/8 focus:border-red-500/40 text-white rounded-xl px-4 py-3 text-sm outline-none transition-colors scheme-dark"
                            value={time} onChange={e => setTime(e.target.value)} />
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Step 3 — Confirm */}
                  {step === 3 && (
                    <div>
                      <p className="text-white font-semibold text-base mb-5">Confirm Your Booking</p>
                      <div className="bg-slate-800/60 border border-white/8 rounded-xl p-5 flex flex-col gap-3 text-sm mb-5">
                        {[
                          { label: 'Service', value: selectedService },
                          { label: 'Name',    value: info.name },
                          { label: 'Email',   value: info.email },
                          { label: 'Phone',   value: info.phone },
                          { label: 'Date',    value: date },
                          { label: 'Time',    value: time },
                          ...(info.details ? [{ label: 'Details', value: info.details }] : []),
                        ].map(({ label, value }) => (
                          <div key={label} className="flex justify-between gap-4 pb-3 border-b border-white/5 last:border-0 last:pb-0">
                            <span className="text-slate-500 shrink-0">{label}</span>
                            <span className="text-white font-medium text-right">{value}</span>
                          </div>
                        ))}
                      </div>
                      {error && <div className="text-sm text-red-400 bg-red-400/10 border border-red-400/20 rounded-xl px-4 py-3 text-center mb-4">{error}</div>}
                      <button type="button" onClick={handleBooking} disabled={loading}
                        className="flex items-center justify-center gap-2 w-full py-3.5 rounded-xl text-sm font-bold bg-linear-to-r from-red-600 to-blue-700 text-white hover:from-red-500 hover:to-blue-600 shadow-lg shadow-red-600/20 transition-all duration-200 active:scale-95 disabled:opacity-50">
                        {loading ? 'Booking...' : <><Check className="w-4 h-4" /> Confirm Booking</>}
                      </button>
                    </div>
                  )}
                </div>

                {/* Navigation */}
                <div className="flex justify-between items-center px-8 py-5 border-t border-white/6 bg-slate-900/40">
                  <button type="button" disabled={step === 0} onClick={() => setStep(s => s - 1)}
                    className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-xl border border-white/8 text-slate-400 hover:border-white/20 hover:text-white disabled:opacity-20 disabled:cursor-not-allowed text-sm font-medium transition-all duration-200">
                    <ArrowLeft className="w-3.5 h-3.5" /> Back
                  </button>
                  <span className="text-xs text-slate-600">{step + 1} / {steps.length}</span>
                  {step < steps.length - 1 ? (
                    <button type="button" disabled={!canNext} onClick={() => setStep(s => s + 1)}
                      className="inline-flex items-center gap-1.5 px-6 py-2.5 rounded-xl bg-linear-to-r from-red-600 to-blue-700 hover:from-red-500 hover:to-blue-600 disabled:opacity-30 disabled:cursor-not-allowed text-white text-sm font-bold shadow-md shadow-red-600/20 transition-all duration-200 active:scale-95">
                      Next <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  ) : (
                    <div className="w-24" />
                  )}
                </div>
              </div>
            </>
          )}
        </div>
      </main>
    </div>
  );
}
