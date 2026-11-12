import { Link } from 'react-router-dom';
import { Compass, Palette, Globe2, Edit3, ShoppingCart, MessageCircle, ArrowRight } from 'lucide-react';

const STEPS = [
  { icon: Compass, title: 'Explore the World', text: 'Browse 60 original invitation designs across weddings, celebrations, and Tamil heritage collections.' },
  { icon: Edit3, title: 'Open the Invitation', text: 'Click any design to open its multi-page 3D viewer. Turn through the pages, explore every spread.' },
  { icon: Palette, title: 'Choose Your Colours', text: 'Select from four to six coordinated colourways per design. Watch every page transform in real time.' },
  { icon: Globe2, title: 'Pick Your Language', text: 'Switch between English, தமிழ், or bilingual — with proper Unicode Tamil rendering throughout.' },
  { icon: Edit3, title: 'Personalise Every Word', text: 'Add your names, dates, venue, message. Your preview updates instantly as you type.' },
  { icon: ShoppingCart, title: 'Add to Cart', text: 'Choose your quantity, see the total, and add to your cart. Save drafts to return later.' },
  { icon: MessageCircle, title: 'Order via WhatsApp', text: 'Submit your order with delivery details. A formatted message opens in WhatsApp for confirmation.' },
];

export function HowItWorksPage() {
  return (
    <div className="min-h-screen bg-porcelain pt-20">
      <div 
        className="px-6 py-20 md:py-28 bg-sapphire-deep text-ivory grain-dark relative overflow-hidden"
        style={{
          background: 'radial-gradient(ellipse 70% 60% at 50% 20%, #173A70 0%, #081628 100%)',
          borderBottom: '1px solid rgba(197, 164, 109, 0.25)'
        }}
      >
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-[500px] h-72 rounded-full blur-[100px] opacity-25 bg-champagne" />
        </div>
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-champagne/15 border border-champagne/30 text-[10px] tracking-widest3 uppercase text-champagne mb-4">
            <span>The Atelier Journey</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-display text-ivory leading-tight drop-shadow-md">How It Works</h1>
          <div className="h-px w-16 mx-auto my-5 bg-champagne/40" />
          <p className="text-lg md:text-xl font-display italic text-ivory/80 max-w-2xl mx-auto font-normal leading-relaxed">
            From discovery to delivery — a simple, elegant path to your perfect invitation.
          </p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6 py-12">
        <div className="space-y-4">
          {STEPS.map((step, i) => (
            <div
              key={step.title}
              className="flex items-start gap-5 p-5 rounded-xl bg-ivory/60 border border-champagne/20 animate-fade-up"
              style={{ animationDelay: `${i * 80}ms`, opacity: 0 }}
            >
              <div className="flex-shrink-0 w-14 h-14 rounded-full bg-sapphire/10 flex items-center justify-center">
                <step.icon className="w-7 h-7 text-sapphire" />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-3">
                  <span className="font-serif text-2xl text-champagne">{String(i + 1).padStart(2, '0')}</span>
                  <h3 className="font-display text-xl text-sapphire-deep">{step.title}</h3>
                </div>
                <p className="text-sm text-sapphire-deep/75 mt-1 font-display">{step.text}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 p-6 rounded-xl bg-emerald/10 border border-emerald/30 text-center">
          <p className="text-sm font-display italic text-emerald">
            Complimentary delivery on every order. No hidden fees. No payment online —
            our team confirms your order and payment details directly.
          </p>
        </div>

        <div className="text-center mt-10">
          <Link to="/explore" className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-champagne text-sapphire-deep text-xs tracking-widest2 uppercase font-semibold hover:bg-ivory transition">
            Begin Your Journey <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
