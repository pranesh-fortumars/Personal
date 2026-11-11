import { Link } from 'react-router-dom';
import { Phone, MessageCircle, Truck } from 'lucide-react';
import { BUSINESS } from '@/data/templates';
import { CATEGORIES } from '@/data/colorways';

export function Footer() {
  return (
    <footer className="bg-sapphire-deep text-ivory/80 mt-20 relative overflow-hidden grain-dark">
      {/* Ambient glow */}
      <div className="absolute -top-32 left-1/4 w-96 h-96 rounded-full bg-champagne/5 blur-3xl pointer-events-none" aria-hidden />
      <div className="absolute -bottom-32 right-1/4 w-96 h-96 rounded-full bg-emerald/5 blur-3xl pointer-events-none" aria-hidden />

      <div className="max-w-7xl mx-auto px-6 py-16 md:py-20 relative">
        {/* Top — brand statement */}
        <div className="text-center mb-14">
          <div className="flex items-center justify-center gap-3 mb-4">
            <span className="h-px w-8 bg-champagne/40" />
            <span className="flex items-center justify-center w-8 h-8 rounded-full border border-champagne/40">
              <span className="heading-display text-sm text-champagne">A</span>
            </span>
            <span className="h-px w-8 bg-champagne/40" />
          </div>
          <h3 className="heading-display text-3xl md:text-4xl text-ivory tracking-widest2">AURELIA</h3>
          <p className="eyebrow text-champagne/70 mt-2">The Invitation World</p>
          <p className="mt-4 heading-editorial italic text-ivory/50 max-w-md mx-auto">
            Every Celebration Begins With An Invitation.
          </p>
        </div>

        {/* Columns */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 md:gap-12">
          {/* Collections */}
          <div>
            <p className="eyebrow text-champagne mb-5">Collections</p>
            <ul className="space-y-2.5">
              {CATEGORIES.slice(0, 6).map((c) => (
                <li key={c.id}>
                  <Link to={c.route} className="text-sm text-ivory/60 hover:text-champagne transition-colors duration-300 link-underline">{c.name}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Explore */}
          <div>
            <p className="eyebrow text-champagne mb-5">Explore</p>
            <ul className="space-y-2.5 text-sm">
              <li><Link to="/explore" className="text-ivory/60 hover:text-champagne transition-colors duration-300 link-underline">All Invitations</Link></li>
              <li><Link to="/custom-studio" className="text-ivory/60 hover:text-champagne transition-colors duration-300 link-underline">Custom Design Studio</Link></li>
              <li><Link to="/how-it-works" className="text-ivory/60 hover:text-champagne transition-colors duration-300 link-underline">How It Works</Link></li>
              <li><Link to="/about" className="text-ivory/60 hover:text-champagne transition-colors duration-300 link-underline">About the Studio</Link></li>
              <li><Link to="/cart" className="text-ivory/60 hover:text-champagne transition-colors duration-300 link-underline">My Cart</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <p className="eyebrow text-champagne mb-5">Contact</p>
            <ul className="space-y-3 text-sm">
              <li>
                <a href={`tel:${BUSINESS.phone}`} className="flex items-center gap-2 text-ivory/60 hover:text-champagne transition-colors duration-300">
                  <Phone className="w-4 h-4 text-champagne/70" /> {BUSINESS.whatsappDisplay}
                </a>
              </li>
              <li>
                <a href={`https://wa.me/${BUSINESS.whatsapp}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-ivory/60 hover:text-champagne transition-colors duration-300">
                  <MessageCircle className="w-4 h-4 text-champagne/70" /> WhatsApp Order
                </a>
              </li>
              <li className="flex items-center gap-2 text-ivory/50">
                <Truck className="w-4 h-4 text-emerald/60" /> Complimentary Delivery
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <p className="eyebrow text-champagne mb-5">Information</p>
            <ul className="space-y-2.5 text-sm">
              <li><Link to="/privacy" className="text-ivory/60 hover:text-champagne transition-colors duration-300 link-underline">Privacy Policy</Link></li>
              <li><Link to="/terms" className="text-ivory/60 hover:text-champagne transition-colors duration-300 link-underline">Terms & Conditions</Link></li>
              <li className="text-ivory/40 text-xs pt-2">All designs are original artworks created by the AURELIA studio.</li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-14 pt-6 border-t border-ivory/10 flex flex-col md:flex-row items-center justify-between gap-3">
          <p className="text-xs text-ivory/40">© {new Date().getFullYear()} AURELIA — The Invitation World</p>
          <p className="text-xs text-ivory/40">Pricing in Indian Rupees · Complimentary delivery on all orders</p>
        </div>
      </div>
    </footer>
  );
}
