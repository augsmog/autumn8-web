'use client';

import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { CheckCircle2, ArrowRight, Mail, Building2, User, Phone } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

const onboardingSteps = [
  {
    step: 1,
    title: "Tell Us About Your Business",
    description: "Share basic information so we can customize your experience",
  },
  {
    step: 2,
    title: "Connect Your Tools",
    description: "Link the business apps you currently use",
  },
  {
    step: 3,
    title: "Choose Your Workflows",
    description: "Select pre-built automations or create custom ones",
  },
  {
    step: 4,
    title: "Go Live",
    description: "Activate your automations and start saving time",
  },
];

const benefits = [
  "Setup assistance from our team",
  "Custom workflow recommendations",
  "Training and documentation",
  "Ongoing email support",
  "Access to all core features",
  "Cancel anytime—no lock-in",
];

export default function GetStartedPage() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    businessName: "",
    businessType: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-orange-50 to-white">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-5xl sm:text-6xl lg:text-7xl mb-6 text-gray-900">
            Let&apos;s Get You
            <br />
            <span className="bg-gradient-to-r from-slate-700 to-orange-500 bg-clip-text text-transparent">
              Started Today
            </span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-10">
            Fill out the form below and we&apos;ll reach out within 24 hours to help you get set up
            and start automating your business operations.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div>
              <h2 className="text-3xl mb-6 text-gray-900">Contact Information</h2>
              <Card className="border-0 shadow-xl">
                <CardContent className="p-8">
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="firstName" className="flex items-center gap-2 mb-2">
                          <User className="h-4 w-4 text-gray-500" />
                          First Name *
                        </Label>
                        <Input
                          id="firstName"
                          name="firstName"
                          type="text"
                          required
                          value={formData.firstName}
                          onChange={handleChange}
                          placeholder="John"
                          className="h-12"
                        />
                      </div>
                      <div>
                        <Label htmlFor="lastName" className="flex items-center gap-2 mb-2">
                          <User className="h-4 w-4 text-gray-500" />
                          Last Name *
                        </Label>
                        <Input
                          id="lastName"
                          name="lastName"
                          type="text"
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
                        <Mail className="h-4 w-4 text-gray-500" />
                        Email Address *
                      </Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="john@company.com"
                        className="h-12"
                      />
                    </div>

                    <div>
                      <Label htmlFor="phone" className="flex items-center gap-2 mb-2">
                        <Phone className="h-4 w-4 text-gray-500" />
                        Phone Number
                      </Label>
                      <Input
                        id="phone"
                        name="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="(555) 123-4567"
                        className="h-12"
                      />
                    </div>

                    <div>
                      <Label htmlFor="businessName" className="flex items-center gap-2 mb-2">
                        <Building2 className="h-4 w-4 text-gray-500" />
                        Business Name *
                      </Label>
                      <Input
                        id="businessName"
                        name="businessName"
                        type="text"
                        required
                        value={formData.businessName}
                        onChange={handleChange}
                        placeholder="Acme Services Inc."
                        className="h-12"
                      />
                    </div>

                    <div>
                      <Label htmlFor="businessType" className="mb-2 block">
                        Type of Business *
                      </Label>
                      <Input
                        id="businessType"
                        name="businessType"
                        type="text"
                        required
                        value={formData.businessType}
                        onChange={handleChange}
                        placeholder="e.g., Consulting, Legal Services, Accounting"
                        className="h-12"
                      />
                    </div>

                    <div>
                      <Label htmlFor="message" className="mb-2 block">
                        What are your biggest administrative challenges? (Optional)
                      </Label>
                      <Textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        placeholder="Tell us about your current pain points..."
                        rows={4}
                      />
                    </div>

                    <Button
                      type="submit"
                      size="lg"
                      className="w-full bg-orange-500 hover:bg-orange-600 h-14 text-lg"
                    >
                      Submit Request
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </Button>

                    <p className="text-sm text-gray-600 text-center">
                      By submitting this form, you agree to our Terms of Service and Privacy Policy.
                    </p>
                  </form>
                </CardContent>
              </Card>
            </div>

            {/* What to Expect */}
            <div>
              <h2 className="text-3xl mb-6 text-gray-900">What Happens Next?</h2>

              <div className="space-y-6 mb-8">
                {onboardingSteps.map((item, index) => (
                  <Card key={index} className="border-0 shadow-md">
                    <CardContent className="p-6">
                      <div className="flex items-start gap-4">
                        <div className="w-10 h-10 rounded-full bg-orange-500 flex items-center justify-center text-white flex-shrink-0">
                          {item.step}
                        </div>
                        <div>
                          <h4 className="text-lg mb-1 text-gray-900">{item.title}</h4>
                          <p className="text-gray-600">{item.description}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              <Card className="border-0 shadow-lg bg-gradient-to-br from-orange-50 to-orange-100">
                <CardContent className="p-8">
                  <h3 className="text-2xl mb-6 text-gray-900">What&apos;s Included</h3>
                  <ul className="space-y-3">
                    {benefits.map((benefit, index) => (
                      <li key={index} className="flex items-start text-gray-700">
                        <CheckCircle2 className="h-5 w-5 text-green-500 mr-3 flex-shrink-0 mt-0.5" />
                        <span>{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>

              <div className="mt-8 text-center">
                <p className="text-gray-600 mb-4">Have questions first?</p>
                <Link href="/pricing">
                  <Button variant="outline" size="lg" className="mr-4">
                    View Pricing
                  </Button>
                </Link>
                <Link href="/how-it-works">
                  <Button variant="outline" size="lg">
                    Learn More
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl mb-8 text-gray-900">
            Why Small Service Businesses Choose Autumn8
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <div className="text-4xl mb-3 text-orange-600">20-25 hrs</div>
              <div className="text-gray-600">Average weekly time saved</div>
            </div>
            <div>
              <div className="text-4xl mb-3 text-slate-600">5-10x</div>
              <div className="text-gray-600">Expected ROI</div>
            </div>
            <div>
              <div className="text-4xl mb-3 text-green-600">40%</div>
              <div className="text-gray-600">Faster payment collection</div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
