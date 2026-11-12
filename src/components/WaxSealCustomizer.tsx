import React from 'react';

export interface WaxSealCustomizerProps {
  initials: string;
  sealColor: string;
  onColorChange: (color: string) => void;
  onInitialsChange: (initials: string) => void;
}

export const WAX_COLORS = [
  { id: 'royal-gold', name: 'Champagne Gold', hex: '#C5A46D', ring: '#8A6D3B' },
  { id: 'antique-crimson', name: 'Imperial Crimson', hex: '#7A1C28', ring: '#4A0C14' },
  { id: 'sapphire-blue', name: 'Royal Sapphire', hex: '#173A70', ring: '#0B2244' },
  { id: 'emerald-leaf', name: 'Sacred Emerald', hex: '#176B55', ring: '#0D3E31' },
  { id: 'obsidian-black', name: 'Midnight Obsidian', hex: '#242426', ring: '#0C0C0D' },
];

export const WaxSealCustomizer: React.FC<WaxSealCustomizerProps> = ({
  initials,
  sealColor,
  onColorChange,
  onInitialsChange,
}) => {
  const currentColor = WAX_COLORS.find(c => c.hex === sealColor) || WAX_COLORS[0];

  return (
    <div className="bg-white/80 backdrop-blur-sm border border-champagne/30 rounded-xl p-5 shadow-sm">
      <div className="flex items-center justify-between mb-4 pb-2 border-b border-champagne/20">
        <div>
          <h4 className="font-display text-sm font-semibold text-sapphire-deep">Atelier Wax Seal Stamp</h4>
          <p className="text-[11px] text-sapphire/50">Customise bespoke monogram & seal wax pigment</p>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row items-center gap-6">
        {/* Realistic Wax Stamp Preview */}
        <div className="relative flex items-center justify-center">
          <div 
            className="w-20 h-20 rounded-full shadow-2xl flex items-center justify-center transition-all duration-300 transform hover:scale-105"
            style={{
              background: `radial-gradient(circle at 35% 35%, ${currentColor.hex}, ${currentColor.ring})`,
              boxShadow: `0 8px 24px rgba(0,0,0,0.25), inset 0 2px 4px rgba(255,255,255,0.3), inset 0 -4px 6px ${currentColor.ring}`,
              border: `2px solid ${currentColor.hex}cc`
            }}
          >
            {/* Wax rim ring */}
            <div 
              className="w-16 h-16 rounded-full border border-dashed flex items-center justify-center"
              style={{ borderColor: 'rgba(255,255,255,0.3)' }}
            >
              <span 
                className="font-serif text-lg font-bold tracking-widest text-white/90 drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]"
              >
                {initials.slice(0, 3).toUpperCase() || 'A'}
              </span>
            </div>
          </div>
        </div>

        {/* Customization controls */}
        <div className="flex-1 space-y-3 w-full">
          <div>
            <label className="text-[10px] uppercase tracking-wider text-sapphire/60 block mb-1 font-semibold">
              Monogram Initials (Up to 3 Letters)
            </label>
            <input
              type="text"
              maxLength={3}
              value={initials}
              onChange={(e) => onInitialsChange(e.target.value)}
              placeholder="e.g. A&V"
              className="w-full px-3 py-1.5 text-xs bg-porcelain border border-champagne/30 rounded focus:border-royal-sapphire focus:outline-none uppercase font-serif"
            />
          </div>

          <div>
            <label className="text-[10px] uppercase tracking-wider text-sapphire/60 block mb-1.5 font-semibold">
              Wax Seal Pigment ({currentColor.name})
            </label>
            <div className="flex gap-2">
              {WAX_COLORS.map((color) => (
                <button
                  key={color.id}
                  onClick={() => onColorChange(color.hex)}
                  className={`w-7 h-7 rounded-full transition-transform ${
                    sealColor === color.hex ? 'scale-125 ring-2 ring-royal-sapphire' : 'opacity-80 hover:opacity-100'
                  }`}
                  style={{
                    background: color.hex,
                    boxShadow: 'inset 0 1px 2px rgba(255,255,255,0.4), 0 2px 4px rgba(0,0,0,0.2)'
                  }}
                  title={color.name}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

