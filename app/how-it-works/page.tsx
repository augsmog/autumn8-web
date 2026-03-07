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
    title: "Connect Your Tools",
    description: "Link your existing calendar, email, CRM, and accounting software in minutes. We integrate with all major platforms.",
    details: [
      "One-click integrations with popular business tools",
      "Secure OAuth authentication—we never see your passwords",
      "Automatic data synchronization",
      "Support for 100+ business applications",
    ],
    timeline: "5-10 minutes",
  },
  {
    number: "02",
    icon: PlayCircle,
    title: "Customize Automations",
    description: "Choose from pre-built workflows or create custom automation rules that match your business processes perfectly.",
    details: [
      "Library of ready-to-use automation templates",
      "Visual workflow builder for custom automations",
      "Smart suggestions based on your business type",
      "Test automations before going live",
    ],
    timeline: "15-30 minutes",
  },
  {
    number: "03",
    icon: Rocket,
    title: "Watch It Work",
    description: "Sit back and watch as repetitive tasks happen automatically. Monitor everything from your dashboard in real-time.",
    details: [
      "Real-time dashboard showing all automated activities",
      "Detailed logs and activity history",
      "Performance analytics and time savings reports",
      "Instant notifications for important events",
    ],
    timeline: "Ongoing",
  },
];

const integrations = [
  "Google Workspace",
  "Microsoft 365",
  "QuickBooks",
  "Xero",
  "FreshBooks",
  "Salesforce",
  "HubSpot",
  "Mailchimp",
  "Calendly",
  "Zoom",
  "Slack",
  "Stripe",
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
              Works for You
            </span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-10">
            Get up and running in under an hour. Our simple three-step process gets you from
            manual chaos to automated efficiency in no time.
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
              Integrates with Your Existing Tools
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Connect seamlessly with the business applications you already use. No need to change your workflow.
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
            + 100 more integrations available
          </p>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-white to-blue-50">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl sm:text-5xl mb-6 text-gray-900">
            Ready to Get Started?
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Join the automation revolution and start saving 20+ hours every week.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/get-started">
              <Button
                size="lg"
                className="bg-orange-500 hover:bg-orange-600 text-lg px-8 h-14"
              >
                Get Started Now
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link href="/features">
              <Button size="lg" variant="outline" className="text-lg px-8 h-14 border-slate-300">
                Explore Features
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
