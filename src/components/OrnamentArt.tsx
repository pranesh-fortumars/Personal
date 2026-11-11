import type { Ornament, Colorway } from '@/types';

interface Props {
  ornament: Ornament;
  cw: Colorway;
  size?: number;
  className?: string;
}

// Each ornament renders unique SVG artwork using the colourway palette.
export function OrnamentArt({ ornament, cw, size = 120, className = '' }: Props) {
  const gold = cw.gold;
  const primary = cw.primary;
  const secondary = cw.secondary;
  const id = `${ornament.kind}-${cw.primary.replace('#', '')}`;

  return (
    <svg
      viewBox="0 0 200 200"
      width={size}
      height={size}
      className={className}
      fill="none"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id={`${id}-gold`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor={gold} stopOpacity="1" />
          <stop offset="50%" stopColor={gold} stopOpacity="0.7" />
          <stop offset="100%" stopColor={gold} stopOpacity="1" />
        </linearGradient>
        <linearGradient id={`${id}-primary`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor={primary} />
          <stop offset="100%" stopColor={secondary} />
        </linearGradient>
      </defs>

      {renderOrnament(ornament.kind, id, gold, primary, secondary)}
    </svg>
  );
}

function renderOrnament(kind: Ornament['kind'], id: string, gold: string, primary: string, secondary: string) {
  switch (kind) {
    case 'crown':
      return (
        <g>
          <path d="M40 120 L60 70 L80 100 L100 55 L120 100 L140 70 L160 120 Z" stroke={`url(#${id}-gold)`} strokeWidth="2" fill="none" />
          <circle cx="60" cy="70" r="4" fill={gold} />
          <circle cx="100" cy="55" r="5" fill={gold} />
          <circle cx="140" cy="70" r="4" fill={gold} />
          <path d="M40 120 Q100 140 160 120" stroke={`url(#${id}-gold)`} strokeWidth="2" fill="none" />
          <path d="M50 130 L150 130" stroke={gold} strokeWidth="1" opacity="0.5" />
        </g>
      );
    case 'floral':
      return (
        <g>
          {[0, 72, 144, 216, 288].map((rot) => (
            <ellipse key={rot} cx="100" cy="75" rx="14" ry="28" fill={`url(#${id}-primary)`} opacity="0.85" transform={`rotate(${rot} 100 100)`} />
          ))}
          <circle cx="100" cy="100" r="12" fill={gold} />
          <circle cx="100" cy="100" r="6" fill={secondary} />
          <path d="M100 140 Q70 155 60 175" stroke={gold} strokeWidth="1.5" fill="none" />
          <path d="M100 140 Q130 155 140 175" stroke={gold} strokeWidth="1.5" fill="none" />
          <ellipse cx="60" cy="172" rx="6" ry="3" fill={primary} opacity="0.7" transform="rotate(-30 60 172)" />
          <ellipse cx="140" cy="172" rx="6" ry="3" fill={primary} opacity="0.7" transform="rotate(30 140 172)" />
        </g>
      );
    case 'peacock':
      return (
        <g>
          {/* Body */}
          <ellipse cx="100" cy="110" rx="14" ry="22" fill={`url(#${id}-primary)`} />
          <circle cx="100" cy="88" r="8" fill={secondary} />
          <path d="M92 84 Q88 78 92 74" stroke={gold} strokeWidth="1.5" fill="none" />
          {/* Feathers */}
          {[0, 1, 2, 3, 4, 5, 6].map((i) => {
            const angle = -90 + (i - 3) * 22;
            const rad = (angle * Math.PI) / 180;
            const fx = 100 + Math.cos(rad) * 55;
            const fy = 95 + Math.sin(rad) * 50;
            return (
              <g key={i}>
                <line x1="100" y1="100" x2={fx} y2={fy} stroke={gold} strokeWidth="1" opacity="0.6" />
                <circle cx={fx} cy={fy} r="9" fill={primary} opacity="0.5" />
                <circle cx={fx} cy={fy} r="5" fill={gold} opacity="0.8" />
                <circle cx={fx} cy={fy} r="2" fill={secondary} />
              </g>
            );
          })}
        </g>
      );
    case 'lotus':
      return (
        <g>
          {[0, 1, 2, 3, 4].map((i) => {
            const rot = (i - 2) * 28;
            return (
              <path
                key={i}
                d="M100 120 Q88 90 100 60 Q112 90 100 120 Z"
                fill={`url(#${id}-primary)`}
                opacity="0.75"
                transform={`rotate(${rot} 100 110)`}
              />
            );
          })}
          <ellipse cx="100" cy="115" rx="10" ry="6" fill={gold} />
          <path d="M60 130 Q100 140 140 130" stroke={gold} strokeWidth="2" fill="none" opacity="0.6" />
        </g>
      );
    case 'mandala':
      return (
        <g>
          <circle cx="100" cy="100" r="60" stroke={gold} strokeWidth="1.5" fill="none" />
          <circle cx="100" cy="100" r="45" stroke={`url(#${id}-primary)`} strokeWidth="1" fill="none" opacity="0.6" />
          <circle cx="100" cy="100" r="30" stroke={gold} strokeWidth="1" fill="none" />
          {[0, 45, 90, 135, 180, 225, 270, 315].map((rot) => (
            <g key={rot} transform={`rotate(${rot} 100 100)`}>
              <path d="M100 40 Q108 70 100 100 Q92 70 100 40 Z" fill={`url(#${id}-primary)`} opacity="0.5" />
              <circle cx="100" cy="50" r="3" fill={gold} />
            </g>
          ))}
          <circle cx="100" cy="100" r="10" fill={gold} />
          <circle cx="100" cy="100" r="5" fill={secondary} />
        </g>
      );
    case 'annam':
      return (
        <g>
          {/* Annam (mythical bird) */}
          <path d="M100 60 Q85 70 80 90 Q75 105 85 120 Q100 130 115 120 Q125 105 120 90 Q115 70 100 60 Z" fill={`url(#${id}-primary)`} opacity="0.8" />
          <circle cx="100" cy="78" r="6" fill={gold} />
          <path d="M100 72 L100 66" stroke={gold} strokeWidth="2" />
          <path d="M96 66 Q100 60 104 66" stroke={gold} strokeWidth="1.5" fill="none" />
          {/* Wings */}
          <path d="M80 90 Q50 85 45 110 Q55 105 80 100" fill={`url(#${id}-primary)`} opacity="0.6" />
          <path d="M120 90 Q150 85 155 110 Q145 105 120 100" fill={`url(#${id}-primary)`} opacity="0.6" />
          {/* Tail */}
          <path d="M90 120 Q85 140 95 155 M100 125 Q100 145 105 160 M110 120 Q115 140 108 155" stroke={gold} strokeWidth="1.5" fill="none" />
        </g>
      );
    case 'temple':
      return (
        <g>
          {/* Gopuram style */}
          <path d="M60 150 L60 90 L70 80 L80 90 L80 70 L90 60 L100 50 L110 60 L120 70 L120 90 L130 80 L140 90 L140 150 Z" stroke={`url(#${id}-gold)`} strokeWidth="2" fill={`url(#${id}-primary)`} fillOpacity="0.15" />
          <rect x="90" y="100" width="20" height="40" fill={gold} opacity="0.3" />
          <path d="M95 140 L95 110 L105 110 L105 140" stroke={gold} strokeWidth="1" fill="none" />
          <circle cx="100" cy="50" r="4" fill={gold} />
          <path d="M50 155 L150 155" stroke={gold} strokeWidth="1.5" />
        </g>
      );
    case 'geometric':
      return (
        <g>
          <rect x="50" y="50" width="100" height="100" stroke={`url(#${id}-gold)`} strokeWidth="1.5" fill="none" transform="rotate(45 100 100)" />
          <rect x="65" y="65" width="70" height="70" stroke={`url(#${id}-primary)`} strokeWidth="1" fill="none" />
          <circle cx="100" cy="100" r="30" stroke={gold} strokeWidth="1.5" fill="none" />
          <circle cx="100" cy="100" r="15" fill={`url(#${id}-primary)`} opacity="0.3" />
          <circle cx="100" cy="100" r="6" fill={gold} />
          <line x1="100" y1="35" x2="100" y2="165" stroke={gold} strokeWidth="0.5" opacity="0.4" />
          <line x1="35" y1="100" x2="165" y2="100" stroke={gold} strokeWidth="0.5" opacity="0.4" />
        </g>
      );
    case 'botanical':
      return (
        <g>
          <path d="M100 170 Q100 120 95 80" stroke={`url(#${id}-primary)`} strokeWidth="2.5" fill="none" />
          <path d="M100 170 Q100 120 105 80" stroke={`url(#${id}-primary)`} strokeWidth="2.5" fill="none" />
          <ellipse cx="80" cy="100" rx="18" ry="8" fill={`url(#${id}-primary)`} opacity="0.6" transform="rotate(-30 80 100)" />
          <ellipse cx="120" cy="100" rx="18" ry="8" fill={`url(#${id}-primary)`} opacity="0.6" transform="rotate(30 120 100)" />
          <ellipse cx="75" cy="130" rx="16" ry="7" fill={`url(#${id}-primary)`} opacity="0.5" transform="rotate(-20 75 130)" />
          <ellipse cx="125" cy="130" rx="16" ry="7" fill={`url(#${id}-primary)`} opacity="0.5" transform="rotate(20 125 130)" />
          <circle cx="100" cy="70" r="10" fill={gold} />
          <circle cx="100" cy="70" r="5" fill={secondary} />
        </g>
      );
    case 'rays':
      return (
        <g>
          <circle cx="100" cy="100" r="20" fill={gold} />
          <circle cx="100" cy="100" r="12" fill={secondary} />
          <circle cx="100" cy="100" r="6" fill={gold} />
          {Array.from({ length: 12 }).map((_, i) => {
            const angle = (i * 30 * Math.PI) / 180;
            const x1 = 100 + Math.cos(angle) * 28;
            const y1 = 100 + Math.sin(angle) * 28;
            const x2 = 100 + Math.cos(angle) * 70;
            const y2 = 100 + Math.sin(angle) * 70;
            return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke={gold} strokeWidth="1.5" opacity="0.7" />;
          })}
        </g>
      );
    case 'arch':
      return (
        <g>
          <path d="M50 160 L50 90 Q50 40 100 40 Q150 40 150 90 L150 160" stroke={`url(#${id}-gold)`} strokeWidth="2.5" fill="none" />
          <path d="M60 160 L60 95 Q60 55 100 55 Q140 55 140 95 L140 160" stroke={`url(#${id}-primary)`} strokeWidth="1" fill="none" opacity="0.5" />
          <circle cx="100" cy="45" r="5" fill={gold} />
          <path d="M40 160 L160 160" stroke={gold} strokeWidth="1.5" />
        </g>
      );
    case 'star':
      return (
        <g>
          {[0, 36, 72, 108, 144, 180, 216, 252, 288, 324].map((rot) => (
            <line key={rot} x1="100" y1="100" x2="100" y2="35" stroke={gold} strokeWidth="0.8" opacity="0.4" transform={`rotate(${rot} 100 100)`} />
          ))}
          <path d="M100 40 L108 75 L142 75 L114 96 L124 130 L100 110 L76 130 L86 96 L58 75 L92 75 Z" fill={`url(#${id}-gold)`} opacity="0.9" />
          <circle cx="100" cy="100" r="8" fill={secondary} />
          <circle cx="100" cy="100" r="4" fill={gold} />
        </g>
      );
    case 'henna':
      return (
        <g>
          <path d="M100 160 Q100 120 90 90 Q85 70 100 55" stroke={`url(#${id}-gold)`} strokeWidth="2" fill="none" />
          <path d="M100 160 Q100 120 110 90 Q115 70 100 55" stroke={`url(#${id}-gold)`} strokeWidth="2" fill="none" />
          {[
            { x: 90, y: 90, r: 30 }, { x: 110, y: 90, r: 30 },
            { x: 85, y: 115, r: 25 }, { x: 115, y: 115, r: 25 },
          ].map((p, i) => (
            <g key={i}>
              <circle cx={p.x} cy={p.y} r={p.r * 0.3} stroke={`url(#${id}-primary)`} strokeWidth="1" fill="none" opacity="0.6" />
              <circle cx={p.x} cy={p.y} r={p.r * 0.15} fill={gold} opacity="0.5" />
            </g>
          ))}
          <circle cx="100" cy="60" r="8" fill={gold} />
          <path d="M100 50 Q100 42 100 38" stroke={gold} strokeWidth="1.5" />
        </g>
      );
    case 'sun':
      return (
        <g>
          <circle cx="100" cy="100" r="30" fill={`url(#${id}-gold)`} opacity="0.85" />
          <circle cx="100" cy="100" r="22" fill={secondary} opacity="0.6" />
          <circle cx="100" cy="100" r="14" fill={gold} />
          {Array.from({ length: 12 }).map((_, i) => {
            const angle = (i * 30 * Math.PI) / 180;
            const x1 = 100 + Math.cos(angle) * 35;
            const y1 = 100 + Math.sin(angle) * 35;
            const x2 = 100 + Math.cos(angle) * 60;
            const y2 = 100 + Math.sin(angle) * 60;
            return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke={gold} strokeWidth="2.5" opacity="0.8" />;
          })}
        </g>
      );
    case 'wave':
      return (
        <g>
          <path d="M30 100 Q55 70 80 100 Q105 130 130 100 Q155 70 180 100" stroke={`url(#${id}-primary)`} strokeWidth="3" fill="none" />
          <path d="M30 115 Q55 85 80 115 Q105 145 130 115 Q155 85 180 115" stroke={gold} strokeWidth="2" fill="none" opacity="0.6" />
          <path d="M30 85 Q55 55 80 85 Q105 115 130 85 Q155 55 180 85" stroke={`url(#${id}-primary)`} strokeWidth="2" fill="none" opacity="0.4" />
          <circle cx="80" cy="100" r="6" fill={gold} />
          <circle cx="130" cy="100" r="6" fill={gold} />
        </g>
      );
    default:
      return null;
  }
}
