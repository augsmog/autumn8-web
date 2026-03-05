import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Nav from '@/components/nav';
import Footer from '@/components/footer';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

export const metadata: Metadata = {
  title: {
    default: 'Autumn8 — Service Business Automation',
    template: '%s | Autumn8',
  },
  description:
    'Managed automation for pest control, lawn care, and pool service companies. Lead follow-up, scheduling, invoicing, reviews, and reporting — handled for you.',
  keywords: [
    'service business automation',
    'pest control automation',
    'lawn care software',
    'pool service automation',
    'GoHighLevel automation',
    'managed automation service',
  ],
  authors: [{ name: 'Autumn8' }],
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://autumn8.me',
    siteName: 'Autumn8',
    title: 'Autumn8 — Your Service Business, On Autopilot',
    description:
      'We handle lead follow-up, scheduling, invoicing, reviews, and reporting for pest control, lawn care, and pool service companies.',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Autumn8 — Service Business Automation',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Autumn8 — Your Service Business, On Autopilot',
    description: 'Managed automation for service businesses. Starting at $1,297/month.',
    images: ['/og-image.png'],
  },
  robots: {
    index: true,
    follow: true,
  },
  metadataBase: new URL('https://autumn8.me'),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.variable}>
      <body>
        <Nav />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
