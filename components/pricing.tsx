import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import { Check } from "lucide-react";

interface Plan {
  name: string;
  price: string;
  description: string;
  features: string[];
  cta: string;
  highlighted: boolean;
}

const plans: Plan[] = [
  {
    name: "Starter",
    price: "$49",
    description: "Perfect for solopreneurs and freelancers",
    features: [
      "Up to 100 automations/month",
      "5 tool integrations",
      "Email support",
      "Basic workflow templates",
      "Dashboard analytics",
    ],
    cta: "Start Free Trial",
    highlighted: false,
  },
  {
    name: "Professional",
    price: "$99",
    description: "Ideal for growing service businesses",
    features: [
      "Unlimited automations",
      "15 tool integrations",
      "Priority support",
      "Advanced workflow builder",
      "Custom automation rules",
      "Team collaboration",
      "API access",
    ],
    cta: "Start Free Trial",
    highlighted: true,
  },
  {
    name: "Enterprise",
    price: "Custom",
    description: "For established businesses with complex needs",
    features: [
      "Everything in Professional",
      "Unlimited integrations",
      "Dedicated account manager",
      "Custom development",
      "SLA guarantee",
      "White-label option",
    ],
    cta: "Contact Sales",
    highlighted: false,
  },
];

export function Pricing() {
  return (
    <section id="pricing" className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-sm uppercase tracking-wide text-orange-600 mb-3">
            Pricing
          </h2>
          <h3 className="text-4xl sm:text-5xl mb-4 text-gray-900">
            Simple, Transparent Pricing
          </h3>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Start free, scale as you grow. All plans include a 14-day free trial.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan, index) => {
            const cardClassName = plan.highlighted
              ? 'relative border-2 border-orange-500 shadow-2xl scale-105'
              : 'relative border shadow-lg';

            const buttonClassName = plan.highlighted
              ? 'w-full mb-8 bg-orange-500 hover:bg-orange-600'
              : 'w-full mb-8 bg-slate-800 hover:bg-slate-700';

            return (
              <Card key={index} className={cardClassName}>
                {plan.highlighted && (
                  <div className="absolute -top-4 left-0 right-0 flex justify-center">
                    <span className="bg-orange-500 text-white px-4 py-1 rounded-full text-sm">
                      Most Popular
                    </span>
                  </div>
                )}
                <CardContent className="p-8">
                  <h4 className="text-2xl mb-2 text-gray-900">{plan.name}</h4>
                  <p className="text-gray-600 mb-6 min-h-[48px]">{plan.description}</p>
                  <div className="mb-6">
                    <span className="text-5xl text-gray-900">{plan.price}</span>
                    {plan.price !== "Custom" && <span className="text-gray-600">/month</span>}
                  </div>
                  <Button className={buttonClassName}>
                    {plan.cta}
                  </Button>
                  <ul className="space-y-4">
                    {plan.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-start">
                        <Check className="h-5 w-5 text-green-500 mr-3 flex-shrink-0 mt-0.5" />
                        <span className="text-gray-700">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <div className="mt-12 text-center text-gray-600">
          <p>All plans include SSL security, automatic backups, and 99.9% uptime guarantee.</p>
        </div>
      </div>
    </section>
  );
}
