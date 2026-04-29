import Link from 'next/link';
import {
  Globe, TrendingUp, Search, Bot, Paintbrush, Headphones,
  Zap, Rocket, Lock, DollarSign, BarChart2, Phone,
  ArrowRight, ChevronRight,
} from 'lucide-react';
import TopBar from '../components/TopBar';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const services = [
  { icon: Globe,       title: 'Web Development',   desc: 'Fast, modern websites & web apps tailored to your business goals.',             tag: 'Popular' },
  { icon: TrendingUp,  title: 'Digital Marketing',  desc: 'Reach your audience with targeted campaigns that actually convert.',            tag: '' },
  { icon: Search,      title: 'SEO',                desc: 'Rank higher on Google and drive consistent organic traffic.',                   tag: '' },
  { icon: Bot,         title: 'AI Solutions',       desc: 'Automate workflows and gain insights with custom AI tools.',                    tag: 'New' },
  { icon: Paintbrush,  title: 'UI/UX Design',       desc: 'Beautiful, intuitive designs that turn visitors into customers.',               tag: '' },
  { icon: Headphones,  title: '24/7 Support',       desc: 'Dedicated technical support keeping your business running always.',             tag: '' },
];

const stats = [
  { value: '100+', label: 'Happy Clients',   desc: 'Businesses trust us' },
  { value: '500+', label: 'Projects Done',   desc: 'Across all services' },
  { value: '95%',  label: 'Satisfaction',    desc: 'Client success rate' },
  { value: '24/7', label: 'Support',         desc: 'Always available' },
];

const whyUs = [
  { icon: Zap,          title: 'Fast Delivery',    desc: 'We ship projects on time, every time — without cutting corners on quality.' },
  { icon: Rocket,       title: 'Modern Stack',     desc: 'Built with the latest technologies for performance and scalability.' },
  { icon: Lock,         title: 'Secure & Reliable',desc: 'Security-first approach with 99.9% uptime guaranteed for all projects.' },
  { icon: DollarSign,   title: 'Affordable',       desc: 'World-class quality at Bangladesh-competitive rates with flexible packages.' },
  { icon: BarChart2,    title: 'Data-Driven',      desc: 'Every decision backed by analytics and real measurable results.' },
  { icon: Headphones,   title: '24/7 Support',     desc: 'Round-the-clock dedicated support so you are never left alone.' },
];

const steps = [
  { num: '01', title: 'Discovery Call',  desc: 'We discuss your goals, needs, and vision in a free 30-min consultation.' },
  { num: '02', title: 'Strategy & Plan', desc: 'Our team crafts a tailored action plan, timeline, and transparent pricing.' },
  { num: '03', title: 'Build & Launch',  desc: 'We execute with precision, keeping you in the loop every step of the way.' },
  { num: '04', title: 'Grow & Scale',    desc: 'We monitor results, optimize performance, and help you scale further.' },
];

export default function Home() {
  return (
    <div className="min-h-screen bg-white overflow-x-hidden">
      <TopBar />
      <Navbar />

      {/* Hero */}
      <section className="relative overflow-hidden bg-slate-950 min-h-[92vh] flex items-center">
        <div className="absolute inset-0 bg-linear-to-r from-slate-950/60 via-slate-950/40 to-slate-950/50" />
        <div className="absolute inset-0 bg-linear-to-t from-slate-950 via-transparent to-slate-950/50" />
        <div className="absolute inset-0 dot-grid-dark opacity-10" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="max-w-3xl py-10">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold tracking-widest uppercase bg-red-500/15 text-red-400 border border-red-500/25 mb-7">
              <span className="w-1.5 h-1.5 rounded-full bg-red-400 animate-pulse" />
              Verified Digital Agency — Dhaka, BD
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-7xl font-extrabold text-white leading-[1.07] tracking-tight mb-6">
              Grow Your Business with{' '}
              <span className="bg-linear-to-r from-red-400 via-orange-300 to-amber-300 bg-clip-text text-transparent">
                Smart Digital
              </span>{' '}
              Solutions
            </h1>
            <p className="text-slate-300 text-lg sm:text-xl leading-relaxed max-w-xl mb-10">
              We help businesses across Bangladesh build powerful online presence, generate leads, and scale with technology.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/services" className="inline-flex items-center justify-center gap-2 rounded-xl font-semibold transition-all duration-300 bg-linear-to-r from-red-600 via-red-500 to-orange-500 text-white hover:from-red-500 hover:via-red-400 hover:to-orange-400 shadow-lg hover:shadow-orange-500/25 px-10 py-5 text-base active:scale-95">
                Explore Services <ArrowRight className="w-4 h-4" />
              </Link>
              <Link href="/booking" className="inline-flex items-center justify-center gap-2 rounded-xl font-semibold transition-all duration-300 bg-white/10 text-white border border-white/20 hover:bg-white/20 hover:border-white/30 px-10 py-5 text-base">
                Book a Free Call
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-14 lg:py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-linear-to-b from-slate-50 via-white to-slate-50 pointer-events-none" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="w-full h-px bg-linear-to-r from-transparent via-red-500/30 to-transparent mb-10" />
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
            {stats.map((s) => (
              <div key={s.label} className="relative group text-center p-6 rounded-2xl bg-white border border-slate-200 hover:border-red-500/20 transition-all duration-300 overflow-hidden shadow-sm">
                <div className="relative text-3xl lg:text-4xl font-black text-transparent bg-linear-to-br from-red-500 via-orange-400 to-amber-300 bg-clip-text mb-2">{s.value}</div>
                <div className="relative text-slate-900 font-semibold text-base mb-1">{s.label}</div>
                <div className="relative text-slate-500 text-sm">{s.desc}</div>
              </div>
            ))}
          </div>
          <div className="w-full h-px bg-linear-to-r from-transparent via-red-500/30 to-transparent mt-10" />
        </div>
      </section>

      {/* Services */}
      <section className="py-14 lg:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-10 text-center">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold tracking-widest uppercase bg-red-50 text-red-600 border border-red-200 mb-4">
              <span className="w-1.5 h-1.5 rounded-full bg-red-500" />
              What We Do
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-900 leading-tight mx-auto">
              Our <span className="bg-linear-to-r from-red-500 via-orange-400 to-amber-300 bg-clip-text text-transparent">Services</span>
            </h2>
            <p className="mt-4 text-slate-500 text-base leading-relaxed max-w-2xl mx-auto">
              Everything your business needs to grow online — delivered under one roof.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
            {services.slice(0, 2).map((s) => (
              <ServiceCard key={s.title} {...s} large />
            ))}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {services.slice(2).map((s) => (
              <ServiceCard key={s.title} {...s} />
            ))}
          </div>
        </div>
      </section>

      {/* Why Us */}
      <section className="py-14 lg:py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-10 text-center">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold tracking-widest uppercase bg-red-50 text-red-600 border border-red-200 mb-4">
              <span className="w-1.5 h-1.5 rounded-full bg-red-500" />
              Why Choose Us
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-900 leading-tight">
              Why Businesses <span className="bg-linear-to-r from-red-500 via-orange-400 to-amber-300 bg-clip-text text-transparent">Choose CreativeTech</span>
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {whyUs.map((w) => (
              <div key={w.title} className="group flex gap-5 p-6 rounded-2xl bg-white border border-slate-100 hover:border-red-500/20 hover:-translate-y-0.5 transition-all duration-300 shadow-sm">
                <div className="shrink-0 w-11 h-11 rounded-xl bg-slate-100 flex items-center justify-center text-red-500 group-hover:bg-red-500/15 group-hover:scale-105 transition-all duration-300">
                  <w.icon className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-slate-900 font-semibold text-sm mb-1.5 group-hover:text-red-500 transition-colors duration-200">{w.title}</div>
                  <div className="text-slate-500 text-sm leading-relaxed">{w.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-14 lg:py-20 bg-white relative overflow-hidden">
        <div className="absolute inset-0 dot-grid-light opacity-40 pointer-events-none" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-10 text-center">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold tracking-widest uppercase bg-red-50 text-red-600 border border-red-200 mb-4">
              <span className="w-1.5 h-1.5 rounded-full bg-red-500" />
              Our Process
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-900 leading-tight">
              How It <span className="bg-linear-to-r from-red-500 via-orange-400 to-amber-300 bg-clip-text text-transparent">Works</span>
            </h2>
            <p className="mt-4 text-slate-500 text-base leading-relaxed max-w-2xl mx-auto">
              A simple, transparent process from first contact to final delivery.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {steps.map((step) => (
              <div key={step.num} className="group p-6 rounded-2xl bg-white border border-slate-200 hover:border-red-500/20 hover:shadow-lg hover:shadow-red-500/5 hover:-translate-y-1 transition-all duration-300">
                <div className="text-4xl font-black text-transparent bg-linear-to-br from-red-500 via-orange-400 to-amber-300 bg-clip-text mb-4">{step.num}</div>
                <div className="font-bold text-slate-900 mb-2 group-hover:text-red-500 transition-colors">{step.title}</div>
                <div className="text-sm text-slate-500 leading-relaxed">{step.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-14 lg:py-20 bg-slate-950 relative overflow-hidden">
        <div className="absolute inset-0 dot-grid-dark opacity-10" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold tracking-widest uppercase bg-red-500/15 text-red-400 border border-red-500/25 mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-red-400 animate-pulse" />
            Free Consultation
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white mb-4">
            Ready to <span className="bg-linear-to-r from-red-400 via-orange-300 to-amber-300 bg-clip-text text-transparent">Grow?</span>
          </h2>
          <p className="text-slate-400 text-lg mb-10 max-w-xl mx-auto">
            Book a free 30-minute call. No commitment — just clarity on how we can help.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/booking" className="inline-flex items-center justify-center gap-2 rounded-xl font-semibold transition-all duration-300 bg-linear-to-r from-red-600 via-red-500 to-orange-500 text-white hover:from-red-500 hover:via-red-400 hover:to-orange-400 shadow-lg hover:shadow-orange-500/25 px-10 py-4 text-base active:scale-95">
              Book a Free Call <ArrowRight className="w-4 h-4" />
            </Link>
            <Link href="/contact" className="inline-flex items-center justify-center gap-2 rounded-xl font-semibold transition-all duration-300 bg-white/10 text-white border border-white/20 hover:bg-white/20 px-10 py-4 text-base">
              Contact Us
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

function ServiceCard({ icon: Icon, title, desc, tag, large }: {
  icon: React.ElementType; title: string; desc: string; tag: string; large?: boolean;
}) {
  return (
    <div className={`group relative flex flex-col bg-linear-to-br from-slate-900 to-slate-800 border border-white/8 rounded-2xl p-7 hover:border-red-500/30 hover:shadow-2xl hover:shadow-red-500/10 hover:-translate-y-1 transition-all duration-300 overflow-hidden ${large ? 'min-h-50' : ''}`}>
      <div className="absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-red-500/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      <div className="absolute top-0 right-0 w-40 h-40 bg-red-500/5 rounded-full -translate-y-1/2 translate-x-1/2 group-hover:bg-red-500/10 transition-colors duration-500" />
      <div className="flex items-center gap-4 mb-4 relative">
        <div className="w-12 h-12 rounded-xl bg-red-500/15 border border-red-500/25 flex items-center justify-center text-red-400 group-hover:scale-110 group-hover:bg-red-500/25 transition-all duration-300">
          <Icon className="w-6 h-6" />
        </div>
        <div className="text-white font-bold text-lg group-hover:text-red-400 transition-colors duration-200">{title}</div>
        {tag && <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-red-500/15 text-red-400 border border-red-500/20">{tag}</span>}
      </div>
      <p className="text-slate-400 text-sm leading-relaxed relative flex-1">{desc}</p>
      <div className="inline-flex items-center gap-1.5 mt-5 text-xs font-semibold text-red-400 opacity-0 group-hover:opacity-100 transition-opacity duration-200 relative">
        Learn More <ChevronRight className="w-3 h-3" />
      </div>
    </div>
  );
}
