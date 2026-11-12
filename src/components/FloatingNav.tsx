import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ShoppingBag, Phone, Heart } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { useWishlist } from '@/context/WishlistContext';
import { BUSINESS } from '@/data/templates';

const NAV_LINKS = [
  { label: 'Home', to: '/', sub: 'Begin the journey' },
  { label: 'Explore Collections', to: '/explore', sub: 'All sixty designs' },
  { label: 'Wedding Invitations', to: '/collections/wedding', sub: 'The sacred union' },
  { label: 'Celebration Invitations', to: '/collections/kids-birthday', sub: 'Birthdays & milestones' },
  { label: 'Tamil Invitations', to: '/collections/tamil-wedding', sub: 'தமிழ் பாரம்பரியம்' },
  { label: 'English Invitations', to: '/collections/wedding', sub: 'Contemporary elegance' },
  { label: 'Custom Design Studio', to: '/custom-studio', sub: 'Bespoke atelier' },
  { label: 'About the Studio', to: '/about', sub: 'Our story' },
  { label: 'How It Works', to: '/how-it-works', sub: 'The journey' },
  { label: 'Contact', to: '/contact', sub: 'Reach us' },
  { label: 'Atelier Admin', to: '/admin', sub: 'Suite & Management' },
];

export function FloatingNav() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { count } = useCart();
  const { wishlistCount } = useWishlist();
  const location = useLocation();

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 40);
    handler();
    window.addEventListener('scroll', handler, { passive: true });
    return () => window.removeEventListener('scroll', handler);
  }, []);

  useEffect(() => { setOpen(false); }, [location.pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  const isActive = (to: string) => {
    if (to === '/') return location.pathname === '/';
    return location.pathname.startsWith(to);
  };

  return (
    <>
      {/* Top floating bar */}
      <header className={`fixed top-0 left-0 right-0 z-40 transition-all duration-700 ${scrolled ? 'py-2.5' : 'py-5'}`}>
        <div className={`mx-3 md:mx-6 rounded-full transition-all duration-700 ${scrolled ? 'glass shadow-luxury' : 'bg-transparent'}`}>
          <div className="flex items-center justify-between px-4 md:px-7 h-14">
            {/* Logo — monogram + wordmark */}
            <Link to="/" className="flex items-center gap-2.5 group" aria-label="AURELIA Home">
              <span className="flex items-center justify-center w-9 h-9 rounded-full border border-champagne/40 group-hover:border-champagne transition-all duration-500">
                <span className="heading-display text-base text-champagne group-hover:scale-110 transition-transform duration-500">A</span>
              </span>
              <span className="flex flex-col leading-none">
                <span className="text-lg md:text-xl heading-display tracking-widest2 text-sapphire-deep group-hover:text-champagne transition-colors duration-500">
                  AURELIA
                </span>
                <span className="hidden md:block eyebrow text-champagne/70 mt-0.5" style={{ fontSize: '0.5rem' }}>
                  The Invitation World
                </span>
              </span>
            </Link>

            {/* Desktop quick links */}
            <nav className="hidden lg:flex items-center gap-0.5">
              {NAV_LINKS.slice(0, 6).map((link) => (
                <Link
                  key={link.to + link.label}
                  to={link.to}
                  className={`px-3.5 py-2 text-[11px] tracking-widest2 uppercase rounded-full transition-all duration-300 link-underline ${
                    isActive(link.to) ? 'text-champagne' : 'text-sapphire/60 hover:text-sapphire'
                  }`}
                >
                  {link.label.replace(' Invitations', '').replace(' Collections', '')}
                </Link>
              ))}
            </nav>

            {/* Right actions */}
            <div className="flex items-center gap-1.5">
              <Link
                to="/explore?wishlist=true"
                className="relative w-10 h-10 rounded-full flex items-center justify-center hover:bg-champagne/10 transition-all duration-300"
                aria-label="View saved designs"
                title="Wishlist"
              >
                <Heart className={`w-[18px] h-[18px] ${wishlistCount > 0 ? 'text-red-500 fill-current' : 'text-sapphire'}`} />
                {wishlistCount > 0 && (
                  <span className="absolute -top-0 -right-0 min-w-[18px] h-[18px] px-1 rounded-full bg-red-500 text-white text-[10px] flex items-center justify-center font-semibold">
                    {wishlistCount}
                  </span>
                )}
              </Link>

              <Link
                to="/cart"
                className="relative w-10 h-10 rounded-full flex items-center justify-center hover:bg-champagne/10 transition-all duration-300"
                aria-label="View cart"
              >
                <ShoppingBag className="w-[18px] h-[18px] text-sapphire" />
                {count > 0 && (
                  <span className="absolute -top-0 -right-0 min-w-[18px] h-[18px] px-1 rounded-full bg-champagne text-white text-[10px] flex items-center justify-center font-semibold shadow-glow-gold">
                    {count > 99 ? '99+' : count}
                  </span>
                )}
              </Link>

              <button
                onClick={() => setOpen(true)}
                className="w-10 h-10 rounded-full flex items-center justify-center hover:bg-champagne/10 transition-all duration-300"
                aria-label="Open menu"
                aria-expanded={open}
              >
                <Menu className="w-[18px] h-[18px] text-sapphire" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Full-screen overlay nav */}
      {open && (
        <div className="fixed inset-0 z-50 animate-fade-in">
          <div className="absolute inset-0 bg-sapphire-deep/97 backdrop-blur-2xl grain-dark" onClick={() => setOpen(false)} />
          <div className="relative h-full flex flex-col">
            {/* Header */}
            <div className="flex items-center justify-between px-6 md:px-10 h-20">
              <div className="flex items-center gap-2.5">
                <span className="flex items-center justify-center w-9 h-9 rounded-full border border-champagne/40">
                  <span className="heading-display text-base text-champagne">A</span>
                </span>
                <span className="text-xl heading-display tracking-widest2 text-ivory">AURELIA</span>
              </div>
              <button
                onClick={() => setOpen(false)}
                className="w-11 h-11 rounded-full flex items-center justify-center hover:bg-white/10 transition-all duration-300"
                aria-label="Close menu"
              >
                <X className="w-6 h-6 text-ivory" />
              </button>
            </div>

            {/* Nav links — editorial two-column layout */}
            <nav className="flex-1 flex flex-col items-center justify-center gap-1 px-6 overflow-y-auto">
              {NAV_LINKS.map((link, i) => (
                <Link
                  key={link.to + link.label}
                  to={link.to}
                  className="text-center py-1.5 group"
                  style={{ animation: `fadeUp 0.6s cubic-bezier(0.16, 1, 0.3, 1) ${i * 60}ms both` }}
                >
                  <div className="flex items-center justify-center gap-3">
                    <span className={`h-px transition-all duration-500 ${isActive(link.to) ? 'w-8 bg-champagne' : 'w-0 bg-champagne/50 group-hover:w-6'}`} />
                    <span className={`heading-display text-2xl md:text-4xl tracking-wide transition-colors duration-300 ${
                      isActive(link.to) ? 'text-champagne' : 'text-ivory/80 group-hover:text-champagne'
                    }`}>
                      {link.label}
                    </span>
                    <span className={`h-px transition-all duration-500 ${isActive(link.to) ? 'w-8 bg-champagne' : 'w-0 bg-champagne/50 group-hover:w-6'}`} />
                  </div>
                  <span className="block text-[10px] tracking-widest2 uppercase text-ivory/30 mt-0.5 group-hover:text-champagne/50 transition-colors">
                    {link.sub}
                  </span>
                </Link>
              ))}

              {/* Divider */}
              <div className="divider-ornament my-5">
                <span className="text-champagne/60 text-xs">✦</span>
              </div>

              <Link to="/cart" className="group flex items-center gap-2.5">
                <ShoppingBag className="w-5 h-5 text-ivory/60 group-hover:text-champagne transition-colors" />
                <span className="heading-display text-xl text-ivory group-hover:text-champagne transition-colors">
                  My Cart {count > 0 && <span className="text-champagne">({count})</span>}
                </span>
              </Link>
            </nav>

            {/* Footer contact */}
            <div className="px-6 md:px-10 py-8 text-center">
              <p className="eyebrow text-champagne/50 mb-2">Complimentary Delivery on Every Order</p>
              <a
                href={`tel:${BUSINESS.phone}`}
                className="inline-flex items-center gap-2 text-champagne text-sm tracking-widest2 uppercase link-underline"
              >
                <Phone className="w-4 h-4" /> {BUSINESS.whatsappDisplay}
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
