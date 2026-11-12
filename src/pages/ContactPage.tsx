import { Phone, MessageCircle, Truck } from 'lucide-react';
import { BUSINESS } from '@/data/templates';

export function ContactPage() {
  return (
    <div className="min-h-screen bg-porcelain pt-20">
      <div className="px-6 py-16 md:py-24 bg-gradient-to-b from-ivory/60 to-porcelain">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-[10px] tracking-widest3 uppercase text-champagne mb-3">Get in Touch</p>
          <h1 className="text-4xl md:text-6xl font-display text-sapphire-deep leading-tight">Contact</h1>
          <div className="h-px w-16 mx-auto my-5 gold-line" />
          <p className="text-base md:text-lg font-display italic text-sapphire/60 max-w-2xl mx-auto">
            Questions, custom requests, or order enquiries — we're here to help.
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
            <p className="text-sm text-sapphire/50 mt-2 font-display italic">Tap to call directly</p>
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
            <p className="text-sm text-sapphire/50 mt-2 font-display italic">Chat or send your order</p>
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
