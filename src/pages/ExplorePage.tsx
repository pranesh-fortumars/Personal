import { useState, useMemo, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Search, SlidersHorizontal, X, Check, LayoutGrid, Rows3, Maximize2, Palette, Sparkles } from 'lucide-react';
import { TEMPLATES } from '@/data/templates';
import { CATEGORIES, COLORWAYS, CATEGORY_MAP } from '@/data/colorways';
import { InvitationCard } from '@/components/InvitationCard';
import type { CategoryId, Language } from '@/types';

const PRICE_BUCKETS = [
  { label: 'Under ₹50', min: 0, max: 49 },
  { label: '₹50 — ₹150', min: 50, max: 150 },
  { label: '₹150 — ₹500', min: 151, max: 500 },
  { label: 'Above ₹500', min: 501, max: 99999 },
];

const LANG_OPTIONS: { value: Language; label: string; short: string }[] = [
  { value: 'en', label: 'English', short: 'EN' },
  { value: 'ta', label: 'தமிழ்', short: 'த' },
  { value: 'bi', label: 'Bilingual', short: 'BI' },
];

type GalleryLayout = 'gallery' | 'editorial' | 'compact';
type GalleryTheme = 'porcelain' | 'sage' | 'blush' | 'sand';

const GALLERY_THEMES: { id: GalleryTheme; label: string; colors: [string, string]; background: string; hero: string }[] = [
  { id: 'porcelain', label: 'Porcelain', colors: ['#FAFAF7', '#C5A46D'], background: '#FAFAF7', hero: '#F4EFE5' },
  { id: 'sage', label: 'Botanical', colors: ['#F2F5F0', '#2A5A3A'], background: '#F2F5F0', hero: '#DCE6DC' },
  { id: 'blush', label: 'Rosewater', colors: ['#FDF5F2', '#A8243F'], background: '#FDF5F2', hero: '#F6E2DC' },
  { id: 'sand', label: 'Antique Sand', colors: ['#F8F1E5', '#8A6D3B'], background: '#F8F1E5', hero: '#EDE3CC' },
];

export function ExplorePage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [query, setQuery] = useState('');
  const [selectedCats, setSelectedCats] = useState<Set<CategoryId>>(new Set());
  const [selectedLangs, setSelectedLangs] = useState<Set<Language>>(new Set());
  const [selectedColors, setSelectedColors] = useState<Set<string>>(new Set());
  const [selectedPrice, setSelectedPrice] = useState<number | null>(null);
  const [showFilters, setShowFilters] = useState(false);
  const [sortMode, setSortMode] = useState<'featured' | 'priceLow' | 'priceHigh'>('featured');
  const [galleryLayout, setGalleryLayout] = useState<GalleryLayout>('gallery');
  const [galleryTheme, setGalleryTheme] = useState<GalleryTheme>('porcelain');

  useEffect(() => {
    const cat = searchParams.get('category');
    if (cat) setSelectedCats(new Set([cat as CategoryId]));
  }, [searchParams]);

  const toggle = <T,>(set: Set<T>, val: T, setter: (s: Set<T>) => void) => {
    const next = new Set(set);
    if (next.has(val)) {
      next.delete(val);
    } else {
      next.add(val);
    }
    setter(next);
  };

  const filtered = useMemo(() => {
    const result = TEMPLATES.filter((t) => {
      if (query) {
        const q = query.toLowerCase();
        if (!t.name.toLowerCase().includes(q) && !t.tamilName.includes(query) && !t.category.includes(q)) return false;
      }
      if (selectedCats.size > 0 && !selectedCats.has(t.category)) return false;
      if (selectedLangs.size > 0) {
        const hasLang = t.languageAvailability.some((l) => selectedLangs.has(l));
        if (!hasLang) return false;
      }
      if (selectedColors.size > 0) {
        const hasColor = t.colorways.some((c) => selectedColors.has(c.name));
        if (!hasColor) return false;
      }
      if (selectedPrice !== null) {
        const bucket = PRICE_BUCKETS[selectedPrice];
        if (t.price < bucket.min || t.price > bucket.max) return false;
      }
      return true;
    });
    if (sortMode === 'priceLow') return [...result].sort((a, b) => a.price - b.price);
    if (sortMode === 'priceHigh') return [...result].sort((a, b) => b.price - a.price);
    return result;
  }, [query, selectedCats, selectedLangs, selectedColors, selectedPrice, sortMode]);

  const clearAll = () => {
    setSelectedCats(new Set());
    setSelectedLangs(new Set());
    setSelectedColors(new Set());
    setSelectedPrice(null);
    setQuery('');
    setSearchParams({});
  };

  const activeCount = selectedCats.size + selectedLangs.size + selectedColors.size + (selectedPrice !== null ? 1 : 0);
  const activeTheme = GALLERY_THEMES.find((item) => item.id === galleryTheme) ?? GALLERY_THEMES[0];
  const layoutClass = galleryLayout === 'compact'
    ? 'grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5'
    : galleryLayout === 'editorial'
      ? 'grid-cols-2 md:grid-cols-3 xl:grid-cols-3'
      : 'grid-cols-2 md:grid-cols-3 lg:grid-cols-4';
  const activeChips: { label: string; clear: () => void }[] = [];
  selectedCats.forEach((c) => activeChips.push({ label: CATEGORY_MAP[c].name, clear: () => toggle(selectedCats, c, setSelectedCats) }));
  selectedLangs.forEach((l) => activeChips.push({ label: LANG_OPTIONS.find((o) => o.value === l)!.label, clear: () => toggle(selectedLangs, l, setSelectedLangs) }));
  selectedColors.forEach((c) => activeChips.push({ label: c, clear: () => toggle(selectedColors, c, setSelectedColors) }));
  if (selectedPrice !== null) activeChips.push({ label: PRICE_BUCKETS[selectedPrice].label, clear: () => setSelectedPrice(null) });

  return (
    <div className="min-h-screen transition-colors duration-700" style={{ backgroundColor: activeTheme.background }}>
      {/* Hero header */}
      <div className="px-6 pt-32 pb-12 md:pt-40 md:pb-16 relative overflow-hidden transition-colors duration-700" style={{ background: `linear-gradient(180deg, ${activeTheme.hero} 0%, ${activeTheme.background} 100%)` }}>
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-champagne/[0.04] blur-3xl pointer-events-none" aria-hidden />
        <div className="max-w-7xl mx-auto relative text-center">
          <div className="flex items-center justify-center gap-3 mb-5">
            <span className="h-px w-6 bg-champagne/40" />
            <p className="eyebrow text-champagne">The Invitation Gallery</p>
            <span className="h-px w-6 bg-champagne/40" />
          </div>
          <h1 className="heading-display text-4xl md:text-6xl text-sapphire-deep leading-display text-balance">
            Explore the Invitation World
          </h1>
          <div className="divider-ornament my-5">
            <span className="text-champagne text-xs">✦</span>
          </div>
          <p className="text-base md:text-lg heading-editorial italic text-sapphire/75 max-w-2xl mx-auto leading-relaxed2">
            Sixty original designs across weddings, celebrations, and Tamil heritage.
            Each opens to its own multi-page world.
          </p>
        </div>
      </div>

      {/* Sticky search + filter bar */}
      <div className="sticky top-16 z-30 backdrop-blur-xl border-y border-champagne/10 transition-colors duration-700" style={{ backgroundColor: `${activeTheme.background}e8` }}>
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex flex-col md:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-sapphire/40" />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search by name or category..."
                className="w-full pl-11 pr-4 py-3 rounded-full bg-ivory/60 border border-champagne/20 text-sm text-sapphire placeholder:text-sapphire/30 focus:outline-none focus:border-champagne focus:bg-ivory transition-all duration-300"
              />
            </div>
            <div className="flex gap-2">
              <select
                value={sortMode}
                onChange={(e) => setSortMode(e.target.value as typeof sortMode)}
                className="px-4 py-3 rounded-full bg-ivory/60 border border-champagne/20 text-xs tracking-widest2 uppercase text-sapphire/70 focus:outline-none focus:border-champagne transition-all duration-300 cursor-pointer"
              >
                <option value="featured">Featured</option>
                <option value="priceLow">Price: Low to High</option>
                <option value="priceHigh">Price: High to Low</option>
              </select>
              <button
                onClick={() => setShowFilters(!showFilters)}
                className={`flex items-center justify-center gap-2 px-5 py-3 rounded-full text-xs tracking-widest2 uppercase transition-all duration-300 ${
                  showFilters || activeCount > 0
                    ? 'bg-sapphire-deep text-ivory border border-sapphire-deep'
                    : 'border border-champagne/30 text-sapphire hover:bg-champagne/10'
                }`}
              >
                <SlidersHorizontal className="w-4 h-4" />
                Filters
                {activeCount > 0 && <span className="bg-champagne text-white rounded-full min-w-[20px] h-5 px-1 flex items-center justify-center text-[10px] font-semibold">{activeCount}</span>}
              </button>
            </div>
          </div>

          {/* Active filter chips */}
          {activeChips.length > 0 && (
            <div className="flex flex-wrap items-center gap-2 mt-3">
              {activeChips.map((chip, i) => (
                <button
                  key={i}
                  onClick={chip.clear}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-sapphire/5 border border-sapphire/10 text-[11px] text-sapphire/70 hover:bg-sapphire/10 transition-all duration-200"
                >
                  {chip.label}
                  <X className="w-3 h-3" />
                </button>
              ))}
              <button onClick={clearAll} className="text-[11px] tracking-widest2 uppercase text-champagne hover:text-sapphire-deep transition-colors duration-200 ml-1">
                Clear All
              </button>
            </div>
          )}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-10">
        <div className={showFilters ? 'grid grid-cols-1 lg:grid-cols-[280px_minmax(0,1fr)] gap-8' : ''}>
          {/* Filters sidebar */}
          {showFilters && (
            <aside className="space-y-7 lg:sticky lg:top-44 lg:self-start animate-fade-up-soft" style={{ opacity: 0 }}>
              <div className="lg:bg-ivory/40 lg:rounded-2xl lg:p-6 lg:border lg:border-champagne/10">
                <FilterGroup title="Category">
                  <div className="space-y-1">
                    {CATEGORIES.map((c) => (
                      <FilterCheck
                        key={c.id}
                        checked={selectedCats.has(c.id)}
                        onChange={() => toggle(selectedCats, c.id, setSelectedCats)}
                        label={c.name}
                      />
                    ))}
                  </div>
                </FilterGroup>

                <FilterGroup title="Language">
                  <div className="space-y-1">
                    {LANG_OPTIONS.map((l) => (
                      <FilterCheck
                        key={l.value}
                        checked={selectedLangs.has(l.value)}
                        onChange={() => toggle(selectedLangs, l.value, setSelectedLangs)}
                        label={l.label}
                        tamil={l.value === 'ta'}
                      />
                    ))}
                  </div>
                </FilterGroup>

                <FilterGroup title="Colour Palette">
                  <div className="grid grid-cols-2 gap-2">
                    {Object.values(COLORWAYS).map((c) => (
                      <button
                        key={c.name}
                        onClick={() => toggle(selectedColors, c.name, setSelectedColors)}
                        className={`flex items-center gap-2 p-2 rounded-lg border transition-all duration-200 text-left ${
                          selectedColors.has(c.name) ? 'border-champagne bg-champagne/10' : 'border-transparent hover:border-champagne/30 hover:bg-ivory/50'
                        }`}
                      >
                        <span className="w-5 h-5 rounded-full ring-1 ring-black/10 flex-shrink-0" style={{ background: `linear-gradient(135deg, ${c.swatch[0]}, ${c.swatch[1]})` }} />
                        <span className="text-[10px] text-sapphire/60 leading-tight">{c.name}</span>
                      </button>
                    ))}
                  </div>
                </FilterGroup>

                <FilterGroup title="Price">
                  <div className="space-y-1">
                    {PRICE_BUCKETS.map((b, i) => (
                      <FilterRadio
                        key={b.label}
                        checked={selectedPrice === i}
                        onChange={() => setSelectedPrice(selectedPrice === i ? null : i)}
                        label={b.label}
                      />
                    ))}
                  </div>
                </FilterGroup>

                {activeCount > 0 && (
                  <button onClick={clearAll} className="flex items-center gap-1.5 text-xs tracking-widest2 uppercase text-champagne hover:text-sapphire-deep transition-colors duration-200 mt-4">
                    <X className="w-3 h-3" /> Clear all filters
                  </button>
                )}
              </div>
            </aside>
          )}

          {/* Results */}
          <div>
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-6">
              <div>
                <p className="eyebrow text-sapphire/40">
                  {filtered.length} {filtered.length === 1 ? 'Design' : 'Designs'} Found
                </p>
                <p className="text-xs text-sapphire/40 mt-1 flex items-center gap-1.5">
                  <Sparkles className="w-3 h-3 text-champagne" /> Curated for your celebration
                </p>
              </div>
              <div className="flex flex-wrap items-center gap-3">
                <div className="flex items-center gap-1.5 rounded-full border border-champagne/15 bg-white/40 px-2 py-1.5">
                  <LayoutGrid className="w-3.5 h-3.5 text-sapphire/40 ml-1" />
                  {([
                    { id: 'gallery' as const, label: 'Gallery', icon: LayoutGrid },
                    { id: 'editorial' as const, label: 'Editorial', icon: Maximize2 },
                    { id: 'compact' as const, label: 'Compact', icon: Rows3 },
                  ]).map((mode) => {
                    const Icon = mode.icon;
                    return (
                      <button
                        key={mode.id}
                        onClick={() => setGalleryLayout(mode.id)}
                        aria-label={`${mode.label} layout`}
                        className={`flex items-center gap-1.5 rounded-full px-2.5 py-1.5 text-[10px] uppercase tracking-widest2 transition-all duration-300 ${galleryLayout === mode.id ? 'bg-sapphire-deep text-ivory shadow-sm' : 'text-sapphire/45 hover:text-sapphire-deep'}`}
                      >
                        <Icon className="w-3 h-3" />
                        <span className="hidden sm:inline">{mode.label}</span>
                      </button>
                    );
                  })}
                </div>
                <div className="flex items-center gap-1.5 rounded-full border border-champagne/15 bg-white/40 px-2 py-1.5" aria-label="Gallery colour mood">
                  <Palette className="w-3.5 h-3.5 text-sapphire/40 ml-1" />
                  {GALLERY_THEMES.map((mood) => (
                    <button
                      key={mood.id}
                      onClick={() => setGalleryTheme(mood.id)}
                      aria-label={`${mood.label} colour mood`}
                      title={mood.label}
                      className={`w-5 h-5 rounded-full p-0.5 transition-all duration-300 ${galleryTheme === mood.id ? 'ring-2 ring-champagne ring-offset-1' : 'hover:scale-110'}`}
                    >
                      <span className="block w-full h-full rounded-full" style={{ background: `linear-gradient(135deg, ${mood.colors[0]} 45%, ${mood.colors[1]} 45%)` }} />
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {filtered.length === 0 ? (
              <div className="text-center py-24">
                <div className="w-16 h-16 mx-auto rounded-full bg-champagne/10 flex items-center justify-center mb-5">
                  <Search className="w-7 h-7 text-champagne/50" />
                </div>
                <p className="heading-display text-xl text-sapphire/40">No invitations match your filters</p>
                <p className="heading-editorial italic text-sapphire/30 mt-2">Try adjusting your search or clearing filters</p>
                <button onClick={clearAll} className="mt-6 inline-flex items-center gap-2 px-6 py-3 rounded-full bg-sapphire-deep text-ivory text-xs tracking-widest2 uppercase hover:bg-sapphire transition-all duration-300">
                  Clear All Filters
                </button>
              </div>
            ) : (
              <div className={`grid gap-6 md:gap-8 transition-all duration-500 ${showFilters ? 'grid-cols-2 md:grid-cols-2 xl:grid-cols-3' : layoutClass}`}>
                {filtered.map((t, i) => (
                  <InvitationCard key={t.id} template={t} index={i} />
                ))}
              </div>
            )}

            {/* Bottom category quick-nav */}
            {!showFilters && filtered.length > 0 && (
              <div className="mt-20 pt-12 border-t border-champagne/10">
                <div className="text-center mb-8">
                  <div className="flex items-center justify-center gap-3 mb-3">
                    <span className="h-px w-6 bg-champagne/40" />
                    <p className="eyebrow text-champagne">Browse by Category</p>
                    <span className="h-px w-6 bg-champagne/40" />
                  </div>
                </div>
                <div className="flex flex-wrap justify-center gap-2">
                  {CATEGORIES.map((cat) => {
                    const sample = TEMPLATES.find((t) => t.category === cat.id);
                    if (!sample) return null;
                    return (
                      <a
                        key={cat.id}
                        href={`/collections/${cat.id}`}
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-champagne/20 text-xs text-sapphire/70 hover:bg-sapphire-deep hover:text-ivory hover:border-sapphire-deep transition-all duration-300"
                      >
                        <span className="w-2 h-2 rounded-full" style={{ background: sample.colorways[0].gold }} />
                        {cat.name}
                      </a>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function FilterGroup({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="border-b border-champagne/10 pb-5 mb-5 last:border-0 last:mb-0 last:pb-0">
      <p className="eyebrow text-champagne mb-3">{title}</p>
      {children}
    </div>
  );
}

function FilterCheck({ checked, onChange, label, tamil }: { checked: boolean; onChange: () => void; label: string; tamil?: boolean }) {
  return (
    <button
      onClick={onChange}
      className="flex items-center gap-2.5 w-full text-left py-1 group"
    >
      <span className={`w-4 h-4 rounded border flex items-center justify-center flex-shrink-0 transition-all duration-200 ${
        checked ? 'bg-champagne border-champagne' : 'border-sapphire/20 group-hover:border-champagne/50'
      }`}>
        {checked && <Check className="w-3 h-3 text-white" />}
      </span>
      <span className={`text-sm text-sapphire/70 group-hover:text-sapphire-deep transition-colors duration-200 ${tamil ? 'font-tamil' : ''}`}>
        {label}
      </span>
    </button>
  );
}

function FilterRadio({ checked, onChange, label }: { checked: boolean; onChange: () => void; label: string }) {
  return (
    <button
      onClick={onChange}
      className="flex items-center gap-2.5 w-full text-left py-1 group"
    >
      <span className={`w-4 h-4 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-all duration-200 ${
        checked ? 'border-champagne' : 'border-sapphire/20 group-hover:border-champagne/50'
      }`}>
        {checked && <span className="w-2 h-2 rounded-full bg-champagne" />}
      </span>
      <span className="text-sm text-sapphire/70 group-hover:text-sapphire-deep transition-colors duration-200">
        {label}
      </span>
    </button>
  );
}
