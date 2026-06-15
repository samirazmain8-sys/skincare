import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronLeft, ChevronRight, ShoppingBag } from 'lucide-react';
import { useShop } from '../context/ShopContext';

interface Slide {
  brand: string;
  tagline: string;
  subtext: string;
  image: string;
}

const SLIDES: Slide[] = [
  {
    brand: 'APLB',
    tagline: 'APLB | Natural Ingredients',
    subtext: "SKIN CARE BD is the Exclusive Distributor of the Renowned Korean brand 'APLB' in Bangladesh",
    image: 'https://images.unsplash.com/photo-1608248597481-496100c80836?w=1600&auto=format&fit=crop&q=80'
  },
  {
    brand: 'KSECRET',
    tagline: 'KSECRET | Pure Skin Secrets',
    subtext: "SKIN CARE BD is the Authorized Distributor of 'KSECRET' Premium Lifting, Collagen & Sun Care in Bangladesh",
    image: 'https://images.unsplash.com/photo-1617897903246-719242758050?w=1600&auto=format&fit=crop&q=80'
  },
  {
    brand: 'Celimax',
    tagline: 'Celimax | Honest Cosmetics',
    subtext: "SKIN CARE BD brings premium, clinical-grade skin results directly from South Korea's Celimax Laboratories",
    image: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=1600&auto=format&fit=crop&q=80'
  },
  {
    brand: 'Purito Seoul',
    tagline: 'Purito Seoul | Safe Centella Solutions',
    subtext: "Embrace clean, eco-conscious, botanical-rich skincare routines with Purito Seoul's original line",
    image: 'https://images.unsplash.com/photo-1556229174-5e42a09e45af?w=1600&auto=format&fit=crop&q=80'
  }
];

export default function HeroSlider() {
  const { navigate, setShopFilters } = useShop();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0); // -1 for left, 1 for right
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const resetTimer = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }
    timerRef.current = setInterval(() => {
      handleNext();
    }, 6000);
  };

  useEffect(() => {
    resetTimer();
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [currentIndex]);

  const handleNext = () => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % SLIDES.length);
  };

  const handlePrev = () => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + SLIDES.length) % SLIDES.length);
  };

  const handleSlideChange = (index: number) => {
    setDirection(index > currentIndex ? 1 : -1);
    setCurrentIndex(index);
  };

  const handleShopNow = (brandName: string) => {
    setShopFilters({
      brand: brandName,
      subCategory: null,
      priceRange: null,
      sortBy: 'default'
    });
    navigate('shop');
  };

  return (
    <div id="hero-slider" className="relative h-[420px] sm:h-[500px] md:h-[600px] w-full bg-neutral-900 overflow-hidden select-none">
      <AnimatePresence initial={false} custom={direction} mode="wait">
        <motion.div
          key={currentIndex}
          custom={direction}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6 }}
          className="absolute inset-0 w-full h-full"
        >
          {/* Background Image */}
          <div className="absolute inset-0">
            <img
              src={SLIDES[currentIndex].image}
              alt={SLIDES[currentIndex].brand}
              className="w-full h-full object-cover object-center scaling-animation"
              referrerPolicy="no-referrer"
            />
            {/* Dark overlay for text contrast */}
            <div className="absolute inset-0 bg-neutral-900/40 md:bg-neutral-900/35 backdrop-blur-[1px]"></div>
            <div className="absolute inset-0 bg-gradient-to-r from-neutral-950/70 via-transparent to-neutral-950/20 md:from-neutral-950/85"></div>
          </div>

          {/* Slide Content */}
          <div className="absolute inset-0 flex items-center">
            <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 flex flex-col items-start text-white">
              {/* Brand logo tag */}
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="bg-white/10 backdrop-blur-md px-4 py-1 rounded-full border border-white/20 text-xs sm:text-sm font-semibold tracking-widest text-[#f5f5f7] mb-4 flex items-center gap-2"
              >
                <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse"></span>
                EXCLUSIVE BD DISTRIBUTOR
              </motion.div>

              {/* Tagline */}
              <motion.h1
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="font-sans font-extrabold text-2xl sm:text-4xl md:text-5xl lg:text-6xl tracking-tight max-w-2xl text-shadow mb-4"
              >
                {SLIDES[currentIndex].tagline}
              </motion.h1>

              {/* Subtext */}
              <motion.p
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="font-sans text-neutral-200 text-sm sm:text-base md:text-lg max-w-xl font-normal leading-relaxed mb-8 text-neutral-100"
              >
                {SLIDES[currentIndex].subtext}
              </motion.p>

              {/* CTA button */}
              <motion.button
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                transition={{ duration: 0.4, delay: 0.5 }}
                onClick={() => handleShopNow(SLIDES[currentIndex].brand)}
                className="bg-white hover:bg-neutral-100 text-neutral-900 px-6 sm:px-8 py-3 rounded-lg font-bold text-sm flex items-center gap-2 shadow-lg transition-colors cursor-pointer"
              >
                <ShoppingBag className="w-4 h-4" />
                Shop Now
              </motion.button>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Navigation Arrows */}
      <button
        onClick={handlePrev}
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white p-2 rounded-full backdrop-blur-sm transition-colors cursor-pointer hidden sm:block z-10"
        aria-label="Previous Slide"
      >
        <ChevronLeft className="h-6 w-6" />
      </button>
      <button
        onClick={handleNext}
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white p-2 rounded-full backdrop-blur-sm transition-colors cursor-pointer hidden sm:block z-10"
        aria-label="Next Slide"
      >
        <ChevronRight className="h-6 w-6" />
      </button>

      {/* Slide Indicators */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-3 z-10">
        {SLIDES.map((_, index) => (
          <button
            key={index}
            onClick={() => handleSlideChange(index)}
            className={`h-2 transition-all duration-300 rounded-full cursor-pointer ${
              index === currentIndex ? 'w-8 bg-white' : 'w-2 bg-white/40'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          ></button>
        ))}
      </div>
    </div>
  );
}
