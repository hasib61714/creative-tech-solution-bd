import type { ReactNode } from 'react';
import TopBar from './TopBar';
import Navbar from './Navbar';
import Footer from './Footer';
import { getSiteContent } from '@/lib/content';

/**
 * The page chrome, resolved on the server.
 *
 * The header and footer previously fetched /api/content from the browser on
 * every page, which cost a request per visit and flashed default text before
 * the real contact details arrived. Reading it once here removes both, and
 * keeps database reads down — which matters on a free tier.
 */
export default async function SiteShell({ children }: { children: ReactNode }) {
  const content = await getSiteContent();
  return (
    <div className="flex min-h-screen flex-col overflow-x-hidden bg-white">
      <TopBar content={content} />
      <Navbar />
      <main id="main" className="flex-1">
        {children}
      </main>
      <Footer content={content} />
    </div>
  );
}
