import { useParams, Navigate, Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { TEMPLATES } from '@/data/templates';
import { CATEGORY_MAP, CATEGORIES } from '@/data/colorways';
import { InvitationCard } from '@/components/InvitationCard';
import { OrnamentArt } from '@/components/OrnamentArt';
import { LaunchOfferBanner } from '@/components/LaunchOfferBanner';
import type { CategoryId } from '@/types';

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
      {/* Hero */}
      <div className="relative overflow-hidden px-6 py-16 md:py-24" style={{ background: cw ? `linear-gradient(160deg, ${cw.bg}, ${cw.bgAlt})` : 'linear-gradient(160deg, #F4EFE5, #E8E0CC)' }}>
        <div className="absolute inset-0 pointer-events-none">
          {cw && <div className="absolute -top-20 -right-20 w-80 h-80 rounded-full blur-3xl opacity-20" style={{ background: cw.primary }} />}
        </div>
        <div className="max-w-5xl mx-auto relative flex flex-col items-center text-center">
          {sample && cw && (
            <div className="mb-6 animate-fade-in">
              <OrnamentArt ornament={sample.ornament} cw={cw} size={70} />
            </div>
          )}
          <p className="text-[10px] tracking-widest3 uppercase text-champagne mb-3">Collection</p>
          <h1 className="text-4xl md:text-6xl font-display text-sapphire-deep leading-tight">{meta.name}</h1>
          <p className="font-tamil text-xl md:text-2xl text-sapphire/70 mt-2">{meta.tamilName}</p>
          <div className="h-px w-16 mx-auto my-5 gold-line" />
          <p className="text-base md:text-lg font-display italic text-sapphire/60 max-w-xl">{meta.hero}</p>
          <p className="text-sm text-sapphire/50 max-w-lg mt-2">{meta.blurb}</p>
        </div>
      </div>

      {/* Grid */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="flex items-center justify-between mb-8">
          <p className="text-xs tracking-widest2 uppercase text-sapphire/40">
            {items.length} {items.length === 1 ? 'Design' : 'Designs'}
          </p>
          <Link to="/explore" className="text-xs tracking-widest2 uppercase text-champagne hover:text-sapphire transition flex items-center gap-1">
            All Invitations <ArrowRight className="w-3 h-3" />
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
