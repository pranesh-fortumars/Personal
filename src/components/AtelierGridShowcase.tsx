import React from 'react';
import { ShieldCheck, Truck, Sparkles, Award, HeartHandshake } from 'lucide-react';

const METRICS = [
  { value: '60+', label: 'Original Bespoke Suites', sub: 'Handcrafted compositions' },
  { value: '100%', label: 'Complimentary Delivery', sub: 'Nationwide across India' },
  { value: '3-in-1', label: 'Tamil · English · Bilingual', sub: 'Authentic Unicode script' },
  { value: '24-48h', label: 'Proof Approval Time', sub: 'Dedicated artisan concierge' },
];

const PILLARS = [
  {
    icon: Sparkles,
    title: 'Precision Craftsmanship',
    description: 'Every invitation is treated as an editorial artwork with custom borders, flourishes, and authentic Tamil Unicode calligraphy.'
  },
  {
    icon: Award,
    title: 'Bespoke Color Matrix',
    description: 'Transform each page in real time with 4 to 6 curated royal palettes, from Royal Emerald & Gold to Deep Sapphire & Silver.'
  },
  {
    icon: Truck,
    title: 'Zero Delivery Fees',
    description: 'Every invitation order is packed in luxury presentation boxing and delivered directly to your address with zero shipping fees.'
  },
  {
    icon: HeartHandshake,
    title: 'Personal Concierge',
    description: 'Direct WhatsApp proofing and consultation with our master designers before a single card enters production.'
  }
];

export const AtelierGridShowcase: React.FC = () => {
  return (
    <section className="py-24 md:py-32 bg-sapphire-deep text-ivory relative overflow-hidden grain-dark">
      {/* Background radial gradient halos like modern tech/consulting hero sections */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-10 w-96 h-96 rounded-full bg-royal-sapphire/40 blur-[120px]" />
        <div className="absolute bottom-1/4 right-10 w-96 h-96 rounded-full bg-emerald/20 blur-[120px]" />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-champagne/10 border border-champagne/30 text-[10px] tracking-widest2 uppercase text-champagne mb-4">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>The Atelier Standard</span>
          </div>
          <h2 className="heading-display text-3xl md:text-5xl text-ivory leading-tight">
            Designed for Distinction. <br />
            <span className="text-champagne italic">Engineered for Memory.</span>
          </h2>
          <p className="mt-4 text-base text-ivory/70 heading-editorial italic max-w-2xl mx-auto">
            Combining the structural precision of modern design studios with the timeless nobility of South Indian invitation heritage.
          </p>
        </div>

        {/* 1. Statistics / Metric Counter Strip */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-1 bg-ivory/[0.08] p-1 rounded-2xl border border-ivory/15 shadow-2xl mb-16 overflow-hidden">
          {METRICS.map((m) => (
            <div key={m.label} className="bg-sapphire-deep/90 backdrop-blur-md p-6 text-center rounded-xl hover:bg-sapphire/80 transition-all duration-300">
              <p className="font-serif text-3xl md:text-4xl font-bold text-champagne tracking-tight">{m.value}</p>
              <p className="text-xs font-semibold text-ivory uppercase tracking-wider mt-2">{m.label}</p>
              <p className="text-[11px] text-ivory/50 mt-1 italic">{m.sub}</p>
            </div>
          ))}
        </div>

        {/* 2. Structured Bordered Card Grid (Foodnova style modular grid) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px bg-champagne/20 border border-champagne/30 rounded-2xl overflow-hidden shadow-2xl">
          {PILLARS.map((p) => (
            <div 
              key={p.title} 
              className="bg-sapphire-deep/95 p-8 transition-all duration-300 hover:bg-royal-sapphire/40 group relative"
            >
              <div className="w-12 h-12 rounded-xl bg-champagne/10 border border-champagne/20 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:border-champagne transition-all duration-300">
                <p.icon className="w-6 h-6 text-champagne" />
              </div>
              <h3 className="font-display text-lg text-ivory font-semibold mb-2">{p.title}</h3>
              <p className="text-xs text-ivory/70 leading-relaxed font-sans font-light">{p.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
