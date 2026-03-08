import { Card, CardContent } from "./ui/card";
import { Calendar, FileText, Mail, Database, Clock, Zap, LucideIcon } from "lucide-react";

interface Feature {
  icon: LucideIcon;
  title: string;
  description: string;
  color: string;
}

const features: Feature[] = [
  {
    icon: Calendar,
    title: "Customer Acquisition Engine",
    description: "Speed-to-lead SMS in under 60 seconds. Automated follow-ups that fill your calendar while you're on jobs.",
    color: "bg-blue-100 text-blue-600",
  },
  {
    icon: FileText,
    title: "Automated Invoicing",
    description: "Invoices sent automatically after every job. Payment reminders at 3, 7, and 14 days. You get paid without lifting a finger.",
    color: "bg-purple-100 text-purple-600",
  },
  {
    icon: Mail,
    title: "Reputation Management",
    description: "Review requests sent after every service. AI-drafted responses posted to Google and Yelp. Your rating climbs monthly.",
    color: "bg-green-100 text-green-600",
  },
  {
    icon: Database,
    title: "Local SEO & Web Presence",
    description: "Google Business Profile optimized weekly with posts, photos, and Q&A. Local citations built. Rankings tracked and reported.",
    color: "bg-orange-100 text-orange-600",
  },
  {
    icon: Clock,
    title: "Smart Scheduling",
    description: "Online booking, automated confirmations, and reminders 24 hours before every appointment. No more no-shows.",
    color: "bg-pink-100 text-pink-600",
  },
  {
    icon: Zap,
    title: "Referral Program",
    description: "Automatically identify happy customers, send referral offers, track conversions, and fulfill rewards. Your best customers become your sales team.",
    color: "bg-indigo-100 text-indigo-600",
  },
];

export function Features() {
  return (
    <section id="features" className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-sm uppercase tracking-wide text-orange-600 mb-3">
            Features
          </h2>
          <h3 className="text-4xl sm:text-5xl mb-4 text-gray-900">
            Everything You Need to Run Your Business
          </h3>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Managed automation that actively runs your operations — not software you have to learn
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-shadow">
                <CardContent className="p-6">
                  <div className={`w-12 h-12 rounded-lg ${feature.color} flex items-center justify-center mb-4`}>
                    <Icon className="h-6 w-6" />
                  </div>
                  <h4 className="text-xl mb-2 text-gray-900">{feature.title}</h4>
                  <p className="text-gray-600">{feature.description}</p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
