import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Autumn8 — Managed Business Automation for Service Companies',
  description:
    "We manage your leads, scheduling, invoicing, reviews, and reporting. Focus on your work. We'll handle the rest. Free operations audit available.",
  keywords: ['service business automation', 'field service automation', 'home service automation', 'GoHighLevel', 'managed automation'],
  authors: [{ name: 'Autumn8' }],
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://autumn8.me',
    siteName: 'Autumn8',
    title: 'Autumn8 — Stop Running Your Business. Start Growing It.',
    description:
      'Managed business automation for pest control, lawn care, pool maintenance, and home service companies. 90-day performance guarantee.',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'Autumn8' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Autumn8 — Stop Running Your Business. Start Growing It.',
    description: 'Managed business automation for service companies. Free operations audit.',
    images: ['/og-image.png'],
  },
  robots: { index: true, follow: true },
  metadataBase: new URL('https://autumn8.me'),
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={inter.className}>
      <body>{children}</body>
    </html>
  );
}
