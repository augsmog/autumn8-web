import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle2, ArrowRight, Settings, PlayCircle, Rocket, Clock } from "lucide-react";
import Link from "next/link";

const steps = [
  {
    number: "01",
    icon: Settings,
    title: "Sign Up & Tell Us About Your Business",
    description: "Pick your plan and fill out a quick 5-minute form about your services, your customers, and your goals.",
    details: [
      "Choose Foundation, Growth, or Scale based on your needs",
      "Tell us your industry, service area, and team size",
      "Share your current online presence and competitors",
      "Set your goals for the first 90 days",
    ],
    timeline: "5 minutes",
  },
  {
    number: "02",
    icon: PlayCircle,
    title: "We Configure Everything Automatically",
    description: "Your lead capture, scheduling, invoicing, review management, SEO, and reporting — all set up and running within 24 hours.",
    details: [
      "Google Business Profile optimized and connected",
      "Lead capture forms and speed-to-lead workflows activated",
      "Review request and response automation enabled",
      "SEO keywords generated for your industry and location",
    ],
    timeline: "Under 24 hours",
  },
  {
    number: "03",
    icon: Rocket,
    title: "Your Business Starts Growing",
    description: "Leads get responded to instantly. Reviews get managed. Revenue grows. You get weekly reports showing exactly what happened.",
    details: [
      "Weekly performance digest delivered every Monday",
      "Monthly comprehensive report with ROI analysis",
      "Real-time dashboard showing leads, reviews, and revenue",
      "Escalation alerts only when something truly needs your attention",
    ],
    timeline: "Ongoing",
  },
];

const integrations = [
  "GoHighLevel CRM",
  "Stripe Payments",
  "Twilio SMS & Voice",
  "Google Business Profile",
  "Google Maps API",
  "Resend Email",
  "Claude AI",
  "Playwright",
];

export default function HowItWorksPage() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-orange-50 to-white">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-5xl sm:text-6xl lg:text-7xl mb-6 text-gray-900">
            How Autumn8
            <br />
            <span className="bg-gradient-to-r from-slate-700 to-orange-500 bg-clip-text text-transparent">
              Runs Your Business
            </span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-10">
            From signup to fully operational in under 24 hours. No software to learn, no calls to schedule, no onboarding sessions.
          </p>
        </div>
      </section>

      {/* Detailed Steps */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto space-y-20">
          {steps.map((step, index) => {
            const Icon = step.icon;
            const isEven = index % 2 === 0;

            return (
              <div
                key={index}
                className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
              >
                <div className={isEven ? 'lg:order-1' : 'lg:order-2'}>
                  <div className="inline-flex items-center gap-4 mb-6">
                    <div className="w-20 h-20 rounded-full bg-orange-500 flex items-center justify-center text-white text-3xl shadow-lg">
                      {step.number}
                    </div>
                    <div className="w-16 h-16 rounded-xl bg-orange-100 text-orange-600 flex items-center justify-center">
                      <Icon className="h-8 w-8" />
                    </div>
                  </div>
                  <h3 className="text-4xl mb-4 text-gray-900">{step.title}</h3>
                  <p className="text-lg text-gray-600 mb-6">{step.description}</p>

                  <div className="bg-orange-50 rounded-lg p-4 mb-6 inline-flex items-center">
                    <Clock className="h-5 w-5 text-orange-600 mr-2" />
                    <span className="text-orange-900">Estimated time: {step.timeline}</span>
                  </div>

                  <ul className="space-y-3">
                    {step.details.map((detail, detailIndex) => (
                      <li key={detailIndex} className="flex items-start text-gray-700">
                        <CheckCircle2 className="h-5 w-5 text-green-500 mr-3 flex-shrink-0 mt-0.5" />
                        <span>{detail}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className={isEven ? 'lg:order-2' : 'lg:order-1'}>
                  <Card className="border-0 shadow-xl">
                    <CardContent className="p-8">
                      <div className="aspect-square bg-gradient-to-br from-blue-100 to-purple-100 rounded-lg flex items-center justify-center">
                        <Icon className="h-32 w-32 text-blue-600" />
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Integrations Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl sm:text-5xl mb-4 text-gray-900">
              Powered by Enterprise-Grade Tools
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              You don&apos;t manage any of this. We do. Your business runs on proven infrastructure.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {integrations.map((integration, index) => (
              <Card key={index} className="border-0 shadow-md hover:shadow-lg transition-shadow">
                <CardContent className="p-6 text-center">
                  <div className="aspect-video bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg flex items-center justify-center mb-3">
                    <span className="text-2xl text-gray-400">📱</span>
                  </div>
                  <p className="text-gray-900">{integration}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          <p className="text-center text-gray-600 mt-8">
            All integrations are managed by Autumn8 — you never touch any of this
          </p>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-white to-blue-50">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl sm:text-5xl mb-6 text-gray-900">
            Ready to Let Us Take Over?
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Get started today and watch your business grow.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/get-started">
              <Button
                size="lg"
                className="bg-orange-500 hover:bg-orange-600 text-lg px-8 h-14"
              >
                Get Started
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link href="/pricing">
              <Button size="lg" variant="outline" className="text-lg px-8 h-14 border-slate-300">
                View Pricing
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
