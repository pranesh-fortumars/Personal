interface Props {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  center?: boolean;
  light?: boolean;
  size?: 'default' | 'large';
}

export function SectionHeading({ eyebrow, title, subtitle, center = true, light = false, size = 'default' }: Props) {
  return (
    <div className={`${center ? 'text-center' : ''} max-w-3xl ${center ? 'mx-auto' : ''}`}>
      {eyebrow && (
        <div className={`flex items-center gap-3 mb-5 ${center ? 'justify-center' : ''}`}>
          <span className="h-px w-6 bg-champagne/50" />
          <p className="eyebrow text-champagne">{eyebrow}</p>
          <span className="h-px w-6 bg-champagne/50" />
        </div>
      )}
      <h2 className={`heading-display ${size === 'large' ? 'text-4xl md:text-6xl' : 'text-3xl md:text-5xl'} ${light ? 'text-ivory' : 'text-sapphire-deep'}`}>
        {title}
      </h2>
      <div className={`divider-ornament my-5 ${center ? '' : 'justify-start'}`}>
        <span className="text-champagne text-xs">✦</span>
      </div>
      {subtitle && (
        <p className={`text-base md:text-lg heading-editorial italic ${light ? 'text-ivory/70' : 'text-sapphire/75'} max-w-2xl ${center ? 'mx-auto' : ''} leading-relaxed2`}>
          {subtitle}
        </p>
      )}
    </div>
  );
}
