/**
 * Editable site copy.
 *
 * Every claim here has to be true. The previous defaults asserted a 2020
 * founding date, 100+ clients, 500+ projects, a 95% satisfaction rate and 24/7
 * availability; none of that is verifiable, so it has been removed rather than
 * hidden. What replaced it describes capability and process, which is both
 * honest and what a client actually needs to know before making contact.
 */
export const CONTENT_DEFAULTS = {
  brand_name: 'Creative Tech Solution BD',
  brand_tagline:
    'A technology and digital solutions company led by Md. Hasibul Hasan, building websites, software and AI solutions for businesses in Bangladesh.',
  contact_phone_primary: '+8801784753468',
  contact_phone_secondary: '+8801794517497',
  contact_email: 'creativetechsolutionbd@gmail.com',
  contact_address: 'Biharirpar, Gonopoddy-2151, Nakla, Sherpur, Mymensingh',
  contact_hours: 'Sat–Thu, 9am–7pm',
  whatsapp_number: '8801784753468',
  social_facebook: '',
  social_linkedin: '',
  social_youtube: '',

  home_badge: 'Web · Software · AI — Bangladesh',
  home_hero_title: 'Modern websites. Smarter digital solutions.',
  home_hero_highlight: 'Smarter digital solutions.',
  home_hero_subtitle:
    'Creative Tech Solution BD builds websites, web applications, e-commerce stores and AI-powered software for businesses and organisations — with a clear scope, a fixed quote and code you can see.',
  home_primary_cta: 'Get a Quote',
  home_secondary_cta: 'View Our Work',
  /** value|label|description per line. Capabilities, never invented metrics. */
  home_trust_points:
    'Real code|Public repositories|Our work is on GitHub, not just in a slide deck\nFixed scope|Written quote first|You know the price and the deliverable before work starts\nModern stack|Next.js, React, Laravel|Chosen per project, not one framework for everything\nDirect contact|You talk to the developer|No account managers relaying messages',
  home_services_heading: 'What we build',
  home_services_subtitle:
    'Websites, software and AI solutions — scoped to what your business actually needs.',
  home_why_heading: 'Why work with us',
  home_process_heading: 'How a project runs',
  home_work_heading: 'Selected projects',
  home_work_subtitle:
    'Real applications, with the source available where the repository is public.',
  home_stack_heading: 'Technologies we work with',
  home_stack_subtitle:
    'Chosen for each project. Nothing on this list is here because it appeared once in a tutorial.',
  home_cta_badge: 'Free consultation',
  home_cta_title: 'Tell us what you need built',
  home_cta_subtitle:
    'Send a short description of your project and you will get a written scope and price — no obligation.',

  about_badge: 'About',
  about_title: 'Built by the developer you actually talk to',
  about_highlight: 'actually talk to',
  about_subtitle:
    'Creative Tech Solution BD is a technology and digital solutions initiative led by Md. Hasibul Hasan, focused on practical websites, software products, AI solutions and digital experiences.',
  about_values_heading: 'How we work',
  about_team_heading: 'Who you work with',
  about_journey_heading: 'Capabilities',

  services_badge: 'Services',
  services_title: 'Services',
  services_subtitle:
    'Each service below is something we build ourselves. If a project needs something we do not do well, we will say so.',
  service_detail_process_heading: 'How it works',
  service_detail_pricing_heading: 'Indicative pricing',
  service_detail_faq_heading: 'Questions',
  service_detail_sidebar_title: 'Request this service',
  service_detail_sidebar_subtitle:
    'Send your requirements and you will get a written scope and price back.',

  portfolio_badge: 'Our work',
  portfolio_title: 'Projects we have built',
  portfolio_highlight: 'built',
  portfolio_subtitle:
    'Real applications from web platforms to machine-learning tools. Where the repository is public, the source is one click away.',

  contact_badge: 'Get in touch',
  contact_title: "Let's talk about your project",
  contact_highlight: 'your project',
  contact_subtitle:
    'Describe what you need and we will reply with questions, a scope and a price.',
  contact_success_title: 'Message sent',
  contact_success_text: 'Thanks — we will get back to you by email.',

  booking_back_label: 'Back to home',
  booking_title: 'Request a quote',
  booking_subtitle: 'No commitment — a conversation about what you need and what it would cost.',
  booking_badge: 'Free consultation',
  booking_success_title: 'Request received',
  booking_success_text: 'We will contact you to confirm the details of your consultation.',

  auth_badge_login: 'Admin access',
  auth_badge_register: 'Create first admin',
  auth_badge_recovery: 'Password recovery',
} as const;

export type ContentKey = keyof typeof CONTENT_DEFAULTS;
export type SiteContent = Record<ContentKey, string>;

export const CONTENT_GROUPS: {
  title: string;
  description: string;
  fields: { key: ContentKey; label: string; multi?: boolean }[];
}[] = [
  {
    title: 'Global Brand & Contact',
    description: 'Header, footer, contact details, and social links.',
    fields: [
      { key: 'brand_name', label: 'Brand Name' },
      { key: 'brand_tagline', label: 'Footer Tagline', multi: true },
      { key: 'contact_phone_primary', label: 'Primary Phone' },
      { key: 'contact_phone_secondary', label: 'Secondary Phone' },
      { key: 'contact_email', label: 'Email' },
      { key: 'contact_address', label: 'Address', multi: true },
      { key: 'contact_hours', label: 'Business Hours' },
      { key: 'whatsapp_number', label: 'WhatsApp Number' },
      { key: 'social_facebook', label: 'Facebook URL (leave blank to hide)' },
      { key: 'social_linkedin', label: 'LinkedIn URL (leave blank to hide)' },
      { key: 'social_youtube', label: 'YouTube URL (leave blank to hide)' },
    ],
  },
  {
    title: 'Home Page',
    description: 'Hero, trust points, section headings, and call to action.',
    fields: [
      { key: 'home_badge', label: 'Hero Badge' },
      { key: 'home_hero_title', label: 'Hero Title' },
      { key: 'home_hero_highlight', label: 'Hero Highlight Text' },
      { key: 'home_hero_subtitle', label: 'Hero Subtitle', multi: true },
      { key: 'home_primary_cta', label: 'Primary CTA Label' },
      { key: 'home_secondary_cta', label: 'Secondary CTA Label' },
      {
        key: 'home_trust_points',
        label: 'Trust points: value|label|description, one per line (keep these factual)',
        multi: true,
      },
      { key: 'home_services_heading', label: 'Services Heading' },
      { key: 'home_services_subtitle', label: 'Services Subtitle', multi: true },
      { key: 'home_work_heading', label: 'Featured Work Heading' },
      { key: 'home_work_subtitle', label: 'Featured Work Subtitle', multi: true },
      { key: 'home_why_heading', label: 'Why Us Heading' },
      { key: 'home_process_heading', label: 'Process Heading' },
      { key: 'home_stack_heading', label: 'Technology Stack Heading' },
      { key: 'home_stack_subtitle', label: 'Technology Stack Subtitle', multi: true },
      { key: 'home_cta_badge', label: 'CTA Badge' },
      { key: 'home_cta_title', label: 'CTA Title' },
      { key: 'home_cta_subtitle', label: 'CTA Subtitle', multi: true },
    ],
  },
  {
    title: 'About Page',
    description: 'About hero and major section headings.',
    fields: [
      { key: 'about_badge', label: 'Hero Badge' },
      { key: 'about_title', label: 'Hero Title' },
      { key: 'about_highlight', label: 'Highlighted Words' },
      { key: 'about_subtitle', label: 'Hero Subtitle', multi: true },
      { key: 'about_values_heading', label: 'How We Work Heading' },
      { key: 'about_team_heading', label: 'Team Heading' },
      { key: 'about_journey_heading', label: 'Capabilities Heading' },
    ],
  },
  {
    title: 'Services Pages',
    description: 'Service listing and service detail shared text.',
    fields: [
      { key: 'services_badge', label: 'Services Badge' },
      { key: 'services_title', label: 'Services Title' },
      { key: 'services_subtitle', label: 'Services Subtitle', multi: true },
      { key: 'service_detail_process_heading', label: 'Detail Process Heading' },
      { key: 'service_detail_pricing_heading', label: 'Detail Pricing Heading' },
      { key: 'service_detail_faq_heading', label: 'Detail FAQ Heading' },
      { key: 'service_detail_sidebar_title', label: 'Detail Sidebar Title' },
      { key: 'service_detail_sidebar_subtitle', label: 'Detail Sidebar Subtitle', multi: true },
    ],
  },
  {
    title: 'Portfolio, Contact, Booking & Auth',
    description: 'Editable text for the remaining public pages.',
    fields: [
      { key: 'portfolio_badge', label: 'Portfolio Badge' },
      { key: 'portfolio_title', label: 'Portfolio Title' },
      { key: 'portfolio_highlight', label: 'Portfolio Highlight' },
      { key: 'portfolio_subtitle', label: 'Portfolio Subtitle', multi: true },
      { key: 'contact_badge', label: 'Contact Badge' },
      { key: 'contact_title', label: 'Contact Title' },
      { key: 'contact_highlight', label: 'Contact Highlight' },
      { key: 'contact_subtitle', label: 'Contact Subtitle', multi: true },
      { key: 'contact_success_title', label: 'Contact Success Title' },
      { key: 'contact_success_text', label: 'Contact Success Text', multi: true },
      { key: 'booking_back_label', label: 'Booking Back Label' },
      { key: 'booking_title', label: 'Booking Title' },
      { key: 'booking_subtitle', label: 'Booking Subtitle', multi: true },
      { key: 'booking_badge', label: 'Booking Badge' },
      { key: 'booking_success_title', label: 'Booking Success Title' },
      { key: 'booking_success_text', label: 'Booking Success Text', multi: true },
      { key: 'auth_badge_login', label: 'Auth Login Badge' },
      { key: 'auth_badge_register', label: 'Auth Register Badge' },
      { key: 'auth_badge_recovery', label: 'Auth Recovery Badge' },
    ],
  },
];
