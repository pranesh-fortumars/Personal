import { useParams, Navigate, Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { TEMPLATES } from '@/data/templates';
import { CATEGORIES } from '@/data/colorways';
import { InvitationCard } from '@/components/InvitationCard';
import { OrnamentArt } from '@/components/OrnamentArt';
import { LaunchOfferBanner } from '@/components/LaunchOfferBanner';

export function CollectionPage() {
  const { categoryId } = useParams<{ categoryId: string }>();

  const meta = CATEGORIES.find((c) => c.id === categoryId || c.route === `/collections/${categoryId}`);
  if (!meta) return <Navigate to="/explore" replace />;

  const items = TEMPLATES.filter((t) => t.category === meta.id);
  const sample = items[0];
  const cw = sample?.colorways[0];

  // Related categories
  const related = CATEGORIES.filter((c) => c.id !== meta.id).slice(0, 5);

  return (
    <div className="min-h-screen bg-porcelain pt-20">
      {/* Luxury Royal Hero */}
      <div 
        className="relative overflow-hidden px-6 py-20 md:py-28 bg-sapphire-deep text-ivory grain-dark"
        style={{
          background: 'radial-gradient(ellipse 70% 60% at 50% 20%, #173A70 0%, #081628 100%)',
          borderBottom: '1px solid rgba(197, 164, 109, 0.25)'
        }}
      >
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-[600px] h-80 rounded-full blur-[100px] opacity-30 bg-champagne" />
          <div className="absolute bottom-0 right-10 w-96 h-96 rounded-full blur-[120px] opacity-20 bg-emerald" />
        </div>
        <div className="max-w-5xl mx-auto relative flex flex-col items-center text-center z-10">
          {sample && cw && (
            <div className="mb-6 animate-fade-in p-3 rounded-full bg-champagne/10 border border-champagne/30 backdrop-blur-sm shadow-glow-gold">
              <OrnamentArt ornament={sample.ornament} cw={{ ...cw, primary: '#C5A46D', gold: '#F4EFE5' }} size={65} />
            </div>
          )}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-champagne/15 border border-champagne/30 text-[10px] tracking-widest3 uppercase text-champagne mb-4">
            <span>Bespoke Collection</span>
          </div>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-display text-ivory leading-tight drop-shadow-md">
            {meta.name}
          </h1>
          <p className="font-tamil text-2xl md:text-3xl text-champagne mt-3 tracking-wide">
            {meta.tamilName}
          </p>
          <div className="h-px w-20 mx-auto my-6 bg-gradient-to-r from-transparent via-champagne to-transparent" />
          <p className="text-lg md:text-xl font-display italic text-ivory/85 max-w-xl font-normal leading-relaxed">
            {meta.hero}
          </p>
          <p className="text-sm text-ivory/70 max-w-lg mt-2.5 leading-relaxed font-sans font-light">
            {meta.blurb}
          </p>
        </div>
      </div>

      {/* Grid */}
      <div className="max-w-7xl mx-auto px-6 py-14">
        <div className="flex items-center justify-between mb-8 pb-4 border-b border-champagne/20">
          <p className="text-xs tracking-widest2 uppercase text-sapphire-deep font-semibold">
            {items.length} {items.length === 1 ? 'Curated Design' : 'Curated Designs'}
          </p>
          <Link to="/explore" className="text-xs tracking-widest2 uppercase text-champagne font-semibold hover:text-sapphire-deep transition flex items-center gap-1.5">
            All Invitations <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {items.length === 0 ? (
          <p className="text-center py-20 font-display italic text-sapphire/40">New designs coming soon to this collection.</p>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8">
            {items.map((t, i) => (
              <InvitationCard key={t.id} template={t} index={i} />
            ))}
          </div>
        )}

        {/* Launch offer */}
        <div className="mt-16">
          <LaunchOfferBanner />
        </div>

        {/* Related categories */}
        <div className="mt-16">
          <p className="text-[10px] tracking-widest3 uppercase text-champagne mb-4 text-center">Explore Other Worlds</p>
          <div className="flex flex-wrap justify-center gap-2">
            {related.map((c) => (
              <Link
                key={c.id}
                to={c.route}
                className="px-4 py-2 rounded-full border border-sapphire/15 text-xs text-sapphire/70 hover:border-champagne hover:text-champagne transition"
              >
                {c.name}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
