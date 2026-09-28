import { SITE, absoluteUrl } from './site';

/**
 * JSON-LD is only emitted for facts that can be verified: the business name,
 * its founder, the public contact details printed on the company's own card,
 * and the pages that exist. No LocalBusiness schema is emitted, because that
 * type expects opening hours and a geocoded storefront which this business
 * does not operate.
 */
export function organizationJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': absoluteUrl('/#organization'),
    name: SITE.name,
    url: absoluteUrl('/'),
    logo: absoluteUrl('/logo.png'),
    description: SITE.description,
    founder: { '@type': 'Person', name: SITE.founder },
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Nakla',
      addressRegion: 'Sherpur, Mymensingh',
      addressCountry: 'BD',
    },
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'customer service',
      telephone: '+8801784753468',
      email: 'creativetechsolutionbd@gmail.com',
      areaServed: 'BD',
      availableLanguage: ['en', 'bn'],
    },
    sameAs: [SITE.githubProfile],
  };
}

export function websiteJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': absoluteUrl('/#website'),
    name: SITE.name,
    url: absoluteUrl('/'),
    publisher: { '@id': absoluteUrl('/#organization') },
    inLanguage: 'en',
  };
}

export function breadcrumbJsonLd(trail: { name: string; path: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: trail.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}

export function JsonLd({ data }: { data: object }) {
  return (
    <script
      type="application/ld+json"
      // Serialised from values this application controls, never user input.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
