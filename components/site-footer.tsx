import Link from 'next/link';
import Image from 'next/image';

export default function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-background border-t border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 mb-10">
          {/* Column 1 */}
          <div className="col-span-2 md:col-span-1">
            <div className="bg-white rounded-xl p-2 inline-block mb-4">
              <Image src="/logo.png" alt="Autumn8" width={120} height={40} className="h-8 w-auto object-contain" />
            </div>
            <p className="text-text-muted text-sm leading-relaxed max-w-xs">
              Managed business automation for service companies.
            </p>
            <p className="text-text-muted text-sm mt-2">autumn8.me</p>
          </div>

          {/* Column 2 */}
          <div>
            <h4 className="text-xs font-semibold text-text-muted uppercase tracking-widest mb-5">Product</h4>
            <ul className="space-y-3">
              {[
                ['How It Works', '#how-it-works'],
                ['Results', '#results'],
                ['Pricing', '#pricing'],
                ['FAQ', '#faq'],
              ].map(([label, href]) => (
                <li key={label}>
                  <a href={href} className="text-sm text-text-secondary hover:text-text-primary transition-colors">
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3 */}
          <div>
            <h4 className="text-xs font-semibold text-text-muted uppercase tracking-widest mb-5">Company</h4>
            <ul className="space-y-3">
              {[
                ['About', '/about'],
                ['Contact', 'mailto:team@autumn8.me'],
                ['Privacy Policy', '/privacy'],
                ['Terms of Service', '/terms'],
              ].map(([label, href]) => (
                <li key={label}>
                  <Link href={href} className="text-sm text-text-secondary hover:text-text-primary transition-colors">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4 */}
          <div>
            <h4 className="text-xs font-semibold text-text-muted uppercase tracking-widest mb-5">Contact</h4>
            <a
              href="mailto:team@autumn8.me"
              className="text-sm text-text-secondary hover:text-brand-orange transition-colors"
            >
              team@autumn8.me
            </a>
          </div>
        </div>

        <div className="border-t border-border pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-text-muted text-sm">© {year} Autumn8. All rights reserved.</p>
          <p className="text-text-muted text-xs">Workflow Solutions for Service Businesses</p>
        </div>
      </div>
    </footer>
  );
}
