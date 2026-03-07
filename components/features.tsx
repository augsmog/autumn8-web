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
    title: "Smart Scheduling",
    description: "Automated appointment booking and calendar management that syncs across all your tools.",
    color: "bg-blue-100 text-blue-600",
  },
  {
    icon: FileText,
    title: "Invoice Automation",
    description: "Generate, send, and track invoices automatically. Get paid faster with automated reminders.",
    color: "bg-purple-100 text-purple-600",
  },
  {
    icon: Mail,
    title: "Email Follow-ups",
    description: "Never miss a follow-up. Automated email sequences that nurture leads and keep clients engaged.",
    color: "bg-green-100 text-green-600",
  },
  {
    icon: Database,
    title: "Data Entry",
    description: "Eliminate manual data entry. Auto-sync information across your CRM, accounting, and other tools.",
    color: "bg-orange-100 text-orange-600",
  },
  {
    icon: Clock,
    title: "Time Tracking",
    description: "Automatically log billable hours and generate accurate time reports for your clients.",
    color: "bg-pink-100 text-pink-600",
  },
  {
    icon: Zap,
    title: "Workflow Builder",
    description: "Create custom automated workflows tailored to your unique business processes.",
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
            Powerful automation tools designed specifically for small service businesses
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
