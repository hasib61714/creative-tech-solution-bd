import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Portfolio | Creative Tech Solution BD',
  description: 'See our work — web apps, marketing campaigns, UI/UX designs, and AI solutions delivered for clients across Bangladesh.',
};

export default function PortfolioLayout({ children }: { children: React.ReactNode }) {
  return children;
}
