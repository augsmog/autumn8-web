import { Button } from "./ui/button";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

export function CTA() {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-slate-700 via-slate-800 to-slate-900">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-4xl sm:text-5xl mb-6 text-white">
          Ready to Automate Your Business?
        </h2>
        <p className="text-xl text-gray-300 mb-10 max-w-2xl mx-auto">
          Start saving 20+ hours per week and unlock your business&apos;s growth potential with intelligent automation.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Link href="/get-started">
            <Button
              size="lg"
              className="bg-orange-500 hover:bg-orange-600 text-white text-lg px-8 h-14"
            >
              Get Started Today
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
          <Link href="/get-started">
            <Button
              size="lg"
              variant="outline"
              className="border-2 border-white bg-white/10 text-white hover:bg-white hover:text-slate-900 text-lg px-8 h-14"
            >
              Schedule a Demo
            </Button>
          </Link>
        </div>
        <p className="mt-6 text-gray-300 text-sm">
          No credit card required • Setup assistance included • Cancel anytime
        </p>
      </div>
    </section>
  );
}
