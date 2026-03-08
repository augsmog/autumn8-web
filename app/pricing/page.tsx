'use client';

import { useState } from "react";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { CheckCircle2, ArrowRight, HelpCircle } from "lucide-react";
import Link from "next/link";

interface PricingTier {
  name: string;
  price: string;
  period: string;
  description: string;
  features: string[];
  highlighted?: boolean;
  cta: string;
}

const faqs = [
  {
    question: "What exactly does Autumn8 do?",
    answer: "We manage your business operations — leads, scheduling, invoicing, reviews, and reporting — using automation. Think of us as your operations department, powered by technology. You don't need to learn any software or change how you work.",
  },
  {
    question: "How is this different from hiring a marketing agency?",
    answer: "Agencies sell you hours and campaigns. We manage your actual operations. When a lead comes in, we make sure they get a response in under 60 seconds, get booked, get invoiced, and get asked for a review — automatically. We're not running your ads. We're running everything that happens after someone contacts you.",
  },
  {
    question: "What industries do you work with?",
    answer: "We work with home service and field service businesses — pest control, lawn care, pool maintenance, HVAC, plumbing, cleaning, and similar trades. If you run a team that goes out and does service work, Autumn8 is built for you.",
  },
  {
    question: "Do I need to learn new software?",
    answer: "No. We set everything up and manage it for you. You'll have access to a simple dashboard to see your results, but you'll never need to configure or troubleshoot anything. That's our job.",
  },
  {
    question: "What's the difference between your tiers?",
    answer: "Foundation automates your core operations — leads, booking, invoicing, reviews, SEO, and referrals. Growth adds revenue growth tools — converting one-time customers to recurring revenue, preventing churn, and planning for seasonal demand. Scale adds operational intelligence — route optimization, job costing, and competitive pricing benchmarking. Most businesses start with Foundation and upgrade to Growth within 90 days.",
  },
  {
    question: "Is there a discount for paying annually?",
    answer: "Yes. When you pay annually, you get 2 months free — that's a 17% discount. Foundation drops from $249/month to $207/month ($2,490/year), Growth from $499 to $416/month ($4,990/year), and Scale from $999 to $832/month ($9,990/year). You can switch between monthly and annual billing anytime.",
  },
  {
    question: "What's the 90-Day Performance Guarantee?",
    answer: "If you don't see measurable improvement in leads, reviews, or revenue within 90 days, we'll refund your last month. No questions asked. We're confident because our systems work, and we're willing to put our money where our mouth is.",
  },
  {
    question: "Can I cancel anytime?",
    answer: "Yes. No long-term contracts. We believe if we're delivering value, you'll stay. If we're not, you shouldn't be locked in.",
  },
];

export default function PricingPage() {
  const [billingPeriod, setBillingPeriod] = useState<'monthly' | 'annual'>('monthly');

  const pricingTiers: PricingTier[] = [
    {
      name: "Foundation",
      price: billingPeriod === 'monthly' ? "$249" : "$207",
      period: billingPeriod === 'monthly' ? "/month" : "/mo, billed annually",
      description: "Core automation for your entire operation. Perfect for solo operators and small teams.",
      features: [
        "Customer Acquisition Engine",
        "Smart Scheduling System",
        "Automated Invoicing",
        "Reputation Management",
        "Local SEO & Web Presence",
        "Referral Program Automation",
      ],
      cta: "Start Free Trial",
    },
    {
      name: "Growth",
      price: billingPeriod === 'monthly' ? "$499" : "$416",
      period: billingPeriod === 'monthly' ? "/month" : "/mo, billed annually",
      description: "Grow revenue with recurring customers. Ideal for businesses with 5-15 employees.",
      features: [
        "Everything in Foundation, plus:",
        "Recurring Revenue Engine",
        "Customer Win-Back & Churn Prevention",
        "Seasonal Demand Planning",
      ],
      highlighted: true,
      cta: "Start Free Trial",
    },
    {
      name: "Scale",
      price: billingPeriod === 'monthly' ? "$999" : "$832",
      period: billingPeriod === 'monthly' ? "/month" : "/mo, billed annually",
      description: "Full operational intelligence for multi-crew operations with 10-25+ employees.",
      features: [
        "Everything in Growth, plus:",
        "Route Optimization & Job Density",
        "Job Costing & Profitability Analysis",
        "Competitive Pricing Intelligence",
      ],
      cta: "Start Free Trial",
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-orange-50 to-white">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-5xl sm:text-6xl lg:text-7xl mb-6 text-gray-900">
            Simple, Transparent
            <br />
            <span className="bg-gradient-to-r from-slate-700 to-orange-500 bg-clip-text text-transparent">
              Pricing
            </span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            No contracts. No hidden fees. Cancel anytime. Save 2 months when you pay annually.
          </p>

          <div className="flex items-center justify-center gap-4">
            <span className={`text-sm font-medium transition-colors ${
              billingPeriod === 'monthly' ? 'text-gray-900' : 'text-gray-400'
            }`}>Monthly</span>
            <button
              onClick={() => setBillingPeriod(billingPeriod === 'monthly' ? 'annual' : 'monthly')}
              className={`relative inline-flex h-7 w-14 items-center rounded-full transition-colors ${
                billingPeriod === 'annual' ? 'bg-orange-500' : 'bg-gray-300'
              }`}
              role="switch"
              aria-checked={billingPeriod === 'annual'}
              aria-label="Toggle annual billing"
            >
              <span className={`inline-block h-5 w-5 transform rounded-full bg-white shadow-sm transition-transform ${
                billingPeriod === 'annual' ? 'translate-x-8' : 'translate-x-1'
              }`} />
            </button>
            <span className={`text-sm font-medium transition-colors ${
              billingPeriod === 'annual' ? 'text-gray-900' : 'text-gray-400'
            }`}>Annual</span>
            {billingPeriod === 'annual' && (
              <span className="ml-2 inline-flex items-center rounded-full bg-green-100 px-3 py-1 text-xs font-medium text-green-700">
                Save 2 months
              </span>
            )}
          </div>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {pricingTiers.map((tier, index) => (
              <Card
                key={index}
                className={`border-0 shadow-lg hover:shadow-xl transition-shadow ${
                  tier.highlighted ? 'ring-2 ring-blue-600 relative' : ''
                }`}
              >
                {tier.highlighted && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <span className="bg-orange-500 text-white px-4 py-1 rounded-full text-sm">
                      Most Popular
                    </span>
                  </div>
                )}
                <CardHeader className="p-8">
                  <h3 className="text-2xl text-gray-900 mb-2">{tier.name}</h3>
                  <div className="mb-4">
                    <span className="text-5xl text-gray-900">{tier.price}</span>
                    <span className="text-gray-600">{tier.period}</span>
                    {billingPeriod === 'annual' && (
                      <div className="text-sm text-gray-500 mt-1">
                        ${(index === 0 ? 2490 : index === 1 ? 4990 : 9990).toLocaleString()}/year
                      </div>
                    )}
                  </div>
                  <p className="text-gray-600">{tier.description}</p>
                </CardHeader>
                <CardContent className="p-8 pt-0">
                  <Link href="/get-started">
                    <Button
                      className={`w-full h-12 mb-6 ${
                        tier.highlighted
                          ? 'bg-orange-500 hover:bg-orange-600'
                          : ''
                      }`}
                      variant={tier.highlighted ? 'default' : 'outline'}
                    >
                      {tier.cta}
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                  <ul className="space-y-3">
                    {tier.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-start text-gray-700">
                        <CheckCircle2 className="h-5 w-5 text-green-500 mr-3 flex-shrink-0 mt-0.5" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* ROI Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl sm:text-5xl mb-4 text-gray-900">
              What This Means for Your Business
            </h2>
            <p className="text-xl text-gray-600">
              Here&apos;s what our clients typically see within 90 days
            </p>
          </div>

          <Card className="border-0 shadow-xl">
            <CardContent className="p-8">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
                <div>
                  <div className="text-4xl mb-2 text-blue-600">52-65%</div>
                  <div className="text-sm text-gray-600 mb-2">Revenue Increase</div>
                  <div className="text-2xl text-gray-900">Within 90 days</div>
                  <div className="text-sm text-gray-600">Based on projected performance</div>
                </div>
                <div>
                  <div className="text-4xl mb-2 text-purple-600">3-5×</div>
                  <div className="text-sm text-gray-600 mb-2">Return on Investment</div>
                  <div className="text-2xl text-gray-900">Foundation plan</div>
                  <div className="text-sm text-gray-600">Typically generates $800-$1,200/mo in recovered revenue</div>
                </div>
                <div>
                  <div className="text-4xl mb-2 text-green-600">4.6-4.8★</div>
                  <div className="text-sm text-gray-600 mb-2">Average Google Rating</div>
                  <div className="text-2xl text-gray-900">From automated</div>
                  <div className="text-sm text-gray-600">Review collection and response</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl sm:text-5xl mb-4 text-gray-900">
              Frequently Asked Questions
            </h2>
            <p className="text-xl text-gray-600">
              Have questions? We&apos;ve got answers.
            </p>
          </div>

          <div className="space-y-6">
            {faqs.map((faq, index) => (
              <Card key={index} className="border-0 shadow-md">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                      <HelpCircle className="h-5 w-5 text-blue-600" />
                    </div>
                    <div>
                      <h4 className="text-lg mb-2 text-gray-900">{faq.question}</h4>
                      <p className="text-gray-600">{faq.answer}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-white to-blue-50">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl sm:text-5xl mb-6 text-gray-900">
            Ready to Stop Doing Everything Yourself?
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Start your 14-day free trial. We set everything up within 24 hours.
          </p>
          <Link href="/get-started">
            <Button
              size="lg"
              className="bg-orange-500 hover:bg-orange-600 text-lg px-8 h-14"
            >
              Start Free Trial
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}
