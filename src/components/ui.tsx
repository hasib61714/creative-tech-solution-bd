import Link from 'next/link';
import type { ComponentProps, ReactNode } from 'react';

/**
 * Shared primitives. Every page composes these instead of repeating utility
 * strings, so a change to the button or card treatment lands site-wide.
 */

type Tone = 'light' | 'dark';

export function Section({
  children,
  className = '',
  tone = 'light',
  id,
}: {
  children: ReactNode;
  className?: string;
  tone?: Tone | 'muted';
  id?: string;
}) {
  const background =
    tone === 'dark' ? 'bg-slate-950' : tone === 'muted' ? 'bg-slate-50' : 'bg-white';
  return (
    <section id={id} className={`py-16 lg:py-24 ${background} ${className}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">{children}</div>
    </section>
  );
}

export function Eyebrow({ children, tone = 'light' }: { children: ReactNode; tone?: Tone }) {
  const styles =
    tone === 'dark'
      ? 'bg-red-500/15 text-red-300 border-red-500/25'
      : 'bg-red-50 text-red-700 border-red-200';
  return (
    <span
      className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-[11px] font-semibold tracking-widest uppercase border ${styles}`}
    >
      <span className="w-1.5 h-1.5 rounded-full bg-current" aria-hidden="true" />
      {children}
    </span>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  subtitle,
  align = 'center',
  tone = 'light',
}: {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  align?: 'center' | 'left';
  tone?: Tone;
}) {
  const alignment = align === 'center' ? 'text-center mx-auto items-center' : 'text-left items-start';
  return (
    <div className={`flex flex-col gap-4 mb-12 max-w-2xl ${alignment} ${align === 'center' ? 'mx-auto' : ''}`}>
      {eyebrow && <Eyebrow tone={tone}>{eyebrow}</Eyebrow>}
      <h2
        className={`text-3xl sm:text-4xl font-bold tracking-tight text-balance ${
          tone === 'dark' ? 'text-white' : 'text-slate-900'
        }`}
      >
        {title}
      </h2>
      {subtitle && (
        <p className={`text-base leading-relaxed ${tone === 'dark' ? 'text-slate-400' : 'text-slate-600'}`}>
          {subtitle}
        </p>
      )}
    </div>
  );
}

const BUTTON_BASE =
  'inline-flex items-center justify-center gap-2 rounded-xl font-semibold transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed';

const BUTTON_VARIANTS = {
  primary: 'bg-red-600 text-white hover:bg-red-500 shadow-sm shadow-red-600/20',
  secondary: 'bg-blue-700 text-white hover:bg-blue-600 shadow-sm shadow-blue-700/20',
  outline: 'border border-slate-300 text-slate-700 hover:border-slate-400 hover:bg-slate-50 bg-white',
  ghostDark: 'bg-white/10 text-white border border-white/20 hover:bg-white/20',
} as const;

const BUTTON_SIZES = {
  sm: 'px-4 py-2 text-sm',
  md: 'px-6 py-3 text-sm',
  lg: 'px-8 py-4 text-base',
} as const;

export type ButtonVariant = keyof typeof BUTTON_VARIANTS;
export type ButtonSize = keyof typeof BUTTON_SIZES;

export function buttonClass(variant: ButtonVariant = 'primary', size: ButtonSize = 'md', extra = '') {
  return `${BUTTON_BASE} ${BUTTON_VARIANTS[variant]} ${BUTTON_SIZES[size]} ${extra}`.trim();
}

export function ButtonLink({
  variant = 'primary',
  size = 'md',
  className = '',
  ...props
}: ComponentProps<typeof Link> & { variant?: ButtonVariant; size?: ButtonSize }) {
  return <Link {...props} className={buttonClass(variant, size, className)} />;
}

export function Card({
  children,
  className = '',
  as: Tag = 'div',
}: {
  children: ReactNode;
  className?: string;
  as?: 'div' | 'article' | 'li';
}) {
  return (
    <Tag
      className={`rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-colors duration-200 hover:border-slate-300 ${className}`}
    >
      {children}
    </Tag>
  );
}

export function TechBadge({ children, tone = 'light' }: { children: ReactNode; tone?: Tone }) {
  return (
    <span
      className={`inline-flex items-center rounded-md px-2 py-1 text-[11px] font-medium ${
        tone === 'dark' ? 'bg-white/8 text-slate-300' : 'bg-slate-100 text-slate-700'
      }`}
    >
      {children}
    </span>
  );
}

const STATUS_STYLES: Record<string, string> = {
  Live: 'bg-green-50 text-green-700 border-green-200',
  'In Development': 'bg-amber-50 text-amber-700 border-amber-200',
  Completed: 'bg-blue-50 text-blue-700 border-blue-200',
  Prototype: 'bg-violet-50 text-violet-700 border-violet-200',
  Archived: 'bg-slate-100 text-slate-600 border-slate-200',
};

export function StatusBadge({ status }: { status: string }) {
  const style = STATUS_STYLES[status] ?? STATUS_STYLES.Archived;
  return (
    <span className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-[11px] font-semibold ${style}`}>
      {status}
    </span>
  );
}

/**
 * Stand-in preview for projects with no screenshot on file. A branded browser
 * chrome is honest about being a graphic; a stock photo of a laptop would not
 * be.
 */
export function BrowserMockup({ label, className = '' }: { label: string; className?: string }) {
  return (
    <div
      aria-hidden="true"
      className={`flex flex-col overflow-hidden rounded-xl border border-white/10 bg-slate-900 ${className}`}
    >
      <div className="flex items-center gap-1.5 border-b border-white/8 bg-slate-800/80 px-3 py-2">
        <span className="h-2 w-2 rounded-full bg-red-400/70" />
        <span className="h-2 w-2 rounded-full bg-amber-400/70" />
        <span className="h-2 w-2 rounded-full bg-green-400/70" />
      </div>
      <div className="relative flex flex-1 items-center justify-center bg-linear-to-br from-slate-900 via-slate-900 to-slate-800 p-6">
        <div className="absolute inset-0 dot-grid-dark opacity-10" />
        <span className="relative text-center font-mono text-xs tracking-wide text-slate-400">{label}</span>
      </div>
    </div>
  );
}

export function PageHero({
  eyebrow,
  title,
  subtitle,
  children,
}: {
  eyebrow?: string;
  title: ReactNode;
  subtitle?: string;
  children?: ReactNode;
}) {
  return (
    <section className="relative overflow-hidden bg-slate-950 py-20 lg:py-24">
      <div className="absolute inset-0 dot-grid-dark opacity-10" />
      <div className="absolute -top-40 -right-40 h-120 w-120 rounded-full bg-red-600/15 blur-3xl" aria-hidden="true" />
      <div className="absolute -bottom-40 -left-40 h-100 w-100 rounded-full bg-blue-700/15 blur-3xl" aria-hidden="true" />
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {eyebrow && (
          <div className="mb-6">
            <Eyebrow tone="dark">{eyebrow}</Eyebrow>
          </div>
        )}
        <h1 className="max-w-3xl text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-[1.08] tracking-tight text-white text-balance">
          {title}
        </h1>
        {subtitle && <p className="mt-6 max-w-2xl text-lg leading-relaxed text-slate-300">{subtitle}</p>}
        {children && <div className="mt-8">{children}</div>}
      </div>
    </section>
  );
}
