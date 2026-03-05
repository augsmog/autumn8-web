import Navbar from '@/components/navbar';
import Hero from '@/components/sections/hero';
import LogoBar from '@/components/sections/logo-bar';
import Problem from '@/components/sections/problem';
import Solution from '@/components/sections/solution';
import Pillars from '@/components/sections/pillars';
import Process from '@/components/sections/process';
import Results from '@/components/sections/results';
import Pricing from '@/components/sections/pricing';
import TechStack from '@/components/sections/tech-stack';
import FAQ from '@/components/sections/faq';
import FinalCTA from '@/components/sections/final-cta';
import SiteFooter from '@/components/site-footer';

export default function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <LogoBar />
      <Problem />
      <Solution />
      <Pillars />
      <Process />
      <Results />
      <Pricing />
      <TechStack />
      <FAQ />
      <FinalCTA />
      <SiteFooter />
    </>
  );
}
