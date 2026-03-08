import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Calendar, FileText, Mail, Database, Clock, Zap, CheckCircle2, ArrowRight, LucideIcon } from "lucide-react";
import Link from "next/link";

const features = [
  {
    icon: Calendar,
    title: "Customer Acquisition Engine",
    description: "Speed-to-lead SMS in under 60 seconds. Automated follow-ups that fill your calendar.",
    color: "bg-blue-100 text-blue-600",
    details: [
      "Instant SMS response to every new lead within 60 seconds",
      "Automated follow-up sequences via email and text",
      "Lead qualification based on service area and type",
      "Direct calendar routing for qualified leads",
      "Missed call text-back so no inquiry goes unanswered",
    ],
  },
  {
    icon: FileText,
    title: "Automated Invoicing",
    description: "Invoices generated and sent automatically after every job. Payments collected without chasing.",
    color: "bg-purple-100 text-purple-600",
    details: [
      "Automatic invoice generation after job completion",
      "Payment reminders at 3, 7, and 14 days",
      "Stripe integration for instant online payments",
      "Overdue payment escalation sequences",
      "Revenue tracking and reporting in your dashboard",
    ],
  },
  {
    icon: Mail,
    title: "Reputation Management",
    description: "Reviews collected and responded to automatically. Your rating climbs monthly.",
    color: "bg-green-100 text-green-600",
    details: [
      "Automated review requests after every completed service",
      "AI-drafted responses posted to Google and Yelp",
      "Negative review detection with instant owner alerts",
      "Review sentiment analysis and trend tracking",
      "Monthly reputation report in your dashboard",
    ],
  },
  {
    icon: Database,
    title: "Local SEO & Web Presence",
    description: "Google Business Profile managed weekly. Local citations built. Rankings tracked.",
    color: "bg-orange-100 text-orange-600",
    details: [
      "Weekly Google Business Profile posts and updates",
      "Local citation building across 40+ directories",
      "Keyword ranking tracking and monthly reports",
      "GBP category and attribute optimization",
      "Photo uploads and Q&A management",
    ],
  },
  {
    icon: Clock,
    title: "Smart Scheduling",
    description: "Online booking with automated confirmations and reminders. No more no-shows.",
    color: "bg-pink-100 text-pink-600",
    details: [
      "Online booking widget for your website and GBP",
      "Automated appointment confirmations via email and SMS",
      "24-hour and 1-hour reminders before every appointment",
      "Rescheduling handled automatically when customers reply",
      "Calendar sync so your team always knows the schedule",
    ],
  },
  {
    icon: Zap,
    title: "Referral Program Automation",
    description: "Happy customers become your sales team with automated referral offers and tracking.",
    color: "bg-indigo-100 text-indigo-600",
    details: [
      "Automatic referral requests sent after positive reviews",
      "Unique referral codes and tracking links per customer",
      "Automated reward fulfillment when referrals convert",
      "Monthly referral leaderboard and performance reports",
      "Customizable reward tiers based on referral volume",
    ],
  },
];

export default function FeaturesPage() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-orange-50 to-white">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-5xl sm:text-6xl lg:text-7xl mb-6 text-gray-900">
            12 Capabilities That
            <br />
            <span className="bg-gradient-to-r from-slate-700 to-orange-500 bg-clip-text text-transparent">
              Run Your Business
            </span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-10">
            From lead capture to competitive pricing intelligence — everything a service business needs to grow, managed automatically across three tiers.
          </p>
        </div>
      </section>

      {/* Detailed Features */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto space-y-16">
          {features.map((feature, index) => {
            const Icon = feature.icon as LucideIcon;
            const isEven = index % 2 === 0;

            return (
              <div
                key={index}
                className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
              >
                <div className={isEven ? 'lg:order-1' : 'lg:order-2'}>
                  <div className={`w-16 h-16 rounded-xl ${feature.color} flex items-center justify-center mb-6`}>
                    <Icon className="h-8 w-8" />
                  </div>
                  <h3 className="text-3xl mb-4 text-gray-900">{feature.title}</h3>
                  <p className="text-lg text-gray-600 mb-6">{feature.description}</p>
                  <ul className="space-y-3">
                    {feature.details.map((detail, detailIndex) => (
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
                      <div className="aspect-video bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg flex items-center justify-center">
                        <Icon className="h-24 w-24 text-gray-400" />
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-white to-blue-50">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl sm:text-5xl mb-6 text-gray-900">
            Ready to Let Us Run Your Operations?
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Get started today. We set everything up within 24 hours.
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
