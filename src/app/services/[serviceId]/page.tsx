import { notFound } from 'next/navigation';
import Link from 'next/link';
import { CheckCircle2, ChevronRight, CalendarDays, MessageSquare } from 'lucide-react';
import TopBar from '../../../components/TopBar';
import Navbar from '../../../components/Navbar';
import Footer from '../../../components/Footer';

const SERVICES: Record<string, {
  title: string; category: string; desc: string;
  benefits: string[]; packages: { name: string; price: string; features: string[]; highlight: boolean }[];
}> = {
  'web-development': {
    title: 'Web Development', category: 'Development',
    desc: 'We build fast, scalable websites and web applications using modern technologies like Next.js and React. From landing pages to full e-commerce platforms with admin dashboards.',
    benefits: [
      'Custom Next.js / React applications built to your spec',
      'E-commerce stores with payment integration (SSLCommerz, bKash)',
      'Admin dashboards with full CMS control',
      'API integrations — WhatsApp, email, third-party services',
      'Mobile-responsive and SEO-optimised out of the box',
    ],
    packages: [
      { name: 'Basic',    price: '৳15,000', features: ['Landing page', 'Contact form', 'Mobile responsive'],                      highlight: false },
      { name: 'Standard', price: '৳35,000', features: ['Multi-page site', 'CMS', 'Admin panel', 'Basic SEO'],                     highlight: true  },
      { name: 'Premium',  price: '৳75,000', features: ['Full e-commerce', 'Payment gateway', 'Analytics', 'Priority support'],     highlight: false },
    ],
  },
  'marketing': {
    title: 'Digital Marketing', category: 'Marketing',
    desc: 'Data-driven marketing strategies that generate leads and grow your brand through Google Ads, Facebook & Instagram Ads, email campaigns, and content strategy.',
    benefits: [
      'Google Ads — search, display, and shopping campaigns',
      'Facebook & Instagram paid advertising with precise targeting',
      'Email marketing — sequences, newsletters, automation',
      'Monthly performance reports with clear ROI metrics',
      'A/B testing and ongoing campaign optimisation',
    ],
    packages: [
      { name: 'Basic',    price: '৳8,000/mo',  features: ['1 platform', 'Ad spend management', 'Monthly report'],                 highlight: false },
      { name: 'Standard', price: '৳18,000/mo', features: ['2 platforms', 'A/B testing', 'Weekly report', 'Landing page'],         highlight: true  },
      { name: 'Premium',  price: '৳35,000/mo', features: ['All platforms', 'Dedicated manager', 'Daily optimisation'],            highlight: false },
    ],
  },
  'seo': {
    title: 'SEO', category: 'Search',
    desc: 'Rank higher on Google and drive consistent, high-quality organic traffic with technical SEO audits, on-page optimisation, link building, and monthly reporting.',
    benefits: [
      'Full technical SEO audit — speed, structure, crawlability',
      'On-page optimisation — titles, meta, schema, content',
      'Link building and domain authority growth',
      'Keyword research and competitor analysis',
      'Monthly ranking reports with actionable insights',
    ],
    packages: [
      { name: 'Basic',    price: '৳6,000/mo',  features: ['10 keywords', 'Technical audit', 'Monthly report'],                    highlight: false },
      { name: 'Standard', price: '৳12,000/mo', features: ['30 keywords', 'Link building', 'Content optimisation'],                highlight: true  },
      { name: 'Premium',  price: '৳22,000/mo', features: ['Unlimited keywords', 'Full content strategy', 'Weekly report'],        highlight: false },
    ],
  },
  'ai-solutions': {
    title: 'AI Solutions', category: 'Automation',
    desc: 'Automate repetitive tasks and make smarter decisions with custom AI tools — chatbots, workflow automation, data analysis, and custom integrations.',
    benefits: [
      'AI chatbots for customer support — 24/7 automation',
      'Workflow automation using n8n, Make, or custom code',
      'Data analysis and reporting dashboards',
      'Custom OpenAI / Gemini integrations',
      'WhatsApp and Messenger bot development',
    ],
    packages: [
      { name: 'Basic',    price: '৳20,000', features: ['Simple chatbot', 'FAQ automation', '1 integration'],                      highlight: false },
      { name: 'Standard', price: '৳45,000', features: ['Advanced bot', 'Workflow automation', 'CRM integration'],                 highlight: true  },
      { name: 'Premium',  price: '৳90,000', features: ['Full AI system', 'Custom training', 'Priority support'],                  highlight: false },
    ],
  },
  'design': {
    title: 'UI/UX Design', category: 'Design',
    desc: 'Beautiful, conversion-focused designs that make your brand stand out — from brand identity and logo to full web and app UI with Figma prototypes.',
    benefits: [
      'Brand identity — logo, colours, typography system',
      'Web and mobile app UI/UX design in Figma',
      'Social media graphics and ad creatives',
      'Landing page design optimised for conversions',
      'Prototype and user flow documentation',
    ],
    packages: [
      { name: 'Basic',    price: '৳5,000',  features: ['Logo + brand kit', '3 revisions'],                                        highlight: false },
      { name: 'Standard', price: '৳15,000', features: ['Full brand identity', 'Web UI (5 pages)', 'Figma file'],                  highlight: true  },
      { name: 'Premium',  price: '৳30,000', features: ['Complete design system', 'App UI', 'Social kit', 'Unlimited revisions'],  highlight: false },
    ],
  },
  'support': {
    title: '24/7 Support', category: 'Maintenance',
    desc: 'Dedicated technical support and maintenance to keep your business running — bug fixes, performance monitoring, security updates, and priority response.',
    benefits: [
      'Bug fixes and emergency hotfixes within hours',
      'Performance monitoring and uptime alerts',
      'Security patches and dependency updates',
      'Monthly backup and health check report',
      'Priority support channel via WhatsApp',
    ],
    packages: [
      { name: 'Basic',    price: '৳3,000/mo',  features: ['Business hours support', '4 hrs/mo included'],                         highlight: false },
      { name: 'Standard', price: '৳6,000/mo',  features: ['Extended hours', '10 hrs/mo', 'Performance monitoring'],               highlight: true  },
      { name: 'Premium',  price: '৳12,000/mo', features: ['24/7 support', 'Unlimited fixes', 'Dedicated engineer'],               highlight: false },
    ],
  },
};

const processSteps = [
  'Discovery call & requirements gathering',
  'Strategy & planning phase',
  'Execution & quality delivery',
  'Review, handoff & ongoing support',
];

const faqs = [
  { q: 'How long does it take?',          a: 'Typically 2–4 weeks depending on scope and complexity.' },
  { q: 'Is support included?',            a: 'Yes — 3 months of free technical support after every project.' },
  { q: 'Can I upgrade my package later?', a: 'Absolutely — packages can be upgraded or extended at any time.' },
];

export function generateStaticParams() {
  return Object.keys(SERVICES).map((serviceId) => ({ serviceId }));
}

export default async function ServiceDetailPage({ params }: { params: Promise<{ serviceId: string }> }) {
  const { serviceId } = await params;
  const service = SERVICES[serviceId];
  if (!service) notFound();

  return (
    <div className="min-h-screen bg-white overflow-x-hidden">
      <TopBar />
      <Navbar />

      <div className="py-14 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-sm text-slate-500 mb-8">
            <Link href="/services" className="hover:text-red-600 transition-colors">Services</Link>
            <ChevronRight className="w-3.5 h-3.5 text-slate-300" />
            <span className="text-slate-900 font-medium">{service.title}</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

            {/* Main */}
            <div className="lg:col-span-2 flex flex-col gap-8">
              <div>
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold tracking-widest uppercase bg-red-50 text-red-600 border border-red-200 mb-4">
                  <span className="w-1.5 h-1.5 rounded-full bg-red-500" />
                  {service.category}
                </div>
                <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mb-4">{service.title}</h1>
                <p className="text-slate-500 text-base leading-relaxed">{service.desc}</p>
              </div>

              {/* Benefits */}
              <div className="relative bg-linear-to-br from-slate-900 to-slate-800 border border-white/8 rounded-2xl p-7 overflow-hidden">
                <div className="absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-red-500/60 to-transparent" />
                <h2 className="font-bold text-white text-lg mb-5">What You Get</h2>
                <ul className="flex flex-col gap-3">
                  {service.benefits.map((b) => (
                    <li key={b} className="flex items-start gap-3 text-sm text-slate-400">
                      <CheckCircle2 className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
                      {b}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Process */}
              <div>
                <h2 className="font-bold text-slate-900 text-lg mb-5">How It Works</h2>
                <div className="flex flex-col gap-3">
                  {processSteps.map((step, i) => (
                    <div key={step} className="flex items-start gap-4 p-4 rounded-2xl bg-slate-50 border border-slate-100 hover:border-red-500/20 transition-colors">
                      <span className="w-8 h-8 bg-linear-to-br from-red-600 to-blue-700 rounded-lg text-white text-sm font-bold flex items-center justify-center shrink-0 shadow-md shadow-red-600/20">{i + 1}</span>
                      <span className="text-slate-600 text-sm pt-1">{step}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Pricing */}
              <div>
                <h2 className="font-bold text-slate-900 text-lg mb-5">Pricing Packages</h2>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {service.packages.map((pkg) => (
                    <div key={pkg.name} className={`relative rounded-2xl p-5 flex flex-col gap-3 overflow-hidden ${pkg.highlight ? 'bg-linear-to-br from-slate-900 to-slate-800 border border-red-500/30' : 'bg-white border border-slate-200'}`}>
                      {pkg.highlight && <div className="absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-red-500/60 to-transparent" />}
                      {pkg.highlight && <span className="text-[10px] bg-red-500/15 text-red-400 border border-red-500/20 px-2 py-0.5 rounded-full w-fit font-semibold">Most Popular</span>}
                      <div className={`font-semibold text-sm ${pkg.highlight ? 'text-white' : 'text-slate-900'}`}>{pkg.name}</div>
                      <div className="text-2xl font-extrabold text-transparent bg-linear-to-br from-red-500 to-blue-600 bg-clip-text">{pkg.price}</div>
                      <ul className="flex flex-col gap-1.5">
                        {pkg.features.map((f) => (
                          <li key={f} className={`text-xs flex items-center gap-2 ${pkg.highlight ? 'text-slate-400' : 'text-slate-500'}`}>
                            <span className="w-1.5 h-1.5 rounded-full bg-red-500 shrink-0" />{f}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>

              {/* FAQ */}
              <div>
                <h2 className="font-bold text-slate-900 text-lg mb-5">FAQ</h2>
                <div className="flex flex-col gap-2">
                  {faqs.map((faq) => (
                    <details key={faq.q} className="bg-slate-50 border border-slate-200 hover:border-red-500/20 rounded-2xl group transition-colors">
                      <summary className="px-5 py-4 font-semibold text-slate-900 text-sm cursor-pointer list-none flex justify-between items-center">
                        {faq.q}
                        <ChevronRight className="w-4 h-4 text-red-400 transition-transform group-open:rotate-90" />
                      </summary>
                      <div className="px-5 pb-4 text-sm text-slate-500">{faq.a}</div>
                    </details>
                  ))}
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="bg-linear-to-br from-slate-900 to-slate-800 border border-white/8 rounded-2xl p-7 sticky top-24 overflow-hidden">
                <div className="absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-red-500/60 to-transparent" />
                <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-semibold tracking-widest uppercase bg-red-500/15 text-red-400 border border-red-500/20 mb-4">
                  <span className="w-1 h-1 rounded-full bg-red-400 animate-pulse" />
                  Free Consultation
                </div>
                <h3 className="font-bold text-white text-lg mb-2">Book This Service</h3>
                <p className="text-sm text-slate-400 mb-5">Schedule a free call and we&apos;ll walk you through the entire process.</p>
                <Link href="/booking" className="flex items-center justify-center gap-2 w-full py-3 rounded-xl text-sm font-bold bg-linear-to-r from-red-600 to-blue-700 text-white hover:from-red-500 hover:to-blue-600 shadow-lg shadow-red-600/20 transition-all duration-200 mb-3">
                  <CalendarDays className="w-4 h-4" /> Book a Free Call
                </Link>
                <Link href="/contact" className="flex items-center justify-center gap-2 w-full py-3 rounded-xl text-sm font-semibold bg-white/8 text-slate-300 border border-white/10 hover:border-white/20 hover:text-white transition-all duration-200">
                  <MessageSquare className="w-4 h-4" /> Ask a Question
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
