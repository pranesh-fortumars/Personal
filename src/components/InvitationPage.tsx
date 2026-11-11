import type { Colorway, Language, PageContent, Template, Personalisation } from '@/types';
import { OrnamentArt } from './OrnamentArt';

interface Props {
  template: Template;
  page: PageContent;
  colorway: Colorway;
  language: Language;
  personalisation: Personalisation;
  pageLabel?: string;
}

// Picks the personalised value or falls back to the template default.
function pick(p: Personalisation, key: keyof Personalisation, fallback?: string): string {
  const v = p[key];
  return v && v.trim().length > 0 ? v : (fallback || '');
}

export function InvitationPage({ template, page, colorway, language, personalisation }: Props) {
  const isTamil = language === 'ta';
  const isBilingual = language === 'bi';
  const fontClass = isTamil || isBilingual ? 'font-tamil' : 'font-display';

  // Build the display content based on language + personalisation overrides
  const en = page.en;
  const ta = page.ta;

  const enHost = pick(personalisation, 'host', en.host);
  const taHost = pick(personalisation, 'host', ta.host);
  const enNames = pick(personalisation, 'couple', en.names);
  const taNames = pick(personalisation, 'couple', ta.names);
  const eventTitle = pick(personalisation, 'eventTitle', isTamil ? ta.title : en.title);
  const date = pick(personalisation, 'date', en.date);
  const time = pick(personalisation, 'time', en.time);
  const venue = pick(personalisation, 'venue', en.venue);
  const address = pick(personalisation, 'address', en.address);
  const rsvp = pick(personalisation, 'rsvp', en.rsvp);
  const message = pick(personalisation, 'message', isTamil ? ta.body : en.body);
  const taMessage = pick(personalisation, 'message', ta.body);
  const extra = pick(personalisation, 'extra');

  const surface = colorway.bg;
  const surfaceAlt = colorway.bgAlt;

  return (
    <div
      className="relative w-full h-full overflow-hidden flex flex-col"
      style={{
        background: `linear-gradient(160deg, ${surface} 0%, ${surfaceAlt} 100%)`,
        color: colorway.text,
      }}
    >
      {/* Decorative border frame */}
      <div className="absolute inset-3 pointer-events-none" style={{ border: `1px solid ${colorway.border}40` }} />
      <div className="absolute inset-4 pointer-events-none" style={{ border: `1px solid ${colorway.border}25` }} />

      {/* Corner ornaments */}
      <CornerFlourish colorway={colorway} position="tl" />
      <CornerFlourish colorway={colorway} position="tr" />
      <CornerFlourish colorway={colorway} position="bl" />
      <CornerFlourish colorway={colorway} position="br" />

      <div className="relative z-10 flex-1 flex flex-col items-center justify-center px-8 py-10 text-center">
        {page.type === 'cover' && (
          <CoverPage
            template={template}
            colorway={colorway}
            fontClass={fontClass}
            isTamil={isTamil}
            isBilingual={isBilingual}
            enHost={enHost}
            taHost={taHost}
            enNames={enNames}
            taNames={taNames}
            eventTitle={eventTitle}
            message={message}
            taMessage={taMessage}
            date={date}
            time={time}
            venue={venue}
            extra={extra}
          />
        )}

        {page.type === 'invite' && (
          <InvitePage
            template={template}
            colorway={colorway}
            fontClass={fontClass}
            isTamil={isTamil}
            isBilingual={isBilingual}
            enHost={enHost}
            taHost={taHost}
            enNames={enNames}
            taNames={taNames}
            eventTitle={eventTitle}
            message={message}
            taMessage={taMessage}
            date={date}
            time={time}
            venue={venue}
            extra={extra}
          />
        )}

        {page.type === 'details' && (
          <DetailsPage
            colorway={colorway}
            fontClass={fontClass}
            isTamil={isTamil}
            isBilingual={isBilingual}
            enNames={enNames}
            taNames={taNames}
            date={date}
            time={time}
            venue={venue}
            address={address}
            extra={extra}
          />
        )}

        {page.type === 'rsvp' && (
          <RsvpPage
            colorway={colorway}
            fontClass={fontClass}
            isTamil={isTamil}
            isBilingual={isBilingual}
            rsvp={rsvp}
            venue={venue}
            address={address}
          />
        )}
      </div>
    </div>
  );
}

function CornerFlourish({ colorway, position }: { colorway: Colorway; position: 'tl' | 'tr' | 'bl' | 'br' }) {
  const pos: Record<string, string> = {
    tl: 'top-3 left-3',
    tr: 'top-3 right-3 rotate-90',
    bl: 'bottom-3 left-3 -rotate-90',
    br: 'bottom-3 right-3 rotate-180',
  };
  return (
    <svg viewBox="0 0 40 40" className={`absolute ${pos[position]} w-7 h-7`} aria-hidden="true">
      <path d="M4 4 L4 18 M4 4 L18 4 M4 12 Q12 12 12 4" stroke={colorway.gold} strokeWidth="1" fill="none" opacity="0.7" />
      <circle cx="4" cy="4" r="2" fill={colorway.gold} opacity="0.6" />
    </svg>
  );
}

interface PageProps {
  template: Template;
  colorway: Colorway;
  fontClass: string;
  isTamil: boolean;
  isBilingual: boolean;
  enHost: string;
  taHost: string;
  enNames: string;
  taNames: string;
  eventTitle: string;
  message: string;
  taMessage: string;
  date: string;
  time: string;
  venue: string;
  extra: string;
}

function CoverPage(p: PageProps) {
  return (
    <>
      <div className="mb-4 animate-fade-in">
        <OrnamentArt ornament={p.template.ornament} cw={p.colorway} size={90} />
      </div>

      {p.isBilingual ? (
        <div className="space-y-3">
          <p className="text-[10px] tracking-widest3 uppercase" style={{ color: p.colorway.textSoft }}>{p.eventTitle}</p>
          <h1 className={`text-3xl md:text-4xl ${p.fontClass} leading-tight`} style={{ color: p.colorway.primary }}>
            {p.template.name}
          </h1>
          <div className="w-16 h-px mx-auto" style={{ background: p.colorway.gold }} />
          <h2 className="font-tamil text-2xl md:text-3xl leading-tight" style={{ color: p.colorway.secondary }}>
            {p.template.tamilName}
          </h2>
          <p className="font-display italic text-sm md:text-base max-w-xs mx-auto" style={{ color: p.colorway.textSoft }}>
            {p.message}
          </p>
          <p className="font-tamil text-sm max-w-xs mx-auto" style={{ color: p.colorway.textSoft }}>
            {p.taMessage}
          </p>
          {p.enHost && <p className="text-xs tracking-widest2 uppercase pt-2" style={{ color: p.colorway.primary }}>{p.enHost}</p>}
        </div>
      ) : (
        <div className="space-y-3">
          <p className="text-[10px] tracking-widest3 uppercase" style={{ color: p.colorway.textSoft }}>
            {p.isTamil ? 'அழைப்பிதழ்' : 'An Invitation'}
          </p>
          <h1 className={`text-3xl md:text-5xl ${p.fontClass} leading-tight`} style={{ color: p.colorway.primary }}>
            {p.isTamil ? p.template.tamilName : p.template.name}
          </h1>
          <div className="w-16 h-px mx-auto" style={{ background: p.colorway.gold }} />
          <p className={`${p.fontClass} italic text-sm md:text-base max-w-xs mx-auto`} style={{ color: p.colorway.textSoft }}>
            {p.isTamil ? p.taMessage : p.message}
          </p>
          {p.enHost && (
            <p className={`text-xs tracking-widest2 uppercase pt-2 ${p.isTamil ? 'font-tamil' : ''}`} style={{ color: p.colorway.primary }}>
              {p.isTamil ? p.taHost : p.enHost}
            </p>
          )}
        </div>
      )}

      <div className="mt-5">
        <div className="w-24 h-px mx-auto" style={{ background: p.colorway.gold, opacity: 0.5 }} />
      </div>
    </>
  );
}

function InvitePage(p: PageProps) {
  return (
    <>
      <div className="mb-3">
        <OrnamentArt ornament={p.template.ornament} cw={p.colorway} size={56} />
      </div>

      {p.isBilingual ? (
        <div className="space-y-3 w-full">
          <p className="text-[10px] tracking-widest3 uppercase" style={{ color: p.colorway.textSoft }}>{p.eventTitle}</p>
          <h2 className="text-2xl md:text-3xl font-display leading-tight" style={{ color: p.colorway.primary }}>
            {p.enNames}
          </h2>
          <div className="w-12 h-px mx-auto" style={{ background: p.colorway.gold }} />
          <h3 className="font-tamil text-xl md:text-2xl leading-tight" style={{ color: p.colorway.secondary }}>
            {p.taNames}
          </h3>
          <p className="font-display italic text-xs md:text-sm max-w-sm mx-auto" style={{ color: p.colorway.textSoft }}>{p.message}</p>
          <p className="font-tamil text-xs max-w-sm mx-auto" style={{ color: p.colorway.textSoft }}>{p.taMessage}</p>
          <div className="pt-3 text-sm font-display" style={{ color: p.colorway.primary }}>
            {p.date} <span style={{ color: p.colorway.gold }}>·</span> {p.time}
          </div>
          <p className="text-xs" style={{ color: p.colorway.textSoft }}>{p.venue}</p>
        </div>
      ) : (
        <div className="space-y-3 w-full">
          <p className={`text-[10px] tracking-widest3 uppercase ${p.isTamil ? 'font-tamil' : ''}`} style={{ color: p.colorway.textSoft }}>
            {p.isTamil ? 'அழைப்பிதழ்' : 'Together with their families'}
          </p>
          <h2 className={`text-2xl md:text-4xl ${p.fontClass} leading-tight`} style={{ color: p.colorway.primary }}>
            {p.isTamil ? p.taNames : p.enNames}
          </h2>
          <div className="w-12 h-px mx-auto" style={{ background: p.colorway.gold }} />
          <p className={`${p.fontClass} italic text-xs md:text-sm max-w-sm mx-auto`} style={{ color: p.colorway.textSoft }}>
            {p.isTamil ? p.taMessage : p.message}
          </p>
          {p.isTamil ? (
            <p className="font-tamil text-xs" style={{ color: p.colorway.textSoft }}>{p.taHost}</p>
          ) : (
            <p className="text-xs tracking-widest2 uppercase" style={{ color: p.colorway.primary }}>{p.enHost}</p>
          )}
          <div className="pt-3 text-sm md:text-base font-display" style={{ color: p.colorway.primary }}>
            {p.date} <span style={{ color: p.colorway.gold }}>·</span> {p.time}
          </div>
          <p className="text-xs md:text-sm" style={{ color: p.colorway.textSoft }}>{p.venue}</p>
        </div>
      )}
      {p.extra && <p className="text-[11px] italic mt-2 max-w-xs mx-auto" style={{ color: p.colorway.textSoft }}>{p.extra}</p>}
    </>
  );
}

function DetailsPage(p: {
  colorway: Colorway;
  fontClass: string;
  isTamil: boolean;
  isBilingual: boolean;
  enNames: string;
  taNames: string;
  date: string;
  time: string;
  venue: string;
  address: string;
  extra: string;
}) {
  const label = (en: string, ta: string) => (p.isTamil ? ta : `${en} / ${ta}`);
  return (
    <>
      <div className="mb-2">
        <OrnamentArt ornament={{ kind: 'geometric' }} cw={p.colorway} size={48} />
      </div>
      <h3 className={`text-xl md:text-2xl ${p.fontClass} mb-4`} style={{ color: p.colorway.primary }}>
        {p.isTamil ? 'நிகழ்வு விவரம்' : 'Event Details'}
      </h3>
      <div className="space-y-3 text-center max-w-xs">
        <DetailRow colorway={p.colorway} label={label('Date', 'தேதி')} value={p.date} isTamil={p.isTamil} />
        <DetailRow colorway={p.colorway} label={label('Time', 'நேரம்')} value={p.time} isTamil={p.isTamil} />
        <DetailRow colorway={p.colorway} label={label('Venue', 'இடம்')} value={p.venue} isTamil={p.isTamil} />
        <DetailRow colorway={p.colorway} label={label('Address', 'முகவரி')} value={p.address} isTamil={p.isTamil} />
        {(p.enNames || p.taNames) && (
          <DetailRow colorway={p.colorway} label={label('Celebrating', 'கொண்டாடுதல்')} value={p.isTamil ? p.taNames : p.enNames} isTamil={p.isTamil} />
        )}
      </div>
      {p.extra && <p className="text-[11px] italic mt-4 max-w-xs" style={{ color: p.colorway.textSoft }}>{p.extra}</p>}
    </>
  );
}

function DetailRow({ colorway, label, value, isTamil }: { colorway: Colorway; label: string; value: string; isTamil: boolean }) {
  return (
    <div className="border-b pb-2" style={{ borderColor: `${colorway.border}30` }}>
      <p className={`text-[10px] tracking-widest2 uppercase mb-1 ${isTamil ? 'font-tamil' : ''}`} style={{ color: colorway.textSoft }}>{label}</p>
      <p className={`text-sm ${isTamil ? 'font-tamil' : 'font-display'}`} style={{ color: colorway.primary }}>{value}</p>
    </div>
  );
}

function RsvpPage(p: {
  colorway: Colorway;
  fontClass: string;
  isTamil: boolean;
  isBilingual: boolean;
  rsvp: string;
  venue: string;
  address: string;
}) {
  return (
    <>
      <div className="mb-3">
        <OrnamentArt ornament={{ kind: 'floral' }} cw={p.colorway} size={60} />
      </div>
      <h3 className={`text-2xl md:text-3xl ${p.fontClass} mb-3`} style={{ color: p.colorway.primary }}>
        {p.isTamil ? 'வருகை உறுதி' : 'RSVP'}
      </h3>
      <p className={`text-sm italic max-w-xs ${p.isTamil ? 'font-tamil' : 'font-display'}`} style={{ color: p.colorway.textSoft }}>
        {p.isTamil ? 'உங்கள் வருகையை உறுதி செய்ய அழைக்கவும்' : 'We look forward to celebrating with you.'}
      </p>
      <div className="mt-4 space-y-2">
        <p className="text-xs tracking-widest2 uppercase" style={{ color: p.colorway.textSoft }}>
          {p.isTamil ? 'தொடர்பு' : 'Contact'}
        </p>
        <p className="text-base font-display" style={{ color: p.colorway.primary }}>{p.rsvp}</p>
      </div>
      <div className="mt-4 pt-3 border-t w-32 mx-auto" style={{ borderColor: `${p.colorway.border}30` }}>
        <p className="text-[10px] tracking-widest2 uppercase" style={{ color: p.colorway.textSoft }}>
          {p.isTamil ? 'இடம்' : 'Venue'}
        </p>
        <p className="text-xs mt-1" style={{ color: p.colorway.primary }}>{p.venue}</p>
        <p className="text-[10px]" style={{ color: p.colorway.textSoft }}>{p.address}</p>
      </div>
      <p className={`mt-4 text-[11px] italic ${p.isTamil ? 'font-tamil' : 'font-display'}`} style={{ color: p.colorway.gold }}>
        {p.isTamil ? 'நன்றி' : 'Thank You'}
      </p>
    </>
  );
}
