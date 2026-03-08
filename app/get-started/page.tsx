'use client';

import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CheckCircle2, ArrowRight, Mail, User } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";

const plans = [
  { id: 'foundation', name: 'Foundation', price: '$249/mo', description: 'Core automation for your entire operation' },
  { id: 'growth', name: 'Growth', price: '$499/mo', description: 'Grow revenue with recurring customers' },
  { id: 'scale', name: 'Scale', price: '$999/mo', description: 'Full operational intelligence' },
];

const benefits = [
  "Full setup completed within 24 hours",
  "No setup fees — get running immediately",
  "90-day performance guarantee",
  "Weekly performance reports from day one",
  "Cancel anytime — no contracts",
];

export default function GetStartedPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    plan: 'foundation',
    industry: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams({
      firstName: formData.firstName,
      lastName: formData.lastName,
      email: formData.email,
      plan: plans.find(p => p.id === formData.plan)?.name || 'Foundation',
      industry: formData.industry,
    });
    router.push(`/onboarding?${params.toString()}`);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-orange-50 to-white">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-5xl sm:text-6xl lg:text-7xl mb-6 text-gray-900">
            Get Started
            <br />
            <span className="bg-gradient-to-r from-slate-700 to-orange-500 bg-clip-text text-transparent">
              Today
            </span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-10">
            Tell us who you are and choose a plan. We&apos;ll walk you through everything in a quick conversation — no forms, no calls, no onboarding sessions.
          </p>
        </div>
      </section>

      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <h2 className="text-3xl mb-6 text-gray-900">Let&apos;s Get You Set Up</h2>
              <Card className="border-0 shadow-xl">
                <CardContent className="p-8">
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="firstName" className="flex items-center gap-2 mb-2">
                          <User className="h-4 w-4 text-gray-400" />
                          First Name *
                        </Label>
                        <Input
                          id="firstName"
                          name="firstName"
                          required
                          value={formData.firstName}
                          onChange={handleChange}
                          placeholder="John"
                          className="h-12"
                        />
                      </div>
                      <div>
                        <Label htmlFor="lastName" className="flex items-center gap-2 mb-2">
                          <User className="h-4 w-4 text-gray-400" />
                          Last Name *
                        </Label>
                        <Input
                          id="lastName"
                          name="lastName"
                          required
                          value={formData.lastName}
                          onChange={handleChange}
                          placeholder="Smith"
                          className="h-12"
                        />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="email" className="flex items-center gap-2 mb-2">
                        <Mail className="h-4 w-4 text-gray-400" />
                        Email Address *
                      </Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="john@yourcompany.com"
                        className="h-12"
                      />
                    </div>

                    <div>
                      <Label className="mb-3 block">Choose Your Plan *</Label>
                      <div className="space-y-3">
                        {plans.map(plan => (
                          <label
                            key={plan.id}
                            className={`flex items-center justify-between p-4 rounded-xl border-2 cursor-pointer transition-all ${
                              formData.plan === plan.id
                                ? 'border-orange-500 bg-orange-50'
                                : 'border-gray-200 hover:border-gray-300'
                            }`}
                          >
                            <div className="flex items-center gap-3">
                              <input
                                type="radio"
                                name="plan"
                                value={plan.id}
                                checked={formData.plan === plan.id}
                                onChange={handleChange}
                                className="accent-orange-500"
                              />
                              <div>
                                <div className="font-medium text-gray-900">{plan.name}</div>
                                <div className="text-sm text-gray-500">{plan.description}</div>
                              </div>
                            </div>
                            <span className="text-gray-700 font-medium text-sm">{plan.price}</span>
                          </label>
                        ))}
                      </div>
                    </div>

                    <Button
                      type="submit"
                      size="lg"
                      className="w-full bg-orange-500 hover:bg-orange-600 h-14 text-lg"
                    >
                      Continue to Setup
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </Button>

                    <p className="text-sm text-gray-500 text-center">
                      You&apos;ll walk through a quick conversation to set everything up. Takes about 15 minutes.
                    </p>
                  </form>
                </CardContent>
              </Card>
            </div>

            <div>
              <h2 className="text-3xl mb-6 text-gray-900">What Happens Next?</h2>
              <div className="space-y-4 mb-8">
                {[
                  { step: 1, title: "A quick conversation", description: "Our AI walks you through your business in about 15 minutes — no forms, just talking." },
                  { step: 2, title: "We configure everything", description: "Based on your answers, we set up lead capture, scheduling, invoicing, reviews, and SEO automatically." },
                  { step: 3, title: "Live within 24 hours", description: "Every lead gets a response. Every review gets managed. You get a weekly report." },
                  { step: 4, title: "Watch your business grow", description: "Sit back. We send you a weekly digest of what happened — leads captured, reviews managed, revenue recovered." },
                ].map((item) => (
                  <Card key={item.step} className="border-0 shadow-md">
                    <CardContent className="p-5">
                      <div className="flex items-start gap-4">
                        <div className="w-9 h-9 rounded-full bg-orange-500 flex items-center justify-center text-white text-sm flex-shrink-0">
                          {item.step}
                        </div>
                        <div>
                          <h4 className="font-medium text-gray-900 mb-1">{item.title}</h4>
                          <p className="text-gray-600 text-sm">{item.description}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              <Card className="border-0 shadow-lg bg-gradient-to-br from-orange-50 to-orange-100">
                <CardContent className="p-8">
                  <h3 className="text-xl mb-4 text-gray-900">What&apos;s Included</h3>
                  <ul className="space-y-2">
                    {benefits.map((benefit, index) => (
                      <li key={index} className="flex items-start text-gray-700 text-sm">
                        <CheckCircle2 className="h-4 w-4 text-green-500 mr-3 flex-shrink-0 mt-0.5" />
                        <span>{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
