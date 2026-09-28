import type { Metadata } from 'next';
import AuthForm from '../../modules/auth/AuthForm';
import { getSiteContent } from '@/lib/content';

/** Sign-in is for administrators; it should never appear in search results. */
export const metadata: Metadata = {
  title: 'Sign in',
  robots: { index: false, follow: false },
};

export default async function AuthPage() {
  const content = await getSiteContent();
  return <AuthForm content={content} />;
}
