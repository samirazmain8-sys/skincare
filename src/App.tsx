/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { useShop, ShopProvider } from './context/ShopContext';
import Navbar from './components/Navbar';
import TrustSignal from './components/TrustSignal';
import HeroSlider from './components/HeroSlider';
import PromotionalQuoteBox from './components/PromotionalQuoteBox';
import FeaturedGrid from './components/FeaturedGrid';
import NewArrival from './components/NewArrival';
import SaleSection from './components/SaleSection';
import Bestsellers from './components/Bestsellers';
import Footer from './components/Footer';
import MobileBottomNav from './components/MobileBottomNav';
import ProductDetailPage from './components/ProductDetailPage';
import CategoryPage from './components/CategoryPage';
import CartPage from './components/CartPage';
import CheckoutPage from './components/CheckoutPage';
import AccountPage from './components/AccountPage';
import ProductCard from './components/ProductCard';
import { HelpCircle, Phone, MapPin, Newspaper, FileText, CheckCircle, Search, Tag, AlertTriangle } from 'lucide-react';

function AppContent() {
  const { currentScreen, selectedProductId, searchQuery, products, navigate } = useShop();

  // Screen controller
  const renderScreen = () => {
    switch (currentScreen) {
      case 'home':
        return (
          <>
            <TrustSignal />
            <HeroSlider />
            <PromotionalQuoteBox />
            
            {/* Main store showcase */}
            <FeaturedGrid />
            <NewArrival />
            <Bestsellers />
            <SaleSection />
          </>
        );

      case 'shop':
        return <CategoryPage />;

      case 'product-detail':
        return <ProductDetailPage />;

      case 'cart':
        return <CartPage />;

      case 'checkout':
        return <CheckoutPage />;

      case 'account':
        return <AccountPage />;

      case 'search-results':
        const filtered = products.filter(p => 
          p.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
          p.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.subCategory.toLowerCase().includes(searchQuery.toLowerCase())
        );
        return (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 font-sans">
            <div className="border-b border-neutral-100 pb-4 mb-6">
              <span className="text-[10px] font-bold text-amber-600 block uppercase tracking-wider">Search Catalogue Results</span>
              <h1 className="text-xl sm:text-2xl font-extrabold text-neutral-900 tracking-tight mt-1">
                Found {filtered.length} products matching "{searchQuery}"
              </h1>
            </div>
            {filtered.length === 0 ? (
              <div className="text-center py-20 bg-neutral-50 rounded-2xl border border-dashed border-neutral-200">
                <Search className="mx-auto h-12 w-12 text-neutral-300" />
                <h3 className="mt-2 text-sm font-semibold text-neutral-700">No matching cosmetics found</h3>
                <p className="mt-1 text-xs text-neutral-400">Try searching for popular brands like COSRX, SKIN1004 or AXIS-Y</p>
                <button onClick={() => navigate('shop')} className="mt-4 bg-neutral-900 text-white rounded-lg px-4 py-2.5 text-xs font-bold">
                  Browse Full Collections
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
                {filtered.map(p => (
                  <ProductCard key={p.id} product={p} />
                ))}
              </div>
            )}
          </div>
        );

      case 'page-sale':
        const discountProducts = products.filter(p => p.isSale || p.salePrice);
        return (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 font-sans">
            <div className="bg-red-50 border border-red-100 rounded-2xl p-6 sm:p-8 mb-8 text-center relative overflow-hidden">
              <div className="absolute top-0 right-0 p-2 bg-red-600 text-white text-[10px] font-black uppercase rounded-bl-xl tracking-widest animate-pulse">
                LIMITED CAMPAIGN CLEARANCE
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-red-650 tracking-tight leading-none mb-3">Clearance Flash Sale</h1>
              <p className="text-xs text-neutral-600 max-w-md mx-auto font-medium">
                Get up to 45% discount on authentic South Korean skincare brands imported directly. Free tester samples included with every shipment!
              </p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
              {discountProducts.map(p => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        );

      // Informational custom sub-pages
      case 'pages-contact-us':
        return (
          <div className="max-w-4xl mx-auto px-4 py-12 font-sans space-y-8">
            <div className="text-center">
              <h1 className="text-2.5xl font-extrabold text-neutral-900 tracking-tight">Help & Contact Us</h1>
              <p className="text-xs text-neutral-500 mt-1">Get immediate assistance with skincare regimes or order dispatch logistics</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-white border border-neutral-100 rounded-2xl p-6 space-y-4 shadow-xs">
                <h3 className="font-extrabold text-neutral-850 text-sm flex items-center gap-2"><Phone className="h-4.5 w-4.5 text-neutral-900" /> BD Customer Care Hotlines</h3>
                <div className="text-xs text-neutral-600 space-y-2">
                  <p>Primary Mobile: <span className="font-bold text-neutral-900">+880 1712-345678</span></p>
                  <p>Message Support: <span className="font-bold text-neutral-900">m.me/skincarebddotcom</span></p>
                  <p>Email: <span className="font-bold text-neutral-900">support@skincarebd.com</span></p>
                  <p className="text-[10px] text-neutral-400 font-medium">Customer support lines operate daily from 10:00 AM to 9:00 PM.</p>
                </div>
              </div>
              <div className="bg-neutral-50 rounded-2xl p-6 space-y-4 border border-neutral-100">
                <h3 className="font-extrabold text-neutral-850 text-sm">Send Fast Inquiries</h3>
                <form onSubmit={(e) => { e.preventDefault(); alert('Inquiry successfully routed to cosmetics desk!'); }} className="space-y-3">
                  <input type="text" placeholder="Your Name" required className="bg-white border w-full p-2 text-xs rounded-lg focus:outline-hidden" />
                  <textarea placeholder="Message details" required rows={2} className="bg-white border w-full p-2 text-xs rounded-lg focus:outline-hidden" />
                  <button type="submit" className="bg-neutral-900 text-white text-xs px-4 py-2 font-bold rounded-lg cursor-pointer">Submit</button>
                </form>
              </div>
            </div>
          </div>
        );

      case 'showroom':
        return (
          <div className="max-w-3xl mx-auto px-4 py-12 font-sans space-y-6 text-center">
            <div className="bg-neutral-900 text-white p-8 rounded-3xl border border-neutral-800 space-y-4">
              <MapPin className="h-10 w-10 text-amber-400 mx-auto" />
              <h1 className="text-2xl font-extrabold tracking-tight">Our Premium Dhaka Showroom</h1>
              <p className="text-xs text-neutral-400 max-w-sm mx-auto leading-relaxed">
                Experience physical authentic skincare consultations, try tactile swatches, and purchase directly at our pristine central showroom destination:
              </p>
              <div className="bg-neutral-800 p-4 rounded-xl max-w-md mx-auto text-xs font-bold leading-relaxed shadow border border-neutral-700">
                <p className="text-white">SKIN CARE BD HQ — Retail Outlet</p>
                <p className="text-neutral-350 font-normal mt-1">House 24, Road 11 (2nd Floor), Block E,</p>
                <p className="text-neutral-350 font-normal">Banani Cinema Hub Hallway Area, Dhaka 1213.</p>
              </div>
              <p className="text-[10px] text-neutral-400 font-medium">Hours: Every day from 11:30 AM to 8:30 PM</p>
            </div>
          </div>
        );

      case 'terms-conditions':
        return (
          <div className="max-w-3xl mx-auto px-4 py-12 font-sans space-y-6 text-xs text-neutral-600 leading-relaxed">
            <h1 className="text-xl font-extrabold text-neutral-900 tracking-tight text-center">Terms & Conditions</h1>
            <div className="bg-white border border-neutral-100 rounded-2xl p-6 md:p-8 space-y-4">
              <p className="font-semibold text-neutral-800">Welcome to Skin Care BD. By purchasing authentic formulas, you agree to these provisions:</p>
              <h3 className="font-extrabold text-neutral-900 text-sm mt-3">1. 100% Brand Authenticity Guarantee</h3>
              <p>We source cosmetological skincare from South Korea, Japan, France, and Western channels. Every invoice is double-checked for clinical certification. We maintain zero-tolerance rules against grey duplicates.</p>
              <h3 className="font-extrabold text-neutral-900 text-sm mt-3">2. Surcharges & Shipments</h3>
              <p>Delivery charges represent actual transport payouts. We authorize delivery executives to retrieve COD cash only upon handover of parcels containing original factory seals intact.</p>
            </div>
          </div>
        );

      case 'refund-return-policy':
        return (
          <div className="max-w-3xl mx-auto px-4 py-12 font-sans space-y-6 text-xs text-neutral-600 leading-relaxed">
            <h1 className="text-xl font-extrabold text-neutral-900 tracking-tight text-center">Refund, Return & Order Cancellations</h1>
            <div className="bg-white border border-neutral-100 rounded-2xl p-6 md:p-8 space-y-4">
              <div className="p-3 bg-red-50 text-red-700 font-bold border border-red-100 rounded-xl leading-relaxed">
                ⚠ Please check products details at delivery doorstep! Under Bangladesh Consumer Protection directives, health & skincare items once unboxed or seals broken cannot be restocked.
              </div>
              <h3 className="font-extrabold text-neutral-900 text-sm mt-4">Immediate Return Qualifications</h3>
              <p>Customers can return shipments at the delivery spot if:</p>
              <ul className="list-disc pl-5 space-y-1">
                <li>The formulation is physically dented or cracked during courier transit.</li>
                <li>The product deviates from your invoice parameters.</li>
                <li>Expected shelf-life contains less than 6 months of expiry window.</li>
              </ul>
            </div>
          </div>
        );

      case 'pages-about-us':
        return (
          <div className="max-w-3xl mx-auto px-4 py-12 font-sans space-y-6 leading-relaxed">
            <h1 className="text-xl font-extrabold text-neutral-900 tracking-tight text-center">Wholesale Inquiries & About us</h1>
            <div className="bg-white border border-neutral-100 rounded-2xl p-6 md:p-8 space-y-4 text-xs text-neutral-600">
              <p>Skin Care BD is the primary importer of high-tier Korean Beauty (K-Beauty) and Japanese formulas inside Bangladesh. We serve over 150 local sub-retailers, pharmacies, and clinical beauty nodes.</p>
              <h3 className="font-extrabold text-neutral-900 text-sm">Wholesale & Business Inquiries</h3>
              <p>Registered boutiques wishing to source bulk shipments of Beauty of Joseon, COSRX, or AXIS-Y can send corporate requests:</p>
              <div className="p-4 bg-neutral-50 rounded-xl border border-neutral-100 font-medium">
                <p className="font-bold text-neutral-800">Skin Care BD Bulk Distribution Unit</p>
                <p className="mt-1">Hotline: +880 1712-345678 (Corporate Desk)</p>
                <p>Email: wholesale@skincarebd.com</p>
              </div>
            </div>
          </div>
        );

      case 'blog':
        return (
          <div className="max-w-4xl mx-auto px-4 py-12 font-sans space-y-8">
            <div className="text-center">
              <span className="text-[10px] font-bold text-amber-600 block uppercase tracking-widest">K-Beauty Secrets</span>
              <h1 className="text-2xl font-extrabold text-neutral-900 tracking-tight">Skin Care Editorial Blog</h1>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Blog 1 */}
              <div className="bg-white border border-neutral-100 rounded-2xl overflow-hidden shadow-xs">
                <div className="h-40 bg-neutral-100 flex items-center justify-center p-4">
                  <span className="text-xs font-black text-amber-600 bg-amber-50 p-2.5 rounded-full">Double Cleanse</span>
                </div>
                <div className="p-4 space-y-2">
                  <h3 className="text-xs font-extrabold text-neutral-900 line-clamp-2">How to master the Korean double cleansing routine inside Bangladesh</h3>
                  <p className="text-[11px] text-neutral-500 leading-relaxed">Discover why utilizing a lightweight oil cleanser before foam toner clears humid residues...</p>
                </div>
              </div>
              {/* Blog 2 */}
              <div className="bg-white border border-neutral-100 rounded-2xl overflow-hidden shadow-xs">
                <div className="h-40 bg-neutral-100 flex items-center justify-center p-4">
                  <span className="text-xs font-black text-blue-600 bg-blue-50 p-2.5 rounded-full">Hydration SPF</span>
                </div>
                <div className="p-4 space-y-2">
                  <h3 className="text-xs font-extrabold text-neutral-900 line-clamp-2">Why Korean sunscreen gels are perfect for humid Dhaka weather</h3>
                  <p className="text-[11px] text-neutral-500 leading-relaxed">Ditch the heavy white casts. Hyaluronic sun gels absorb instantly like invisible creams...</p>
                </div>
              </div>
              {/* Blog 3 */}
              <div className="bg-white border border-neutral-100 rounded-2xl overflow-hidden shadow-xs">
                <div className="h-40 bg-neutral-100 flex items-center justify-center p-4">
                  <span className="text-xs font-black text-indigo-600 bg-indigo-50 p-2.5 rounded-full">Centella Healing</span>
                </div>
                <div className="p-4 space-y-2">
                  <h3 className="text-xs font-extrabold text-neutral-900 line-clamp-2">What is Centella Asiatica & why does your irritated skin barrier love it?</h3>
                  <p className="text-[11px] text-neutral-500 leading-relaxed">Also known as Cica, this legendary botanical calms redness, redness, and fungal pores immediately.</p>
                </div>
              </div>
            </div>
          </div>
        );

      case 'pages-our-services':
        return (
          <div className="max-w-3xl mx-auto px-4 py-12 font-sans space-y-6 text-xs text-neutral-600">
            <h1 className="text-xl font-extrabold text-neutral-900 tracking-tight text-center">About Our Services</h1>
            <div className="bg-white border border-neutral-100 rounded-2xl p-6 md:p-8 space-y-4">
              <p>We provide exclusive cold-chain shipping and storage import facilities inside Dhaka. Because skincare formulations lose effectiveness under heat, we store everything in humidity-controlled lockers.</p>
              <p className="font-semibold text-neutral-800">Our logistics guarantees:</p>
              <ul className="list-disc pl-5 space-y-2">
                <li>Cold-chain shipping containers on ocean freight imports</li>
                <li>Original certification barcode matching verification</li>
                <li>Free expert beauty matchmaking consult in our Banani showroom</li>
              </ul>
            </div>
          </div>
        );

      case 'privacy-policy':
        return (
          <div className="max-w-3xl mx-auto px-4 py-12 font-sans space-y-6 text-xs text-neutral-600">
            <h1 className="text-xl font-extrabold text-neutral-900 tracking-tight text-center">Privacy Policy</h1>
            <div className="bg-white border border-neutral-100 rounded-2xl p-6 md:p-8 space-y-4">
              <p>Your client privacy guidelines are secure with us. We store phone numbers solely to dispatch authentic packages. We never transmit database records to commercial third-party aggregators under electronic protection rules.</p>
            </div>
          </div>
        );

      default:
        return (
          <div className="text-center py-20 font-sans">
            <h2 className="text-lg font-bold">Screen "{currentScreen}" under construction</h2>
            <button onClick={() => navigate('home')} className="mt-4 bg-neutral-900 text-white rounded-lg px-4 py-2 text-xs">Back Home</button>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-[#fcfdfe] text-neutral-900 selection:bg-amber-100 font-sans flex flex-col justify-between">
      
      {/* Main navigation header */}
      <Navbar />

      {/* Dynamic route viewports */}
      <div className="flex-grow">
        {renderScreen()}
      </div>

      {/* Structured Footer */}
      <Footer />

      {/* Sticky Mobile bottom toolbar tabs */}
      <MobileBottomNav />

    </div>
  );
}

export default function App() {
  return (
    <ShopProvider>
      <AppContent />
    </ShopProvider>
  );
}

