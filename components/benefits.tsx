import { Card, CardContent } from "./ui/card";
import { TrendingUp, DollarSign, Clock, Target } from "lucide-react";

const benefits = [
  {
    icon: Clock,
    stat: "20-25 hours",
    period: "saved weekly",
    title: "Reclaim Your Time",
    description: "Stop drowning in administrative tasks. The average small service business spends 50-60% of their week on admin work. We cut that to less than 10 hours.",
    calculation: "At $50/hour, that's $1,000-$1,250 back in your pocket every week",
  },
  {
    icon: DollarSign,
    stat: "$24k-$48k",
    period: "annual value",
    title: "Increase Revenue Capacity",
    description: "Those recovered hours can be spent on billable work, business development, or improving service quality—activities that directly generate revenue.",
    calculation: "20 hours weekly × $25-40/hour × 48 working weeks",
  },
  {
    icon: TrendingUp,
    stat: "5-10x ROI",
    period: "return on investment",
    title: "Maximize Your Investment",
    description: "Our automation platform pays for itself many times over. Most clients see full ROI within the first month as time savings immediately translate to increased capacity.",
    calculation: "Monthly value ($2k-4k) vs. subscription cost = exceptional ROI",
  },
  {
    icon: Target,
    stat: "40% faster",
    period: "payment collection",
    title: "Improve Cash Flow",
    description: "Automated invoicing and follow-ups mean you get paid faster. No more chasing clients or forgetting to send invoices—everything happens automatically.",
    calculation: "Reduce average payment time from 45 days to 27 days",
  },
];

export function Benefits() {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-sm uppercase tracking-wide text-orange-600 mb-3">
            Expected Benefits
          </h2>
          <h3 className="text-4xl sm:text-5xl mb-4 text-gray-900">
            The True Cost of Manual Admin
          </h3>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Every hour spent on scheduling, invoicing, and data entry is an hour not spent growing your business.
            Here&apos;s what automation can unlock for you.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {benefits.map((benefit, index) => {
            const Icon = benefit.icon;
            return (
              <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-shadow">
                <CardContent className="p-8">
                  <div className="flex items-start gap-4 mb-4">
                    <div className="w-14 h-14 rounded-lg bg-orange-500 flex items-center justify-center flex-shrink-0">
                      <Icon className="h-7 w-7 text-white" />
                    </div>
                    <div>
                      <div className="text-3xl text-gray-900 mb-1">{benefit.stat}</div>
                      <div className="text-sm text-gray-500 uppercase tracking-wide">{benefit.period}</div>
                    </div>
                  </div>
                  <h4 className="text-2xl mb-3 text-gray-900">{benefit.title}</h4>
                  <p className="text-gray-600 mb-4">{benefit.description}</p>
                  <div className="bg-orange-50 rounded-lg p-4 border-l-4 border-orange-500">
                    <p className="text-sm text-gray-700">
                      <span className="text-orange-600">💡 </span>
                      {benefit.calculation}
                    </p>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Bottom ROI Calculator Summary */}
        <div className="bg-gradient-to-r from-slate-700 to-slate-900 rounded-2xl p-8 md:p-12 text-white">
          <div className="text-center max-w-4xl mx-auto">
            <h4 className="text-3xl mb-4">
              Your Potential Annual Impact
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
              <div>
                <div className="text-5xl mb-2">$24k-$48k</div>
                <div className="text-gray-300">Annual Value of Time Saved</div>
              </div>
              <div>
                <div className="text-5xl mb-2">1,000+</div>
                <div className="text-gray-300">Hours Reclaimed Annually</div>
              </div>
              <div>
                <div className="text-5xl mb-2">∞</div>
                <div className="text-gray-300">Eliminated Human Errors</div>
              </div>
            </div>
            <p className="mt-8 text-lg text-gray-300">
              These aren&apos;t just numbers—this is real business growth potential waiting to be unlocked.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
