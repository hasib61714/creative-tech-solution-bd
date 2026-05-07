import type { Metadata } from 'next';
import BookingForm from '../../modules/booking/BookingForm';

export const metadata: Metadata = {
  title: 'Book a Service | Creative Tech Solution BD',
  description: 'Book a free consultation or service with Creative Tech Solution BD. Web development, digital marketing, SEO, AI solutions and more.',
};

export default function BookingPage() {
  return <BookingForm />;
}
