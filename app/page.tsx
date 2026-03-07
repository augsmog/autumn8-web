import { Navbar } from '@/components/navbar';
import { Hero } from '@/components/hero';
import { Features } from '@/components/features';
import { Benefits } from '@/components/benefits';
import { HowItWorks } from '@/components/how-it-works';
import { Pricing } from '@/components/pricing';
import { CTA } from '@/components/cta';
import { Footer } from '@/components/footer';

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <Hero />
      <Features />
      <Benefits />
      <HowItWorks />
      <Pricing />
      <CTA />
      <Footer />
    </div>
  );
}
