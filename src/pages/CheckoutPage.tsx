import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Truck, Check, MessageCircle, ArrowLeft, Phone } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { BUSINESS } from '@/data/templates';
import { LaunchOfferBanner } from '@/components/LaunchOfferBanner';
import { createFirebaseOrder } from '@/lib/firebaseService';

interface CheckoutForm {
  fullName: string;
  mobile: string;
  whatsapp: string;
  email: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
  functionType: string;
  eventDate: string;
  language: string;
  instructions: string;
}

const EMPTY: CheckoutForm = {
  fullName: '', mobile: '', whatsapp: '', email: '', address: '',
  city: '', state: '', pincode: '', functionType: '', eventDate: '',
  language: '', instructions: '',
};

export function CheckoutPage() {
  const { items, total, count, clearCart } = useCart();
  const [form, setForm] = useState<CheckoutForm>(EMPTY);
  const [errors, setErrors] = useState<Partial<Record<keyof CheckoutForm, string>>>({});
  const [submitted, setSubmitted] = useState(false);

  if (items.length === 0 && !submitted) {
    return (
      <div className="min-h-screen bg-porcelain pt-20 flex items-center justify-center px-6">
        <div className="text-center">
          <p className="font-display italic text-sapphire/50 text-xl">Your cart is empty.</p>
          <Link to="/explore" className="mt-4 inline-block text-xs tracking-widest2 uppercase text-champagne">
            Explore Invitations →
          </Link>
        </div>
      </div>
    );
  }

  const update = (key: keyof CheckoutForm, value: string) => {
    setForm((f) => ({ ...f, [key]: value }));
    if (errors[key]) setErrors((e) => ({ ...e, [key]: undefined }));
  };

  const validate = (): boolean => {
    const e: Partial<Record<keyof CheckoutForm, string>> = {};
    if (!form.fullName.trim()) e.fullName = 'Required';
    if (!form.mobile.trim() || form.mobile.replace(/\D/g, '').length < 10) e.mobile = 'Enter a valid mobile number';
    if (!form.whatsapp.trim()) e.whatsapp = 'Required';
    if (!form.address.trim()) e.address = 'Required';
    if (!form.city.trim()) e.city = 'Required';
    if (!form.state.trim()) e.state = 'Required';
    if (!form.pincode.trim() || form.pincode.replace(/\D/g, '').length !== 6) e.pincode = 'Enter a 6-digit pincode';
    if (!form.functionType.trim()) e.functionType = 'Required';
    if (!form.eventDate.trim()) e.eventDate = 'Required';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const buildWhatsAppMessage = (): string => {
    const lines: string[] = [];
    lines.push('*AURELIA — Invitation Order*');
    lines.push('');
    lines.push(`*Customer:* ${form.fullName}`);
    lines.push(`*Mobile:* ${form.mobile}`);
    lines.push(`*WhatsApp:* ${form.whatsapp}`);
    if (form.email) lines.push(`*Email:* ${form.email}`);
    lines.push('');
    lines.push('*Delivery Address:*');
    lines.push(form.address);
    lines.push(`${form.city}, ${form.state} — ${form.pincode}`);
    lines.push('');
    lines.push(`*Function Type:* ${form.functionType}`);
    lines.push(`*Event Date:* ${form.eventDate}`);
    if (form.language) lines.push(`*Preferred Language:* ${form.language}`);
    if (form.instructions) lines.push(`*Instructions:* ${form.instructions}`);
    lines.push('');
    lines.push('*Order Details:*');
    items.forEach((item, i) => {
      lines.push('');
      lines.push(`${i + 1}. *${item.templateName}* (Template #${item.templateId})`);
      lines.push(`   Colour: ${item.colorwayName}`);
      lines.push(`   Language: ${item.language === 'en' ? 'English' : item.language === 'ta' ? 'Tamil' : 'Bilingual'}`);
      lines.push(`   Pages: ${item.pages}`);
      lines.push(`   Quantity: ${item.quantity}`);
      lines.push(`   Unit Price: ₹${item.unitPrice}`);
      lines.push(`   Subtotal: ₹${(item.unitPrice * item.quantity).toLocaleString('en-IN')}`);
      const p = item.personalisation;
      const pParts = [p.host, p.couple, p.eventTitle, p.date, p.venue].filter(Boolean);
      if (pParts.length) lines.push(`   Personalisation: ${pParts.join(' · ')}`);
      if (p.message) lines.push(`   Message: ${p.message}`);
    });
    lines.push('');
    lines.push(`*Total Quantity:* ${count}`);
    lines.push(`*Order Total:* ₹${total.toLocaleString('en-IN')}`);
    lines.push(`*Delivery Charge:* FREE`);
    lines.push(`*Final Amount:* ₹${total.toLocaleString('en-IN')}`);
    lines.push('');
    lines.push('_Complimentary delivery confirmed. Our team will contact you to confirm the order and payment details._');
    return lines.join('\n');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) {
      const firstError = document.querySelector('[data-error="true"]');
      firstError?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      return;
    }

    const orderId = `AUR-${Date.now().toString(36).toUpperCase()}`;

    // Save to Firebase Firestore backend
    try {
      await createFirebaseOrder({
        id: orderId,
        customerName: form.fullName,
        mobile: form.mobile,
        whatsapp: form.whatsapp,
        email: form.email,
        address: form.address,
        city: form.city,
        state: form.state,
        pincode: form.pincode,
        functionType: form.functionType,
        eventDate: form.eventDate,
        language: form.language,
        instructions: form.instructions,
        items: items.map((it) => ({
          templateId: it.templateId,
          templateName: it.templateName,
          colorway: it.colorwayName,
          language: it.language,
          quantity: it.quantity,
          unitPrice: it.unitPrice,
          personalisation: it.personalisation,
        })),
        totalAmount: total,
        deliveryCharge: 0,
        status: 'Pending Contact',
      });
    } catch (err) {
      console.warn('Firebase order sync notice:', err);
    }

    const message = buildWhatsAppMessage();
    const url = `https://wa.me/${BUSINESS.whatsapp}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
    setSubmitted(true);
    clearCart();
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-porcelain pt-20 flex items-center justify-center px-6">
        <div className="text-center max-w-lg py-12">
          <div className="w-20 h-20 rounded-full bg-emerald/10 flex items-center justify-center mx-auto mb-6">
            <Check className="w-10 h-10 text-emerald" />
          </div>
          <h1 className="text-3xl md:text-4xl font-display text-sapphire-deep">Your Order Details Are Ready</h1>
          <div className="h-px w-16 mx-auto my-5 gold-line" />
          <p className="font-display italic text-sapphire/60 text-base">
            Your order has been prepared and opened in WhatsApp. Our team will contact you to confirm your order and payment details.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
            <Link to="/explore" className="px-7 py-3.5 rounded-full bg-champagne text-sapphire-deep text-xs tracking-widest2 uppercase font-semibold hover:bg-ivory transition">
              Continue Exploring
            </Link>
            <a href={`https://wa.me/${BUSINESS.whatsapp}`} target="_blank" rel="noopener noreferrer" className="px-7 py-3.5 rounded-full border border-emerald/30 text-emerald text-xs tracking-widest2 uppercase hover:bg-emerald/5 transition inline-flex items-center justify-center gap-2">
              <MessageCircle className="w-4 h-4" /> Open WhatsApp
            </a>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-porcelain pt-20">
      <div className="max-w-5xl mx-auto px-6 py-10">
        <Link to="/cart" className="inline-flex items-center gap-1.5 text-xs tracking-widest2 uppercase text-sapphire/50 hover:text-champagne transition mb-6">
          <ArrowLeft className="w-3.5 h-3.5" /> Back to Cart
        </Link>

        <div className="text-center mb-10">
          <p className="text-[10px] tracking-widest3 uppercase text-champagne mb-2">Almost There</p>
          <h1 className="text-3xl md:text-5xl font-display text-sapphire-deep">Checkout</h1>
          <p className="text-sm text-sapphire/50 mt-2">Submit your order via WhatsApp — no payment online.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-8">
          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <FormSection title="Contact Details">
              <FormField label="Full Name" required error={errors.fullName} data-error={!!errors.fullName}>
                <input value={form.fullName} onChange={(e) => update('fullName', e.target.value)} className={inputCls} placeholder="Your full name" />
              </FormField>
              <FormField label="Mobile Number" required error={errors.mobile} data-error={!!errors.mobile}>
                <input type="tel" value={form.mobile} onChange={(e) => update('mobile', e.target.value)} className={inputCls} placeholder="10-digit mobile number" />
              </FormField>
              <FormField label="WhatsApp Number" required error={errors.whatsapp}>
                <input type="tel" value={form.whatsapp} onChange={(e) => update('whatsapp', e.target.value)} className={inputCls} placeholder="WhatsApp number" />
              </FormField>
              <FormField label="Email (optional)">
                <input type="email" value={form.email} onChange={(e) => update('email', e.target.value)} className={inputCls} placeholder="your@email.com" />
              </FormField>
            </FormSection>

            <FormSection title="Delivery Address">
              <div className="col-span-full">
                <FormField label="Full Address" required error={errors.address}>
                  <textarea value={form.address} onChange={(e) => update('address', e.target.value)} className={inputCls} rows={2} placeholder="House no, street, area" />
                </FormField>
              </div>
              <FormField label="City" required error={errors.city}>
                <input value={form.city} onChange={(e) => update('city', e.target.value)} className={inputCls} placeholder="City" />
              </FormField>
              <FormField label="State" required error={errors.state}>
                <input value={form.state} onChange={(e) => update('state', e.target.value)} className={inputCls} placeholder="State" />
              </FormField>
              <FormField label="Pincode" required error={errors.pincode}>
                <input value={form.pincode} onChange={(e) => update('pincode', e.target.value)} className={inputCls} placeholder="6-digit pincode" maxLength={6} />
              </FormField>
            </FormSection>

            <FormSection title="Event Details">
              <FormField label="Function Type" required error={errors.functionType}>
                <input value={form.functionType} onChange={(e) => update('functionType', e.target.value)} className={inputCls} placeholder="e.g. Wedding, Birthday, Baby Shower" />
              </FormField>
              <FormField label="Event Date" required error={errors.eventDate}>
                <input value={form.eventDate} onChange={(e) => update('eventDate', e.target.value)} className={inputCls} placeholder="e.g. 14 February 2026" />
              </FormField>
              <FormField label="Preferred Language">
                <select value={form.language} onChange={(e) => update('language', e.target.value)} className={inputCls}>
                  <option value="">Select...</option>
                  <option value="English">English</option>
                  <option value="Tamil">தமிழ் (Tamil)</option>
                  <option value="Bilingual">Bilingual</option>
                </select>
              </FormField>
              <div className="col-span-full">
                <FormField label="Additional Instructions (optional)">
                  <textarea value={form.instructions} onChange={(e) => update('instructions', e.target.value)} className={inputCls} rows={2} placeholder="Any special requests" />
                </FormField>
              </div>
            </FormSection>

            <button
              type="submit"
              className="w-full flex items-center justify-center gap-2 py-4 rounded-full bg-emerald text-ivory text-xs tracking-widest2 uppercase font-semibold hover:bg-emerald/90 transition"
            >
              <MessageCircle className="w-5 h-5" /> Submit Order via WhatsApp
            </button>
          </form>

          {/* Summary */}
          <div className="space-y-4">
            <div className="bg-sapphire-deep rounded-xl p-5 text-ivory sticky top-20">
              <h2 className="text-[10px] tracking-widest3 uppercase text-champagne mb-4">Order Summary</h2>
              <div className="space-y-3 max-h-64 overflow-y-auto no-scrollbar">
                {items.map((item) => (
                  <div key={item.id} className="text-sm border-b border-ivory/10 pb-2">
                    <p className="font-display text-ivory">{item.templateName}</p>
                    <p className="text-xs text-ivory/50">{item.colorwayName} · {item.language === 'en' ? 'English' : item.language === 'ta' ? 'Tamil' : 'Bilingual'}</p>
                    <div className="flex justify-between mt-1">
                      <span className="text-ivory/50 text-xs">{item.quantity} × ₹{item.unitPrice}</span>
                      <span className="text-ivory">₹{(item.unitPrice * item.quantity).toLocaleString('en-IN')}</span>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-4 pt-4 border-t border-ivory/10 space-y-2 text-sm">
                <div className="flex justify-between"><span className="text-ivory/60">Subtotal</span><span>₹{total.toLocaleString('en-IN')}</span></div>
                <div className="flex justify-between">
                  <span className="text-ivory/60 flex items-center gap-1.5"><Truck className="w-4 h-4 text-emerald" /> Delivery</span>
                  <span className="text-emerald font-semibold">FREE</span>
                </div>
                <div className="flex justify-between text-lg pt-2 border-t border-ivory/10">
                  <span className="font-display">Final</span>
                  <span className="font-display font-semibold text-champagne">₹{total.toLocaleString('en-IN')}</span>
                </div>
              </div>
            </div>

            <div className="bg-ivory/60 rounded-xl p-4 border border-champagne/20 text-center">
              <p className="text-xs text-sapphire/60 font-display italic">
                Your order details are ready. Our team will contact you to confirm your order and payment details.
              </p>
              <a href={`tel:${BUSINESS.phone}`} className="inline-flex items-center gap-1.5 mt-3 text-xs tracking-widest2 uppercase text-champagne">
                <Phone className="w-3.5 h-3.5" /> {BUSINESS.whatsappDisplay}
              </a>
            </div>
          </div>
        </div>

        <div className="mt-12">
          <LaunchOfferBanner />
        </div>
      </div>
    </div>
  );
}

const inputCls = 'w-full px-3 py-2.5 rounded-lg bg-porcelain border border-champagne/20 text-sm text-sapphire placeholder:text-sapphire/30 focus:outline-none focus:border-champagne transition';

function FormSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="bg-ivory/60 border border-champagne/20 rounded-xl p-5">
      <p className="text-[10px] tracking-widest3 uppercase text-champagne mb-4">{title}</p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">{children}</div>
    </div>
  );
}

function FormField({ label, required, error, children, ...rest }: { label: string; required?: boolean; error?: string; children: React.ReactNode; 'data-error'?: boolean }) {
  return (
    <div {...rest}>
      <label className="text-[10px] tracking-widest2 uppercase text-sapphire/40 block mb-1.5">
        {label} {required && <span className="text-champagne">*</span>}
      </label>
      {children}
      {error && <p className="text-[10px] text-red-500 mt-1">{error}</p>}
    </div>
  );
}
