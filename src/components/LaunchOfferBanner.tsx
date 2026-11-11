import { Sparkles } from 'lucide-react';
import { LAUNCH_OFFER } from '@/data/templates';

export function LaunchOfferBanner({ compact = false }: { compact?: boolean }) {
  if (!LAUNCH_OFFER.enabled) return null;

  if (compact) {
    return (
      <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald/10 border border-emerald/30">
        <Sparkles className="w-3.5 h-3.5 text-emerald" />
        <span className="text-[10px] tracking-widest2 uppercase text-emerald font-semibold">
          {LAUNCH_OFFER.subtitle}
        </span>
      </div>
    );
  }

  return (
    <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-sapphire-deep via-sapphire to-sapphire-deep px-6 py-10 md:px-14 md:py-12 grain-dark">
      {/* Decorative glow */}
      <div className="absolute -top-24 -right-24 w-72 h-72 rounded-full bg-champagne/10 blur-3xl" aria-hidden />
      <div className="absolute -bottom-24 -left-24 w-72 h-72 rounded-full bg-emerald/10 blur-3xl" aria-hidden />

      {/* Concentric rings */}
      <div className="absolute right-12 top-1/2 -translate-y-1/2 hidden md:flex items-center justify-center pointer-events-none" aria-hidden>
        <div className="w-44 h-44 rounded-full border border-champagne/10" />
        <div className="absolute w-32 h-32 rounded-full border border-champagne/8" />
      </div>

      <div className="relative flex flex-col md:flex-row items-center justify-between gap-8">
        <div className="text-center md:text-left max-w-lg">
          <div className="flex items-center gap-2 md:justify-start justify-center mb-3">
            <span className="h-px w-5 bg-champagne/40" />
            <p className="eyebrow text-champagne">{LAUNCH_OFFER.title}</p>
            <span className="h-px w-5 bg-champagne/40" />
          </div>
          <h3 className="heading-display text-3xl md:text-5xl text-ivory leading-display text-balance">
            {LAUNCH_OFFER.subtitle}
          </h3>
          <div className="divider-ornament my-4 md:my-5">
            <span className="text-champagne text-xs">✦</span>
          </div>
          <p className="heading-editorial italic text-ivory/60 max-w-md leading-relaxed2">
            {LAUNCH_OFFER.description}
          </p>
        </div>
        <div className="flex-shrink-0 relative">
          {/* Glow behind circle */}
          <div className="absolute inset-0 rounded-full bg-champagne/20 blur-2xl scale-110" aria-hidden />
          <div className="relative w-28 h-28 md:w-32 md:h-32 rounded-full border-2 border-champagne flex flex-col items-center justify-center shadow-glow-gold animate-breathe">
            <span className="heading-display text-4xl md:text-5xl text-champagne">50</span>
            <span className="eyebrow text-champagne mt-0.5">% OFF</span>
          </div>
        </div>
      </div>
    </div>
  );
}
