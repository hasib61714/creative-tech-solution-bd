import type { Metadata } from 'next';
import BookingForm from '../../modules/booking/BookingForm';
import { getSiteContent } from '@/lib/content';

export const metadata: Metadata = {
  title: 'Get a Quote',
  description:
    'Request a free consultation and a written quote from Creative Tech Solution BD for web development, custom software, e-commerce or AI work.',
  alternates: { canonical: '/booking' },
  openGraph: { url: '/booking', title: 'Get a Quote | Creative Tech Solution BD' },
};

export const revalidate = 3600;

export default async function BookingPage() {
  const content = await getSiteContent();
  return <BookingForm content={content} />;
}
