import { Card, CardContent } from "./ui/card";
import { TrendingUp, DollarSign, Clock, Target } from "lucide-react";

const benefits = [
  {
    icon: Clock,
    stat: "Under 60s",
    period: "lead response time",
    title: "Never Miss a Lead Again",
    description: "Every new inquiry gets an instant SMS response, even when you're on a job. The average service business misses 62% of calls — Autumn8 catches every single one.",
    calculation: "78% of customers hire the first company to respond",
  },
  {
    icon: DollarSign,
    stat: "52-65%",
    period: "revenue increase",
    title: "Grow Revenue Automatically",
    description: "More leads contacted, faster follow-ups, automated review collection, and recurring revenue conversion. Our clients see meaningful revenue growth within 90 days.",
    calculation: "Based on projected 90-day performance across service business clients",
  },
  {
    icon: TrendingUp,
    stat: "3-5× ROI",
    period: "return on investment",
    title: "Pays for Itself Immediately",
    description: "The combination of captured leads, faster payments, and increased reviews generates multiples of your monthly subscription in new revenue.",
    calculation: "Foundation plan at $249/mo typically generates $800-$1,200/mo in recovered revenue",
  },
  {
    icon: Target,
    stat: "4.6-4.8★",
    period: "average client rating",
    title: "Build a Reputation That Wins",
    description: "Automated review requests after every service, AI-drafted responses posted to Google and Yelp, and negative reviews flagged instantly for your personal attention.",
    calculation: "Clients typically gain 2-4 new reviews per month with automated collection",
  },
];

export function Benefits() {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-sm uppercase tracking-wide text-orange-600 mb-3">
            Results
          </h2>
          <h3 className="text-4xl sm:text-5xl mb-4 text-gray-900">
            What Happens When We Take Over
          </h3>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            While you focus on delivering great service, Autumn8 actively fills your calendar, grows your reviews, and increases your revenue.
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

        {/* Bottom ROI Summary */}
        <div className="bg-gradient-to-r from-slate-700 to-slate-900 rounded-2xl p-8 md:p-12 text-white">
          <div className="text-center max-w-4xl mx-auto">
            <h4 className="text-3xl mb-4">
              Your Potential Annual Impact
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
              <div>
                <div className="text-5xl mb-2">3-5×</div>
                <div className="text-gray-300">Average Client ROI</div>
              </div>
              <div>
                <div className="text-5xl mb-2">Under 5 min</div>
                <div className="text-gray-300">Average Lead Response Time</div>
              </div>
              <div>
                <div className="text-5xl mb-2">90 Days</div>
                <div className="text-gray-300">Performance Guarantee</div>
              </div>
            </div>
            <p className="mt-8 text-lg text-gray-300">
              We don&apos;t just automate tasks — we actively run your operations and grow your business.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
