'use client';

import { useEffect, useState } from 'react';
import { ChevronRight } from 'lucide-react';
import TopBar from '../../components/TopBar';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import { useSiteContent } from '@/lib/useSiteContent';

const categories = ['All', 'Web', 'Marketing', 'Design'];

type Project = { title: string; category?: string; metric?: string; tag?: string; description?: string; desc?: string };

const fallbackProjects: Project[] = [
  { title: 'E-commerce Platform',   category: 'Web',       metric: '2x Sales Growth',    tag: 'Next.js · MySQL',        desc: 'Full-featured online store with admin dashboard and payment integration.' },
  { title: 'Brand Website',          category: 'Web',       metric: '+300% Traffic',       tag: 'React · Tailwind',       desc: 'Modern corporate website with CMS and multilingual support.' },
  { title: 'AI Chatbot',             category: 'Web',       metric: '24/7 Automation',     tag: 'Python · OpenAI',        desc: 'Intelligent support bot that handles 80% of queries automatically.' },
  { title: 'Google Ads Campaign',    category: 'Marketing', metric: '4x ROAS',             tag: 'Google Ads',             desc: 'Performance campaign delivering consistent qualified leads.' },
  { title: 'Social Media Strategy',  category: 'Marketing', metric: '+200% Engagement',    tag: 'Meta Ads',               desc: 'Full social strategy including content, ads, and community.' },
  { title: 'Corporate Identity',     category: 'Design',    metric: 'Full Rebrand',        tag: 'Figma · Illustrator',    desc: 'Complete brand identity system from logo to guidelines.' },
];

export default function PortfolioPage() {
  const [active, setActive] = useState('All');
  const [projects, setProjects] = useState<Project[]>(fallbackProjects);
  const content = useSiteContent();
  const filtered = active === 'All' ? projects : projects.filter((p) => p.category === active);

  useEffect(() => {
    let activeRequest = true;
    fetch('/api/portfolio')
      .then((res) => res.json())
      .then((rows: Project[]) => {
        if (activeRequest && rows.length) setProjects(rows);
      })
      .catch(() => {});
    return () => {
      activeRequest = false;
    };
  }, []);

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
            {content.portfolio_badge}
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-[1.07] tracking-tight mb-4 max-w-2xl">
            {content.portfolio_title.includes(content.portfolio_highlight) ? (
              <>
                {content.portfolio_title.split(content.portfolio_highlight)[0]}
                <span className="bg-linear-to-r from-red-400 to-blue-400 bg-clip-text text-transparent">{content.portfolio_highlight}</span>
                {content.portfolio_title.split(content.portfolio_highlight).slice(1).join(content.portfolio_highlight)}
              </>
            ) : content.portfolio_title}
          </h1>
          <p className="text-slate-300 text-lg max-w-lg">{content.portfolio_subtitle}</p>
        </div>
      </section>

      {/* Filter + Grid */}
      <section className="py-14 lg:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex gap-2 mb-10 flex-wrap">
            {categories.map((c) => (
              <button key={c} type="button" onClick={() => setActive(c)}
                className={`px-4 py-1.5 rounded-lg text-sm font-semibold border transition-all duration-200 ${active === c ? 'bg-linear-to-r from-red-600 to-blue-700 border-transparent text-white shadow-md shadow-red-600/20' : 'border-slate-200 text-slate-600 hover:border-red-300 hover:text-red-600 bg-white'}`}>
                {c}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filtered.map((p) => (
              <div key={p.title} className="group relative flex flex-col bg-linear-to-br from-slate-900 to-slate-800 border border-white/8 rounded-2xl overflow-hidden hover:border-red-500/30 hover:shadow-2xl hover:shadow-red-500/10 hover:-translate-y-1 transition-all duration-300">
                <div className="absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-red-500/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="h-44 bg-slate-800/60 border-b border-white/6 flex items-center justify-center text-slate-600 text-sm">
                  Project Preview
                </div>
                <div className="p-6 flex flex-col gap-2 flex-1">
                  <div className="text-[10px] text-slate-500 font-mono">{p.tag}</div>
                  <div className="text-white font-bold text-base group-hover:text-red-400 transition-colors">{p.title}</div>
                  <div className="text-sm font-bold text-transparent bg-linear-to-r from-red-400 to-blue-400 bg-clip-text">{p.metric}</div>
                  <p className="text-slate-400 text-sm leading-relaxed flex-1">{p.description || p.desc}</p>
                  <div className="mt-3 inline-flex items-center gap-1 text-xs font-semibold text-red-400 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                    View Details <ChevronRight className="w-3 h-3" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
