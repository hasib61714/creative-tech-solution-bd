import Link from 'next/link';
import { Globe, TrendingUp, Search, Bot, Paintbrush, Headphones, ChevronRight } from 'lucide-react';
import TopBar from '../../components/TopBar';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';

const services = [
  { id: 'web-development', icon: Globe,      title: 'Web Development',  tag: 'Popular', desc: 'Fast, scalable websites and web applications built with modern technologies.', features: ['Custom Next.js / React apps', 'E-commerce stores', 'Admin dashboards', 'API integrations'], from: '৳15,000' },
  { id: 'marketing',       icon: TrendingUp, title: 'Digital Marketing', tag: '',        desc: 'Data-driven marketing strategies that generate leads and grow your brand.',       features: ['Google Ads', 'Facebook & Instagram Ads', 'Email campaigns', 'Content strategy'], from: '৳8,000' },
  { id: 'seo',             icon: Search,     title: 'SEO',               tag: '',        desc: 'Rank higher on Google and drive consistent, high-quality organic traffic.',        features: ['Technical SEO audit', 'On-page optimization', 'Link building', 'Monthly reports'], from: '৳6,000' },
  { id: 'ai-solutions',    icon: Bot,        title: 'AI Solutions',      tag: 'New',     desc: 'Automate repetitive tasks and make smarter decisions with custom AI tools.',      features: ['AI chatbots', 'Workflow automation', 'Data analysis', 'Custom integrations'], from: '৳20,000' },
  { id: 'design',          icon: Paintbrush, title: 'UI/UX Design',      tag: '',        desc: 'Beautiful, conversion-focused designs that make your brand stand out.',           features: ['Brand identity', 'Web & app UI', 'Social media graphics', 'Figma prototypes'], from: '৳5,000' },
  { id: 'support',         icon: Headphones, title: '24/7 Support',      tag: '',        desc: 'Dedicated technical support and maintenance to keep your business running.',      features: ['Bug fixes', 'Performance monitoring', 'Security updates', 'Priority response'], from: '৳3,000/mo' },
];

export default function ServiceList() {
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
            What We Offer
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-[1.07] tracking-tight mb-4 max-w-2xl">
            Our <span className="bg-linear-to-r from-red-400 to-blue-400 bg-clip-text text-transparent">Services</span>
          </h1>
          <p className="text-slate-300 text-lg max-w-lg">Everything your business needs to grow online — delivered under one roof.</p>
        </div>
      </section>

      {/* Grid */}
      <section className="py-14 lg:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {services.map((s) => (
              <div key={s.id} className="group relative flex flex-col bg-linear-to-br from-slate-900 to-slate-800 border border-white/8 rounded-2xl p-7 hover:border-red-500/30 hover:shadow-2xl hover:shadow-red-500/10 hover:-translate-y-1 transition-all duration-300 overflow-hidden">
                <div className="absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-red-500/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute top-0 right-0 w-40 h-40 bg-red-500/5 rounded-full -translate-y-1/2 translate-x-1/2 group-hover:bg-red-500/10 transition-colors duration-500" />

                <div className="flex items-center gap-4 mb-4 relative">
                  <div className="w-12 h-12 rounded-xl bg-red-500/15 border border-red-500/25 flex items-center justify-center text-red-400 group-hover:scale-110 group-hover:bg-red-500/25 transition-all duration-300">
                    <s.icon className="w-6 h-6" />
                  </div>
                  <div className="text-white font-bold text-lg group-hover:text-red-400 transition-colors duration-200">{s.title}</div>
                  {s.tag && <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-red-500/15 text-red-400 border border-red-500/20">{s.tag}</span>}
                </div>

                <p className="text-slate-400 text-sm leading-relaxed mb-5 relative">{s.desc}</p>

                <ul className="flex flex-col gap-2 mb-5 relative">
                  {s.features.map((f) => (
                    <li key={f} className="flex items-center gap-2 text-sm text-slate-400">
                      <span className="w-1.5 h-1.5 rounded-full bg-red-500/60 shrink-0" />
                      {f}
                    </li>
                  ))}
                </ul>

                <div className="flex items-center justify-between mt-auto pt-5 border-t border-white/8 relative">
                  <span className="text-sm text-slate-500">
                    Starting from <span className="text-white font-semibold">{s.from}</span>
                  </span>
                  <Link href={`/services/${s.id}`} className="inline-flex items-center gap-1 text-xs font-semibold text-red-400 hover:text-red-300 transition-colors duration-200">
                    Learn More <ChevronRight className="w-3 h-3" />
                  </Link>
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
