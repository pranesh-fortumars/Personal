import { useRef, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, useMotionValue, useTransform, useSpring } from 'framer-motion';
import { ChevronDown, ArrowRight, Truck, Sparkles, Palette, Globe, BookOpen, MousePointer2, MessageCircle, CalendarDays, CheckCircle2 } from 'lucide-react';
import { TEMPLATES } from '@/data/templates';
import { CATEGORIES } from '@/data/colorways';
import { OrnamentArt } from '@/components/OrnamentArt';
import { InvitationCard } from '@/components/InvitationCard';
import { SectionHeading } from '@/components/SectionHeading';
import { LaunchOfferBanner } from '@/components/LaunchOfferBanner';

const FEATURED_IDS = [1, 7, 18, 4, 14, 22];

export function HomePage() {
  return (
    <div className="overflow-hidden">
      <Hero />
      <WorldIntro />
      <FeaturedCollection />
      <InvitationJourney />
      <CategoryWorlds />
      <ExperienceShowcase />
      <LaunchSection />
      <FinalCTA />
    </div>
  );
}

function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReduced(mq.matches);
  }, []);

  const springX = useSpring(mouseX, { stiffness: 40, damping: 20 });
  const springY = useSpring(mouseY, { stiffness: 40, damping: 20 });

  const rotateY = useTransform(springX, [-0.5, 0.5], [12, -12]);
  const rotateX = useTransform(springY, [-0.5, 0.5], [-12, 12]);
  const translateX = useTransform(springX, [-0.5, 0.5], [-20, 20]);
  const translateY = useTransform(springY, [-0.5, 0.5], [-15, 15]);

  const layer1X = useTransform(springX, [-0.5, 0.5], [-30, 30]);
  const layer1Y = useTransform(springY, [-0.5, 0.5], [-20, 20]);
  const layer2X = useTransform(springX, [-0.5, 0.5], [20, -20]);
  const layer2Y = useTransform(springY, [-0.5, 0.5], [15, -15]);
  const layer3X = useTransform(springX, [-0.5, 0.5], [-15, 15]);
  const layer3Y = useTransform(springY, [-0.5, 0.5], [25, -25]);

  const onMouseMove = (e: React.MouseEvent) => {
    if (reduced || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    mouseX.set((e.clientX - rect.left) / rect.width - 0.5);
    mouseY.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  const featured = TEMPLATES.filter((t) => FEATURED_IDS.includes(t.id));
  const center = featured[0];
  const sideCards = featured.slice(1, 4);

  return (
    <section
      ref={ref}
      onMouseMove={onMouseMove}
      className="relative min-h-screen flex items-center justify-center overflow-hidden grain-dark"
      style={{
        background: 'radial-gradient(ellipse at center, #102B4C 0%, #0a1f3a 50%, #060f1f 100%)',
      }}
    >
      {/* Ambient golden particles */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden>
        {Array.from({ length: 24 }).map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-champagne/40 animate-float-slow"
            style={{
              width: `${1.5 + Math.random() * 4}px`,
              height: `${1.5 + Math.random() * 4}px`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 8}s`,
              animationDuration: `${8 + Math.random() * 8}s`,
              opacity: 0.2 + Math.random() * 0.4,
              boxShadow: '0 0 6px rgba(197, 164, 109, 0.5)',
            }}
          />
        ))}
      </div>

      {/* Architectural concentric arches */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none" aria-hidden>
        <div className="w-[800px] h-[800px] rounded-full border border-champagne/[0.06]" />
        <div className="absolute w-[600px] h-[600px] rounded-full border border-champagne/[0.05]" />
        <div className="absolute w-[400px] h-[400px] rounded-full border border-champagne/[0.04]" />
        <div className="absolute w-[200px] h-[200px] rounded-full border border-champagne/[0.03]" />
      </div>

      {/* Radial gold glow */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-champagne/[0.04] blur-3xl pointer-events-none" aria-hidden />

      {/* Floating side invitation cards (parallax) */}
      {!reduced && (
        <>
          <motion.div
            style={{ x: layer1X, y: layer1Y }}
            className="absolute left-[8%] top-[20%] hidden md:block z-10"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 1 }}
          >
            <FloatingCard template={sideCards[0]} rotate={-12} delay={0} />
          </motion.div>

          <motion.div
            style={{ x: layer2X, y: layer2Y }}
            className="absolute right-[6%] top-[26%] hidden md:block z-10"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 1 }}
          >
            <FloatingCard template={sideCards[1]} rotate={14} delay={0.5} />
          </motion.div>

          <motion.div
            style={{ x: layer3X, y: layer3Y }}
            className="absolute left-[15%] bottom-[16%] hidden lg:block z-10"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 1 }}
          >
            <FloatingCard template={sideCards[2]} rotate={8} delay={1} small />
          </motion.div>
        </>
      )}

      {/* Centerpiece */}
      <div className="relative z-20 flex flex-col items-center px-6 text-center">
        {/* Brand mark */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.1 }}
          className="flex items-center gap-3 mb-6"
        >
          <span className="h-px w-6 bg-champagne/40" />
          <span className="flex items-center justify-center w-8 h-8 rounded-full border border-champagne/40">
            <span className="heading-display text-sm text-champagne">A</span>
          </span>
          <span className="eyebrow text-champagne/80" style={{ fontSize: '0.55rem' }}>AURELIA — The Invitation World</span>
          <span className="h-px w-6 bg-champagne/40" />
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.3 }}
          className="heading-display text-4xl md:text-6xl lg:text-7xl text-ivory leading-[1.05] max-w-4xl text-balance"
        >
          An Invitation Is More Than A Card.<br />
          <span className="gold-foil">It's The Beginning Of A Memory.</span>
        </motion.h1>

        {/* Sub-headline */}
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="heading-editorial italic text-base md:text-lg text-ivory/50 max-w-xl mt-5 leading-relaxed2"
        >
          Where imagination becomes an invitation.
        </motion.p>

        {/* Center 3D invitation */}
        <motion.div
          style={!reduced ? { rotateY, rotateX, x: translateX, y: translateY } : {}}
          className="perspective-near my-8"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, delay: 0.6 }}
        >
          <div className="preserve-3d">
            <HeroInvitation templateId={center.id} />
          </div>
        </motion.div>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1 }}
          className="flex flex-col sm:flex-row gap-3 mt-2"
        >
          <Link
            to="/explore"
            className="group btn-gold inline-flex items-center gap-2 px-8 py-4 rounded-full text-sapphire-deep text-xs tracking-widest2 uppercase font-semibold"
          >
            Explore The Invitation World
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
          </Link>
          <Link
            to="/collections/wedding"
            className="btn-ghost inline-flex items-center gap-2 px-8 py-4 rounded-full text-ivory text-xs tracking-widest2 uppercase"
          >
            Discover Your Design
          </Link>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2"
      >
        <span className="eyebrow text-ivory/30" style={{ fontSize: '0.5rem' }}>Scroll to Explore</span>
        <motion.div animate={{ y: [0, 8, 0] }} transition={{ repeat: Infinity, duration: 2 }}>
          <ChevronDown className="w-5 h-5 text-champagne/70" />
        </motion.div>
      </motion.div>
    </section>
  );
}

function FloatingCard({ template, rotate, delay, small }: { template: typeof TEMPLATES[0]; rotate: number; delay: number; small?: boolean }) {
  const cw = template.colorways[0];
  return (
    <div className="animate-float-slow" style={{ animationDelay: `${delay}s` }}>
      <div
        className={`${small ? 'w-28 h-40' : 'w-36 h-52'} rounded-lg overflow-hidden shadow-luxury-lg`}
        style={{
          background: `linear-gradient(160deg, ${cw.bg}, ${cw.bgAlt})`,
          border: `1px solid ${cw.border}40`,
          transform: `rotate(${rotate}deg)`,
        }}
      >
        <div className="absolute inset-2 border rounded" style={{ borderColor: `${cw.border}30` }} />
        <div className="h-full flex flex-col items-center justify-center p-3">
          <OrnamentArt ornament={template.ornament} cw={cw} size={small ? 40 : 56} />
          <p className="text-[7px] tracking-widest2 uppercase mt-2 text-center" style={{ color: cw.textSoft }}>{template.name}</p>
          <div className="w-8 h-px my-1.5" style={{ background: cw.gold }} />
          <p className="font-tamil text-[10px] text-center" style={{ color: cw.secondary }}>{template.tamilName}</p>
        </div>
      </div>
    </div>
  );
}

function HeroInvitation({ templateId }: { templateId: number }) {
  const template = TEMPLATES.find((t) => t.id === templateId)!;
  const cw = template.colorways[0];
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setOpen(true), 1400);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="relative w-56 h-80 md:w-64 md:h-96 perspective-near">
      <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 w-3/4 h-8 rounded-full bg-black/50 blur-2xl" aria-hidden />

      {/* Left page (cover) */}
      <div
        className="absolute left-0 top-0 w-1/2 h-full rounded-l-lg overflow-hidden shadow-luxury transition-transform duration-1000 origin-right preserve-3d"
        style={{
          background: `linear-gradient(160deg, ${cw.bg}, ${cw.bgAlt})`,
          border: `1px solid ${cw.border}40`,
          transform: open ? 'rotateY(-160deg)' : 'rotateY(0deg)',
          transformStyle: 'preserve-3d',
          backfaceVisibility: 'hidden',
        }}
      >
        <div className="absolute inset-2 border rounded" style={{ borderColor: `${cw.border}30` }} />
        <div className="h-full flex flex-col items-center justify-center p-3">
          <OrnamentArt ornament={template.ornament} cw={cw} size={60} />
          <p className="text-[8px] tracking-widest2 uppercase mt-2 text-center" style={{ color: cw.textSoft }}>An Invitation</p>
          <p className="heading-display text-base text-center leading-tight mt-1" style={{ color: cw.primary }}>{template.name}</p>
          <div className="w-8 h-px my-2" style={{ background: cw.gold }} />
          <p className="font-tamil text-xs text-center" style={{ color: cw.secondary }}>{template.tamilName}</p>
        </div>
      </div>

      {/* Right page (inner) */}
      <div
        className="absolute right-0 top-0 w-1/2 h-full rounded-r-lg overflow-hidden shadow-luxury"
        style={{ background: `linear-gradient(160deg, ${cw.bgAlt}, ${cw.bg})`, border: `1px solid ${cw.border}40` }}
      >
        <div className="absolute inset-2 border rounded" style={{ borderColor: `${cw.border}30` }} />
        <div className="h-full flex flex-col items-center justify-center p-3 text-center">
          <OrnamentArt ornament={{ kind: 'floral' }} cw={cw} size={44} />
          <p className="text-[8px] tracking-widest2 uppercase mt-3" style={{ color: cw.textSoft }}>Together with family</p>
          <p className="heading-display text-sm leading-tight mt-2" style={{ color: cw.primary }}>{template.defaultContent[1]?.en.names}</p>
          <div className="w-6 h-px my-2" style={{ background: cw.gold }} />
          <p className="text-[10px] italic heading-editorial px-1" style={{ color: cw.textSoft }}>
            {template.defaultContent[1]?.en.body.slice(0, 60)}...
          </p>
        </div>
      </div>

      {/* Wax seal */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-20 transition-all duration-700" style={{ opacity: open ? 0 : 1 }}>
        <div className="w-11 h-11 rounded-full flex items-center justify-center shadow-glow-gold" style={{ background: `radial-gradient(circle at 30% 30%, ${cw.gold}, ${cw.primary})` }}>
          <span className="text-[11px] heading-display text-ivory">A</span>
        </div>
      </div>
    </div>
  );
}

function WorldIntro() {
  return (
    <section className="py-28 md:py-36 px-6 bg-porcelain relative">
      <div className="max-w-4xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
        >
          <div className="flex items-center justify-center gap-3 mb-6">
            <span className="h-px w-6 bg-champagne/40" />
            <p className="eyebrow text-champagne">Welcome to the World</p>
            <span className="h-px w-6 bg-champagne/40" />
          </div>
          <h2 className="heading-display text-3xl md:text-5xl lg:text-6xl text-sapphire-deep leading-display text-balance">
            Where imagination becomes<br />an invitation.
          </h2>
          <div className="divider-ornament my-6">
            <span className="text-champagne text-xs">✦</span>
          </div>
          <p className="text-lg md:text-xl heading-editorial italic text-sapphire/60 max-w-2xl mx-auto leading-relaxed2">
            Step into a universe of celebration, colour and craftsmanship. Explore bespoke invitation worlds —
            each a complete, personalised suite of pages that opens, turns, and transforms in your hands.
            Not templates. Not cards. Living invitations that begin a memory.
          </p>
        </motion.div>
      </div>
    </section>
  );
}

function FeaturedCollection() {
  const featured = TEMPLATES.filter((t) => FEATURED_IDS.includes(t.id)).slice(0, 6);
  return (
    <section className="py-24 md:py-32 px-6 bg-ivory/40">
      <div className="max-w-7xl mx-auto">
        <SectionHeading
          eyebrow="Curated Discoveries"
          title="Featured Invitation Worlds"
          subtitle="A glimpse into the worlds awaiting your celebration. Each opens to reveal its own pages, colours, and story."
        />
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6 md:gap-10 mt-16">
          {featured.map((t, i) => (
            <InvitationCard key={t.id} template={t} index={i} />
          ))}
        </div>
        <div className="text-center mt-14">
          <Link
            to="/explore"
            className="group inline-flex items-center gap-2 px-8 py-4 rounded-full border border-sapphire/20 text-sapphire text-xs tracking-widest2 uppercase hover:bg-sapphire hover:text-ivory transition-all duration-500"
          >
            View All 60 Designs <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
          </Link>
        </div>
      </div>
    </section>
  );
}

function InvitationJourney() {
  const [activeStep, setActiveStep] = useState(0);
  const template = TEMPLATES.find((t) => t.id === 7) ?? TEMPLATES[0];
  const cw = template.colorways[0];
  const steps = [
    {
      label: 'Discover',
      eyebrow: '01 — Find your world',
      title: 'Start with a feeling.',
      text: 'Browse original invitation worlds by celebration, language, or colour. Every design is built to feel like yours from the very first page.',
      icon: BookOpen,
    },
    {
      label: 'Personalise',
      eyebrow: '02 — Make it yours',
      title: 'Shape every detail.',
      text: 'Choose your palette, add your story, and move through every page before you order. Your words stay at the heart of the design.',
      icon: MousePointer2,
    },
    {
      label: 'Share',
      eyebrow: '03 — Begin the memory',
      title: 'Send something unforgettable.',
      text: 'Review your complete invitation suite, place your order, and share the moment with complimentary delivery included.',
      icon: MessageCircle,
    },
  ] as const;
  const current = steps[activeStep];
  const Icon = current.icon;

  return (
    <section className="py-24 md:py-32 px-6 bg-ivory/50 relative overflow-hidden">
      <div className="absolute -right-40 top-16 w-96 h-96 rounded-full bg-champagne/[0.06] blur-3xl pointer-events-none" aria-hidden />
      <div className="max-w-7xl mx-auto relative">
        <div className="grid lg:grid-cols-[0.85fr_1.15fr] gap-12 lg:gap-20 items-center">
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="flex items-center gap-3 mb-5">
              <span className="h-px w-6 bg-champagne/50" />
              <p className="eyebrow text-champagne">Your Invitation Journey</p>
            </div>
            <h2 className="heading-display text-3xl md:text-5xl text-sapphire-deep leading-display text-balance">
              From first glance<br />to lasting memory.
            </h2>
            <p className="text-base md:text-lg heading-editorial italic text-sapphire/70 leading-relaxed2 mt-5 max-w-lg">
              A guided, considered way to create an invitation that feels as special as the celebration itself.
            </p>
            <div className="flex flex-wrap gap-2 mt-8" role="tablist" aria-label="Invitation journey steps">
              {steps.map((step, index) => (
                <button
                  key={step.label}
                  role="tab"
                  aria-selected={activeStep === index}
                  onClick={() => setActiveStep(index)}
                  className={`inline-flex items-center gap-2 rounded-full px-4 py-2.5 text-[10px] uppercase tracking-widest2 border transition-all duration-300 ${activeStep === index ? 'bg-sapphire-deep border-sapphire-deep text-ivory shadow-luxury' : 'border-sapphire/15 text-sapphire/55 hover:border-champagne/60 hover:text-sapphire-deep'}`}
                >
                  <span className="text-champagne">0{index + 1}</span>{step.label}
                </button>
              ))}
            </div>
            <div className="mt-9 flex items-start gap-3 p-4 rounded-xl border border-champagne/15 bg-porcelain/70 max-w-lg">
              <CalendarDays className="w-4 h-4 text-champagne mt-0.5 flex-shrink-0" />
              <p className="text-xs text-sapphire/65 leading-relaxed">Thoughtfully designed for weddings, engagements, birthdays, and every meaningful beginning.</p>
            </div>
          </motion.div>

          <motion.div
            key={activeStep}
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            animate={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative rounded-2xl overflow-hidden bg-sapphire-deep p-5 sm:p-8 md:p-10 shadow-luxury-lg min-h-[360px] md:min-h-[430px]"
          >
            <div className="absolute -right-20 -top-20 w-64 h-64 rounded-full border border-champagne/10" aria-hidden />
            <div className="absolute -right-10 -top-10 w-44 h-44 rounded-full border border-champagne/10" aria-hidden />
            <div className="relative h-full grid sm:grid-cols-[0.8fr_1.2fr] gap-8 items-center">
              <div className="flex justify-center">
                <div className="relative w-40 h-56 sm:w-48 sm:h-64 rounded-lg overflow-hidden shadow-luxury-lg" style={{ background: `linear-gradient(160deg, ${cw.bg}, ${cw.bgAlt})`, border: `1px solid ${cw.border}50` }}>
                  <div className="absolute inset-2 rounded border" style={{ borderColor: `${cw.border}40` }} />
                  <div className="h-full flex flex-col items-center justify-center p-5 text-center">
                    <OrnamentArt ornament={template.ornament} cw={cw} size={58} />
                    <p className="text-[8px] tracking-widest2 uppercase mt-3" style={{ color: cw.textSoft }}>{template.name}</p>
                    <div className="w-8 h-px my-2" style={{ background: cw.gold }} />
                    <p className="font-tamil text-xs" style={{ color: cw.secondary }}>{template.tamilName}</p>
                  </div>
                  <div className="absolute bottom-3 left-1/2 -translate-x-1/2 w-7 h-7 rounded-full flex items-center justify-center" style={{ background: `radial-gradient(circle at 30% 30%, ${cw.gold}, ${cw.primary})` }}>
                    <span className="text-[9px] heading-display text-ivory">A</span>
                  </div>
                </div>
              </div>
              <div>
                <div className="w-11 h-11 rounded-full border border-champagne/30 bg-champagne/10 flex items-center justify-center mb-6">
                  <Icon className="w-5 h-5 text-champagne" />
                </div>
                <p className="eyebrow text-champagne/80 mb-3">{current.eyebrow}</p>
                <h3 className="heading-display text-2xl sm:text-3xl md:text-4xl text-ivory leading-tight">{current.title}</h3>
                <p className="text-sm md:text-base heading-editorial italic text-ivory/65 leading-relaxed2 mt-4 max-w-md">{current.text}</p>
                <div className="flex gap-1.5 mt-8">
                  {steps.map((_, index) => <span key={index} className={`h-1 rounded-full transition-all duration-500 ${activeStep === index ? 'w-8 bg-champagne' : 'w-2 bg-ivory/25'}`} />)}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-12">
          {['60 original designs', 'Tamil, English & bilingual', 'Complimentary delivery'].map((item) => (
            <div key={item} className="flex items-center justify-center gap-2 py-3 border-t border-champagne/15 text-[10px] tracking-widest2 uppercase text-sapphire/55">
              <CheckCircle2 className="w-3.5 h-3.5 text-champagne" /> {item}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function CategoryWorlds() {
  const cats = CATEGORIES.slice(0, 8);
  return (
    <section className="py-24 md:py-32 px-6 bg-porcelain">
      <div className="max-w-7xl mx-auto">
        <SectionHeading
          eyebrow="Explore by Celebration"
          title="Choose Your World"
          subtitle="Every celebration has its own language, colour, and ritual. Find the world that matches yours."
        />
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mt-16">
          {cats.map((cat, i) => {
            const sample = TEMPLATES.find((t) => t.category === cat.id);
            const cw = sample?.colorways[0];
            if (!cw) return null;
            return (
              <Link
                key={cat.id}
                to={cat.route}
                className="group card-sheen relative aspect-[4/5] rounded-xl overflow-hidden animate-fade-up-soft transition-all duration-500 hover:shadow-luxury"
                style={{
                  background: `linear-gradient(160deg, ${cw.bg}, ${cw.bgAlt})`,
                  border: `1px solid ${cw.border}30`,
                  animationDelay: `${i * 80}ms`,
                  opacity: 0,
                }}
              >
                <div className="absolute inset-3 border rounded-lg" style={{ borderColor: `${cw.border}25` }} />
                {sample && (
                  <div className="absolute inset-0 flex flex-col items-center justify-center p-4 text-center">
                    <div className="transition-transform duration-700 group-hover:scale-110 group-hover:-translate-y-1">
                      <OrnamentArt ornament={sample.ornament} cw={cw} size={50} />
                    </div>
                    <p className="text-[8px] tracking-widest2 uppercase mt-3" style={{ color: cw.textSoft }}>{cat.name}</p>
                    <h3 className="heading-display text-sm md:text-base mt-1 leading-tight" style={{ color: cw.primary }}>{cat.hero}</h3>
                    <div className="flex items-center gap-1.5 my-2">
                      <span className="h-px w-3" style={{ background: cw.gold, opacity: 0.5 }} />
                      <span className="text-[7px]" style={{ color: cw.gold }}>✦</span>
                      <span className="h-px w-3" style={{ background: cw.gold, opacity: 0.5 }} />
                    </div>
                    <p className="font-tamil text-[10px]" style={{ color: cw.secondary }}>{cat.tamilName}</p>
                  </div>
                )}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/[0.03] transition-colors duration-700" />
              </Link>
            );
          })}
        </div>
        <div className="text-center mt-12">
          <Link to="/explore" className="eyebrow text-champagne hover:text-sapphire transition-colors duration-300 link-underline">
            All Collections →
          </Link>
        </div>
      </div>
    </section>
  );
}

function ExperienceShowcase() {
  const features = [
    { icon: Palette, title: 'Live Colour Studio', text: 'Transform every page in real time with six coordinated colourways per design.' },
    { icon: Globe, title: 'Tamil & English', text: 'Switch between தமிழ், English, or bilingual — with proper Unicode Tamil rendering.' },
    { icon: Sparkles, title: 'Multi-Page 3D Viewer', text: 'Turn pages, explore every spread, and preview your complete invitation suite.' },
    { icon: Truck, title: 'Complimentary Delivery', text: 'Every order is delivered to your address at no extra cost.' },
  ];
  return (
    <section className="py-24 md:py-32 px-6 bg-sapphire-deep relative overflow-hidden grain-dark">
      <div className="absolute -top-40 -right-40 w-96 h-96 rounded-full bg-champagne/5 blur-3xl" aria-hidden />
      <div className="absolute -bottom-40 -left-40 w-96 h-96 rounded-full bg-emerald/5 blur-3xl" aria-hidden />
      <div className="max-w-7xl mx-auto relative">
        <SectionHeading
          eyebrow="The Experience"
          title="Crafted for the Curious"
          subtitle="More than an invitation — a complete personalisation experience."
          light
        />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-16">
          {features.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="p-7 rounded-xl border border-ivory/10 hover:border-champagne/30 transition-all duration-500 group bg-ivory/[0.02]"
            >
              <div className="w-12 h-12 rounded-full bg-champagne/10 flex items-center justify-center mb-5 group-hover:bg-champagne/20 group-hover:scale-110 transition-all duration-500">
                <f.icon className="w-6 h-6 text-champagne" />
              </div>
              <h3 className="heading-display text-xl text-ivory mb-2">{f.title}</h3>
              <p className="text-sm text-ivory/50 heading-editorial italic leading-relaxed2">{f.text}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function LaunchSection() {
  return (
    <section className="py-24 px-6 bg-porcelain">
      <div className="max-w-5xl mx-auto">
        <LaunchOfferBanner />
      </div>
    </section>
  );
}

function FinalCTA() {
  return (
    <section className="py-28 md:py-36 px-6 bg-gradient-to-b from-porcelain to-ivory/50 relative overflow-hidden">
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-champagne/[0.04] blur-3xl pointer-events-none" aria-hidden />
      <div className="max-w-3xl mx-auto text-center relative">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
        >
          <div className="animate-breathe">
            <OrnamentArt ornament={{ kind: 'mandala' }} cw={TEMPLATES[0].colorways[0]} size={80} className="mx-auto mb-6" />
          </div>
          <h2 className="heading-display text-3xl md:text-5xl lg:text-6xl text-sapphire-deep leading-display text-balance">
            Don't just send an invitation.<br />
            <span className="gold-text">Begin a world.</span>
          </h2>
          <div className="divider-ornament my-6">
            <span className="text-champagne text-xs">✦</span>
          </div>
          <p className="text-lg heading-editorial italic text-sapphire/60 max-w-xl mx-auto leading-relaxed2">
            Explore sixty original invitation worlds. Personalise every word. Choose your colours.
            Order through WhatsApp. Complimentary delivery, always.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center mt-10">
            <Link
              to="/explore"
              className="group btn-gold inline-flex items-center gap-2 px-8 py-4 rounded-full text-sapphire-deep text-xs tracking-widest2 uppercase font-semibold"
            >
              Explore All Invitations <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
            </Link>
            <Link
              to="/custom-studio"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full border border-sapphire/20 text-sapphire text-xs tracking-widest2 uppercase hover:bg-sapphire/5 transition-all duration-500"
            >
              Request Custom Design
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
