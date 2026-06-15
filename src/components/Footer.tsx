import React from 'react';
import { useShop } from '../context/ShopContext';
import { Facebook, Instagram, MessageCircle, HelpCircle, MapPin, Shield, CreditCard } from 'lucide-react';

export default function Footer() {
  const { navigate, cart } = useShop();

  const handleNav = (screen: string) => {
    navigate(screen);
  };

  return (
    <footer className="bg-neutral-950 text-neutral-300 font-sans border-t border-neutral-900 pt-12 pb-24 md:pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
          {/* Column 1: Customer Service */}
          <div>
            <h3 className="font-bold text-white text-sm tracking-widest uppercase mb-4 text-theme">
              Customer Service
            </h3>
            <ul className="space-y-2.5 text-xs font-semibold">
              <li>
                <button onClick={() => handleNav('shop')} className="hover:text-amber-400 transition-colors cursor-pointer text-left">
                  Shop All Products
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('pages-contact-us')} className="hover:text-amber-400 transition-colors cursor-pointer text-left">
                  Help & Contact Us
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('terms-conditions')} className="hover:text-amber-400 transition-colors cursor-pointer text-left">
                  Terms & Conditions
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('refund-return-policy')} className="hover:text-amber-400 transition-colors cursor-pointer text-left">
                  Refund & Return Policy
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('showroom')} className="hover:text-amber-400 transition-colors cursor-pointer text-left flex items-center gap-1">
                  <MapPin className="h-3 w-3 shrink-0 text-amber-500" />
                  Showroom Address
                </button>
              </li>
            </ul>
          </div>

          {/* Column 2: Company */}
          <div>
            <h3 className="font-bold text-white text-sm tracking-widest uppercase mb-4 text-theme">
              Company
            </h3>
            <ul className="space-y-2.5 text-xs font-semibold">
              <li>
                <button onClick={() => handleNav('pages-about-us')} className="hover:text-amber-400 transition-colors cursor-pointer text-left">
                  Wholesale & Collaborations
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('blog')} className="hover:text-amber-400 transition-colors cursor-pointer text-left">
                  Skin Care Blog
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('pages-our-services')} className="hover:text-amber-400 transition-colors cursor-pointer text-left">
                  About Our Company
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('privacy-policy')} className="hover:text-amber-400 transition-colors cursor-pointer text-left">
                  Privacy Policy
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: Social Media */}
          <div>
            <h3 className="font-bold text-white text-sm tracking-widest uppercase mb-4 text-theme">
              Social Connection
            </h3>
            <ul className="space-y-2.5 text-xs font-semibold">
              <li>
                <a href="https://facebook.com/skincarebddotcom" target="_blank" rel="noreferrer" className="hover:text-amber-400 transition-colors flex items-center gap-2">
                  <Facebook className="h-4 w-4 shrink-0 text-blue-500" />
                  Facebook Page
                </a>
              </li>
              <li>
                <a href="https://facebook.com/groups/1730447913925121" target="_blank" rel="noreferrer" className="hover:text-amber-400 transition-colors flex items-center gap-2">
                  <MessageCircle className="h-4 w-4 shrink-0 text-cyan-500" />
                  Facebook Support Group
                </a>
              </li>
              <li>
                <a href="https://instagram.com/skincarebd.co/" target="_blank" rel="noreferrer" className="hover:text-amber-400 transition-colors flex items-center gap-2">
                  <Instagram className="h-4 w-4 shrink-0 text-[#E1306C]" />
                  Instagram Profile
                </a>
              </li>
              <li>
                <a href="https://tiktok.com/@skincarebd.com" target="_blank" rel="noreferrer" className="hover:text-amber-400 transition-colors flex items-center gap-2">
                  <svg className="h-4 w-4 shrink-0 text-white fill-current" viewBox="0 0 24 24">
                    <path d="M12.525.02c1.3.1 2.48.55 3.51 1.34.1.08.13.06.13-.07.01-1.12.01-1.12 1.13-1.11.3-.01.59-.01.89 0h1.83c.09.01.12.04.12.12v4.54c0 .08-.03.11-.11.11a4.931 4.931 0 01-3.14-1.07c-.08-.06-.11-.05-.11.05V11.5c.01 4.42-3.1 8.21-7.46 8.91a9.23 9.23 0 01-10.4-7.23c-.75-3.32-.01-6.6 2.1-9.35A9.22 9.22 0 0110 .52c.81-.04 1.63-.04 2.525-.5M9.54 13.51c0-1.89-1.52-3.41-3.41-3.41s-3.41 1.52-3.41 3.41 1.52 3.41 3.41 3.41 3.41-1.52 3.41-3.41Z" />
                  </svg>
                  TikTok Account
                </a>
              </li>
            </ul>
          </div>

          {/* Column 4: Profile & Account */}
          <div>
            <h3 className="font-bold text-white text-sm tracking-widest uppercase mb-4 text-theme">
              Quick Links
            </h3>
            <ul className="space-y-2.5 text-xs font-semibold">
              <li>
                <button onClick={() => handleNav('account')} className="hover:text-amber-400 transition-colors cursor-pointer text-left">
                  My Profile Dashboard
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('checkout')} className="hover:text-amber-400 transition-colors cursor-pointer text-left">
                  Proceed to Checkout
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('wishlist')} className="hover:text-amber-400 transition-colors cursor-pointer text-left">
                  My Wishlist Save Book
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('cart')} className="hover:text-amber-400 transition-colors cursor-pointer text-left flex items-center gap-1.5">
                  View Shopping Cart
                  {cart.length > 0 && (
                    <span className="bg-amber-500 text-neutral-950 font-extrabold px-1.5 py-0.2 rounded-full text-[10px]">
                      {cart.length}
                    </span>
                  )}
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Drawer Bar */}
        <div className="border-t border-neutral-900 pt-8 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-center md:text-left">
            <p className="text-xs text-neutral-500 leading-relaxed font-semibold">
              &copy; 2026 SKIN CARE BD. All Rights Reserved.
            </p>
            <p className="text-[10px] text-neutral-600 mt-1">
              Authorized Exclusive Distributor of Premium Korean Skincare Solutions in Bangladesh. Free Sample with Every Shipment.
            </p>
          </div>

          {/* BD Payment networks logos */}
          <div className="flex flex-wrap items-center justify-center gap-2 shrink-0">
            {/* bKash badge */}
            <div className="bg-[#D12053] text-white px-2.5 py-1 rounded font-sans text-[10px] font-extrabold tracking-tight select-none border border-neutral-800">
              bKash
            </div>
            {/* Nagad badge */}
            <div className="bg-[#EF5F23] text-white px-2.5 py-1 rounded font-sans text-[10px] font-extrabold tracking-tight select-none border border-neutral-800">
              Nagad
            </div>
            {/* Visa badge */}
            <div className="bg-[#1A1F71] text-white px-2.5 py-1 rounded font-sans text-[10px] font-extrabold tracking-tight select-none border border-neutral-800">
              VISA
            </div>
            {/* Mastercard badge */}
            <div className="bg-[#EB001B] text-white px-2.5 py-1 rounded font-sans text-[10px] font-extrabold tracking-tight select-none border border-neutral-800">
              MC
            </div>
            {/* COD badge */}
            <div className="bg-neutral-800 text-neutral-200 px-2.5 py-1 rounded font-sans text-[10px] font-bold tracking-tight select-none border border-neutral-700">
              CASH ON DELIVERY
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
