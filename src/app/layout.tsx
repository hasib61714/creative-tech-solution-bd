import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { SITE, SITE_URL } from "@/lib/site";
import { organizationJsonLd, websiteJsonLd, JsonLd } from "@/lib/structured-data";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  // Every relative URL in metadata below resolves against this, so switching
  // to a custom domain is a single environment-variable change.
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Creative Tech Solution BD | Web Development & Digital Solutions",
    template: `%s | ${SITE.name}`,
  },
  description: SITE.description,
  applicationName: SITE.name,
  keywords: [
    "web development Bangladesh",
    "website development Bangladesh",
    "custom software development Bangladesh",
    "AI solutions Bangladesh",
    "e-commerce development Bangladesh",
    "SEO services Bangladesh",
  ],
  authors: [{ name: SITE.founder }],
  creator: SITE.founder,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    siteName: SITE.name,
    locale: SITE.locale,
    url: "/",
    title: "Creative Tech Solution BD | Web Development & Digital Solutions",
    description: SITE.description,
  },
  twitter: {
    card: "summary_large_image",
    title: "Creative Tech Solution BD | Web Development & Digital Solutions",
    description: SITE.description,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
};

export const viewport: Viewport = {
  themeColor: "#020617",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} h-full antialiased`}>
      <body
        suppressHydrationWarning
        className="min-h-full flex flex-col bg-white text-slate-900"
      >
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-100 focus:rounded-lg focus:bg-white focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-slate-900 focus:shadow-lg focus:outline-2 focus:outline-offset-2 focus:outline-blue-600"
        >
          Skip to main content
        </a>
        {children}
        <JsonLd data={organizationJsonLd()} />
        <JsonLd data={websiteJsonLd()} />
      </body>
    </html>
  );
}
