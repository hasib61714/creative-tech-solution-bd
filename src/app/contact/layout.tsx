import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact Us | Creative Tech Solution BD',
  description: 'Get in touch with Creative Tech Solution BD. We respond within 24 hours. Phone, email, WhatsApp, or visit our office in Sherpur, Bangladesh.',
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return children;
}
