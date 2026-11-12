import React, { useState, useEffect, useRef } from 'react';
import { Volume2, VolumeX, Disc } from 'lucide-react';

interface Track {
  title: string;
  artist: string;
  synthType: 'carnatic-flute' | 'royal-santoor' | 'temple-veena';
}

const TRACKS: Track[] = [
  { title: 'Mangala Vaathiyam', artist: 'Carnatic Flute & Tambura', synthType: 'carnatic-flute' },
  { title: 'Royal Durbar', artist: 'Santoor & Acoustic Strings', synthType: 'royal-santoor' },
  { title: 'Kalyana Melam', artist: 'Veena & Sacred Bells', synthType: 'temple-veena' },
];

export const MusicAmbiencePlayer: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [minimized, setMinimized] = useState(true);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const intervalRef = useRef<number | null>(null);

  const startSynthesis = () => {
    if (!audioCtxRef.current) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      audioCtxRef.current = new AudioCtx();
    }

    const ctx = audioCtxRef.current;
    if (ctx.state === 'suspended') {
      ctx.resume();
    }

    // Melodic notes in Carnatic/Raga Mohanam (C, D, E, G, A pentatonic scale)
    const baseFreqs = [261.63, 293.66, 329.63, 392.00, 440.00, 523.25];
    
    // Play subtle serene notes at soothing tempo
    const playNote = () => {
      if (!ctx || ctx.state !== 'running') return;
      
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      
      const freq = baseFreqs[Math.floor(Math.random() * baseFreqs.length)];
      osc.type = currentTrackIndex === 0 ? 'sine' : currentTrackIndex === 1 ? 'triangle' : 'sine';
      osc.frequency.setValueAtTime(freq, ctx.currentTime);
      
      // Gentle fade in and lingering natural decay
      gain.gain.setValueAtTime(0.001, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.035, ctx.currentTime + 0.3);
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 2.5);
      
      osc.connect(gain);
      gain.connect(ctx.destination);
      
      osc.start();
      osc.stop(ctx.currentTime + 2.6);
    };

    playNote();
    intervalRef.current = window.setInterval(playNote, 1400);
  };

  const stopSynthesis = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };

  const togglePlay = () => {
    if (isPlaying) {
      stopSynthesis();
      setIsPlaying(false);
    } else {
      startSynthesis();
      setIsPlaying(true);
    }
  };

  useEffect(() => {
    return () => {
      stopSynthesis();
      if (audioCtxRef.current) {
        audioCtxRef.current.close().catch(() => {});
      }
    };
  }, []);

  const activeTrack = TRACKS[currentTrackIndex];

  return (
    <div className="fixed bottom-6 left-6 z-40">
      {minimized ? (
        <button
          onClick={() => setMinimized(false)}
          className={`flex items-center gap-2 px-3.5 py-2.5 rounded-full shadow-luxury border border-champagne/40 backdrop-blur-md transition-all duration-300 ${
            isPlaying ? 'bg-royal-sapphire text-champagne animate-pulse' : 'bg-white/90 text-sapphire-deep hover:bg-white'
          }`}
          title="Atelier Ambience Music"
        >
          {isPlaying ? <Volume2 className="w-4 h-4 animate-spin-slow" /> : <VolumeX className="w-4 h-4 opacity-70" />}
          <span className="text-[10px] tracking-widest uppercase font-semibold">
            {isPlaying ? 'Ambience Playing' : 'Play Music'}
          </span>
        </button>
      ) : (
        <div className="bg-white/95 backdrop-blur-lg border border-champagne/40 rounded-2xl p-4 shadow-luxury w-72 animate-fade-in text-sapphire-deep">
          <div className="flex items-center justify-between pb-3 border-b border-champagne/20">
            <div className="flex items-center gap-2">
              <Disc className={`w-4 h-4 text-champagne ${isPlaying ? 'animate-spin-slow' : ''}`} />
              <span className="text-[10px] tracking-widest2 uppercase font-semibold text-champagne">Atelier Ambience</span>
            </div>
            <button 
              onClick={() => setMinimized(true)}
              className="text-xs text-sapphire/40 hover:text-sapphire"
            >
              ✕
            </button>
          </div>

          <div className="py-3">
            <p className="font-display text-sm font-semibold text-sapphire-deep">{activeTrack.title}</p>
            <p className="text-[11px] text-sapphire/60 italic">{activeTrack.artist}</p>
          </div>

          <div className="flex items-center justify-between pt-2">
            <div className="flex gap-1.5">
              {TRACKS.map((t, idx) => (
                <button
                  key={t.title}
                  onClick={() => {
                    setCurrentTrackIndex(idx);
                    if (isPlaying) {
                      stopSynthesis();
                      setTimeout(startSynthesis, 100);
                    }
                  }}
                  className={`w-2 h-2 rounded-full transition-all ${
                    idx === currentTrackIndex ? 'bg-royal-sapphire scale-125' : 'bg-champagne/40'
                  }`}
                  title={t.title}
                />
              ))}
            </div>

            <button
              onClick={togglePlay}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-royal-sapphire text-champagne text-xs font-semibold uppercase tracking-wider hover:bg-sapphire-deep transition"
            >
              {isPlaying ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
              <span>{isPlaying ? 'Mute' : 'Listen'}</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
