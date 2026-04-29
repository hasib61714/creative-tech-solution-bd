import { Target, Zap, Handshake, TrendingUp, Users } from 'lucide-react';
import TopBar from '../../components/TopBar';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import { getSiteContent, highlightText } from '@/lib/content';

const values = [
  { icon: Target,     title: 'Client Success First',  desc: 'Your growth is our only metric of success. We win when you win.' },
  { icon: Zap,        title: 'Innovation & Quality',  desc: 'We use the latest tools to deliver world-class results consistently.' },
  { icon: Handshake,  title: 'Transparency',          desc: 'Clear communication, honest timelines, and no hidden surprises.' },
  { icon: TrendingUp, title: 'Continuous Growth',     desc: 'We never stop improving — for ourselves and for our clients.' },
];

const team = [
  { name: 'Md. Hasibul Hasan', role: 'Chief Executive Officer', bio: 'Digital entrepreneur leading Creative Tech Solution BD with a vision to empower businesses through technology.' },
  { name: 'S. Akter',         role: 'Lead Developer',          bio: 'Full-stack engineer specializing in React and Node.js.' },
  { name: 'M. Hasan',         role: 'Head of SEO',             bio: 'Helped 50+ businesses rank on the first page of Google.' },
  { name: 'T. Islam',         role: 'UI/UX Designer',          bio: 'Crafts interfaces that are both beautiful and conversion-focused.' },
];

const milestones = [
  { year: '2020', title: 'Founded',     desc: 'CreativeTech was born with a mission to democratize digital services.' },
  { year: '2021', title: '50 Clients',  desc: 'Reached our first major milestone serving businesses across Dhaka.' },
  { year: '2022', title: 'Team of 10',  desc: 'Expanded to a full-service team with specialists in every area.' },
  { year: '2024', title: '100+ Clients',desc: 'Serving businesses nationwide with a 95% satisfaction rate.' },
];

export const dynamic = 'force-dynamic';

export default async function AboutPage() {
  const content = await getSiteContent();
  const title = highlightText(content.about_title, content.about_highlight);

  return (
    <div className="min-h-screen bg-white overflow-x-hidden">
      <TopBar />
      <Navbar />

      {/* Hero */}
      <section className="relative overflow-hidden bg-slate-950 py-24 px-6">
        <div className="absolute inset-0 bg-linear-to-r from-slate-950/60 via-slate-950/40 to-slate-950/50" />
        <div className="absolute inset-0 dot-grid-dark opacity-10" />
        <div className="absolute -top-40 -right-40 w-140 h-140 rounded-full bg-red-600/20 blur-3xl pointer-events-none" />
        <div className="absolute -bottom-40 -left-40 w-120 h-120 rounded-full bg-blue-700/20 blur-3xl pointer-events-none" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold tracking-widest uppercase bg-red-500/15 text-red-400 border border-red-500/25 mb-7">
            <span className="w-1.5 h-1.5 rounded-full bg-red-400 animate-pulse" />
            {content.about_badge}
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-[1.07] tracking-tight mb-6 max-w-3xl">
            {title.before}
            {title.highlight && (
              <span className="bg-linear-to-r from-red-400 to-blue-400 bg-clip-text text-transparent">
                {title.highlight}
              </span>
            )}
            {title.after}
          </h1>
          <p className="text-slate-300 text-lg leading-relaxed max-w-xl">
            {content.about_subtitle}
          </p>
        </div>
      </section>

      {/* Values */}
      <section className="py-14 lg:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-10 text-center">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold tracking-widest uppercase bg-red-50 text-red-600 border border-red-200 mb-4">
              <span className="w-1.5 h-1.5 rounded-full bg-red-500" />
              What We Stand For
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-900">
              {content.about_values_heading}
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {values.map((v) => (
              <div key={v.title} className="group flex gap-5 p-6 rounded-2xl bg-white border border-slate-100 hover:border-red-500/20 hover:-translate-y-0.5 transition-all duration-300 shadow-sm">
                <div className="shrink-0 w-11 h-11 rounded-xl bg-slate-100 flex items-center justify-center text-red-500 group-hover:bg-red-500/15 group-hover:scale-105 transition-all duration-300">
                  <v.icon className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-slate-900 font-semibold text-sm mb-1.5 group-hover:text-red-500 transition-colors">{v.title}</div>
                  <div className="text-slate-500 text-sm leading-relaxed">{v.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-14 lg:py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-10 text-center">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold tracking-widest uppercase bg-red-50 text-red-600 border border-red-200 mb-4">
              <span className="w-1.5 h-1.5 rounded-full bg-red-500" />
              The People
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-900">
              {content.about_team_heading}
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {team.map((t) => (
              <div key={t.name} className="group relative flex flex-col bg-linear-to-br from-slate-900 to-slate-800 border border-white/8 rounded-2xl p-7 hover:border-red-500/30 hover:shadow-2xl hover:shadow-red-500/10 hover:-translate-y-1 transition-all duration-300 overflow-hidden">
                <div className="absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-red-500/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="w-14 h-14 rounded-xl bg-red-500/15 border border-red-500/25 flex items-center justify-center text-2xl font-black text-red-400 mb-5 group-hover:scale-110 group-hover:bg-red-500/25 transition-all duration-300">
                  <Users className="w-6 h-6" />
                </div>
                <div className="text-white font-bold text-base mb-1 group-hover:text-red-400 transition-colors">{t.name}</div>
                <div className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-red-500/15 text-red-400 border border-red-500/20 w-fit mb-3">{t.role}</div>
                <div className="text-slate-400 text-sm leading-relaxed">{t.bio}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-14 lg:py-20 bg-white relative overflow-hidden">
        <div className="absolute inset-0 dot-grid-light opacity-40 pointer-events-none" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-10 text-center">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold tracking-widest uppercase bg-red-50 text-red-600 border border-red-200 mb-4">
              <span className="w-1.5 h-1.5 rounded-full bg-red-500" />
              Our Journey
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-900">
              {content.about_journey_heading}
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {milestones.map((m) => (
              <div key={m.year} className="group relative text-center p-6 rounded-2xl bg-white border border-slate-200 hover:border-red-500/20 transition-all duration-300 shadow-sm overflow-hidden">
                <div className="text-3xl font-black text-transparent bg-linear-to-br from-red-500 to-blue-600 bg-clip-text mb-2">{m.year}</div>
                <div className="text-slate-900 font-semibold text-base mb-1">{m.title}</div>
                <div className="text-slate-500 text-sm leading-relaxed">{m.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
