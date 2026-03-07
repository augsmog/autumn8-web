import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Calendar, FileText, Mail, Database, Clock, Zap, CheckCircle2, ArrowRight, LucideIcon } from "lucide-react";
import Link from "next/link";

const features = [
  {
    icon: Calendar,
    title: "Smart Scheduling",
    description: "Automated appointment booking and calendar management that syncs across all your tools.",
    color: "bg-blue-100 text-blue-600",
    details: [
      "Two-way calendar sync with Google, Outlook, and Apple Calendar",
      "Automated appointment reminders via email and SMS",
      "Client self-scheduling with customizable availability",
      "Buffer time management between appointments",
      "Recurring appointment automation",
    ],
  },
  {
    icon: FileText,
    title: "Invoice Automation",
    description: "Generate, send, and track invoices automatically. Get paid faster with automated reminders.",
    color: "bg-purple-100 text-purple-600",
    details: [
      "Automatic invoice generation from completed work",
      "Customizable invoice templates and branding",
      "Automated payment reminders and follow-ups",
      "Integration with QuickBooks, Xero, and FreshBooks",
      "Payment tracking and reconciliation",
    ],
  },
  {
    icon: Mail,
    title: "Email Follow-ups",
    description: "Never miss a follow-up. Automated email sequences that nurture leads and keep clients engaged.",
    color: "bg-green-100 text-green-600",
    details: [
      "Customizable email templates for every scenario",
      "Automated drip campaigns for lead nurturing",
      "Follow-up sequences after appointments or quotes",
      "Smart timing based on client behavior",
      "A/B testing for email optimization",
    ],
  },
  {
    icon: Database,
    title: "Data Entry",
    description: "Eliminate manual data entry. Auto-sync information across your CRM, accounting, and other tools.",
    color: "bg-orange-100 text-orange-600",
    details: [
      "Automatic data synchronization across platforms",
      "OCR for document and receipt scanning",
      "Form data auto-population",
      "Duplicate detection and merging",
      "Custom field mapping and transformations",
    ],
  },
  {
    icon: Clock,
    title: "Time Tracking",
    description: "Automatically log billable hours and generate accurate time reports for your clients.",
    color: "bg-pink-100 text-pink-600",
    details: [
      "Automatic time tracking for all activities",
      "Project-based time allocation",
      "Billable vs non-billable hour categorization",
      "Automated timesheet generation",
      "Integration with invoicing for accurate billing",
    ],
  },
  {
    icon: Zap,
    title: "Workflow Builder",
    description: "Create custom automated workflows tailored to your unique business processes.",
    color: "bg-indigo-100 text-indigo-600",
    details: [
      "Visual workflow designer with drag-and-drop interface",
      "Pre-built templates for common business scenarios",
      "Conditional logic and branching",
      "Multi-step automation sequences",
      "Real-time monitoring and error handling",
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
            Powerful Features for
            <br />
            <span className="bg-gradient-to-r from-slate-700 to-orange-500 bg-clip-text text-transparent">
              Complete Automation
            </span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-10">
            Everything you need to automate your administrative tasks and focus on growing your business.
            No technical expertise required—just powerful automation that works.
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
            Ready to Automate Your Business?
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Start streamlining your operations today and reclaim hours every week.
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
