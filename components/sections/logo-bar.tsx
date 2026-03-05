'use client';

import { Bug, Leaf, Droplets, Wrench, Paintbrush, Hammer } from 'lucide-react';

const ICONS = [
  { Icon: Bug, label: 'Pest Control' },
  { Icon: Leaf, label: 'Lawn Care' },
  { Icon: Droplets, label: 'Pool Service' },
  { Icon: Wrench, label: 'HVAC' },
  { Icon: Paintbrush, label: 'Painting' },
  { Icon: Hammer, label: 'Construction' },
  // duplicated for seamless marquee
  { Icon: Bug, label: 'Pest Control 2' },
  { Icon: Leaf, label: 'Lawn Care 2' },
  { Icon: Droplets, label: 'Pool Service 2' },
  { Icon: Wrench, label: 'HVAC 2' },
  { Icon: Paintbrush, label: 'Painting 2' },
  { Icon: Hammer, label: 'Construction 2' },
];

export default function LogoBar() {
  return (
    <section className="py-12 border-y border-border overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-8">
        <p className="text-text-muted text-sm tracking-widest uppercase font-medium">
          Built for the businesses that keep your neighborhood running
        </p>
      </div>
      {/* Marquee row */}
      <div className="relative w-full overflow-hidden">
        <div className="flex animate-marquee gap-16 w-max">
          {ICONS.map(({ Icon, label }) => (
            <div key={label} className="flex flex-col items-center gap-2 flex-shrink-0">
              <Icon className="w-8 h-8 text-zinc-600" />
              <span className="text-xs text-text-muted capitalize">
                {label.replace(/ \d+$/, '')}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
