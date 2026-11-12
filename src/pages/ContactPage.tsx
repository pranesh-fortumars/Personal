import { Phone, MessageCircle, Truck } from 'lucide-react';
import { BUSINESS } from '@/data/templates';

export function ContactPage() {
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
            <span>Client Concierge</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-display text-ivory leading-tight drop-shadow-md">Get in Touch</h1>
          <div className="h-px w-16 mx-auto my-5 bg-champagne/40" />
          <p className="text-lg md:text-xl font-display italic text-ivory/80 max-w-2xl mx-auto font-normal leading-relaxed">
            Questions, bespoke custom suites, or order enquiries — our atelier concierge is at your service.
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <a
            href={`tel:${BUSINESS.phone}`}
            className="p-8 rounded-xl bg-ivory/60 border border-champagne/20 text-center hover:border-champagne transition group"
          >
            <div className="w-14 h-14 rounded-full bg-sapphire/10 flex items-center justify-center mx-auto mb-4 group-hover:bg-sapphire/20 transition">
              <Phone className="w-7 h-7 text-sapphire" />
            </div>
            <p className="text-[10px] tracking-widest3 uppercase text-champagne mb-2">Call Us</p>
            <p className="text-xl font-display text-sapphire-deep">{BUSINESS.whatsappDisplay}</p>
            <p className="text-sm text-sapphire-deep/70 mt-2 font-display italic">Tap to call directly</p>
          </a>

          <a
            href={`https://wa.me/${BUSINESS.whatsapp}`}
            target="_blank"
            rel="noopener noreferrer"
            className="p-8 rounded-xl bg-ivory/60 border border-champagne/20 text-center hover:border-emerald transition group"
          >
            <div className="w-14 h-14 rounded-full bg-emerald/10 flex items-center justify-center mx-auto mb-4 group-hover:bg-emerald/20 transition">
              <MessageCircle className="w-7 h-7 text-emerald" />
            </div>
            <p className="text-[10px] tracking-widest3 uppercase text-emerald mb-2">WhatsApp</p>
            <p className="text-xl font-display text-sapphire-deep">{BUSINESS.whatsappDisplay}</p>
            <p className="text-sm text-sapphire-deep/70 mt-2 font-display italic">Chat or send your order</p>
          </a>
        </div>

        <div className="mt-8 p-6 rounded-xl bg-sapphire-deep text-ivory text-center">
          <Truck className="w-8 h-8 text-emerald mx-auto mb-3" />
          <p className="text-[10px] tracking-widest3 uppercase text-champagne mb-2">Complimentary Delivery</p>
          <p className="font-display italic text-ivory/70">
            Every order is delivered to your address at no extra cost.
          </p>
        </div>

        <div className="mt-8 p-6 rounded-xl bg-ivory/60 border border-champagne/20">
          <p className="text-[10px] tracking-widest3 uppercase text-champagne mb-3">Business Hours</p>
          <p className="text-sm text-sapphire/70">Monday — Sunday: 9:00 AM to 8:00 PM</p>
          <p className="text-sm text-sapphire/50 mt-1 font-display italic">
            We respond to WhatsApp messages within our business hours.
          </p>
        </div>
      </div>
    </div>
  );
}
