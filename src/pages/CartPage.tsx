import { Link } from 'react-router-dom';
import { Trash2, Plus, Minus, ShoppingBag, ArrowRight, Truck, ArrowLeft } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { LaunchOfferBanner } from '@/components/LaunchOfferBanner';

export function CartPage() {
  const { items, removeItem, updateQuantity, total, count } = useCart();

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-porcelain pt-20 flex items-center justify-center px-6">
        <div className="text-center max-w-md">
          <div className="w-20 h-20 rounded-full bg-ivory flex items-center justify-center mx-auto mb-6">
            <ShoppingBag className="w-10 h-10 text-champagne" />
          </div>
          <h1 className="text-3xl font-display text-sapphire-deep">Your Cart is Empty</h1>
          <p className="mt-3 font-display italic text-sapphire-deep/75">
            Explore the invitation world and add your favourite designs to begin your order.
          </p>
          <Link
            to="/explore"
            className="inline-flex items-center gap-2 mt-6 px-7 py-3.5 rounded-full bg-champagne text-sapphire-deep text-xs tracking-widest2 uppercase font-semibold hover:bg-ivory transition"
          >
            Explore Invitations <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-porcelain pt-20">
      <div className="max-w-5xl mx-auto px-6 py-10">
        <div className="text-center mb-10">
          <p className="text-[10px] tracking-widest3 uppercase text-champagne mb-2">Your Selection</p>
          <h1 className="text-3xl md:text-5xl font-display text-sapphire-deep">My Cart</h1>
          <p className="text-sm text-sapphire-deep/70 mt-2">{count} {count === 1 ? 'invitation' : 'invitations'} across {items.length} {items.length === 1 ? 'design' : 'designs'}</p>
        </div>

        <div className="space-y-4">
          {items.map((item) => (
            <div key={item.id} className="bg-ivory/60 border border-champagne/20 rounded-xl p-5">
              <div className="flex flex-col md:flex-row gap-4">
                {/* Mini preview */}
                <div className="w-full md:w-28 h-36 rounded-lg flex-shrink-0 overflow-hidden" style={{ background: 'linear-gradient(160deg, #F4EFE5, #E8E0CC)' }}>
                  <div className="h-full flex flex-col items-center justify-center p-2 text-center">
                    <p className="text-[8px] tracking-widest2 uppercase text-sapphire/40">Template #{item.templateId}</p>
                    <p className="font-display text-sm text-sapphire-deep leading-tight mt-1">{item.templateName}</p>
                  </div>
                </div>

                {/* Details */}
                <div className="flex-1">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <h3 className="font-display text-xl text-sapphire-deep">{item.templateName}</h3>
                      <p className="text-xs text-sapphire/40">Template #{item.templateId}</p>
                    </div>
                    <button
                      onClick={() => removeItem(item.id)}
                      className="text-sapphire/30 hover:text-red-500 transition"
                      aria-label="Remove item"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-4 text-sm">
                    <div>
                      <p className="text-[9px] tracking-widest2 uppercase text-sapphire/40">Colourway</p>
                      <p className="text-sapphire">{item.colorwayName}</p>
                    </div>
                    <div>
                      <p className="text-[9px] tracking-widest2 uppercase text-sapphire/40">Language</p>
                      <p className="text-sapphire">{item.language === 'en' ? 'English' : item.language === 'ta' ? 'தமிழ்' : 'Bilingual'}</p>
                    </div>
                    <div>
                      <p className="text-[9px] tracking-widest2 uppercase text-sapphire/40">Pages</p>
                      <p className="text-sapphire">{item.pages}</p>
                    </div>
                    <div>
                      <p className="text-[9px] tracking-widest2 uppercase text-sapphire/40">Unit Price</p>
                      <p className="text-sapphire">₹{item.unitPrice.toLocaleString('en-IN')}</p>
                    </div>
                  </div>

                  {(item.personalisation.host || item.personalisation.couple || item.personalisation.eventTitle) && (
                    <div className="mt-3 pt-3 border-t border-champagne/15 text-sm">
                      <p className="text-[9px] tracking-widest2 uppercase text-sapphire/40 mb-1">Personalisation</p>
                      <p className="text-sapphire/70 italic font-display text-xs">
                        {[
                          item.personalisation.host,
                          item.personalisation.couple,
                          item.personalisation.eventTitle,
                          item.personalisation.date,
                        ].filter(Boolean).join(' · ')}
                      </p>
                    </div>
                  )}

                  <div className="flex items-center justify-between mt-4">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 25)}
                        className="w-8 h-8 rounded-full border border-sapphire/20 flex items-center justify-center hover:bg-sapphire/5 transition"
                        aria-label="Decrease quantity"
                      >
                        <Minus className="w-3.5 h-3.5 text-sapphire" />
                      </button>
                      <span className="text-sm font-display text-sapphire-deep min-w-12 text-center">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 25)}
                        className="w-8 h-8 rounded-full border border-sapphire/20 flex items-center justify-center hover:bg-sapphire/5 transition"
                        aria-label="Increase quantity"
                      >
                        <Plus className="w-3.5 h-3.5 text-sapphire" />
                      </button>
                    </div>
                    <p className="font-display text-lg font-semibold text-sapphire-deep">
                      ₹{(item.unitPrice * item.quantity).toLocaleString('en-IN')}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Summary */}
        <div className="mt-8 bg-sapphire-deep rounded-xl p-6 text-ivory">
          <h2 className="text-[10px] tracking-widest3 uppercase text-champagne mb-4">Order Summary</h2>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between"><span className="text-ivory/60">Subtotal</span><span>₹{total.toLocaleString('en-IN')}</span></div>
            <div className="flex justify-between">
              <span className="text-ivory/60 flex items-center gap-1.5"><Truck className="w-4 h-4 text-emerald" /> Delivery</span>
              <span className="text-emerald font-semibold">FREE</span>
            </div>
            <div className="h-px bg-ivory/10 my-3" />
            <div className="flex justify-between text-lg">
              <span className="font-display">Final Amount</span>
              <span className="font-display font-semibold text-champagne">₹{total.toLocaleString('en-IN')}</span>
            </div>
          </div>
          <Link
            to="/checkout"
            className="flex items-center justify-center gap-2 mt-6 w-full py-4 rounded-full bg-champagne text-sapphire-deep text-xs tracking-widest2 uppercase font-semibold hover:bg-ivory transition"
          >
            Proceed to Checkout <ArrowRight className="w-4 h-4" />
          </Link>
          <Link
            to="/explore"
            className="flex items-center justify-center gap-2 mt-3 text-xs tracking-widest2 uppercase text-ivory/50 hover:text-champagne transition"
          >
            <ArrowLeft className="w-3.5 h-3.5" /> Continue Shopping
          </Link>
        </div>

        <div className="mt-8">
          <LaunchOfferBanner />
        </div>
      </div>
    </div>
  );
}
