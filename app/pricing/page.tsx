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

const pricingTiers: PricingTier[] = [
  {
    name: "Starter",
    price: "$99",
    period: "/month",
    description: "Perfect for solopreneurs and small service businesses just getting started with automation.",
    features: [
      "Up to 500 automated tasks per month",
      "5 tool integrations",
      "Basic workflow templates",
      "Email support",
      "Dashboard and reporting",
      "Data sync every 15 minutes",
    ],
    cta: "Get Started",
  },
  {
    name: "Professional",
    price: "$249",
    period: "/month",
    description: "Ideal for growing businesses that need advanced automation and priority support.",
    features: [
      "Up to 2,500 automated tasks per month",
      "15 tool integrations",
      "Advanced workflow builder",
      "Priority email & chat support",
      "Custom branded client portal",
      "Data sync every 5 minutes",
      "Advanced analytics and reporting",
      "Team collaboration (up to 5 users)",
    ],
    highlighted: true,
    cta: "Get Started",
  },
  {
    name: "Enterprise",
    price: "Custom",
    period: "pricing",
    description: "For established businesses requiring unlimited automation, dedicated support, and custom solutions.",
    features: [
      "Unlimited automated tasks",
      "Unlimited tool integrations",
      "Custom workflow development",
      "Dedicated account manager",
      "Phone, email, and chat support",
      "Real-time data synchronization",
      "White-label options",
      "Unlimited team members",
      "Custom API access",
      "SLA guarantees",
    ],
    cta: "Contact Sales",
  },
];

const faqs = [
  {
    question: "Can I change plans later?",
    answer: "Yes! You can upgrade or downgrade your plan at any time. Changes take effect immediately, and we'll prorate any charges.",
  },
  {
    question: "What happens if I exceed my task limit?",
    answer: "We'll notify you when you approach your limit. You can either upgrade to a higher tier or purchase additional task packs as needed.",
  },
  {
    question: "Do you offer discounts for annual billing?",
    answer: "Yes! Save 20% when you pay annually instead of monthly. Contact us for details.",
  },
  {
    question: "What counts as an 'automated task'?",
    answer: "An automated task is a single action performed by our system, such as sending an email, creating an invoice, or updating a calendar entry.",
  },
  {
    question: "Is my data secure?",
    answer: "Absolutely. We use bank-level encryption, secure OAuth authentication, and regular security audits. Your data is always protected.",
  },
  {
    question: "Can I cancel anytime?",
    answer: "Yes, you can cancel your subscription at any time. Your service continues until the end of your current billing period.",
  },
];

export default function PricingPage() {
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
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-10">
            Choose the plan that fits your business. All plans include core automation features
            and can be upgraded as you grow.
          </p>
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

      {/* ROI Calculator Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl sm:text-5xl mb-4 text-gray-900">
              Calculate Your ROI
            </h2>
            <p className="text-xl text-gray-600">
              See how much time and money you could save with Autumn8
            </p>
          </div>

          <Card className="border-0 shadow-xl">
            <CardContent className="p-8">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
                <div>
                  <div className="text-4xl mb-2 text-blue-600">20-25 hrs</div>
                  <div className="text-sm text-gray-600 mb-2">Average Weekly Time Saved</div>
                  <div className="text-2xl text-gray-900">1,000-1,200</div>
                  <div className="text-sm text-gray-600">Hours saved annually</div>
                </div>
                <div>
                  <div className="text-4xl mb-2 text-purple-600">$25-40</div>
                  <div className="text-sm text-gray-600 mb-2">Your Hourly Billing Rate</div>
                  <div className="text-2xl text-gray-900">$25,000-$48,000</div>
                  <div className="text-sm text-gray-600">Annual value of time saved</div>
                </div>
                <div>
                  <div className="text-4xl mb-2 text-green-600">5-10x</div>
                  <div className="text-sm text-gray-600 mb-2">Expected ROI</div>
                  <div className="text-2xl text-gray-900">First Month</div>
                  <div className="text-sm text-gray-600">Typical payback period</div>
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
            Ready to Start Saving Time?
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Choose your plan and start automating your business today.
          </p>
          <Link href="/get-started">
            <Button
              size="lg"
              className="bg-orange-500 hover:bg-orange-600 text-lg px-8 h-14"
            >
              Get Started Now
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}
