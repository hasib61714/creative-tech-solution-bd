'use client';

import { useEffect, useState } from 'react';
import { Save } from 'lucide-react';

type Fields = {
  contact_phone_primary: string; contact_phone_secondary: string; contact_email: string; contact_address: string; whatsapp_number: string;
  social_facebook: string; social_linkedin: string; social_youtube: string;
  contact_hours: string; map_embed: string;
};

const DEFAULTS: Fields = {
  contact_phone_primary:   '+8801784753468',
  contact_phone_secondary: '+8801794517497',
  contact_email:           'creativetechsolutionbd@gmail.com',
  contact_address:         'Biharirpar, Gonopoddy-2151, Nakla, Sherpur, Mymensingh',
  whatsapp_number:         '8801784753468',
  social_facebook:         '',
  social_linkedin:         '',
  social_youtube:          '',
  contact_hours: 'Sat-Thu, 9am-7pm',
  map_embed:      '',
};

const GROUPS = [
  {
    title: 'Contact Information',
    fields: [
      { key: 'contact_phone_primary',   label: 'Primary Phone',    placeholder: '+8801784753468' },
      { key: 'contact_phone_secondary', label: 'Secondary Phone',  placeholder: '+8801794517497' },
      { key: 'contact_email',           label: 'Email Address',    placeholder: 'info@yoursite.com' },
      { key: 'contact_address',         label: 'Office Address',   placeholder: 'Dhaka, Bangladesh' },
      { key: 'contact_hours', label: 'Business Hours',   placeholder: 'Sat-Thu, 9am-7pm' },
      { key: 'whatsapp_number', label: 'WhatsApp Number',  placeholder: '8801784753468' },
    ],
  },
  {
    title: 'Social Media Links',
    fields: [
      { key: 'social_facebook', label: 'Facebook URL',  placeholder: 'https://facebook.com/...' },
      { key: 'social_linkedin', label: 'LinkedIn URL',  placeholder: 'https://linkedin.com/...' },
      { key: 'social_youtube',  label: 'YouTube URL',   placeholder: 'https://youtube.com/...' },
    ],
  },
  {
    title: 'Map',
    fields: [
      { key: 'map_embed', label: 'Google Maps Embed URL', placeholder: 'https://www.google.com/maps/embed?...' },
    ],
  },
] as const;

function authHeaders() {
  return { 'Content-Type': 'application/json', Authorization: `Bearer ${localStorage.getItem('token')}` };
}

export default function SettingsPage() {
  const [form, setForm]       = useState<Fields>(DEFAULTS);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving]   = useState(false);
  const [saved, setSaved]     = useState(false);

  useEffect(() => {
    fetch('/api/admin/settings', { headers: authHeaders() })
      .then((r) => r.json())
      .then((data) => {
        setForm((f) => ({ ...f, ...Object.fromEntries(Object.entries(data).filter(([k]) => k in DEFAULTS)) } as Fields));
        setLoading(false);
      });
  }, []);

  async function save() {
    setSaving(true);
    await fetch('/api/admin/settings', { method: 'PUT', headers: authHeaders(), body: JSON.stringify(form) });
    setSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  }

  if (loading) return (
    <div className="flex justify-center py-20"><div className="w-6 h-6 border-2 border-red-500 border-t-transparent rounded-full animate-spin" /></div>
  );

  return (
    <div className="p-8 max-w-2xl">
      <div className="mb-8">
        <h1 className="text-2xl font-extrabold text-white">Settings</h1>
        <p className="text-slate-400 text-sm mt-1">Manage your site contact info and social links.</p>
      </div>

      <div className="flex flex-col gap-5">
        {GROUPS.map(({ title, fields }) => (
          <div key={title} className="relative bg-linear-to-br from-slate-900 to-slate-800 border border-white/8 rounded-2xl p-7 overflow-hidden">
            <div className="absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-red-500/60 to-transparent" />
            <h2 className="text-white font-bold text-sm mb-5">{title}</h2>
            <div className="flex flex-col gap-4">
              {fields.map(({ key, label, placeholder }) => (
                <div key={key} className="flex flex-col gap-1.5">
                  <label className="text-[10px] font-semibold uppercase tracking-widest text-slate-400">{label}</label>
                  <input type="text" placeholder={placeholder}
                    className="bg-slate-800/60 border border-white/8 focus:border-red-500/40 text-white placeholder-slate-500 rounded-xl px-4 py-3 text-sm outline-none transition-colors"
                    value={form[key as keyof Fields]}
                    onChange={(e) => setForm((f) => ({ ...f, [key]: e.target.value }))} />
                </div>
              ))}
            </div>
          </div>
        ))}

        <button type="button" onClick={save} disabled={saving}
          className="flex items-center justify-center gap-2 w-full py-3 rounded-xl bg-linear-to-r from-red-600 to-blue-700 text-white text-sm font-bold shadow-lg shadow-red-600/20 hover:from-red-500 hover:to-blue-600 disabled:opacity-50 transition-all">
          <Save className="w-4 h-4" />
          {saving ? 'Saving...' : saved ? 'Saved!' : 'Save Settings'}
        </button>
      </div>
    </div>
  );
}
