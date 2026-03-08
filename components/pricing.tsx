'use client';

import { useState } from "react";
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import { Check } from "lucide-react";

interface Plan {
  name: string;
  monthlyPrice: number;
  annualPrice: number;
  annualPerMonth: number;
  description: string;
  features: string[];
  cta: string;
  highlighted: boolean;
}

export function Pricing() {
  const [billingPeriod, setBillingPeriod] = useState<'monthly' | 'annual'>('monthly');

  const plans: Plan[] = [
    {
      name: "Foundation",
      monthlyPrice: 249,
      annualPrice: 2490,
      annualPerMonth: 207,
      description: "Core automation for your entire operation",
      features: [
        "Customer Acquisition Engine",
        "Smart Scheduling System",
        "Automated Invoicing",
        "Reputation Management",
        "Local SEO & Web Presence",
        "Referral Program Automation",
      ],
      cta: "Start Free Trial",
      highlighted: false,
    },
    {
      name: "Growth",
      monthlyPrice: 499,
      annualPrice: 4990,
      annualPerMonth: 416,
      description: "Grow revenue with recurring customers",
      features: [
        "Everything in Foundation, plus:",
        "Recurring Revenue Engine",
        "Customer Win-Back & Churn Prevention",
        "Seasonal Demand Planning",
      ],
      cta: "Start Free Trial",
      highlighted: true,
    },
    {
      name: "Scale",
      monthlyPrice: 999,
      annualPrice: 9990,
      annualPerMonth: 832,
      description: "Full operational intelligence",
      features: [
        "Everything in Growth, plus:",
        "Route Optimization & Job Density",
        "Job Costing & Profitability Analysis",
        "Competitive Pricing Intelligence",
      ],
      cta: "Start Free Trial",
      highlighted: false,
    },
  ];

  return (
    <section id="pricing" className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-sm uppercase tracking-wide text-orange-600 mb-3">
            Pricing
          </h2>
          <h3 className="text-4xl sm:text-5xl mb-4 text-gray-900">
            Simple, Transparent Pricing
          </h3>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-8">
            No contracts. No hidden fees. Cancel anytime. Save 2 months when you pay annually.
          </p>

          <div className="flex items-center justify-center gap-4 mb-12">
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

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan, index) => {
            const cardClassName = plan.highlighted
              ? 'relative border-2 border-orange-500 shadow-2xl scale-105'
              : 'relative border shadow-lg';

            const buttonClassName = plan.highlighted
              ? 'w-full mb-8 bg-orange-500 hover:bg-orange-600'
              : 'w-full mb-8 bg-slate-800 hover:bg-slate-700';

            return (
              <Card key={index} className={cardClassName}>
                {plan.highlighted && (
                  <div className="absolute -top-4 left-0 right-0 flex justify-center">
                    <span className="bg-orange-500 text-white px-4 py-1 rounded-full text-sm">
                      Most Popular
                    </span>
                  </div>
                )}
                <CardContent className="p-8">
                  <h4 className="text-2xl mb-2 text-gray-900">{plan.name}</h4>
                  <p className="text-gray-600 mb-6 min-h-[48px]">{plan.description}</p>
                  <div className="mb-6">
                    <span className="text-5xl text-gray-900">
                      ${billingPeriod === 'monthly' ? plan.monthlyPrice : plan.annualPerMonth}
                    </span>
                    <span className="text-gray-600">
                      {billingPeriod === 'monthly' ? '/month' : '/mo, billed annually'}
                    </span>
                    {billingPeriod === 'annual' && (
                      <div className="text-sm text-gray-500 mt-1">
                        ${plan.annualPrice.toLocaleString()}/year
                      </div>
                    )}
                  </div>
                  <Button className={buttonClassName}>
                    {plan.cta}
                  </Button>
                  <ul className="space-y-4">
                    {plan.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-start">
                        <Check className="h-5 w-5 text-green-500 mr-3 flex-shrink-0 mt-0.5" />
                        <span className="text-gray-700">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <div className="mt-12 text-center text-gray-600">
          <p>All plans include a 14-day free trial. No credit card required. 90-day performance guarantee.</p>
        </div>
      </div>
    </section>
  );
}
