import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { CartProvider } from '@/context/CartContext';
import { FloatingNav } from '@/components/FloatingNav';
import { Footer } from '@/components/Footer';
import { ScrollToTop } from '@/components/ScrollToTop';
import { HomePage } from '@/pages/HomePage';
import { ExplorePage } from '@/pages/ExplorePage';
import { CollectionPage } from '@/pages/CollectionPage';
import { InvitationDetailPage } from '@/pages/InvitationDetailPage';
import { CartPage } from '@/pages/CartPage';
import { CheckoutPage } from '@/pages/CheckoutPage';
import { CustomStudioPage } from '@/pages/CustomStudioPage';
import { AboutPage } from '@/pages/AboutPage';
import { HowItWorksPage } from '@/pages/HowItWorksPage';
import { ContactPage } from '@/pages/ContactPage';
import { PrivacyPage, TermsPage } from '@/pages/LegalPages';
import { AdminPage } from '@/pages/AdminPage';

export default function App() {
  return (
    <BrowserRouter>
      <CartProvider>
        <ScrollToTop />
        <FloatingNav />
        <main>
          <Routes>
            {/* Core Home & Catalog */}
            <Route path="/" element={<HomePage />} />
            <Route path="/explore" element={<ExplorePage />} />
            <Route path="/collections/:categoryId" element={<CollectionPage />} />

            {/* Explicit 24 Required Routes & Direct Collection Aliases */}
            <Route path="/wedding" element={<Navigate to="/collections/wedding" replace />} />
            <Route path="/engagement" element={<Navigate to="/collections/engagement" replace />} />
            <Route path="/reception" element={<Navigate to="/collections/reception" replace />} />
            <Route path="/tamil-heritage" element={<Navigate to="/collections/tamil-wedding" replace />} />
            <Route path="/mehendi" element={<Navigate to="/collections/mehendi" replace />} />
            <Route path="/haldi" element={<Navigate to="/collections/haldi" replace />} />
            <Route path="/birthday" element={<Navigate to="/collections/kids-birthday" replace />} />
            <Route path="/kids-birthday" element={<Navigate to="/collections/kids-birthday" replace />} />
            <Route path="/adult-birthday" element={<Navigate to="/collections/adult-birthday" replace />} />
            <Route path="/baby-shower" element={<Navigate to="/collections/baby-shower" replace />} />
            <Route path="/seemantham" element={<Navigate to="/collections/seemantham" replace />} />
            <Route path="/housewarming" element={<Navigate to="/collections/housewarming" replace />} />
            <Route path="/anniversary" element={<Navigate to="/collections/anniversary" replace />} />
            <Route path="/naming-ceremony" element={<Navigate to="/collections/naming" replace />} />
            <Route path="/manjal-neerattu" element={<Navigate to="/collections/manjal-neerattu" replace />} />
            <Route path="/special-celebrations" element={<Navigate to="/collections/special" replace />} />

            {/* Invitation Details & 3D Viewer */}
            <Route path="/invitation/:slug" element={<InvitationDetailPage />} />

            {/* Commerce & Ordering */}
            <Route path="/cart" element={<CartPage />} />
            <Route path="/checkout" element={<CheckoutPage />} />

            {/* Editorial, Atelier & Support */}
            <Route path="/custom-studio" element={<CustomStudioPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/how-it-works" element={<HowItWorksPage />} />
            <Route path="/contact" element={<ContactPage />} />

            {/* Legal */}
            <Route path="/privacy" element={<PrivacyPage />} />
            <Route path="/terms" element={<TermsPage />} />

            {/* Protected Admin Suite */}
            <Route path="/admin" element={<AdminPage />} />

            {/* Fallback */}
            <Route path="*" element={<HomePage />} />
          </Routes>
        </main>
        <Footer />
      </CartProvider>
    </BrowserRouter>
  );
}
