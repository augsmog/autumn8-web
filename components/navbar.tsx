'use client';

import { Menu, X } from "lucide-react";
import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "./ui/button";

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const isActive = (path: string) => {
    if (path === "/") {
      return pathname === "/";
    }
    return pathname.startsWith(path);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 bg-white/95 backdrop-blur-sm border-b border-gray-200 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <Link href="/" className="flex items-center space-x-2">
            <img src="/logo.png" alt="Autumn8" className="h-16" />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link
              href="/features"
              className={`text-gray-600 hover:text-gray-900 transition-colors ${
                isActive("/features") ? "font-bold" : ""
              }`}
            >
              Features
            </Link>
            <Link
              href="/how-it-works"
              className={`text-gray-600 hover:text-gray-900 transition-colors ${
                isActive("/how-it-works") ? "font-bold" : ""
              }`}
            >
              How It Works
            </Link>
            <Link
              href="/pricing"
              className={`text-gray-600 hover:text-gray-900 transition-colors ${
                isActive("/pricing") ? "font-bold" : ""
              }`}
            >
              Pricing
            </Link>
            <Link href="/get-started">
              <Button variant="default" className="bg-orange-500 hover:bg-orange-600">
                Start Free Trial
              </Button>
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden py-4 px-4 space-y-4 border-t border-gray-200">
            <Link
              href="/features"
              className={`block text-gray-600 hover:text-gray-900 ${
                isActive("/features") ? "font-bold" : ""
              }`}
              onClick={() => setIsOpen(false)}
            >
              Features
            </Link>
            <Link
              href="/how-it-works"
              className={`block text-gray-600 hover:text-gray-900 ${
                isActive("/how-it-works") ? "font-bold" : ""
              }`}
              onClick={() => setIsOpen(false)}
            >
              How It Works
            </Link>
            <Link
              href="/pricing"
              className={`block text-gray-600 hover:text-gray-900 ${
                isActive("/pricing") ? "font-bold" : ""
              }`}
              onClick={() => setIsOpen(false)}
            >
              Pricing
            </Link>
            <Link href="/get-started" onClick={() => setIsOpen(false)}>
              <Button className="w-full bg-orange-500 hover:bg-orange-600">
                Start Free Trial
              </Button>
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
}
