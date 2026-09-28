import { db, isDatabaseConfigured } from '@/db/drizzle';
import { servicesTable } from '@/db/schema';
import { eq } from 'drizzle-orm';

/**
 * Service definitions.
 *
 * Prices are indicative starting points, labelled as such — every project is
 * quoted individually. Nothing here promises round-the-clock availability or a
 * guaranteed uptime figure, because neither could be honoured by a small team.
 */
export type ServicePackage = {
  name: string;
  price: string;
  features: string[];
  highlight: boolean;
};

export type Service = {
  id: string;
  title: string;
  category: string;
  /** One line for the card. */
  summary: string;
  /** Longer description for the detail page. */
  description: string;
  /** Who the service is for. */
  audience: string;
  benefits: string[];
  technologies: string[];
  packages: ServicePackage[];
  from: string;
  tag?: string;
};

export const SERVICES: Service[] = [
  {
    id: 'web-development',
    title: 'Web Development',
    category: 'Development',
    tag: 'Most requested',
    summary: 'Websites and web applications built to your requirements, not adapted from a template.',
    description:
      'Business websites, web applications and e-commerce stores built with Next.js, React or Laravel — server-rendered where that makes them faster, and responsive on the phones most of your visitors will use.',
    audience:
      'Businesses that need a website they can update themselves, and organisations replacing a manual process with a web application.',
    benefits: [
      'Custom Next.js / React applications built to your specification',
      'E-commerce stores with product management and payment integration',
      'Admin panels so you can change content without a developer',
      'API integrations — email, WhatsApp, payment gateways, third-party services',
      'Responsive on mobile and optimised for search from the start',
    ],
    technologies: ['Next.js', 'React', 'TypeScript', 'Laravel', 'PHP', 'Node.js', 'MySQL', 'Tailwind CSS'],
    from: '৳15,000',
    packages: [
      { name: 'Landing page', price: 'from ৳15,000', features: ['Single page', 'Contact form', 'Mobile responsive', 'Basic SEO setup'], highlight: false },
      { name: 'Business site', price: 'from ৳35,000', features: ['Multi-page site', 'Admin panel', 'Content you can edit', 'SEO and analytics'], highlight: true },
      { name: 'Web application', price: 'from ৳75,000', features: ['Custom application logic', 'User accounts', 'Payment integration', 'Ongoing support plan'], highlight: false },
    ],
  },
  {
    id: 'ai-solutions',
    title: 'AI & Automation',
    category: 'AI',
    tag: 'New',
    summary: 'Machine-learning models and AI integrations wired into software you already use.',
    description:
      'Classification and prediction models trained in Python and served behind an API, plus integrations with hosted AI services. The point is not the model on its own — it is the model connected to the system that needs the answer.',
    audience:
      'Businesses with a repetitive judgement task — routing, classifying, scoring or summarising — that currently takes staff time.',
    benefits: [
      'Custom classification and prediction models in Python',
      'Models served over a FastAPI endpoint any application can call',
      'Integration with hosted AI APIs where that is the cheaper answer',
      'Workflow automation between the tools you already run',
      'Honest assessment of whether a problem actually needs machine learning',
    ],
    technologies: ['Python', 'FastAPI', 'scikit-learn', 'NLP', 'AI APIs', 'REST APIs'],
    from: '৳20,000',
    packages: [
      { name: 'Integration', price: 'from ৳20,000', features: ['One AI API integration', 'Connected to your existing system'], highlight: false },
      { name: 'Custom model', price: 'from ৳45,000', features: ['Model trained on your data', 'Served behind an API', 'Accuracy reporting'], highlight: true },
      { name: 'Automation system', price: 'from ৳90,000', features: ['Multiple integrated steps', 'Admin dashboard', 'Support plan'], highlight: false },
    ],
  },
  {
    id: 'design',
    title: 'UI/UX Design',
    category: 'Design',
    summary: 'Interface and flow designed in Figma before anything gets built.',
    description:
      'Layout, navigation and screen design worked out as a prototype first. Deciding how a product should behave in Figma is considerably cheaper than discovering it in code.',
    audience: 'Anyone commissioning a new product or redesigning one that users find confusing.',
    benefits: [
      'Web and application interface design in Figma',
      'Clickable prototypes before development starts',
      'Responsive layouts designed for phones first',
      'A design system — colours, type and components — kept consistent',
      'Brand identity work where it is needed',
    ],
    technologies: ['Figma', 'Tailwind CSS', 'Design systems'],
    from: '৳5,000',
    packages: [
      { name: 'Brand basics', price: 'from ৳5,000', features: ['Logo and colour system', 'Typography choices'], highlight: false },
      { name: 'Product design', price: 'from ৳15,000', features: ['Up to 5 screens', 'Figma prototype', 'Responsive layouts'], highlight: true },
      { name: 'Design system', price: 'from ৳30,000', features: ['Full component library', 'Application UI', 'Handoff documentation'], highlight: false },
    ],
  },
  {
    id: 'seo',
    title: 'SEO',
    category: 'Search',
    summary: 'Technical SEO — the part of search ranking that is engineering rather than guesswork.',
    description:
      'Site structure, metadata, structured data, page speed and crawlability. We do the technical work that search engines actually measure and report on what changed, without promising a ranking position nobody can guarantee.',
    audience: 'Businesses whose site exists but does not appear in search results for what they sell.',
    benefits: [
      'Technical audit — speed, structure, crawlability, indexing',
      'On-page optimisation: titles, meta descriptions, headings, structured data',
      'Core Web Vitals and page-speed improvements',
      'XML sitemap, robots and canonical URL configuration',
      'Reports on what changed and what it measurably affected',
    ],
    technologies: ['Core Web Vitals', 'Schema.org', 'Google Search Console', 'Analytics'],
    from: '৳6,000',
    packages: [
      { name: 'Audit', price: 'from ৳6,000', features: ['Full technical audit', 'Prioritised fix list'], highlight: false },
      { name: 'Audit + fixes', price: 'from ৳12,000', features: ['Audit', 'Technical fixes implemented', 'Structured data'], highlight: true },
      { name: 'Ongoing', price: 'from ৳22,000/mo', features: ['Continuous optimisation', 'Content guidance', 'Monthly reporting'], highlight: false },
    ],
  },
  {
    id: 'marketing',
    title: 'Digital Marketing',
    category: 'Marketing',
    summary: 'Paid campaigns on Google and Meta, with the spend and the results reported plainly.',
    description:
      'Campaign setup, targeting and ongoing optimisation on Google Ads and Meta. You see what was spent and what it produced; we do not report on impressions when the thing you care about is enquiries.',
    audience: 'Businesses with a working website that now need people arriving at it.',
    benefits: [
      'Google Ads campaign setup and management',
      'Facebook and Instagram advertising',
      'Conversion tracking wired to your site properly',
      'Landing pages built to match the campaign',
      'Reporting on spend against actual enquiries',
    ],
    technologies: ['Google Ads', 'Meta Ads', 'Google Analytics', 'Conversion tracking'],
    from: '৳8,000',
    packages: [
      { name: 'Setup', price: 'from ৳8,000', features: ['One platform', 'Campaign and tracking setup'], highlight: false },
      { name: 'Managed', price: 'from ৳18,000/mo', features: ['Two platforms', 'Ongoing optimisation', 'Monthly reporting'], highlight: true },
      { name: 'Full service', price: 'from ৳35,000/mo', features: ['All platforms', 'Landing pages included', 'Weekly reporting'], highlight: false },
    ],
  },
  {
    id: 'support',
    title: 'Maintenance & Support',
    category: 'Maintenance',
    summary: 'Keeping a site fast, patched and working after it goes live.',
    description:
      'Bug fixes, dependency and security updates, backups and performance checks on an agreed monthly arrangement. Response is within business hours — we would rather commit to a window we can actually meet than advertise one we cannot.',
    audience: 'Anyone running a site or application who does not have a developer in-house.',
    benefits: [
      'Bug fixes and issue resolution',
      'Security patches and dependency updates',
      'Regular backups and restore checks',
      'Performance and uptime monitoring',
      'A named contact who already knows your codebase',
    ],
    technologies: ['Monitoring', 'Backups', 'Dependency management'],
    from: '৳3,000/mo',
    packages: [
      { name: 'Essential', price: 'from ৳3,000/mo', features: ['Business-hours support', '4 hours included monthly', 'Security updates'], highlight: false },
      { name: 'Standard', price: 'from ৳6,000/mo', features: ['10 hours included monthly', 'Performance monitoring', 'Backups'], highlight: true },
      { name: 'Priority', price: 'from ৳12,000/mo', features: ['Priority response', 'Extended hours', 'Monthly health report'], highlight: false },
    ],
  },
];

export const SERVICE_SLUGS = SERVICES.map((service) => service.id);

export function getServiceById(id: string): Service | undefined {
  return SERVICES.find((service) => service.id === id);
}

/**
 * Database-managed services take precedence when rows exist; otherwise the
 * definitions above are used, so the site is complete with no database.
 */
export async function getServices(): Promise<Service[]> {
  if (!isDatabaseConfigured()) return SERVICES;
  try {
    const rows = await db.select().from(servicesTable).where(eq(servicesTable.active, true));
    if (!rows.length) return SERVICES;
    return rows.map((row, index) => {
      const fallback = SERVICES[index % SERVICES.length];
      const features = (row.features || '')
        .split('\n')
        .map((feature) => feature.trim())
        .filter(Boolean);
      return {
        ...fallback,
        id: row.slug,
        title: row.title,
        tag: row.tag || undefined,
        summary: row.description || fallback.summary,
        description: row.description || fallback.description,
        benefits: features.length ? features : fallback.benefits,
        from: row.fromPrice || 'Contact us',
      };
    });
  } catch {
    return SERVICES;
  }
}

export async function getService(id: string): Promise<Service | undefined> {
  const services = await getServices();
  return services.find((service) => service.id === id) ?? getServiceById(id);
}
