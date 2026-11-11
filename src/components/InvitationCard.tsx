import { Link } from 'react-router-dom';
import type { Template } from '@/types';
import { OrnamentArt } from './OrnamentArt';
import { CATEGORY_MAP } from '@/data/colorways';
import { IndianRupee, ArrowRight } from 'lucide-react';

interface Props {
  template: Template;
  index?: number;
}

export function InvitationCard({ template, index = 0 }: Props) {
  const cw = template.colorways[0];
  const cat = CATEGORY_MAP[template.category];
  const isDark = cw.bg.startsWith('#1') || cw.bg.startsWith('#2');

  return (
    <Link
      to={`/invitation/${template.slug}`}
      className="group block animate-fade-up-soft"
      style={{ animationDelay: `${Math.min(index * 70, 700)}ms`, opacity: 0 }}
    >
      {/* Card mockup — 3D tilt + sheen on hover */}
      <div className="relative perspective">
        {/* Depth shadow layers behind card */}
        <div className="absolute inset-0 rounded-xl translate-y-2 opacity-40 transition-all duration-500 group-hover:translate-y-1 group-hover:opacity-20" style={{ background: cw.bgAlt, border: `1px solid ${cw.border}20` }} aria-hidden />
        <div className="absolute inset-0 rounded-xl translate-y-4 opacity-20 transition-all duration-500 group-hover:translate-y-2 group-hover:opacity-10" style={{ background: cw.bgAlt, border: `1px solid ${cw.border}15` }} aria-hidden />

        <div
          className="card-sheen relative aspect-[5/7] rounded-xl overflow-hidden transition-all duration-700 group-hover:[transform:rotateX(4deg)_rotateY(-4deg)] group-hover:shadow-card-hover preserve-3d"
          style={{
            background: `linear-gradient(160deg, ${cw.bg} 0%, ${cw.bgAlt} 100%)`,
            boxShadow: '0 12px 40px rgba(0,0,0,0.10), 0 4px 12px rgba(0,0,0,0.06)',
            border: `1px solid ${cw.border}30`,
          }}
        >
          {/* Double border frame — finer inner line */}
          <div className="absolute inset-2.5 pointer-events-none rounded-md" style={{ border: `1px solid ${cw.border}40` }} />
          <div className="absolute inset-3.5 pointer-events-none rounded-sm" style={{ border: `0.5px solid ${cw.border}20` }} />

          {/* Corner accents */}
          <CornerAccent color={cw.gold} className="top-2 left-2" />
          <CornerAccent color={cw.gold} className="top-2 right-2 rotate-90" />
          <CornerAccent color={cw.gold} className="bottom-2 left-2 -rotate-90" />
          <CornerAccent color={cw.gold} className="bottom-2 right-2 rotate-180" />

          {/* Content */}
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-5">
            <div className="mb-3 transition-transform duration-700 group-hover:scale-110 group-hover:-translate-y-1">
              <OrnamentArt ornament={template.ornament} cw={cw} size={68} />
            </div>
            <p className="text-[8px] tracking-widest3 uppercase mb-1.5" style={{ color: cw.textSoft }}>
              {cat.name}
            </p>
            <h3 className="heading-display text-lg md:text-xl leading-extra-tight" style={{ color: cw.primary }}>
              {template.name}
            </h3>
            <div className="flex items-center gap-1.5 my-2">
              <span className="h-px w-4" style={{ background: cw.gold, opacity: 0.5 }} />
              <span className="text-[8px]" style={{ color: cw.gold }}>✦</span>
              <span className="h-px w-4" style={{ background: cw.gold, opacity: 0.5 }} />
            </div>
            <p className="font-tamil text-sm leading-tight" style={{ color: cw.secondary }}>
              {template.tamilName}
            </p>

            {/* Colorway dots */}
            <div className="flex gap-1.5 mt-4">
              {template.colorways.slice(0, 5).map((c, i) => (
                <span
                  key={i}
                  className="w-2.5 h-2.5 rounded-full ring-1 ring-black/10 transition-transform duration-300 group-hover:scale-125"
                  style={{ background: `linear-gradient(135deg, ${c.swatch[0]}, ${c.swatch[1]})`, transitionDelay: `${i * 40}ms` }}
                  title={c.name}
                />
              ))}
              {template.colorways.length > 5 && (
                <span className="text-[8px] ml-0.5" style={{ color: cw.textSoft }}>+{template.colorways.length - 5}</span>
              )}
            </div>
          </div>

          {/* Hover overlay — reveal label */}
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/[0.03] transition-colors duration-700 flex items-end justify-center pb-5">
            <span className={`flex items-center gap-1.5 text-[10px] tracking-widest2 uppercase ${isDark ? 'text-ivory' : 'text-sapphire'} glass px-4 py-2 rounded-full translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 font-medium`}>
              Explore Design <ArrowRight className="w-3 h-3" />
            </span>
          </div>
        </div>
      </div>

      {/* Meta below — refined editorial layout */}
      <div className="mt-4 px-1">
        <div className="flex items-start justify-between gap-2">
          <div className="min-w-0 flex-1">
            <p className="eyebrow text-sapphire/40 truncate">{cat.name}</p>
            <p className="heading-display text-base text-sapphire-deep mt-0.5 leading-tight truncate">{template.name}</p>
          </div>
          <div className="text-right flex-shrink-0">
            <p className="flex items-center justify-end gap-0.5 text-base heading-display text-sapphire-deep">
              <IndianRupee className="w-3.5 h-3.5 text-champagne" />
              {template.price.toLocaleString('en-IN')}
            </p>
            <p className="text-[9px] tracking-widest2 uppercase text-sapphire/30 font-body">per invitation</p>
          </div>
        </div>
        {/* Language availability */}
        <div className="flex items-center gap-2 mt-2">
          <span className="text-[9px] tracking-widest2 uppercase text-sapphire/30">Available in</span>
          <div className="flex gap-1">
            <span className="text-[9px] px-1.5 py-0.5 rounded bg-sapphire/5 text-sapphire/50">EN</span>
            <span className="text-[9px] px-1.5 py-0.5 rounded bg-sapphire/5 text-sapphire/50 font-tamil">த</span>
            <span className="text-[9px] px-1.5 py-0.5 rounded bg-sapphire/5 text-sapphire/50">BI</span>
          </div>
        </div>
      </div>
    </Link>
  );
}

function CornerAccent({ color, className }: { color: string; className: string }) {
  return (
    <svg viewBox="0 0 20 20" className={`absolute ${className} w-4 h-4`} aria-hidden="true">
      <path d="M2 2 L2 8 M2 2 L8 2" stroke={color} strokeWidth="0.8" fill="none" opacity="0.4" />
    </svg>
  );
}
