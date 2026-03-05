import Link from 'next/link';
import { AUDIT_URL, CLIENT_LOGIN_URL } from '@/lib/constants';

export default function Footer() {
  return (
    <footer className="bg-navy-deeper border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-10">
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="inline-block mb-4">
              <span className="text-xl font-bold text-white tracking-tight">
                autumn<span className="text-accent">8</span>
              </span>
            </Link>
            <p className="text-sm text-white/50 leading-relaxed max-w-xs">
              Managed automation for field service and home service businesses — from solo operators to PE-backed rollups.
            </p>
          </div>

          <div>
            <h4 className="text-xs font-semibold text-white/40 uppercase tracking-widest mb-4">Services</h4>
            <ul className="space-y-2.5">
              {[
                ['How It Works', '/how-it-works'],
                ['Pricing', '/pricing'],
                ['Book an Audit', '/audit'],
              ].map(([label, href]) => (
                <li key={href}>
                  <Link href={href} className="text-sm text-white/60 hover:text-white transition-colors">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-semibold text-white/40 uppercase tracking-widest mb-4">Who We Serve</h4>
            <ul className="space-y-2.5">
              {[
                ['Field Service', '/industries'],
                ['Home Services', '/industries'],
                ['PE Rollups', '/industries'],
              ].map(([label, href]) => (
                <li key={label}>
                  <Link href={href} className="text-sm text-white/60 hover:text-white transition-colors">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-semibold text-white/40 uppercase tracking-widest mb-4">Account</h4>
            <ul className="space-y-2.5">
              <li>
                <Link
                  href={CLIENT_LOGIN_URL}
                  className="text-sm text-white/60 hover:text-white transition-colors"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Client Login
                </Link>
              </li>
              <li>
                <Link
                  href={AUDIT_URL}
                  className="text-sm text-accent hover:text-accent-light transition-colors"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Book Free Audit →
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 pt-6 flex flex-col sm:flex-row justify-between items-center gap-3">
          <p className="text-xs text-white/30">
            © {new Date().getFullYear()} Autumn8. All rights reserved.
          </p>
          <p className="text-xs text-white/30">
            augie@autumn8.me
          </p>
        </div>
      </div>
    </footer>
  );
}
