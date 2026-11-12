import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { OrnamentArt } from '@/components/OrnamentArt';
import { TEMPLATES } from '@/data/templates';

export function AboutPage() {
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
            <span>Our Heritage & Atelier</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-display text-ivory leading-tight drop-shadow-md">About the Studio</h1>
          <div className="h-px w-16 mx-auto my-5 bg-champagne/40" />
          <p className="text-lg md:text-xl font-display italic text-ivory/80 max-w-2xl mx-auto font-normal leading-relaxed">
            AURELIA was born from a simple belief: an invitation is the first chapter of a celebration.
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-12 space-y-12">
        <div className="prose prose-lg max-w-none">
          <div className="text-center mb-12">
            <OrnamentArt ornament={{ kind: 'mandala' }} cw={TEMPLATES[0].colorways[0]} size={70} className="mx-auto" />
          </div>
          <p className="font-display text-lg text-sapphire-deep/80 leading-relaxed text-center">
            We are a design studio dedicated to the art of invitation-making. Every design in our world
            is an original creation — crafted with care, inspired by tradition, and built for modern celebrations.
          </p>
          <p className="font-display text-lg text-sapphire-deep/80 leading-relaxed text-center mt-6">
            From Tamil muhurtham invitations rendered in authentic Unicode to vibrant birthday worlds,
            each invitation is a complete suite of pages that opens, turns, and transforms in your hands.
            You choose the colours, the language, the words — and we bring it to life.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { title: 'Original Designs', text: 'Every invitation is an original artwork. No copies, no duplicates — only unique compositions.' },
            { title: 'Tamil & English', text: 'Authentic Unicode Tamil rendering alongside elegant English typography, with bilingual support.' },
            { title: 'Complimentary Delivery', text: 'Every order is delivered to your address at no extra cost, anywhere it needs to go.' },
          ].map((v) => (
            <div key={v.title} className="p-6 rounded-xl bg-ivory/60 border border-champagne/20 text-center">
              <h3 className="font-display text-xl text-sapphire-deep">{v.title}</h3>
              <p className="text-sm text-sapphire-deep/75 mt-2 font-display italic">{v.text}</p>
            </div>
          ))}
        </div>

        <div className="text-center pt-8">
          <Link to="/explore" className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-champagne text-sapphire-deep text-xs tracking-widest2 uppercase font-semibold hover:bg-ivory transition">
            Explore the Invitation World <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
