import type { Metadata } from 'next';
import Hero from '@/components/hero';
import PainPoints from '@/components/pain-points';
import HowItWorks from '@/components/how-it-works';
import AutomationsGrid from '@/components/automations-grid';
import Results from '@/components/results';
import PricingTeaser from '@/components/pricing-teaser';
import IndustriesSection from '@/components/industries-section';
import FAQ from '@/components/faq';
import CTABanner from '@/components/cta-banner';

export const metadata: Metadata = {
  title: 'Autumn8 — Your Service Business, On Autopilot',
  description:
    'Managed automation for pest control, lawn care, and pool service companies. Lead follow-up, scheduling, invoicing, reviews, and reporting — starting at $1,297/month.',
};

export default function Home() {
  return (
    <>
      <Hero />
      <PainPoints />
      <HowItWorks />
      <AutomationsGrid />
      <Results />
      <PricingTeaser />
      <IndustriesSection />
      <FAQ />
      <CTABanner />
    </>
  );
}
