import React from 'react';
import { Gift, ShieldCheck, Sparkles } from 'lucide-react';

export default function TrustSignal() {
  return (
    <div className="bg-neutral-900 text-white py-4 px-4 shadow-sm font-sans">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4 text-center md:text-left text-sm font-medium tracking-wide">
        <div className="flex items-center gap-2">
          <Gift className="h-5 w-5 text-amber-400 shrink-0" />
          <span>We provide a <span className="text-amber-300 font-bold">free sample</span> with every single order!</span>
        </div>
        <div className="hidden md:flex items-center gap-2 text-neutral-300">
          <ShieldCheck className="h-5 w-5 text-emerald-400 shrink-0" />
          <span>100% Authentic Products — Direct Import & Exclusive Brands Distribution</span>
        </div>
        <div className="hidden lg:flex items-center gap-2 text-neutral-300">
          <Sparkles className="h-5 w-5 text-cyan-400 shrink-0" />
          <span>Exclusive distributorship for APLB, KSECRET, & Celimax in BD</span>
        </div>
      </div>
    </div>
  );
}
