import { useState, useRef, useCallback, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Maximize2, Minimize2, Download, Check } from 'lucide-react';
import { toPng } from 'html-to-image';
import confetti from 'canvas-confetti';
import type { Colorway, Language, Template, Personalisation, PageContent } from '@/types';
import { InvitationPage } from './InvitationPage';

interface Props {
  template: Template;
  colorway: Colorway;
  language: Language;
  personalisation: Personalisation;
  pages: PageContent[];
}

export function InvitationViewer({ template, colorway, language, personalisation, pages }: Props) {
  const [current, setCurrent] = useState(0);
  const [flipping, setFlipping] = useState<'next' | 'prev' | null>(null);
  const [fullscreen, setFullscreen] = useState(false);
  const [downloading, setDownloading] = useState(false);
  const [downloadSuccess, setDownloadSuccess] = useState(false);
  const touchStart = useRef<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const cardProofRef = useRef<HTMLDivElement>(null);

  const totalPages = pages.length;
  const isDark = colorway.bg.startsWith('#1') || colorway.bg.startsWith('#2');

  const handleDownloadProof = async () => {
    if (!cardProofRef.current || downloading) return;
    try {
      setDownloading(true);
      const dataUrl = await toPng(cardProofRef.current, {
        quality: 0.95,
        pixelRatio: 2,
        backgroundColor: colorway.bg,
      });
      const link = document.createElement('a');
      link.download = `${template.name.replace(/\s+/g, '_')}_Page_${current + 1}.png`;
      link.href = dataUrl;
      link.click();
      
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.7 },
        colors: ['#C5A46D', '#173A70', '#176B55']
      });

      setDownloadSuccess(true);
      setTimeout(() => setDownloadSuccess(false), 2000);
    } catch (err) {
      console.error('Failed to download proof image:', err);
    } finally {
      setDownloading(false);
    }
  };

  const goNext = useCallback(() => {
    if (flipping) return;
    if (current >= totalPages - 1) return;
    setFlipping('next');
    setTimeout(() => {
      setCurrent((c) => Math.min(c + 1, totalPages - 1));
      setFlipping(null);
    }, 600);
  }, [current, flipping, totalPages]);

  const goPrev = useCallback(() => {
    if (flipping) return;
    if (current <= 0) return;
    setFlipping('prev');
    setTimeout(() => {
      setCurrent((c) => Math.max(c - 1, 0));
      setFlipping(null);
    }, 600);
  }, [current, flipping]);

  const goTo = useCallback((idx: number) => {
    if (flipping || idx === current) return;
    setFlipping(idx > current ? 'next' : 'prev');
    setTimeout(() => {
      setCurrent(idx);
      setFlipping(null);
    }, 600);
  }, [current, flipping]);

  // Touch swipe
  const onTouchStart = (e: React.TouchEvent) => {
    touchStart.current = e.touches[0].clientX;
  };
  const onTouchEnd = (e: React.TouchEvent) => {
    if (touchStart.current === null) return;
    const delta = e.changedTouches[0].clientX - touchStart.current;
    if (delta < -50) goNext();
    else if (delta > 50) goPrev();
    touchStart.current = null;
  };

  // Keyboard nav
  useEffect(() => {
    if (!fullscreen) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') goNext();
      else if (e.key === 'ArrowLeft') goPrev();
      else if (e.key === 'Escape') setFullscreen(false);
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [fullscreen, goNext, goPrev]);

  const pageLabel = `${current + 1} of ${totalPages}`;

  const cardBase =
    'relative shadow-2xl transition-all duration-500 preserve-3d';

  return (
    <>
      <div className="flex flex-col items-center select-none" ref={containerRef}>
        {/* 3D Stage */}
        <div
          className={`perspective w-full max-w-2xl mx-auto ${fullscreen ? 'fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4' : ''}`}
          onTouchStart={onTouchStart}
          onTouchEnd={onTouchEnd}
        >
          {/* Ambient glow behind card */}
          <div
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-96 rounded-full blur-3xl opacity-30 pointer-events-none"
            style={{ background: colorway.primary }}
            aria-hidden
          />

          <div
            className={`relative mx-auto ${fullscreen ? 'w-full max-w-3xl' : 'w-full max-w-md'} aspect-[5/7]`}
            style={{ transformStyle: 'preserve-3d' }}
          >
            {/* Card stack — subtle depth pages behind */}
            {Array.from({ length: Math.min(3, totalPages - 1) }).map((_, i) => (
              <div
                key={`stack-${i}`}
                className="absolute inset-0 rounded-lg"
                style={{
                  transform: `translateZ(${-i * 4 - 2}px) translateY(${i * 3}px) scale(${1 - i * 0.01})`,
                  background: colorway.bgAlt,
                  boxShadow: '0 8px 30px rgba(0,0,0,0.15)',
                  border: `1px solid ${colorway.border}30`,
                }}
                aria-hidden
              />
            ))}

            {/* Flipping layer overlay (for next) */}
            {flipping === 'next' && current < totalPages - 1 && (
              <div
                className="absolute inset-0 rounded-lg page-flip origin-left"
                style={{
                  transform: 'rotateY(-180deg)',
                  boxShadow: '0 20px 50px rgba(0,0,0,0.3)',
                  zIndex: 30,
                }}
              >
                <div className="w-full h-full rounded-lg overflow-hidden">
                  <InvitationPage
                    template={template}
                    page={pages[current]}
                    colorway={colorway}
                    language={language}
                    personalisation={personalisation}
                  />
                </div>
              </div>
            )}

            {/* Flipping layer overlay (for prev) */}
            {flipping === 'prev' && current > 0 && (
              <div
                className="absolute inset-0 rounded-lg page-flip origin-left"
                style={{
                  transform: 'rotateY(0deg)',
                  boxShadow: '0 20px 50px rgba(0,0,0,0.3)',
                  zIndex: 30,
                }}
              >
                <div className="w-full h-full rounded-lg overflow-hidden">
                  <InvitationPage
                    template={template}
                    page={pages[current]}
                    colorway={colorway}
                    language={language}
                    personalisation={personalisation}
                  />
                </div>
              </div>
            )}

            {/* Current page */}
            <div
              ref={cardProofRef}
              className={`${cardBase} absolute inset-0 rounded-lg overflow-hidden`}
              style={{
                transform: flipping ? 'translateZ(0)' : 'translateZ(0)',
                boxShadow: '0 25px 60px rgba(0,0,0,0.25)',
                border: `1px solid ${colorway.border}40`,
                zIndex: 10,
              }}
            >
              <InvitationPage
                template={template}
                page={pages[current]}
                colorway={colorway}
                language={language}
                personalisation={personalisation}
              />
            </div>
          </div>

          {/* Click zones for page turn */}
          {!fullscreen && (
            <>
              <button
                aria-label="Previous page"
                onClick={goPrev}
                disabled={current === 0 || !!flipping}
                className="absolute left-0 top-0 bottom-0 w-1/4 z-20 cursor-pointer disabled:cursor-default group"
              >
                <span className={`absolute left-2 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full glass flex items-center justify-center transition-opacity ${current === 0 ? 'opacity-0' : 'opacity-0 group-hover:opacity-100'}`}>
                  <ChevronLeft className="w-5 h-5 text-sapphire" />
                </span>
              </button>
              <button
                aria-label="Next page"
                onClick={goNext}
                disabled={current === totalPages - 1 || !!flipping}
                className="absolute right-0 top-0 bottom-0 w-1/4 z-20 cursor-pointer disabled:cursor-default group"
              >
                <span className={`absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full glass flex items-center justify-center transition-opacity ${current === totalPages - 1 ? 'opacity-0' : 'opacity-0 group-hover:opacity-100'}`}>
                  <ChevronRight className="w-5 h-5 text-sapphire" />
                </span>
              </button>
            </>
          )}

          {/* Fullscreen controls */}
          {fullscreen && (
            <div className="absolute top-4 right-4 z-50 flex gap-2">
              <button
                aria-label="Exit fullscreen"
                onClick={() => setFullscreen(false)}
                className="w-11 h-11 rounded-full glass flex items-center justify-center hover:bg-white/30 transition"
              >
                <Minimize2 className="w-5 h-5 text-white" />
              </button>
            </div>
          )}
        </div>

        {/* Controls bar */}
        <div className="flex items-center justify-center gap-4 mt-6">
          <button
            onClick={goPrev}
            disabled={current === 0 || !!flipping}
            aria-label="Previous page"
            className="w-11 h-11 rounded-full border border-champagne/40 flex items-center justify-center disabled:opacity-30 hover:bg-champagne/10 transition"
          >
            <ChevronLeft className={`w-5 h-5 ${isDark ? 'text-ivory' : 'text-sapphire'}`} />
          </button>

          <div className="flex items-center gap-2">
            {/* Thumbnails */}
            <div className="flex gap-2">
              {pages.map((p, i) => (
                <button
                  key={i}
                  onClick={() => goTo(i)}
                  aria-label={`Go to page ${i + 1}`}
                  className={`relative w-9 h-12 rounded transition-all overflow-hidden ${
                    i === current ? 'ring-2 ring-champagne scale-110' : 'ring-1 ring-black/10 opacity-60 hover:opacity-100'
                  }`}
                  style={{ background: colorway.bgAlt }}
                >
                  <div className="absolute inset-0.5 rounded-sm flex items-center justify-center" style={{ background: colorway.bg }}>
                    <span className="text-[8px] font-display" style={{ color: colorway.primary }}>{i + 1}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>

          <button
            onClick={goNext}
            disabled={current === totalPages - 1 || !!flipping}
            aria-label="Next page"
            className="w-11 h-11 rounded-full border border-champagne/40 flex items-center justify-center disabled:opacity-30 hover:bg-champagne/10 transition"
          >
            <ChevronRight className={`w-5 h-5 ${isDark ? 'text-ivory' : 'text-sapphire'}`} />
          </button>

          <button
            onClick={() => setFullscreen(true)}
            aria-label="Fullscreen preview"
            className="w-11 h-11 rounded-full border border-champagne/40 flex items-center justify-center hover:bg-champagne/10 transition"
            title="Fullscreen Immersion"
          >
            <Maximize2 className={`w-4 h-4 ${isDark ? 'text-ivory' : 'text-sapphire'}`} />
          </button>

          <button
            onClick={handleDownloadProof}
            disabled={downloading}
            aria-label="Download page proof"
            className="w-11 h-11 rounded-full border border-champagne/40 flex items-center justify-center hover:bg-champagne/10 transition"
            title="Download HD Page Proof"
          >
            {downloadSuccess ? (
              <Check className="w-4 h-4 text-emerald" />
            ) : (
              <Download className={`w-4 h-4 ${isDark ? 'text-ivory' : 'text-sapphire'} ${downloading ? 'animate-bounce' : ''}`} />
            )}
          </button>
        </div>

        {/* Page indicator */}
        <p className={`mt-3 text-xs tracking-widest2 uppercase ${isDark ? 'text-ivory/70' : 'text-sapphire/60'}`}>
          Page {pageLabel}
        </p>
      </div>
    </>
  );
}
