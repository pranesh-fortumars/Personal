import React, { useEffect, useState } from 'react';
import QRCode from 'qrcode';
import { QrCode as QrIcon } from 'lucide-react';

interface RsvpQrCodeProps {
  rsvpPhone: string;
  eventName: string;
  size?: number;
}

export const RsvpQrCode: React.FC<RsvpQrCodeProps> = ({ rsvpPhone, eventName, size = 80 }) => {
  const [qrDataUrl, setQrDataUrl] = useState<string>('');

  useEffect(() => {
    const cleanNumber = rsvpPhone.replace(/\D/g, '') || '918072854541';
    const text = `https://wa.me/${cleanNumber}?text=${encodeURIComponent(`Namaste, RSVP confirmation for ${eventName}`)}`;
    
    QRCode.toDataURL(text, {
      width: size * 2,
      margin: 1,
      color: {
        dark: '#102B4C',
        light: '#FFFFFF'
      }
    })
      .then((url) => setQrDataUrl(url))
      .catch(() => {});
  }, [rsvpPhone, eventName, size]);

  if (!qrDataUrl) return null;

  return (
    <div className="flex flex-col items-center gap-1.5 p-2 bg-white/80 backdrop-blur-sm rounded-lg border border-champagne/30 shadow-sm">
      <img src={qrDataUrl} alt="RSVP QR Code" className="rounded" style={{ width: size, height: size }} />
      <span className="text-[9px] uppercase tracking-wider text-sapphire/70 font-semibold flex items-center gap-1">
        <QrIcon className="w-2.5 h-2.5 text-champagne" /> Scan to RSVP
      </span>
    </div>
  );
};

