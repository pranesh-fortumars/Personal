import React, { useState, useEffect } from 'react';
import { 
  ShieldCheck, 
  Package, 
  ShoppingBag, 
  Tag, 
  Settings, 
  Eye, 
  CheckCircle, 
  Clock, 
  IndianRupee, 
  Palette, 
  LogOut, 
  Search,
  Filter,
  ExternalLink,
  ChevronRight,
  Sparkles
} from 'lucide-react';
import { TEMPLATES } from '@/data/templates';
import { CATEGORIES } from '@/data/colorways';
import type { Template } from '@/types';
import { Link } from 'react-router-dom';
import { fetchFirebaseOrders, updateFirebaseOrderStatus } from '@/lib/firebaseService';

interface MockOrder {
  id: string;
  customerName: string;
  mobile: string;
  templateName: string;
  templateId: number;
  quantity: number;
  total: number;
  status: 'Pending Contact' | 'Proof Approved' | 'In Production' | 'Dispatched' | 'Delivered';
  createdAt: string;
  language: string;
}

export function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    return localStorage.getItem('aurelia_admin_auth') === 'true';
  });
  const [password, setPassword] = useState('');
  const [authError, setAuthError] = useState('');
  
  const [activeTab, setActiveTab] = useState<'catalogue' | 'orders' | 'promotions'>('catalogue');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  
  // Dynamic template prices and availability overrides
  const [priceOverrides, setPriceOverrides] = useState<Record<number, number>>(() => {
    const saved = localStorage.getItem('aurelia_price_overrides');
    return saved ? JSON.parse(saved) : {};
  });

  const [activeStatusOverrides, setActiveStatusOverrides] = useState<Record<number, boolean>>(() => {
    const saved = localStorage.getItem('aurelia_active_overrides');
    return saved ? JSON.parse(saved) : {};
  });

  // Launch offer config
  const [offerDiscount, setOfferDiscount] = useState<number>(50);
  const [offerLimit, setOfferLimit] = useState<number>(10);
  const [offerActive, setOfferActive] = useState<boolean>(true);

  // Orders stored or mock initial state
  const [orders, setOrders] = useState<MockOrder[]>(() => {
    const saved = localStorage.getItem('aurelia_orders');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { /* ignore */ }
    }
    return [
      {
        id: 'AUR-2026-001',
        customerName: 'Ananya Sridhar',
        mobile: '+91 98401 23456',
        templateName: 'Royal Emerald',
        templateId: 1,
        quantity: 250,
        total: 30000,
        status: 'Proof Approved',
        createdAt: '11 Nov 2026, 14:30',
        language: 'Bilingual (EN + TA)'
      },
      {
        id: 'AUR-2026-002',
        customerName: 'Karthik Narayanan',
        mobile: '+91 80728 54541',
        templateName: 'The Eternal Promise',
        templateId: 2,
        quantity: 150,
        total: 15000,
        status: 'Pending Contact',
        createdAt: '11 Nov 2026, 16:45',
        language: 'Tamil (தமிழ்)'
      }
    ];
  });

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === 'aurelia2026' || password === 'admin') {
      setIsAuthenticated(true);
      localStorage.setItem('aurelia_admin_auth', 'true');
      setAuthError('');
    } else {
      setAuthError('Invalid administrator credentials.');
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('aurelia_admin_auth');
  };

  const handlePriceChange = (id: number, newPrice: number) => {
    const updated = { ...priceOverrides, [id]: newPrice };
    setPriceOverrides(updated);
    localStorage.setItem('aurelia_price_overrides', JSON.stringify(updated));
  };

  const handleToggleStatus = (id: number) => {
    const current = activeStatusOverrides[id] !== false;
    const updated = { ...activeStatusOverrides, [id]: !current };
    setActiveStatusOverrides(updated);
    localStorage.setItem('aurelia_active_overrides', JSON.stringify(updated));
  };

  // Load orders from Firebase on mount / auth
  useEffect(() => {
    if (isAuthenticated) {
      fetchFirebaseOrders().then((fbOrders) => {
        if (fbOrders && fbOrders.length > 0) {
          const mapped: MockOrder[] = fbOrders.map((o) => ({
            id: o.id,
            customerName: o.customerName,
            mobile: o.mobile,
            templateName: o.items?.[0]?.templateName || 'Bespoke Order',
            templateId: o.items?.[0]?.templateId || 1,
            quantity: o.items?.[0]?.quantity || 100,
            total: o.totalAmount,
            status: o.status || 'Pending Contact',
            createdAt: o.eventDate || 'Recent',
            language: o.language || 'English',
          }));
          setOrders(mapped);
        }
      });
    }
  }, [isAuthenticated]);

  const updateOrderStatus = (orderId: string, newStatus: MockOrder['status']) => {
    const updated = orders.map((o) => (o.id === orderId ? { ...o, status: newStatus } : o));
    setOrders(updated);
    localStorage.setItem('aurelia_orders', JSON.stringify(updated));
    updateFirebaseOrderStatus(orderId, newStatus).catch(() => {});
  };

  const filteredTemplates = TEMPLATES.filter(t => {
    const matchesSearch = t.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          t.tamilName.includes(searchQuery) ||
                          t.id.toString() === searchQuery;
    const matchesCat = selectedCategory === 'all' || t.category === selectedCategory;
    return matchesSearch && matchesCat;
  });

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-porcelain flex items-center justify-center px-6 pt-20">
        <div className="max-w-md w-full bg-white p-8 md:p-10 rounded-2xl shadow-luxury border border-champagne/30 text-center">
          <div className="w-14 h-14 bg-royal-sapphire/5 rounded-full flex items-center justify-center mx-auto mb-6 border border-champagne/40">
            <ShieldCheck className="w-7 h-7 text-champagne" />
          </div>
          <h2 className="heading-display text-2xl text-sapphire-deep mb-2">Aurelia Atelier Suite</h2>
          <p className="text-xs uppercase tracking-widest text-sapphire/50 mb-6">Restricted Administrator Portal</p>
          
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <input
                type="password"
                placeholder="Enter Administrator Key"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 text-sm bg-porcelain border border-champagne/40 rounded-lg focus:outline-none focus:border-royal-sapphire transition"
              />
            </div>
            {authError && <p className="text-xs text-red-600 font-medium">{authError}</p>}
            <button
              type="submit"
              className="w-full py-3 bg-royal-sapphire hover:bg-sapphire-deep text-champagne text-xs font-semibold uppercase tracking-widest rounded-lg shadow-sm transition"
            >
              Authenticate Session
            </button>
          </form>
          <div className="mt-6 pt-6 border-t border-champagne/20">
            <p className="text-[11px] text-sapphire/40">Demo administrator passcode: <span className="font-mono text-royal-sapphire">aurelia2026</span></p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-porcelain pt-24 pb-20 px-4 md:px-8 max-w-7xl mx-auto">
      {/* Top Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between pb-6 border-b border-champagne/30 gap-4 mb-8">
        <div>
          <div className="flex items-center gap-3">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-[10px] tracking-widest uppercase text-champagne font-semibold">Atelier Management System</span>
          </div>
          <h1 className="text-3xl font-display text-sapphire-deep mt-1">Aurelia Command Suite</h1>
        </div>
        <div className="flex items-center gap-3">
          <Link
            to="/explore"
            className="flex items-center gap-1.5 px-4 py-2 border border-champagne/50 rounded-lg text-xs tracking-wider uppercase text-royal-sapphire hover:bg-champagne/10 transition"
          >
            <Eye className="w-4 h-4" /> View Storefront
          </Link>
          <button
            onClick={handleLogout}
            className="flex items-center gap-1.5 px-4 py-2 bg-royal-sapphire text-champagne rounded-lg text-xs tracking-wider uppercase hover:bg-sapphire-deep transition"
          >
            <LogOut className="w-4 h-4" /> Sign Out
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-champagne/20 mb-8 space-x-6">
        <button
          onClick={() => setActiveTab('catalogue')}
          className={`pb-3 text-xs tracking-widest uppercase font-semibold transition border-b-2 ${
            activeTab === 'catalogue' 
              ? 'border-royal-sapphire text-royal-sapphire' 
              : 'border-transparent text-sapphire/50 hover:text-royal-sapphire'
          }`}
        >
          <span className="flex items-center gap-2">
            <Package className="w-4 h-4" /> Catalogue & Pricing (60 Templates)
          </span>
        </button>
        <button
          onClick={() => setActiveTab('orders')}
          className={`pb-3 text-xs tracking-widest uppercase font-semibold transition border-b-2 ${
            activeTab === 'orders' 
              ? 'border-royal-sapphire text-royal-sapphire' 
              : 'border-transparent text-sapphire/50 hover:text-royal-sapphire'
          }`}
        >
          <span className="flex items-center gap-2">
            <ShoppingBag className="w-4 h-4" /> Client Orders ({orders.length})
          </span>
        </button>
        <button
          onClick={() => setActiveTab('promotions')}
          className={`pb-3 text-xs tracking-widest uppercase font-semibold transition border-b-2 ${
            activeTab === 'promotions' 
              ? 'border-royal-sapphire text-royal-sapphire' 
              : 'border-transparent text-sapphire/50 hover:text-royal-sapphire'
          }`}
        >
          <span className="flex items-center gap-2">
            <Tag className="w-4 h-4" /> Launch Promotion & Offers
          </span>
        </button>
      </div>

      {/* TAB CONTENT: CATALOGUE */}
      {activeTab === 'catalogue' && (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4 bg-white p-4 rounded-xl border border-champagne/30 shadow-sm">
            <div className="relative w-full sm:w-80">
              <Search className="absolute left-3 top-2.5 w-4 h-4 text-sapphire/40" />
              <input
                type="text"
                placeholder="Search templates or #ID..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-3 py-2 text-xs bg-porcelain border border-champagne/30 rounded-lg focus:outline-none focus:border-royal-sapphire"
              />
            </div>
            <div className="flex items-center gap-2 w-full sm:w-auto">
              <Filter className="w-4 h-4 text-sapphire/50" />
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="text-xs bg-porcelain border border-champagne/30 rounded-lg px-3 py-2 focus:outline-none focus:border-royal-sapphire"
              >
                <option value="all">All Categories (15)</option>
                {CATEGORIES.map(c => (
                  <option key={c.id} value={c.id}>{c.name}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="bg-white rounded-xl border border-champagne/30 shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-porcelain border-b border-champagne/30 text-sapphire/60 uppercase tracking-wider font-semibold">
                  <tr>
                    <th className="py-3 px-4"># ID</th>
                    <th className="py-3 px-4">Invitation Design</th>
                    <th className="py-3 px-4">Category</th>
                    <th className="py-3 px-4">Pages</th>
                    <th className="py-3 px-4">Unit Price (₹)</th>
                    <th className="py-3 px-4">Status</th>
                    <th className="py-3 px-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-champagne/15">
                  {filteredTemplates.map(t => {
                    const price = priceOverrides[t.id] ?? t.price;
                    const isActive = activeStatusOverrides[t.id] !== false;
                    return (
                      <tr key={t.id} className="hover:bg-porcelain/60 transition">
                        <td className="py-3 px-4 font-mono text-sapphire/60">#{t.id.toString().padStart(2, '0')}</td>
                        <td className="py-3 px-4">
                          <div className="font-display font-medium text-sapphire-deep text-sm">{t.name}</div>
                          <div className="font-tamil text-[11px] text-sapphire/60">{t.tamilName}</div>
                        </td>
                        <td className="py-3 px-4 capitalize text-sapphire/80">
                          {t.category.replace('-', ' ')}
                        </td>
                        <td className="py-3 px-4 text-sapphire/70">
                          {t.pageTypes.length} Pages
                        </td>
                        <td className="py-3 px-4">
                          <div className="flex items-center gap-1 font-medium text-sapphire-deep">
                            <span>₹</span>
                            <input
                              type="number"
                              value={price}
                              onChange={(e) => handlePriceChange(t.id, Number(e.target.value))}
                              className="w-16 px-1.5 py-1 text-xs border border-champagne/40 rounded focus:border-royal-sapphire focus:outline-none"
                            />
                          </div>
                        </td>
                        <td className="py-3 px-4">
                          <button
                            onClick={() => handleToggleStatus(t.id)}
                            className={`px-2 py-0.5 rounded text-[10px] uppercase font-semibold tracking-wider ${
                              isActive ? 'bg-emerald/10 text-emerald' : 'bg-red-100 text-red-700'
                            }`}
                          >
                            {isActive ? 'Available' : 'Paused'}
                          </button>
                        </td>
                        <td className="py-3 px-4 text-right">
                          <Link
                            to={`/invitation/${t.slug}`}
                            className="inline-flex items-center gap-1 text-champagne hover:text-royal-sapphire font-semibold"
                          >
                            Preview <ExternalLink className="w-3 h-3" />
                          </Link>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* TAB CONTENT: ORDERS */}
      {activeTab === 'orders' && (
        <div className="bg-white rounded-xl border border-champagne/30 shadow-sm overflow-hidden">
          <div className="p-4 border-b border-champagne/20 flex justify-between items-center bg-porcelain/40">
            <h3 className="text-sm font-semibold tracking-wide text-sapphire-deep uppercase">Client WhatsApp & Direct Inquiries</h3>
            <span className="text-xs text-sapphire/50">Total Orders: {orders.length}</span>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-porcelain border-b border-champagne/30 text-sapphire/60 uppercase tracking-wider font-semibold">
                <tr>
                  <th className="py-3 px-4">Reference</th>
                  <th className="py-3 px-4">Customer Details</th>
                  <th className="py-3 px-4">Template & Language</th>
                  <th className="py-3 px-4">Qty</th>
                  <th className="py-3 px-4">Total Amount</th>
                  <th className="py-3 px-4">Delivery Status</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-champagne/15">
                {orders.map(o => (
                  <tr key={o.id} className="hover:bg-porcelain/60 transition">
                    <td className="py-3 px-4 font-mono font-semibold text-royal-sapphire">{o.id}</td>
                    <td className="py-3 px-4">
                      <div className="font-semibold text-sapphire-deep">{o.customerName}</div>
                      <div className="text-[11px] text-sapphire/60">{o.mobile}</div>
                    </td>
                    <td className="py-3 px-4">
                      <div className="text-sapphire-deep">{o.templateName}</div>
                      <div className="text-[10px] text-champagne uppercase font-medium">{o.language}</div>
                    </td>
                    <td className="py-3 px-4 text-sapphire/80">{o.quantity} units</td>
                    <td className="py-3 px-4 font-semibold text-sapphire-deep">₹{o.total.toLocaleString()}</td>
                    <td className="py-3 px-4">
                      <select
                        value={o.status}
                        onChange={(e) => updateOrderStatus(o.id, e.target.value as MockOrder['status'])}
                        className="text-xs bg-porcelain border border-champagne/40 rounded px-2 py-1 focus:outline-none"
                      >
                        <option value="Pending Contact">Pending Contact</option>
                        <option value="Proof Approved">Proof Approved</option>
                        <option value="In Production">In Production</option>
                        <option value="Dispatched">Dispatched</option>
                        <option value="Delivered">Delivered</option>
                      </select>
                    </td>
                    <td className="py-3 px-4 text-right">
                      <a
                        href={`https://wa.me/${o.mobile.replace(/\D/g, '')}`}
                        target="_blank"
                        rel="noreferrer"
                        className="text-emerald hover:underline font-semibold"
                      >
                        WhatsApp Client
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB CONTENT: PROMOTIONS */}
      {activeTab === 'promotions' && (
        <div className="bg-white p-6 md:p-8 rounded-xl border border-champagne/30 shadow-sm max-w-2xl space-y-6">
          <div className="flex items-center gap-3 pb-4 border-b border-champagne/20">
            <Sparkles className="w-6 h-6 text-champagne" />
            <div>
              <h3 className="text-base font-semibold text-sapphire-deep">Grand Launch Celebration Campaign</h3>
              <p className="text-xs text-sapphire/50">Configure public promotional banners and discounts</p>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <label className="text-xs font-semibold text-sapphire-deep uppercase tracking-wider">Promotion Active</label>
                <p className="text-xs text-sapphire/50">Display the 50% Grand Launch banner across all pages</p>
              </div>
              <input
                type="checkbox"
                checked={offerActive}
                onChange={(e) => setOfferActive(e.target.checked)}
                className="w-5 h-5 accent-royal-sapphire rounded cursor-pointer"
              />
            </div>

            <div className="grid grid-cols-2 gap-4 pt-2">
              <div>
                <label className="text-xs font-semibold text-sapphire-deep uppercase tracking-wider block mb-1">Discount Percentage (%)</label>
                <input
                  type="number"
                  value={offerDiscount}
                  onChange={(e) => setOfferDiscount(Number(e.target.value))}
                  className="w-full px-3 py-2 text-xs border border-champagne/40 rounded focus:border-royal-sapphire focus:outline-none"
                />
              </div>
              <div>
                <label className="text-xs font-semibold text-sapphire-deep uppercase tracking-wider block mb-1">Customer Cap</label>
                <input
                  type="number"
                  value={offerLimit}
                  onChange={(e) => setOfferLimit(Number(e.target.value))}
                  className="w-full px-3 py-2 text-xs border border-champagne/40 rounded focus:border-royal-sapphire focus:outline-none"
                />
              </div>
            </div>

            <div className="p-4 bg-porcelain rounded-lg border border-champagne/20 mt-4">
              <p className="text-xs text-sapphire/70">
                <strong>Current Public Notice:</strong> "OUR GRAND LAUNCH CELEBRATION — {offerDiscount}% OFF FOR THE FIRST {offerLimit} CUSTOMERS."
              </p>
              <p className="text-[11px] text-sapphire/50 mt-1">
                Complimentary shipping indicator is fixed at 100% Free Nationwide Delivery.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

