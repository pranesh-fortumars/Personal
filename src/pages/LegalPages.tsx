import { SectionHeading } from '@/components/SectionHeading';

export function PrivacyPage() {
  return (
    <div className="min-h-screen bg-porcelain pt-20">
      <div className="px-6 py-16 bg-ivory/40">
        <div className="max-w-3xl mx-auto">
          <SectionHeading eyebrow="Legal" title="Privacy Policy" subtitle="How we handle your information." />
        </div>
      </div>
      <div className="max-w-3xl mx-auto px-6 py-12 space-y-6 text-sm text-sapphire/70 leading-relaxed">
        <Section title="Information We Collect">
          <p>When you place an order or contact us, we collect the details you provide: your name, mobile number, WhatsApp number, email (if provided), delivery address, and event details. We also store your cart and personalisation drafts in your browser's local storage to preserve your work between visits.</p>
        </Section>
        <Section title="How We Use Your Information">
          <p>We use your information solely to process your invitation order, contact you for order confirmation, and arrange delivery. We do not sell or share your personal information with third parties for marketing purposes.</p>
        </Section>
        <Section title="Data Storage">
          <p>Order details are submitted via WhatsApp to our team for processing. Cart and draft data are stored locally in your browser and are not transmitted to our servers unless you submit an order.</p>
        </Section>
        <Section title="Your Rights">
          <p>You may request access to, correction of, or deletion of your personal information by contacting us via WhatsApp or phone. You can clear locally stored cart and draft data at any time through your browser settings.</p>
        </Section>
        <Section title="No Payment Data">
          <p>We do not process payments online and do not collect or store payment card information. Payment is arranged directly with our team after order confirmation.</p>
        </Section>
        <Section title="Contact">
          <p>For privacy enquiries, contact us at the phone number listed on our Contact page.</p>
        </Section>
        <p className="text-xs text-sapphire/40 pt-4 border-t border-champagne/20">This policy may be updated from time to time. Last updated: {new Date().getFullYear()}.</p>
      </div>
    </div>
  );
}

export function TermsPage() {
  return (
    <div className="min-h-screen bg-porcelain pt-20">
      <div className="px-6 py-16 bg-ivory/40">
        <div className="max-w-3xl mx-auto">
          <SectionHeading eyebrow="Legal" title="Terms & Conditions" subtitle="The terms of using AURELIA." />
        </div>
      </div>
      <div className="max-w-3xl mx-auto px-6 py-12 space-y-6 text-sm text-sapphire/70 leading-relaxed">
        <Section title="Invitation Designs">
          <p>All invitation designs in the AURELIA collection are original artworks created by our studio. You may personalise designs with your event details for your personal celebration. You may not reproduce, resell, or distribute the designs for commercial purposes.</p>
        </Section>
        <Section title="Pricing">
          <p>All prices are listed in Indian Rupees (INR) and are per invitation. The total is calculated as unit price multiplied by quantity. Delivery is complimentary on all orders — no delivery fee is charged. No hidden fees apply.</p>
        </Section>
        <Section title="Orders">
          <p>Orders are submitted via WhatsApp and are subject to confirmation by our team. An order submission does not constitute a confirmed purchase. Our team will contact you to confirm details, quantity, and payment arrangements.</p>
        </Section>
        <Section title="Launch Offer">
          <p>The 50% launch offer for the first 10 customers is a promotional discount. Eligibility is subject to order confirmation. The offer is configurable and may be modified or withdrawn at any time.</p>
        </Section>
        <Section title="Delivery">
          <p>Delivery is complimentary to the address you provide. We do not make specific delivery time guarantees. Delivery arrangements are confirmed during order confirmation.</p>
        </Section>
        <Section title="Payment">
          <p>Payment is arranged directly with our team after order confirmation. We do not integrate online payment gateways. We do not claim any order is paid until payment is confirmed by our team.</p>
        </Section>
        <Section title="Liability">
          <p>While we strive for accuracy in design previews, final printed invitations may vary slightly in colour and finish due to printing processes. We are not liable for typographical errors in user-supplied personalisation text.</p>
        </Section>
        <p className="text-xs text-sapphire/40 pt-4 border-t border-champagne/20">These terms may be updated from time to time. Last updated: {new Date().getFullYear()}.</p>
      </div>
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h2 className="font-display text-lg text-sapphire-deep mb-2">{title}</h2>
      <div className="font-display">{children}</div>
    </div>
  );
}
