'use client';

import { useState } from 'react';
import { Send, CheckCircle2 } from 'lucide-react';

type Form = { name: string; email: string; phone: string; subject: string; message: string };
const EMPTY: Form = { name: '', email: '', phone: '', subject: '', message: '' };

const FIELD_CLASS =
  'rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 placeholder-slate-400 outline-none transition-colors focus:border-red-500';
const LABEL_CLASS = 'text-xs font-semibold text-slate-700';

export default function ContactForm({
  successTitle,
  successText,
}: {
  successTitle: string;
  successText: string;
}) {
  const [form, setForm] = useState<Form>(EMPTY);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError('');
    setLoading(true);
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        // The API only ever returns messages written for visitors to read.
        setError(data.error || 'Something went wrong. Please try again.');
      } else {
        setSuccess(true);
        setForm(EMPTY);
      }
    } catch {
      setError('Network error — please check your connection and try again.');
    } finally {
      setLoading(false);
    }
  }

  if (success) {
    return (
      <div
        role="status"
        className="flex flex-col items-center justify-center gap-4 rounded-2xl border border-slate-200 bg-slate-50 p-12 text-center"
      >
        <CheckCircle2 className="h-12 w-12 text-green-600" aria-hidden="true" />
        <div>
          <h2 className="text-lg font-bold text-slate-900">{successTitle}</h2>
          <p className="mt-1 text-sm text-slate-600">{successText}</p>
        </div>
        <button
          type="button"
          onClick={() => setSuccess(false)}
          className="text-sm font-semibold text-red-700 transition-colors hover:text-red-600"
        >
          Send another message
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className="flex flex-col gap-5 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8"
    >
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <div className="flex flex-col gap-1.5">
          <label htmlFor="contact-name" className={LABEL_CLASS}>
            Name <span className="text-red-600">*</span>
          </label>
          <input
            id="contact-name"
            name="name"
            type="text"
            required
            autoComplete="name"
            placeholder="Your name"
            className={FIELD_CLASS}
            value={form.name}
            onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
          />
        </div>
        <div className="flex flex-col gap-1.5">
          <label htmlFor="contact-email" className={LABEL_CLASS}>
            Email <span className="text-red-600">*</span>
          </label>
          <input
            id="contact-email"
            name="email"
            type="email"
            required
            autoComplete="email"
            placeholder="you@example.com"
            className={FIELD_CLASS}
            value={form.email}
            onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <div className="flex flex-col gap-1.5">
          <label htmlFor="contact-phone" className={LABEL_CLASS}>
            Phone / WhatsApp <span className="font-normal text-slate-400">(optional)</span>
          </label>
          <input
            id="contact-phone"
            name="phone"
            type="tel"
            autoComplete="tel"
            placeholder="+880…"
            className={FIELD_CLASS}
            value={form.phone}
            onChange={(e) => setForm((f) => ({ ...f, phone: e.target.value }))}
          />
        </div>
        <div className="flex flex-col gap-1.5">
          <label htmlFor="contact-subject" className={LABEL_CLASS}>
            Subject <span className="font-normal text-slate-400">(optional)</span>
          </label>
          <input
            id="contact-subject"
            name="subject"
            type="text"
            placeholder="What is this about?"
            className={FIELD_CLASS}
            value={form.subject}
            onChange={(e) => setForm((f) => ({ ...f, subject: e.target.value }))}
          />
        </div>
      </div>

      <div className="flex flex-col gap-1.5">
        <label htmlFor="contact-message" className={LABEL_CLASS}>
          Message <span className="text-red-600">*</span>
        </label>
        <textarea
          id="contact-message"
          name="message"
          rows={6}
          required
          placeholder="Tell us what you need built, and roughly when you need it."
          className={`${FIELD_CLASS} resize-y`}
          value={form.message}
          onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
        />
      </div>

      {error && (
        <p role="alert" className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {error}
        </p>
      )}

      <button
        type="submit"
        disabled={loading}
        className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-red-600 px-6 py-3.5 text-sm font-bold text-white shadow-sm shadow-red-600/20 transition-colors hover:bg-red-500 disabled:cursor-not-allowed disabled:opacity-60"
      >
        <Send className="h-4 w-4" aria-hidden="true" />
        {loading ? 'Sending…' : 'Send message'}
      </button>

      <p className="text-xs text-slate-500">
        We only use these details to reply to your enquiry.
      </p>
    </form>
  );
}
