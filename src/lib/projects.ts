/**
 * Real project records.
 *
 * Every entry below describes an actual repository owned by Md. Hasibul Hasan
 * (github.com/hasib61714). Descriptions are written from what the repository
 * actually contains — there are no invented clients, no invented metrics and
 * no invented business outcomes. `githubUrl` is only set for repositories that
 * are public; private work is still listed (so the portfolio reflects reality)
 * but renders without a dead link.
 *
 * This array is the fallback source of truth. When the database holds
 * portfolio rows they take precedence, so the owner can manage projects from
 * /admin/portfolio — but the site is fully functional with no database at all,
 * which keeps the ৳0 deployment path open.
 */

export const PROJECT_CATEGORIES = [
  'Web Development',
  'AI & Machine Learning',
  'SaaS',
  'E-commerce',
  'UI/UX',
  'Academic',
] as const;

export const PROJECT_STATUSES = ['Live', 'In Development', 'Completed', 'Prototype', 'Archived'] as const;

export const PROJECT_TYPES = [
  'Personal Project',
  'Experimental Project',
  'Academic Project',
  'Internal Product',
  'Client Project',
  'Open Source Project',
  'Demo Project',
] as const;

export type ProjectCategory = (typeof PROJECT_CATEGORIES)[number];
export type ProjectStatus = (typeof PROJECT_STATUSES)[number];
export type ProjectType = (typeof PROJECT_TYPES)[number];

export type Project = {
  slug: string;
  title: string;
  shortDescription: string;
  /** Paragraphs for the case study page. */
  fullDescription: string[];
  /** What the project sets out to solve. */
  purpose: string;
  /** Notable capabilities that are actually implemented or in progress. */
  features: string[];
  category: ProjectCategory;
  technologies: string[];
  githubUrl?: string;
  liveUrl?: string;
  /** Optional screenshot under /public. Cards fall back to a branded mockup. */
  image?: string;
  featured: boolean;
  status: ProjectStatus;
  projectType: ProjectType;
  year: number;
  /** Shown instead of a GitHub button when the repository is not public. */
  repositoryNote?: string;
};

export const PROJECTS: Project[] = [
  {
    slug: 'imap-platform',
    title: 'IMAP — Hyperlocal Service Platform',
    shortDescription:
      'A hyperlocal multi-service assistance platform for Bangladesh with booking, negotiation, live tracking and an admin back office, in English and Bengali.',
    fullDescription: [
      'IMAP connects people who need everyday help — repairs, transport, emergency assistance — with nearby providers, and handles the whole interaction rather than just the introduction.',
      'The platform is built around real-time location: providers are matched by proximity using PostGIS, and both sides follow the job on a live map over a socket connection. Pricing is not fixed — a negotiation flow lets the customer and provider agree a price before the job is confirmed, which reflects how these services are actually bought in Bangladesh.',
      'The whole interface is bilingual (English and Bengali), and an admin back office covers dispatch, provider management and oversight of live jobs.',
    ],
    purpose:
      'Local service booking in Bangladesh usually happens over phone calls with no tracking, no agreed price and no record. IMAP puts that process online without removing the negotiation step people expect.',
    features: [
      'Proximity-based provider matching with PostGIS',
      'Price negotiation flow before a booking is confirmed',
      'Live job tracking over Socket.IO',
      'Emergency dispatch handling',
      'Admin back office for providers, bookings and live jobs',
      'Full English / Bengali bilingual interface',
    ],
    category: 'Web Development',
    technologies: ['TypeScript', 'React', 'Node.js', 'Express', 'PostgreSQL', 'PostGIS', 'Prisma', 'Socket.IO'],
    featured: true,
    status: 'In Development',
    projectType: 'Academic Project',
    year: 2026,
    repositoryNote: 'Source repository is private while the project is in development.',
  },
  {
    slug: 'nabarun-alumni-sasims',
    title: 'Nabarun SASIMS — Alumni & Staff Information System',
    shortDescription:
      'A student, alumni and staff information management system built for the Nabarun Education Family.',
    fullDescription: [
      'SASIMS is a record system for an education institution: it holds student, alumni and staff information in one place instead of across spreadsheets.',
      'The focus is on the parts that make institutional records painful — keeping alumni reachable after they leave, keeping staff records current, and making any of it searchable without asking the office.',
    ],
    purpose:
      'Schools and colleges lose contact with alumni almost immediately after graduation, and staff records drift out of date. A single managed directory fixes both.',
    features: [
      'Student, alumni and staff records in one directory',
      'Searchable and filterable listings',
      'Structured profiles rather than free-form spreadsheets',
      'Built as a web application, usable on a phone',
    ],
    category: 'Web Development',
    technologies: ['TypeScript', 'React', 'Node.js'],
    githubUrl: 'https://github.com/hasib61714/nabarun-alumni-sasims',
    featured: true,
    status: 'Completed',
    projectType: 'Personal Project',
    year: 2026,
  },
  {
    slug: 'internship-hub',
    title: 'Internship Hub',
    shortDescription:
      'An internship platform pairing a JavaScript front end with a Laravel REST API backed by MySQL.',
    fullDescription: [
      'Internship Hub is a two-part application: a JavaScript client and a separate Laravel REST API with a MySQL database.',
      'Splitting the API from the interface means the same backend can serve a web client and, later, a mobile one — a structure worth using whenever a project is expected to grow past a single front end.',
      'The backend repository is available separately at github.com/hasib61714/internship-hub-backend.',
    ],
    purpose:
      'Students and employers need a shared place to list and find internships, with applications tracked rather than lost in email.',
    features: [
      'Laravel REST API with MySQL persistence',
      'Separate JavaScript front-end client',
      'Internship listings and applications',
      'API-first structure that supports additional clients later',
    ],
    category: 'Web Development',
    technologies: ['PHP', 'Laravel', 'MySQL', 'JavaScript', 'REST API'],
    githubUrl: 'https://github.com/hasib61714/internship-hub',
    featured: true,
    status: 'Completed',
    projectType: 'Personal Project',
    year: 2026,
  },
  {
    slug: 'hair-erp',
    title: 'HairHub ERP',
    shortDescription:
      'A full-stack ERP interface for a salon business, built on React, TypeScript, Tailwind CSS and Supabase.',
    fullDescription: [
      'HairHub ERP is an internal business system rather than a public website: the kind of tool a salon uses day to day to run bookings, services and records.',
      'It is built on Supabase, which supplies the PostgreSQL database and authentication, with a React and TypeScript front end styled in Tailwind CSS. That combination is worth noting for small businesses — it removes most of the backend hosting cost from an internal tool.',
    ],
    purpose:
      'Small service businesses run on paper diaries and WhatsApp. An ERP interface gives them one place for the operational record.',
    features: [
      'React + TypeScript front end',
      'Supabase PostgreSQL backend with authentication',
      'Tailwind CSS design system',
      'Built as an internal operations tool, not a brochure site',
    ],
    category: 'SaaS',
    technologies: ['TypeScript', 'React', 'Supabase', 'PostgreSQL', 'Tailwind CSS'],
    githubUrl: 'https://github.com/hasib61714/hair-erp-main',
    featured: true,
    status: 'Completed',
    projectType: 'Personal Project',
    year: 2026,
  },
  {
    slug: 'heart-disease-prediction',
    title: 'Heart Disease Prediction',
    shortDescription:
      'A machine-learning system that estimates heart-disease risk from clinical inputs, served through a FastAPI backend with a React interface.',
    fullDescription: [
      'A scikit-learn model is trained on clinical indicators and served over a FastAPI endpoint, with a React front end collecting the inputs and presenting the result.',
      'The interesting part is the shape rather than the model: the trained model sits behind an HTTP API, so the same prediction service can be called from any client. That is the same pattern used to add an AI feature to an existing business application.',
      'This is a data-science project. It is not a medical device and is not intended for clinical use.',
    ],
    purpose:
      'A working demonstration of taking a trained model out of a notebook and putting it behind an API that an ordinary web interface can call.',
    features: [
      'scikit-learn classification model',
      'FastAPI prediction endpoint',
      'React interface for entering clinical inputs',
      'Clean separation between model, API and interface',
    ],
    category: 'AI & Machine Learning',
    technologies: ['Python', 'FastAPI', 'scikit-learn', 'React', 'JavaScript'],
    githubUrl: 'https://github.com/hasib61714/heart-disease-prediction',
    featured: true,
    status: 'Completed',
    projectType: 'Experimental Project',
    year: 2025,
  },
  {
    slug: 'creative-tech-solution-bd',
    title: 'This Website',
    shortDescription:
      'The site you are reading: a Next.js application with a database-backed admin panel for services, portfolio, bookings and contact messages.',
    fullDescription: [
      'Creative Tech Solution BD runs on the same stack offered to clients, and the source is public — which is the most direct evidence of how the work is actually built.',
      'It is a Next.js App Router application in TypeScript, rendering on the server where that is faster, with Drizzle ORM over MySQL/MariaDB. Authentication uses bcrypt password hashing and httpOnly JWT cookies, with a permission system behind every admin route.',
      'The admin panel manages services, portfolio projects, bookings, contact messages and editable site content, so the business is not dependent on a developer to change its own copy.',
    ],
    purpose:
      'A company site should be able to stand as its own work sample. This one does, and it is deliberately cheap to run.',
    features: [
      'Next.js App Router with server-rendered pages',
      'Drizzle ORM over MySQL / MariaDB',
      'Admin panel for services, portfolio, bookings and messages',
      'Permission-scoped authentication with hashed passwords',
      'Zod validation on every form endpoint',
      'Runs on a free hosting tier with no hardcoded domain',
    ],
    category: 'Web Development',
    technologies: ['Next.js', 'React', 'TypeScript', 'Tailwind CSS', 'Drizzle ORM', 'MySQL'],
    githubUrl: 'https://github.com/hasib61714/creative-tech-solution-bd',
    featured: true,
    status: 'Live',
    projectType: 'Internal Product',
    year: 2026,
  },
  {
    slug: 'imap-bangladesh',
    title: 'IMAP Bangladesh',
    shortDescription:
      'An earlier AI-assisted multi-service platform built on React and Node.js — the groundwork the current IMAP platform grew out of.',
    fullDescription: [
      'IMAP Bangladesh is the first iteration of the multi-service platform idea, built in JavaScript on React and Node.js.',
      'It established the service-matching model that the later TypeScript platform rebuilt on a stronger foundation. Listing both is deliberate: the second version exists because the first one was built and its limits were understood.',
    ],
    purpose:
      'The first working version of a single platform for booking everyday local services in Bangladesh.',
    features: [
      'React front end on a Node.js backend',
      'Multi-service booking model',
      'AI-assisted service matching',
    ],
    category: 'Web Development',
    technologies: ['JavaScript', 'React', 'Node.js'],
    githubUrl: 'https://github.com/hasib61714/imap-bangladesh',
    featured: false,
    status: 'Archived',
    projectType: 'Personal Project',
    year: 2026,
  },
  {
    slug: 'fake-news-detector',
    title: 'Fake News Detector',
    shortDescription:
      'An NLP classifier that separates fake from real news using TF-IDF feature extraction across several algorithms.',
    fullDescription: [
      'Text is converted to TF-IDF features and classified by several algorithms, so their accuracy can be compared on the same data rather than a single model being assumed correct.',
      'It is a natural-language-processing exercise, and the same approach applies directly to commercial work: spam filtering, support-ticket routing and content moderation are all the same classification problem with different labels.',
    ],
    purpose:
      'A comparison of classical NLP classification algorithms on a real labelled dataset.',
    features: [
      'TF-IDF feature extraction',
      'Multiple classification algorithms compared',
      'Evaluation across the same labelled dataset',
    ],
    category: 'AI & Machine Learning',
    technologies: ['Python', 'scikit-learn', 'NLP', 'TF-IDF'],
    githubUrl: 'https://github.com/hasib61714/Fake-News-Detector',
    featured: false,
    status: 'Completed',
    projectType: 'Experimental Project',
    year: 2026,
  },
  {
    slug: 'sorting-algorithm-visualizer',
    title: 'Sorting Algorithm Visualizer',
    shortDescription:
      'An interactive visualiser that animates sorting algorithms step by step in the browser.',
    fullDescription: [
      'A browser tool that animates how sorting algorithms move data, one comparison at a time.',
      'Small, but a genuine test of front-end work: animating state changes smoothly without the interface stuttering is the same problem as any data-heavy dashboard.',
    ],
    purpose: 'Making an abstract algorithm visible, and a practical exercise in animated interface state.',
    features: [
      'Step-by-step animation of sorting algorithms',
      'Interactive controls',
      'Runs entirely in the browser',
    ],
    category: 'UI/UX',
    technologies: ['JavaScript', 'HTML', 'CSS'],
    githubUrl: 'https://github.com/hasib61714/sorting-algorithm-visualizer',
    featured: false,
    status: 'Completed',
    projectType: 'Experimental Project',
    year: 2026,
  },
  {
    slug: 'developer-portfolio',
    title: 'Developer Portfolio',
    shortDescription:
      'A personal portfolio site for Md. Hasibul Hasan, built from HTML, CSS and JavaScript without a framework.',
    fullDescription: [
      'A portfolio site built directly in HTML, CSS and JavaScript.',
      'Worth keeping in the list as a deliberate counterpoint: not every site needs a framework. A small static site with no build step is faster and cheaper to host than the same content on React, and choosing correctly between the two is part of the job.',
    ],
    purpose: 'A personal portfolio, and a demonstration that a static site is sometimes the right answer.',
    features: [
      'No framework and no build step',
      'Responsive layout in plain CSS',
      'Deployable to any static host at no cost',
    ],
    category: 'Web Development',
    technologies: ['HTML', 'CSS', 'JavaScript'],
    githubUrl: 'https://github.com/hasib61714/hasibul-portfolio-v5',
    featured: false,
    status: 'Completed',
    projectType: 'Personal Project',
    year: 2026,
  },
];

export function getFeaturedProjects(limit = 6): Project[] {
  const featured = PROJECTS.filter((p) => p.featured);
  return (featured.length ? featured : PROJECTS).slice(0, limit);
}

export function getProjectBySlug(slug: string): Project | undefined {
  return PROJECTS.find((p) => p.slug === slug);
}

/** Categories that actually have at least one project, for the filter bar. */
export function getUsedCategories(projects: Project[]): string[] {
  const used = PROJECT_CATEGORIES.filter((c) => projects.some((p) => p.category === c));
  return ['All', ...used];
}
