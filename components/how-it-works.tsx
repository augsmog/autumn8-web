import { CheckCircle2 } from "lucide-react";

const steps = [
  {
    number: "01",
    title: "Connect Your Tools",
    description: "Link your existing calendar, email, CRM, and accounting software in minutes. We integrate with all major platforms.",
  },
  {
    number: "02",
    title: "Customize Automations",
    description: "Choose from pre-built workflows or create custom automation rules that match your business processes perfectly.",
  },
  {
    number: "03",
    title: "Watch It Work",
    description: "Sit back and watch as repetitive tasks happen automatically. Monitor everything from your dashboard in real-time.",
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
            Get Started in Minutes
          </h3>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Simple setup, powerful results. No technical expertise required.
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
                The Real Impact on Your Business
              </h4>
              <p className="text-lg text-gray-600 mb-6">
                Administrative automation isn&apos;t just about saving time—it&apos;s about unlocking revenue potential and improving your bottom line.
              </p>
              <ul className="space-y-3">
                <li className="flex items-center text-gray-700">
                  <CheckCircle2 className="h-5 w-5 text-green-500 mr-3 flex-shrink-0" />
                  <span>Save 20-25 hours per week on repetitive admin tasks</span>
                </li>
                <li className="flex items-center text-gray-700">
                  <CheckCircle2 className="h-5 w-5 text-green-500 mr-3 flex-shrink-0" />
                  <span>Reduce billing cycles by 40% with instant invoicing</span>
                </li>
                <li className="flex items-center text-gray-700">
                  <CheckCircle2 className="h-5 w-5 text-green-500 mr-3 flex-shrink-0" />
                  <span>Eliminate missed follow-ups and lost revenue opportunities</span>
                </li>
              </ul>
            </div>
            <div className="grid grid-cols-2 gap-6">
              <div className="bg-white rounded-xl p-6 shadow-md">
                <div className="text-4xl mb-2 text-orange-600">20-25</div>
                <div className="text-sm text-gray-600">Hours saved weekly</div>
              </div>
              <div className="bg-white rounded-xl p-6 shadow-md">
                <div className="text-4xl mb-2 text-slate-600">$2-4k</div>
                <div className="text-sm text-gray-600">Value per month*</div>
              </div>
              <div className="bg-white rounded-xl p-6 shadow-md">
                <div className="text-4xl mb-2 text-green-600">5-10x</div>
                <div className="text-sm text-gray-600">Expected ROI</div>
              </div>
              <div className="bg-white rounded-xl p-6 shadow-md">
                <div className="text-4xl mb-2 text-orange-600">40%</div>
                <div className="text-sm text-gray-600">Faster payments</div>
              </div>
            </div>
          </div>
          <p className="mt-6 text-sm text-gray-500 text-center">
            *Based on 20-25 hours saved weekly at $25-40/hour billing rate
          </p>
        </div>
      </div>
    </section>
  );
}
