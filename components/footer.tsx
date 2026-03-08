import { Mail, Twitter, Linkedin, Github } from "lucide-react";
import Link from "next/link";

export function Footer() {
  return (
    <footer className="bg-slate-900 text-gray-300 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div>
            <Link href="/" className="flex items-center space-x-2 mb-4">
              <img src="/logo.png" alt="Autumn8" className="h-16" />
            </Link>
            <p className="text-gray-400 text-sm">
              We run your business operations so you can focus on your crews.
            </p>
          </div>

          <div>
            <h4 className="text-white mb-4">Product</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/features" className="hover:text-white transition-colors">Features</Link></li>
              <li><Link href="/pricing" className="hover:text-white transition-colors">Pricing</Link></li>
              <li><Link href="/how-it-works" className="hover:text-white transition-colors">How It Works</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white mb-4">Company</h4>
            <ul className="space-y-2 text-sm">
              <li><span className="text-gray-400 cursor-not-allowed">About</span></li>
              <li><span className="text-gray-400 cursor-not-allowed">Blog</span></li>
              <li><Link href="/get-started" className="hover:text-white transition-colors">Contact</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white mb-4">Legal</h4>
            <ul className="space-y-2 text-sm">
              <li><span className="text-gray-400 cursor-not-allowed">Privacy Policy</span></li>
              <li><span className="text-gray-400 cursor-not-allowed">Terms of Service</span></li>
              <li><span className="text-gray-400 cursor-not-allowed">Security</span></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-gray-400 mb-4 md:mb-0">
            © 2026 Autumn8. All rights reserved.
          </p>
          <div className="flex space-x-6">
            <a href="#twitter" className="hover:text-white transition-colors">
              <Twitter className="h-5 w-5" />
            </a>
            <a href="#linkedin" className="hover:text-white transition-colors">
              <Linkedin className="h-5 w-5" />
            </a>
            <a href="#github" className="hover:text-white transition-colors">
              <Github className="h-5 w-5" />
            </a>
            <a href="mailto:team@autumn8.me" className="hover:text-white transition-colors">
              <Mail className="h-5 w-5" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
