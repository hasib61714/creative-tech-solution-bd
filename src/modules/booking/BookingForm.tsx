'use client';

import { useState } from 'react';
import { Check, ChevronRight, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

const services = ['Web Development', 'Digital Marketing', 'SEO', 'AI Solutions', 'UI/UX Design', '24/7 Support'];
const steps = ['Service', 'Your Info', 'Date & Time', 'Confirm'];

export default function BookingForm() {
  const [step, setStep] = useState(0);
  const [selectedService, setSelectedService] = useState('');
  const [info, setInfo] = useState({ name: '', email: '', phone: '', details: '' });
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  async function handleBooking() {
    setLoading(true); setError(''); setSuccess('');
    try {
      const res = await fetch('/api/booking', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ service: selectedService, ...info, date, time }),
      });
      const data = await res.json();
      if (!res.ok) setError(data.error || 'Something went wrong');
      else setSuccess('Booking confirmed! We will contact you shortly.');
    } catch {
      setError('Network error — please try again.');
    } finally {
      setLoading(false);
    }
  }

  const canNext =
    (step === 0 && !!selectedService) ||
    (step === 1 && !!(info.name && info.email && info.phone)) ||
    (step === 2 && !!(date && time));

  return (
    <div className="min-h-screen bg-slate-950 px-4 py-16 relative overflow-hidden">
      <div className="absolute inset-0 dot-grid-dark opacity-10" />
      <div className="absolute inset-0 bg-linear-to-t from-slate-950 via-transparent to-slate-950/50" />

      <div className="relative max-w-xl mx-auto">
        {/* Header */}
        <div className="text-center mb-10">
          <Link href="/" className="inline-flex items-center gap-2 mb-6">
            <span className="w-8 h-8 bg-linear-to-br from-red-600 to-red-700 rounded-lg flex items-center justify-center text-white font-black text-sm shadow-lg shadow-red-600/20">C</span>
            <span className="font-extrabold text-white text-base">Creative<span className="text-red-400">Tech</span></span>
          </Link>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold tracking-widest uppercase bg-red-500/15 text-red-400 border border-red-500/25 mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-red-400 animate-pulse" />
            Free Consultation
          </div>
          <h1 className="text-3xl font-extrabold text-white mb-2">Book a Service</h1>
          <p className="text-slate-400 text-sm">No commitment required — just a conversation.</p>
        </div>

        {/* Step Indicators */}
        <div className="flex items-center mb-8">
          {steps.map((s, i) => (
            <div key={s} className="flex items-center flex-1">
              <div className="flex flex-col items-center gap-1">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold border-2 transition-all duration-200 ${i < step ? 'bg-linear-to-br from-red-600 to-red-700 border-transparent text-white shadow-md shadow-red-600/20' : i === step ? 'border-red-500 text-red-400 bg-transparent' : 'border-white/10 text-slate-600 bg-transparent'}`}>
                  {i < step ? <Check className="w-4 h-4" /> : i + 1}
                </div>
                <span className={`text-[10px] font-semibold ${i === step ? 'text-white' : 'text-slate-500'}`}>{s}</span>
              </div>
              {i < steps.length - 1 && (
                <div className={`flex-1 h-px mx-2 mb-4 transition-colors duration-300 ${i < step ? 'bg-red-500/60' : 'bg-white/8'}`} />
              )}
            </div>
          ))}
        </div>

        {/* Card */}
        <div className="relative bg-linear-to-br from-slate-900 to-slate-800 border border-white/8 rounded-2xl p-8 overflow-hidden">
          <div className="absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-red-500/60 to-transparent" />

          {step === 0 && (
            <div className="flex flex-col gap-3">
              <div className="text-white font-semibold text-sm mb-2">Select a Service</div>
              {services.map((s) => (
                <button key={s} type="button" onClick={() => setSelectedService(s)}
                  className={`w-full text-left px-4 py-3 rounded-xl border text-sm font-medium transition-all duration-200 ${selectedService === s ? 'border-red-500/40 bg-red-500/10 text-white' : 'border-white/8 text-slate-400 hover:border-red-500/20 hover:text-white'}`}>
                  {selectedService === s && <Check className="w-3.5 h-3.5 text-red-400 inline mr-2" />}{s}
                </button>
              ))}
            </div>
          )}

          {step === 1 && (
            <div className="flex flex-col gap-4">
              <div className="text-white font-semibold text-sm mb-1">Your Information</div>
              {[
                { key: 'name', label: 'Full Name', type: 'text', placeholder: 'Your name' },
                { key: 'email', label: 'Email', type: 'email', placeholder: 'your@email.com' },
                { key: 'phone', label: 'Phone', type: 'text', placeholder: '+880 ...' },
              ].map(({ key, label, type, placeholder }) => (
                <div key={key} className="flex flex-col gap-1.5">
                  <label className="text-[10px] font-semibold uppercase tracking-widest text-slate-400">{label}</label>
                  <input type={type} placeholder={placeholder} className="bg-slate-800/60 border border-white/8 focus:border-red-500/40 text-white placeholder-slate-500 rounded-xl px-4 py-3 text-sm outline-none transition-colors"
                    value={info[key as keyof typeof info]} onChange={e => setInfo({ ...info, [key]: e.target.value })} />
                </div>
              ))}
              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] font-semibold uppercase tracking-widest text-slate-400">Project Details (optional)</label>
                <textarea rows={3} placeholder="Tell us about your project..." className="bg-slate-800/60 border border-white/8 focus:border-red-500/40 text-white placeholder-slate-500 rounded-xl px-4 py-3 text-sm outline-none transition-colors resize-none"
                  value={info.details} onChange={e => setInfo({ ...info, details: e.target.value })} />
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="flex flex-col gap-4">
              <div className="text-white font-semibold text-sm mb-1">Pick a Date & Time</div>
              <div className="flex flex-col gap-1.5">
                <label htmlFor="booking-date" className="text-[10px] font-semibold uppercase tracking-widest text-slate-400">Preferred Date</label>
                <input id="booking-date" type="date" title="Preferred date" className="bg-slate-800/60 border border-white/8 focus:border-red-500/40 text-white rounded-xl px-4 py-3 text-sm outline-none transition-colors" value={date} onChange={e => setDate(e.target.value)} />
              </div>
              <div className="flex flex-col gap-1.5">
                <label htmlFor="booking-time" className="text-[10px] font-semibold uppercase tracking-widest text-slate-400">Preferred Time</label>
                <input id="booking-time" type="time" title="Preferred time" className="bg-slate-800/60 border border-white/8 focus:border-red-500/40 text-white rounded-xl px-4 py-3 text-sm outline-none transition-colors" value={time} onChange={e => setTime(e.target.value)} />
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="flex flex-col gap-4">
              <div className="text-white font-semibold text-sm mb-1">Confirm Your Booking</div>
              <div className="bg-slate-800/60 border border-white/8 rounded-xl p-5 flex flex-col gap-2.5 text-sm">
                {[
                  { label: 'Service', value: selectedService },
                  { label: 'Name', value: info.name },
                  { label: 'Email', value: info.email },
                  { label: 'Phone', value: info.phone },
                  { label: 'Date', value: date },
                  { label: 'Time', value: time },
                  ...(info.details ? [{ label: 'Details', value: info.details }] : []),
                ].map(({ label, value }) => (
                  <div key={label} className="flex justify-between gap-4">
                    <span className="text-slate-500 shrink-0">{label}</span>
                    <span className="text-white font-medium text-right">{value}</span>
                  </div>
                ))}
              </div>
              {!success && (
                <button type="button" onClick={handleBooking} disabled={loading}
                  className="flex items-center justify-center gap-2 w-full py-3.5 rounded-xl text-sm font-bold bg-linear-to-r from-red-600 via-red-500 to-orange-500 text-white hover:from-red-500 hover:via-red-400 hover:to-orange-400 shadow-lg shadow-red-600/20 transition-all duration-200 active:scale-95 disabled:opacity-50">
                  {loading ? 'Booking...' : <><Check className="w-4 h-4" /> Confirm Booking</>}
                </button>
              )}
              {error && <div className="text-sm text-red-400 bg-red-400/10 border border-red-400/20 rounded-xl px-4 py-3 text-center">{error}</div>}
              {success && <div className="text-sm text-green-400 bg-green-400/10 border border-green-400/20 rounded-xl px-4 py-3 text-center">{success}</div>}
            </div>
          )}

          {/* Navigation */}
          <div className="flex justify-between mt-8 pt-6 border-t border-white/8">
            <button type="button" disabled={step === 0} onClick={() => setStep(s => s - 1)}
              className="inline-flex items-center gap-1.5 px-5 py-2 rounded-xl border border-white/8 text-slate-400 hover:border-red-500/20 hover:text-white disabled:opacity-25 disabled:cursor-not-allowed text-sm transition-all duration-200">
              <ArrowLeft className="w-3.5 h-3.5" /> Back
            </button>
            {step < steps.length - 1 && (
              <button type="button" disabled={!canNext} onClick={() => setStep(s => s + 1)}
                className="inline-flex items-center gap-1.5 px-5 py-2 rounded-xl bg-linear-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 disabled:opacity-30 disabled:cursor-not-allowed text-white text-sm font-bold shadow-md shadow-red-600/20 transition-all duration-200 active:scale-95">
                Next <ChevronRight className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>

        <p className="text-center text-xs text-slate-600 mt-6">
          <Link href="/" className="hover:text-slate-400 transition-colors">← Back to Home</Link>
        </p>
      </div>
    </div>
  );
}
