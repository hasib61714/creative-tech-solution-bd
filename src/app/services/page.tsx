import type { Metadata } from 'next';
import ServiceList from '../../modules/services/ServiceList';

export const metadata: Metadata = {
  title: 'Services | Creative Tech Solution BD',
  description: 'Explore our full range of services: web development, digital marketing, SEO, AI solutions, UI/UX design, and 24/7 technical support.',
};

export default function ServicesPage() {
  return <ServiceList />;
}
