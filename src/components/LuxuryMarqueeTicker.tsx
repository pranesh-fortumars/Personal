import React from 'react';
import { Sparkles } from 'lucide-react';

const HIGHLIGHTS = [
  'Bespoke Gold Foil Stamping',
  'Authentic Tamil Unicode Calligraphy',
  '3D Virtual Multi-Page Flipping',
  '100% Free Nationwide Delivery',
  'Direct WhatsApp Concierge Approval',
  'Original Artwork Guarantee',
  'Four to Six Coordinated Palettes Per Suite',
];

export const LuxuryMarqueeTicker: React.FC = () => {
  return (
    <div className="w-full bg-sapphire-deep border-y border-champagne/20 py-3.5 overflow-hidden relative select-none">
      <div className="flex w-max animate-marquee space-x-10 text-xs uppercase tracking-widest2 text-champagne/90 font-medium">
        {[...HIGHLIGHTS, ...HIGHLIGHTS].map((text, idx) => (
          <div key={idx} className="flex items-center gap-3">
            <span>{text}</span>
            <Sparkles className="w-3 h-3 text-champagne/50" />
          </div>
        ))}
      </div>
    </div>
  );
};

