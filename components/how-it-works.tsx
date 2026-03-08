import { CheckCircle2 } from "lucide-react";

const steps = [
  {
    number: "01",
    title: "Sign Up & Tell Us About Your Business",
    description: "Pick your plan and complete a quick 5-minute form about your services, customers, and goals.",
  },
  {
    number: "02",
    title: "We Configure Everything Automatically",
    description: "Your lead capture, scheduling, invoicing, review management, SEO, and reporting — all set up and running within 24 hours.",
  },
  {
    number: "03",
    title: "Your Business Starts Growing",
    description: "Leads get responded to instantly. Reviews get managed. Revenue grows. You get a weekly report showing exactly what happened.",
  },
];

export function HowItWorks() {
  return (
    <section id="how-it-works" className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-sm uppercase tracking-wide text-orange-600 mb-3">
            How It Works
          </h2>
          <h3 className="text-4xl sm:text-5xl mb-4 text-gray-900">
            Up and Running in Under 24 Hours
          </h3>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            No software to learn. No calls to schedule. We set everything up for you.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative">
          {/* Connecting line for desktop */}
          <div
            className="hidden md:block absolute left-0 right-0 h-0.5 bg-gradient-to-r from-orange-200 via-slate-200 to-orange-200"
            style={{ top: '40px' }}
          ></div>

          {steps.map((step, index) => (
            <div key={index} className="relative">
              <div className="flex flex-col items-center text-center">
                <div className="w-20 h-20 rounded-full bg-orange-500 flex items-center justify-center text-white text-2xl mb-6 relative z-10 shadow-lg">
                  {step.number}
                </div>
                <h4 className="text-2xl mb-3 text-gray-900">{step.title}</h4>
                <p className="text-gray-600">{step.description}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-20 bg-orange-50 rounded-2xl p-8 md:p-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div>
              <h4 className="text-3xl mb-4 text-gray-900">
                What You Can Expect
              </h4>
              <p className="text-lg text-gray-600 mb-6">
                Autumn8 doesn&apos;t just save you time — it actively generates revenue, builds your reputation, and grows your business while you focus on service.
              </p>
              <ul className="space-y-3">
                <li className="flex items-center text-gray-700">
                  <CheckCircle2 className="h-5 w-5 text-green-500 mr-3 flex-shrink-0" />
                  <span>Every lead gets a response in under 60 seconds — even while you&apos;re on a job</span>
                </li>
                <li className="flex items-center text-gray-700">
                  <CheckCircle2 className="h-5 w-5 text-green-500 mr-3 flex-shrink-0" />
                  <span>Reviews collected and responded to automatically — your rating climbs monthly</span>
                </li>
                <li className="flex items-center text-gray-700">
                  <CheckCircle2 className="h-5 w-5 text-green-500 mr-3 flex-shrink-0" />
                  <span>Invoices sent and payments collected without you touching a thing</span>
                </li>
              </ul>
            </div>
            <div className="grid grid-cols-2 gap-6">
              <div className="bg-white rounded-xl p-6 shadow-md">
                <div className="text-4xl mb-2 text-orange-600">&lt; 60s</div>
                <div className="text-sm text-gray-600">Lead response time</div>
              </div>
              <div className="bg-white rounded-xl p-6 shadow-md">
                <div className="text-4xl mb-2 text-slate-600">3-5×</div>
                <div className="text-sm text-gray-600">Expected ROI</div>
              </div>
              <div className="bg-white rounded-xl p-6 shadow-md">
                <div className="text-4xl mb-2 text-green-600">90 Day</div>
                <div className="text-sm text-gray-600">Performance guarantee</div>
              </div>
              <div className="bg-white rounded-xl p-6 shadow-md">
                <div className="text-4xl mb-2 text-orange-600">24 hrs</div>
                <div className="text-sm text-gray-600">Full setup time</div>
              </div>
            </div>
          </div>
          <p className="mt-6 text-sm text-gray-500 text-center">
            Results based on projected 90-day performance models. Individual results vary.
          </p>
        </div>
      </div>
    </section>
  );
}
