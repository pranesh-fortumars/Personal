import { useState } from 'react';
import { Sparkles, MessageCircle, Check } from 'lucide-react';
import { SectionHeading } from '@/components/SectionHeading';
import { BUSINESS } from '@/data/templates';
import { doc, setDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '@/lib/firebase';

export function CustomStudioPage() {
  const [form, setForm] = useState({
    name: '', event: '', date: '', colors: '', mood: '', details: '', contact: '',
  });
  const [sent, setSent] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const requestId = `BESPOKE-${Date.now().toString(36).toUpperCase()}`;

    // Sync custom inquiry to Firebase Firestore
    try {
      await setDoc(doc(db, 'custom_inquiries', requestId), {
        id: requestId,
        ...form,
        createdAt: serverTimestamp(),
      });
    } catch (err) {
      console.warn('Firebase bespoke inquiry notice:', err);
    }

    const msg = [
      '*AURELIA — Custom Design Request*',
      '',
      `*Reference:* ${requestId}`,
      `*Name:* ${form.name}`,
      `*Event:* ${form.event}`,
      `*Date:* ${form.date}`,
      `*Colour Preferences:* ${form.colors}`,
      `*Mood / Style:* ${form.mood}`,
      `*Details:* ${form.details}`,
      `*Contact:* ${form.contact}`,
    ].join('\n');
    window.open(`https://wa.me/${BUSINESS.whatsapp}?text=${encodeURIComponent(msg)}`, '_blank');
    setSent(true);
  };

  return (
    <div className="min-h-screen bg-porcelain pt-20">
      <div className="px-6 py-16 md:py-24 bg-gradient-to-b from-ivory/60 to-porcelain">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-champagne/10 mb-6">
            <Sparkles className="w-4 h-4 text-champagne" />
            <span className="text-[10px] tracking-widest2 uppercase text-champagne">Bespoke Atelier</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-display text-sapphire-deep leading-tight">The Custom Design Studio</h1>
          <div className="h-px w-16 mx-auto my-5 gold-line" />
          <p className="text-base md:text-lg font-display italic text-sapphire/60 max-w-2xl mx-auto">
            Have a vision that doesn't exist yet? Our atelier creates bespoke invitation worlds —
            designed exclusively for your celebration, in your colours, your language, your story.
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {[
            { title: 'Share Your Vision', text: 'Tell us about your celebration, colours, mood, and any inspiration.' },
            { title: 'We Design Together', text: 'Our team crafts original concepts based on your preferences.' },
            { title: 'Your World, Complete', text: 'Receive a bespoke multi-page invitation with full personalisation.' },
          ].map((s, i) => (
            <div key={s.title} className="text-center p-5 rounded-xl bg-ivory/60 border border-champagne/20">
              <div className="w-10 h-10 rounded-full bg-champagne/10 flex items-center justify-center mx-auto mb-3">
                <span className="font-serif text-champagne text-lg">{i + 1}</span>
              </div>
              <h3 className="font-display text-lg text-sapphire-deep">{s.title}</h3>
              <p className="text-sm text-sapphire/50 mt-1 font-display italic">{s.text}</p>
            </div>
          ))}
        </div>

        {sent ? (
          <div className="text-center py-16">
            <div className="w-16 h-16 rounded-full bg-emerald/10 flex items-center justify-center mx-auto mb-4">
              <Check className="w-8 h-8 text-emerald" />
            </div>
            <h2 className="text-2xl font-display text-sapphire-deep">Request Sent</h2>
            <p className="mt-2 font-display italic text-sapphire/50">Your custom design request has been opened in WhatsApp. We'll be in touch soon.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="bg-ivory/60 border border-champagne/20 rounded-xl p-6 space-y-4">
            <p className="text-[10px] tracking-widest3 uppercase text-champagne mb-2">Tell Us About Your Vision</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Your name" className={inputCls} />
              <input required value={form.event} onChange={(e) => setForm({ ...form, event: e.target.value })} placeholder="Event type (e.g. Wedding, Birthday)" className={inputCls} />
              <input value={form.date} onChange={(e) => setForm({ ...form, date: e.target.value })} placeholder="Event date" className={inputCls} />
              <input value={form.contact} onChange={(e) => setForm({ ...form, contact: e.target.value })} placeholder="Phone / WhatsApp" className={inputCls} />
              <input value={form.colors} onChange={(e) => setForm({ ...form, colors: e.target.value })} placeholder="Colour preferences" className={inputCls} />
              <input value={form.mood} onChange={(e) => setForm({ ...form, mood: e.target.value })} placeholder="Mood / style (e.g. royal, minimal, vibrant)" className={inputCls} />
            </div>
            <textarea value={form.details} onChange={(e) => setForm({ ...form, details: e.target.value })} placeholder="Describe your vision in detail — themes, motifs, cultural elements, any inspiration..." rows={4} className={inputCls} />
            <button type="submit" className="w-full flex items-center justify-center gap-2 py-4 rounded-full bg-champagne text-sapphire-deep text-xs tracking-widest2 uppercase font-semibold hover:bg-ivory transition">
              <MessageCircle className="w-5 h-5" /> Send Request via WhatsApp
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

const inputCls = 'w-full px-3 py-2.5 rounded-lg bg-porcelain border border-champagne/20 text-sm text-sapphire placeholder:text-sapphire/30 focus:outline-none focus:border-champagne transition';
