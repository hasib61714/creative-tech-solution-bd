'use client';

import { useState } from 'react';
import { Phone, Mail, MapPin, Clock, MessageCircle, Send } from 'lucide-react';
import TopBar from '../../components/TopBar';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import { useSiteContent } from '@/lib/useSiteContent';

type Form = { name: string; email: string; subject: string; message: string };
const EMPTY: Form = { name: '', email: '', subject: '', message: '' };

export default function ContactPage() {
  const content = useSiteContent();
  const [form, setForm]       = useState<Form>(EMPTY);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError]     = useState('');

  async function handleSubmit(e: { preventDefault(): void }) {
    e.preventDefault();
    setError(''); setLoading(true);
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      if (!res.ok) {
        const d = await res.json();
        setError(d.error || 'Something went wrong.');
      } else {
        setSuccess(true);
        setForm(EMPTY);
      }
    } catch {
      setError('Network error — please try again.');
    } finally {
      setLoading(false);
    }
  }

  const contactItems = [
    { icon: Phone,   label: 'Phone',   value: `${content.contact_phone_primary} / ${content.contact_phone_secondary}`, href: `tel:${content.contact_phone_primary}` },
    { icon: Mail,    label: 'Email',   value: content.contact_email, href: `mailto:${content.contact_email}` },
    { icon: MapPin,  label: 'Address', value: content.contact_address, href: '#' },
    { icon: Clock,   label: 'Hours',   value: content.contact_hours, href: '#' },
  ];

  return (
    <div className="min-h-screen bg-white overflow-x-hidden">
      <TopBar />
      <Navbar />

      {/* Hero */}
      <section className="relative overflow-hidden bg-slate-950 py-20">
        <div className="absolute inset-0 bg-linear-to-r from-slate-950/60 via-slate-950/40 to-slate-950/50" />
        <div className="absolute inset-0 dot-grid-dark opacity-10" />
        <div className="absolute -top-40 -right-40 w-140 h-140 rounded-full bg-red-600/20 blur-3xl pointer-events-none" />
        <div className="absolute -bottom-40 -left-40 w-120 h-120 rounded-full bg-blue-700/20 blur-3xl pointer-events-none" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold tracking-widest uppercase bg-red-500/15 text-red-400 border border-red-500/25 mb-7">
            <span className="w-1.5 h-1.5 rounded-full bg-red-400 animate-pulse" />
            {content.contact_badge}
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-[1.07] tracking-tight mb-4 max-w-2xl">
            {content.contact_title.includes(content.contact_highlight) ? (
              <>
                {content.contact_title.split(content.contact_highlight)[0]}
                <span className="bg-linear-to-r from-red-400 to-blue-400 bg-clip-text text-transparent">{content.contact_highlight}</span>
                {content.contact_title.split(content.contact_highlight).slice(1).join(content.contact_highlight)}
              </>
            ) : content.contact_title}
          </h1>
          <p className="text-slate-300 text-lg max-w-lg">{content.contact_subtitle}</p>
        </div>
      </section>

      <section className="py-14 lg:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

            {/* Info */}
            <div className="flex flex-col gap-4">
              {contactItems.map((item) => (
                <a key={item.label} href={item.href} className="group flex items-start gap-4 p-5 rounded-2xl bg-white border border-slate-100 hover:border-red-500/20 hover:-translate-y-0.5 transition-all duration-300 shadow-sm">
                  <div className="w-10 h-10 bg-slate-100 rounded-xl flex items-center justify-center text-red-500 shrink-0 group-hover:bg-red-500/15 group-hover:scale-105 transition-all duration-300">
                    <item.icon className="w-4.5 h-4.5" />
                  </div>
                  <div>
                    <div className="text-[10px] font-semibold uppercase tracking-widest text-red-500 mb-1">{item.label}</div>
                    <div className="text-sm text-slate-700 font-medium">{item.value}</div>
                  </div>
                </a>
              ))}
              <a href={`https://wa.me/${content.whatsapp_number}`} target="_blank" rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 rounded-xl font-semibold text-sm px-4 py-3 bg-[#25D366] hover:bg-[#1fad55] text-white transition-colors duration-200 shadow-md">
                <MessageCircle className="w-4 h-4" /> Chat on WhatsApp
              </a>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="lg:col-span-2 relative bg-linear-to-br from-slate-900 to-slate-800 border border-white/8 rounded-2xl p-8 flex flex-col gap-5 overflow-hidden">
              <div className="absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-red-500/60 to-transparent" />

              {success ? (
                <div className="flex flex-col items-center justify-center py-16 text-center gap-4">
                  <div className="w-14 h-14 rounded-full bg-green-500/15 border border-green-500/25 flex items-center justify-center">
                    <Send className="w-6 h-6 text-green-400" />
                  </div>
                  <div>
                    <div className="text-white font-bold text-lg mb-1">{content.contact_success_title}</div>
                    <p className="text-slate-400 text-sm">{content.contact_success_text}</p>
                  </div>
                  <button type="button" onClick={() => setSuccess(false)}
                    className="text-xs text-red-400 hover:text-red-300 transition-colors mt-2">
                    Send another message
                  </button>
                </div>
              ) : (
                <>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div className="flex flex-col gap-1.5">
                      <label className="text-[10px] font-semibold uppercase tracking-widest text-slate-400">Name</label>
                      <input type="text" placeholder="Your name" required
                        className="bg-slate-800/60 border border-white/8 focus:border-red-500/40 text-white placeholder-slate-500 rounded-xl px-4 py-3 text-sm outline-none transition-colors"
                        value={form.name} onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))} />
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <label className="text-[10px] font-semibold uppercase tracking-widest text-slate-400">Email</label>
                      <input type="email" placeholder="your@email.com" required
                        className="bg-slate-800/60 border border-white/8 focus:border-red-500/40 text-white placeholder-slate-500 rounded-xl px-4 py-3 text-sm outline-none transition-colors"
                        value={form.email} onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))} />
                    </div>
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="text-[10px] font-semibold uppercase tracking-widest text-slate-400">Subject</label>
                    <input type="text" placeholder="How can we help?"
                      className="bg-slate-800/60 border border-white/8 focus:border-red-500/40 text-white placeholder-slate-500 rounded-xl px-4 py-3 text-sm outline-none transition-colors"
                      value={form.subject} onChange={(e) => setForm((f) => ({ ...f, subject: e.target.value }))} />
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="text-[10px] font-semibold uppercase tracking-widest text-slate-400">Message</label>
                    <textarea rows={5} placeholder="Tell us about your project..." required
                      className="bg-slate-800/60 border border-white/8 focus:border-red-500/40 text-white placeholder-slate-500 rounded-xl px-4 py-3 text-sm outline-none transition-colors resize-none"
                      value={form.message} onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))} />
                  </div>

                  {error && <div className="text-sm text-red-400 bg-red-400/10 border border-red-400/20 rounded-xl px-4 py-3">{error}</div>}

                  <button type="submit" disabled={loading}
                    className="flex items-center justify-center gap-2 w-full py-3.5 rounded-xl text-sm font-bold bg-linear-to-r from-red-600 to-blue-700 text-white hover:from-red-500 hover:to-blue-600 shadow-lg shadow-red-600/20 transition-all duration-200 active:scale-95 disabled:opacity-50">
                    <Send className="w-4 h-4" /> {loading ? 'Sending...' : 'Send Message'}
                  </button>
                </>
              )}
            </form>
          </div>

          {/* Map */}
          <div className="mt-8 rounded-2xl overflow-hidden border border-slate-200 shadow-sm">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3648.0!2d90.0!3d24.9!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755d8e3a7a7a7a7%3A0x0!2sNakla%2C+Sherpur%2C+Mymensingh!5e0!3m2!1sen!2sbd!4v1710000000000!5m2!1sen!2sbd"
              width="100%" height="280" className="block border-0"
              allowFullScreen={false} loading="lazy"
              referrerPolicy="no-referrer-when-downgrade" title="Office Location"
            />
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
