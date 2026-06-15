import React from 'react';
import { Sparkles, Trophy } from 'lucide-react';

export default function PromotionalQuoteBox() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6">
      <div className="relative bg-amber-50/70 border-2 border-dashed border-amber-500 rounded-xl p-5 md:p-6 text-center shadow-sm overflow-hidden group">
        {/* Subtle decorative circles */}
        <div className="absolute -left-12 -top-12 h-24 w-24 rounded-full bg-amber-100 opacity-60"></div>
        <div className="absolute -right-12 -bottom-12 h-24 w-24 rounded-full bg-amber-100 opacity-60"></div>

        <div className="relative flex flex-col md:flex-row items-center justify-center gap-3">
          <div className="bg-amber-500 text-neutral-900 p-2 rounded-full hidden md:block animate-bounce shrink-0">
            <Trophy className="h-5 w-5" />
          </div>
          <div>
            <span className="inline-block bg-red-600 text-white text-xs font-bold uppercase tracking-wider px-2 py-0.5 rounded-md mb-2 md:mb-0 md:mr-3">
              FESTIVAL CRUISE OFFER
            </span>
            <span className="font-sans font-extrabold text-neutral-900 text-base md:text-lg tracking-tight">
              EID CELEBRATION OFFER. FREE Beauty of Joseon Calming Mask (Worth{' '}<span className="text-red-600">৳400</span>) on orders of{' '}<span className="text-amber-600 underline decoration-2">৳3000+</span>
            </span>
          </div>
          <div className="bg-neutral-900 text-white p-1 rounded-md text-[10px] uppercase font-bold tracking-widest hidden lg:block shrink-0">
            Auto-Applied
          </div>
        </div>
      </div>
    </div>
  );
}
