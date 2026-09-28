'use client';

import { useCallback, useEffect, useState } from 'react';
import { Pencil, Plus, Trash2, X, ExternalLink } from 'lucide-react';
import { GithubIcon } from '@/components/icons';
import { PROJECT_CATEGORIES, PROJECT_STATUSES, PROJECT_TYPES } from '@/lib/projects';

type Item = {
  id: number;
  title: string;
  slug?: string | null;
  category?: string | null;
  shortDescription?: string | null;
  fullDescription?: string | null;
  technologies?: string | null;
  githubUrl?: string | null;
  liveUrl?: string | null;
  image?: string | null;
  featured?: boolean;
  status?: string | null;
  projectType?: string | null;
  year?: number | null;
  /** Legacy column, read-only — new claims cannot be entered. */
  metric?: string | null;
};

type Form = {
  title: string;
  slug: string;
  category: string;
  shortDescription: string;
  fullDescription: string;
  technologies: string;
  githubUrl: string;
  liveUrl: string;
  image: string;
  featured: boolean;
  status: string;
  projectType: string;
  year: string;
};

const EMPTY: Form = {
  title: '',
  slug: '',
  category: 'Web Development',
  shortDescription: '',
  fullDescription: '',
  technologies: '',
  githubUrl: '',
  liveUrl: '',
  image: '',
  featured: false,
  status: 'Completed',
  projectType: 'Personal Project',
  year: String(new Date().getFullYear()),
};

const INPUT =
  'bg-slate-800/60 border border-white/8 focus:border-red-500/40 text-white placeholder-slate-500 rounded-xl px-4 py-2.5 text-sm outline-none transition-colors';
const LABEL = 'text-[10px] font-semibold uppercase tracking-widest text-slate-400';

export default function PortfolioAdminPage() {
  const [rows, setRows] = useState<Item[]>([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState<Form>(EMPTY);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [editing, setEditing] = useState<Item | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/admin/portfolio');
      setRows(res.ok ? await res.json() : []);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    // Initial fetch on mount; the state updates happen after the await.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    void load();
  }, [load]);

  function closeModal() {
    setOpen(false);
    setEditing(null);
    setForm(EMPTY);
    setError('');
  }

  async function save() {
    if (!form.title) return;
    setSaving(true);
    setError('');
    try {
      const res = await fetch(editing ? `/api/admin/portfolio/${editing.id}` : '/api/admin/portfolio', {
        method: editing ? 'PUT' : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, year: form.year ? Number(form.year) : undefined }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        setError(data.error || 'Could not save this project.');
        return;
      }
      closeModal();
      await load();
    } catch {
      setError('Network error — please try again.');
    } finally {
      setSaving(false);
    }
  }

  function startEdit(item: Item) {
    setEditing(item);
    setForm({
      title: item.title,
      slug: item.slug || '',
      category: item.category || 'Web Development',
      shortDescription: item.shortDescription || '',
      fullDescription: item.fullDescription || '',
      technologies: item.technologies || '',
      githubUrl: item.githubUrl || '',
      liveUrl: item.liveUrl || '',
      image: item.image || '',
      featured: Boolean(item.featured),
      status: item.status || 'Completed',
      projectType: item.projectType || 'Personal Project',
      year: item.year ? String(item.year) : String(new Date().getFullYear()),
    });
    setError('');
    setOpen(true);
  }

  async function remove(id: number) {
    if (!confirm('Delete this project? This cannot be undone.')) return;
    const res = await fetch(`/api/admin/portfolio/${id}`, { method: 'DELETE' });
    if (res.ok) setRows((current) => current.filter((item) => item.id !== id));
  }

  const textField = (key: keyof Form, label: string, placeholder: string, hint?: string) => (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={`field-${key}`} className={LABEL}>
        {label}
      </label>
      <input
        id={`field-${key}`}
        type="text"
        placeholder={placeholder}
        className={INPUT}
        value={String(form[key])}
        onChange={(e) => setForm((f) => ({ ...f, [key]: e.target.value }))}
      />
      {hint && <span className="text-[10px] text-slate-500">{hint}</span>}
    </div>
  );

  const selectField = (key: keyof Form, label: string, options: readonly string[]) => (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={`field-${key}`} className={LABEL}>
        {label}
      </label>
      <select
        id={`field-${key}`}
        className={INPUT}
        value={String(form[key])}
        onChange={(e) => setForm((f) => ({ ...f, [key]: e.target.value }))}
      >
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );

  return (
    <div className="p-8">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-extrabold text-white">Portfolio</h1>
          <p className="mt-1 text-sm text-slate-400">
            {rows.length} {rows.length === 1 ? 'project' : 'projects'}
            {rows.length === 0 && ' — the site falls back to its built-in project list'}
          </p>
        </div>
        <button
          type="button"
          onClick={() => {
            setEditing(null);
            setForm(EMPTY);
            setError('');
            setOpen(true);
          }}
          className="flex items-center gap-2 rounded-xl bg-red-600 px-4 py-2 text-sm font-bold text-white transition-colors hover:bg-red-500"
        >
          <Plus className="h-4 w-4" /> Add project
        </button>
      </div>

      {loading ? (
        <div className="flex justify-center py-20">
          <div className="h-6 w-6 animate-spin rounded-full border-2 border-red-500 border-t-transparent" />
        </div>
      ) : rows.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-white/10 py-20 text-center text-sm text-slate-500">
          No projects saved yet. The public site is showing its built-in project list until you add
          one here.
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
          {rows.map((project) => (
            <div key={project.id} className="rounded-2xl border border-white/8 bg-slate-900 p-5">
              <div className="mb-3 flex items-start justify-between gap-3">
                <div>
                  <div className="text-sm font-bold text-white">{project.title}</div>
                  <div className="mt-1 flex flex-wrap items-center gap-2 text-[10px] text-slate-500">
                    {project.category && <span className="text-red-400">{project.category}</span>}
                    {project.status && <span>· {project.status}</span>}
                    {project.featured && <span className="text-amber-400">· Featured</span>}
                  </div>
                </div>
                <div className="flex shrink-0 gap-1">
                  <button
                    type="button"
                    onClick={() => startEdit(project)}
                    title="Edit"
                    className="rounded-lg p-1.5 text-slate-500 transition-colors hover:bg-blue-400/10 hover:text-blue-400"
                  >
                    <Pencil className="h-3.5 w-3.5" />
                  </button>
                  <button
                    type="button"
                    onClick={() => remove(project.id)}
                    title="Delete"
                    className="rounded-lg p-1.5 text-slate-500 transition-colors hover:bg-red-400/10 hover:text-red-400"
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>
              {project.shortDescription && (
                <p className="text-xs leading-relaxed text-slate-400">{project.shortDescription}</p>
              )}
              <div className="mt-3 flex gap-3 text-[11px] text-slate-500">
                {project.githubUrl && (
                  <span className="inline-flex items-center gap-1">
                    <GithubIcon className="h-3 w-3" /> repo
                  </span>
                )}
                {project.liveUrl && (
                  <span className="inline-flex items-center gap-1">
                    <ExternalLink className="h-3 w-3" /> live
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-slate-950/80 p-4 backdrop-blur-sm">
          <div className="my-8 w-full max-w-2xl rounded-2xl border border-white/8 bg-slate-900 p-7">
            <div className="mb-6 flex items-center justify-between">
              <h2 className="text-lg font-bold text-white">{editing ? 'Edit project' : 'Add project'}</h2>
              <button type="button" onClick={closeModal} title="Close" className="text-slate-400 hover:text-white">
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="flex flex-col gap-4">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                {textField('title', 'Title', 'Internship Hub')}
                {textField('slug', 'Slug', 'internship-hub', 'Leave blank to generate from the title')}
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                {selectField('category', 'Category', PROJECT_CATEGORIES)}
                {selectField('status', 'Status', PROJECT_STATUSES)}
                {selectField('projectType', 'Project type', PROJECT_TYPES)}
              </div>

              <div className="flex flex-col gap-1.5">
                <label htmlFor="field-short" className={LABEL}>
                  Short description
                </label>
                <textarea
                  id="field-short"
                  rows={2}
                  placeholder="One or two sentences for the project card."
                  className={`${INPUT} resize-none`}
                  value={form.shortDescription}
                  onChange={(e) => setForm((f) => ({ ...f, shortDescription: e.target.value }))}
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label htmlFor="field-full" className={LABEL}>
                  Full description
                </label>
                <textarea
                  id="field-full"
                  rows={5}
                  placeholder="One paragraph per line — these become the case study body."
                  className={`${INPUT} resize-y`}
                  value={form.fullDescription}
                  onChange={(e) => setForm((f) => ({ ...f, fullDescription: e.target.value }))}
                />
                <span className="text-[10px] text-slate-500">
                  Describe what the project does. Do not add results or figures that cannot be
                  substantiated.
                </span>
              </div>

              <div className="flex flex-col gap-1.5">
                <label htmlFor="field-technologies" className={LABEL}>
                  Technologies
                </label>
                <textarea
                  id="field-technologies"
                  rows={2}
                  placeholder="Next.js, TypeScript, MySQL"
                  className={`${INPUT} resize-none`}
                  value={form.technologies}
                  onChange={(e) => setForm((f) => ({ ...f, technologies: e.target.value }))}
                />
                <span className="text-[10px] text-slate-500">Separated by commas or new lines.</span>
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                {textField('githubUrl', 'GitHub URL', 'https://github.com/…', 'Leave blank if the repository is private')}
                {textField('liveUrl', 'Live URL', 'https://…', 'Leave blank if there is no live demo')}
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                {textField('image', 'Screenshot path', '/projects/example.png', 'A file under /public, or a full URL')}
                {textField('year', 'Year', '2026')}
              </div>

              <label className="flex items-center gap-3 text-sm text-slate-300">
                <input
                  type="checkbox"
                  checked={form.featured}
                  onChange={(e) => setForm((f) => ({ ...f, featured: e.target.checked }))}
                  className="h-4 w-4 rounded border-white/20 bg-slate-800"
                />
                Show on the homepage
              </label>

              {error && (
                <p role="alert" className="rounded-xl border border-red-400/20 bg-red-400/10 px-4 py-3 text-sm text-red-400">
                  {error}
                </p>
              )}

              <div className="mt-2 flex gap-3">
                <button
                  type="button"
                  onClick={closeModal}
                  className="flex-1 rounded-xl border border-white/8 py-2.5 text-sm text-slate-400 transition-colors hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={save}
                  disabled={saving || !form.title}
                  className="flex-1 rounded-xl bg-red-600 py-2.5 text-sm font-bold text-white transition-colors hover:bg-red-500 disabled:opacity-40"
                >
                  {saving ? 'Saving…' : editing ? 'Update project' : 'Save project'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
