import { useState, useEffect, useMemo } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Plus, Minus, ShoppingBag, RotateCcw, Save, Truck, Check, Palette, Type, Globe2, Heart } from 'lucide-react';
import { TEMPLATE_MAP, BUSINESS } from '@/data/templates';
import { CATEGORY_MAP } from '@/data/colorways';
import { InvitationViewer } from '@/components/InvitationViewer';
import { LaunchOfferBanner } from '@/components/LaunchOfferBanner';
import { WaxSealCustomizer } from '@/components/WaxSealCustomizer';
import { useCart, emptyPersonalisation } from '@/context/CartContext';
import { useWishlist } from '@/context/WishlistContext';
import { useDraft } from '@/hooks/useDraft';
import type { Language, Personalisation } from '@/types';

export function InvitationDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const { addItem } = useCart();

  const template = useMemo(() => {
    const id = parseInt(slug?.split('-')[0] || '0', 10);
    return TEMPLATE_MAP[id];
  }, [slug]);

  const [colorIdx, setColorIdx] = useState(0);
  const [language, setLanguage] = useState<Language>('en');
  const [quantity, setQuantity] = useState(100);
  const [p, setP] = useState<Personalisation>(emptyPersonalisation());
  const [saved, setSaved] = useState(false);
  const [added, setAdded] = useState(false);
  const [sealInitials, setSealInitials] = useState('AV');
  const [sealColor, setSealColor] = useState('#C5A46D');
  const { draft, save, reset } = useDraft(template?.id || 0);
  const { isWishlisted, toggleWishlist } = useWishlist();

  useEffect(() => {
    if (draft && Object.values(draft).some((v) => v)) {
      setP(draft);
    }
  }, [draft]);

  if (!template) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-20 px-6">
        <div className="text-center">
          <p className="font-display italic text-sapphire/50 text-xl">This invitation could not be found.</p>
          <Link to="/explore" className="mt-4 inline-block text-xs tracking-widest2 uppercase text-champagne">
            ← Back to all invitations
          </Link>
        </div>
      </div>
    );
  }

  const cw = template.colorways[colorIdx];
  const cat = CATEGORY_MAP[template.category];
  const total = template.price * quantity;

  const updateField = (key: keyof Personalisation, value: string) => {
    setP((prev) => ({ ...prev, [key]: value }));
    setSaved(false);
  };

  const handleSave = () => {
    save(p);
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  const handleReset = () => {
    const empty = emptyPersonalisation();
    setP(empty);
    reset();
  };

  const handleAddToCart = () => {
    addItem({
      templateId: template.id,
      templateName: template.name,
      colorwayName: cw.name,
      language,
      quantity,
      unitPrice: template.price,
      pages: template.pageTypes.length,
      personalisation: p,
    });
    setAdded(true);
    setTimeout(() => navigate('/cart'), 1200);
  };

  // Determine which personalisation fields to show based on category
  const fields = getFieldsForCategory(template.category);

  return (
    <div className="min-h-screen bg-porcelain pt-20">
      {/* Breadcrumb */}
      <div className="max-w-7xl mx-auto px-6 pt-4">
        <Link to="/explore" className="inline-flex items-center gap-1.5 text-xs tracking-widest2 uppercase text-sapphire/50 hover:text-champagne transition">
          <ArrowLeft className="w-3.5 h-3.5" /> All Invitations
        </Link>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-10">
          {/* Left: Viewer + title */}
          <div>
            <div className="text-center mb-6 relative">
              <button
                onClick={() => toggleWishlist(template.id)}
                className={`absolute right-4 top-2 p-2.5 rounded-full border transition-all ${
                  isWishlisted(template.id)
                    ? 'bg-red-50 border-red-200 text-red-500 scale-110 shadow-sm'
                    : 'border-champagne/30 text-sapphire/40 hover:text-red-400 bg-white/60'
                }`}
                title={isWishlisted(template.id) ? 'Saved in Wishlist' : 'Add to Wishlist'}
              >
                <Heart className={`w-5 h-5 ${isWishlisted(template.id) ? 'fill-current' : ''}`} />
              </button>
              <p className="text-[10px] tracking-widest3 uppercase text-champagne mb-2">{cat.name}</p>
              <h1 className="text-3xl md:text-5xl font-display text-sapphire-deep leading-tight">{template.name}</h1>
              <p className="font-tamil text-lg text-sapphire/60 mt-1">{template.tamilName}</p>
            </div>

            <InvitationViewer
              template={template}
              colorway={cw}
              language={language}
              personalisation={p}
              pages={template.defaultContent}
            />

            <div className="mt-6 text-center">
              <p className="text-xs text-sapphire/40 font-display italic">
                Click the invitation's right side to turn forward, left side to turn back.
                Swipe on mobile. Use the fullscreen icon for a closer look.
              </p>
            </div>
          </div>

          {/* Right: Customisation studio */}
          <div className="space-y-6">
            {/* Price */}
            <div className="text-center p-5 rounded-xl bg-ivory/60 border border-champagne/20">
              <p className="text-[10px] tracking-widest3 uppercase text-champagne mb-1">Price per Invitation</p>
              <p className="text-4xl font-serif text-sapphire-deep">
                ₹{template.price.toLocaleString('en-IN')}
              </p>
              <div className="flex items-center justify-center gap-3 mt-4">
                <button
                  onClick={() => setQuantity((q) => Math.max(1, q - 25))}
                  className="w-9 h-9 rounded-full border border-sapphire/20 flex items-center justify-center hover:bg-sapphire/5 transition"
                  aria-label="Decrease quantity"
                >
                  <Minus className="w-4 h-4 text-sapphire" />
                </button>
                <div className="text-center min-w-20">
                  <p className="text-2xl font-display text-sapphire-deep">{quantity}</p>
                  <p className="text-[9px] tracking-widest2 uppercase text-sapphire/40">Quantity</p>
                </div>
                <button
                  onClick={() => setQuantity((q) => q + 25)}
                  className="w-9 h-9 rounded-full border border-sapphire/20 flex items-center justify-center hover:bg-sapphire/5 transition"
                  aria-label="Increase quantity"
                >
                  <Plus className="w-4 h-4 text-sapphire" />
                </button>
              </div>
              <div className="mt-4 pt-4 border-t border-champagne/20">
                <div className="flex justify-between text-sm">
                  <span className="text-sapphire/60">Total</span>
                  <span className="font-display font-semibold text-sapphire-deep">₹{total.toLocaleString('en-IN')}</span>
                </div>
                <div className="flex justify-between text-sm mt-1">
                  <span className="text-sapphire/60">Delivery</span>
                  <span className="text-emerald font-semibold">FREE</span>
                </div>
              </div>
            </div>

            {/* Language selector */}
            <div className="p-5 rounded-xl bg-ivory/60 border border-champagne/20">
              <p className="text-[10px] tracking-widest3 uppercase text-champagne mb-3 flex items-center gap-1.5">
                <Globe2 className="w-3.5 h-3.5" /> Language
              </p>
              <div className="grid grid-cols-3 gap-2">
                {([
                  { v: 'en', label: 'ENGLISH' },
                  { v: 'ta', label: 'தமிழ்' },
                  { v: 'bi', label: 'BILINGUAL' },
                ] as const).map((l) => (
                  <button
                    key={l.v}
                    onClick={() => setLanguage(l.v)}
                    className={`py-2.5 rounded-lg text-xs tracking-widest2 uppercase transition ${
                      language === l.v
                        ? 'bg-sapphire text-ivory'
                        : 'bg-porcelain text-sapphire/60 hover:bg-sapphire/10'
                    } ${l.v === 'ta' ? 'font-tamil text-sm' : ''}`}
                  >
                    {l.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Colour studio */}
            <div className="p-5 rounded-xl bg-ivory/60 border border-champagne/20">
              <p className="text-[10px] tracking-widest3 uppercase text-champagne mb-3 flex items-center gap-1.5">
                <Palette className="w-3.5 h-3.5" /> Colourway
              </p>
              <div className="grid grid-cols-3 gap-2">
                {template.colorways.map((c, i) => (
                  <button
                    key={c.name}
                    onClick={() => setColorIdx(i)}
                    className={`group flex flex-col items-center p-2 rounded-lg border transition ${
                      colorIdx === i ? 'border-champagne bg-champagne/10' : 'border-transparent hover:border-champagne/30'
                    }`}
                  >
                    <span className="w-10 h-10 rounded-full ring-2 ring-offset-2 ring-offset-ivory transition" style={{
                      background: `linear-gradient(135deg, ${c.swatch[0]}, ${c.swatch[1]})`,
                      '--tw-ring-color': colorIdx === i ? c.gold : 'transparent',
                    } as React.CSSProperties} />
                    <span className="text-[9px] text-sapphire/60 mt-1.5 text-center leading-tight">{c.name}</span>
                  </button>
                ))}
              </div>
              <p className="text-center mt-3 text-sm font-display text-sapphire-deep">{cw.name}</p>
            </div>

            {/* Personalisation */}
            <div className="p-5 rounded-xl bg-ivory/60 border border-champagne/20">
              <p className="text-[10px] tracking-widest3 uppercase text-champagne mb-3 flex items-center gap-1.5">
                <Type className="w-3.5 h-3.5" /> Personalise
              </p>
              <div className="space-y-3">
                {fields.map((f) => (
                  <div key={f.key}>
                    <label className="text-[10px] tracking-widest2 uppercase text-sapphire/40 block mb-1">{f.label}</label>
                    <input
                      type={f.type || 'text'}
                      value={p[f.key] || ''}
                      onChange={(e) => updateField(f.key, e.target.value)}
                      placeholder={f.placeholder}
                      className={`w-full px-3 py-2 rounded-lg bg-porcelain border border-champagne/20 text-sm text-sapphire focus:outline-none focus:border-champagne transition ${f.tamil ? 'font-tamil' : ''}`}
                    />
                  </div>
                ))}
              </div>
              <div className="flex gap-2 mt-4">
                <button
                  onClick={handleSave}
                  className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg border border-sapphire/20 text-xs tracking-widest2 uppercase text-sapphire hover:bg-sapphire/5 transition"
                >
                  {saved ? <Check className="w-3.5 h-3.5 text-emerald" /> : <Save className="w-3.5 h-3.5" />}
                  {saved ? 'Saved' : 'Save Draft'}
                </button>
                <button
                  onClick={handleReset}
                  className="flex items-center justify-center gap-1.5 py-2 px-4 rounded-lg border border-sapphire/20 text-xs tracking-widest2 uppercase text-sapphire/60 hover:bg-sapphire/5 transition"
                >
                  <RotateCcw className="w-3.5 h-3.5" /> Reset
                </button>
              </div>
            </div>

            {/* Bespoke Wax Seal Customizer */}
            <WaxSealCustomizer
              initials={sealInitials}
              sealColor={sealColor}
              onColorChange={setSealColor}
              onInitialsChange={setSealInitials}
            />

            {/* Free delivery note */}
            <div className="flex items-center justify-center gap-2 text-emerald">
              <Truck className="w-5 h-5" />
              <span className="text-xs tracking-widest2 uppercase font-semibold">Complimentary Delivery</span>
            </div>

            {/* Add to cart */}
            <button
              onClick={handleAddToCart}
              disabled={added}
              className="w-full flex items-center justify-center gap-2 py-4 rounded-full bg-champagne text-sapphire-deep text-xs tracking-widest2 uppercase font-semibold hover:bg-ivory transition-all disabled:bg-emerald disabled:text-ivory"
            >
              {added ? <><Check className="w-5 h-5" /> Added — Redirecting...</> : <><ShoppingBag className="w-5 h-5" /> Add to Cart — ₹{total.toLocaleString('en-IN')}</>}
            </button>

            {/* WhatsApp direct */}
            <a
              href={`https://wa.me/${BUSINESS.whatsapp}?text=${encodeURIComponent(`Hello AURELIA, I'd like to enquire about "${template.name}" (Template #${template.id}).`)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="block text-center text-xs tracking-widest2 uppercase text-sapphire/50 hover:text-emerald transition"
            >
              Or enquire on WhatsApp →
            </a>
          </div>
        </div>

        {/* Launch offer */}
        <div className="mt-16 max-w-5xl mx-auto">
          <LaunchOfferBanner />
        </div>
      </div>
    </div>
  );
}

interface FieldDef {
  key: keyof Personalisation;
  label: string;
  placeholder: string;
  type?: string;
  tamil?: boolean;
}

function getFieldsForCategory(category: string): FieldDef[] {
  const base: FieldDef[] = [
    { key: 'host', label: 'Host / Family Name', placeholder: 'Mr. & Mrs. ...' },
  ];
  const couple: FieldDef[] = [
    { key: 'couple', label: 'Couple / Celebrant Names', placeholder: 'Aishwarya & Vikram' },
  ];
  const event: FieldDef[] = [
    { key: 'eventTitle', label: 'Event Title', placeholder: 'Wedding Celebration' },
    { key: 'date', label: 'Event Date', placeholder: '14 February 2026', type: 'text' },
    { key: 'time', label: 'Event Time', placeholder: '7:30 AM' },
    { key: 'venue', label: 'Venue', placeholder: 'Leela Palace, Chennai' },
    { key: 'address', label: 'Address', placeholder: 'Full address' },
  ];
  const contact: FieldDef[] = [
    { key: 'rsvp', label: 'RSVP / Contact', placeholder: '+91 ...' },
    { key: 'message', label: 'Invitation Message', placeholder: 'Together with their families...' },
    { key: 'extra', label: 'Additional Wording (optional)', placeholder: 'Any extra text' },
  ];

  if (['wedding', 'engagement', 'reception', 'tamil-wedding'].includes(category)) {
    return [...base, ...couple, ...event, ...contact];
  }
  if (['anniversary'].includes(category)) {
    return [...base, ...couple, ...event, ...contact];
  }
  return [...base, ...couple, ...event, ...contact];
}
