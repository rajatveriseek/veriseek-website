"use client";
import React from 'react';
import Link from 'next/link';
import { Button } from "@/components/ui/button";
import { Trophy, Zap } from 'lucide-react';
import ImageCarousel from "@/components/sharkathon/carousel.jsx"; // Assuming this exists

// --- Sub-Components ---

const ApplicationStatusBanner = () => (
  <div className="inline-block bg-yellow-400 text-blue-900 px-3 md:px-4 py-1 md:py-2 rounded-full text-sm md:text-lg font-bold tracking-wide transform hover:scale-105 transition-all mt-4 md:mt-6">
    <div className="flex items-center gap-1 md:gap-2">
      <Zap className="w-3 h-3 md:w-4 md:h-4" />
      <span>NOW ACCEPTING APPLICATIONS</span>
    </div>
  </div>
);

const HeroHeadline = () => (
  <div className="flex flex-col space-y-3 md:space-y-6 mt-4 md:mt-6">
    <img
      src="/logo.png" // Make sure this path is correct
      alt="SHARKATHON"
      className="max-w-xs w-full h-auto"
    />
    <div>
      <span className="text-white text-xl md:text-2xl lg:text-3xl">BECOME THE NEXT</span>{' '}
      <span className="text-yellow-400 text-xl md:text-2xl lg:text-3xl">BIG SHARK</span>
    </div>
  </div>
);

const HeroDescription = () => (
  <p className="text-base md:text-lg lg:text-xl opacity-90 leading-relaxed border-l-4 border-yellow-400 pl-4">
    Dive into an <span className="font-bold text-yellow-300">immersive experience</span> where you'll think and act like a shark investor. Analyse real businesses, grill entrepreneurs, and make <span className="font-bold text-yellow-300">strategic investment decisions</span>.
  </p>
);

const AlumniLogos = () => (
  <div className="border-2 border-yellow-400/50 bg-secondary p-3 md:p-4 rounded-lg backdrop-blur-lg transform hover:scale-[1.01] transition-all">
    <div className="flex flex-col items-center space-y-3">
      <div className="text-center">
        <p className="font-bold text-2xl text-white">Built by elite alumni from</p>
      </div>
      <div className="flex flex-wrap justify-center items-center gap-3 md:gap-4"> {/* Added flex-wrap for safety */}
        {/* Ensure these paths are correct */}
        <img src="/iima.png" alt="IIMA logo" className="h-12 sm:h-16 transition-transform hover:scale-110" />
        <img src="/iit.png" alt="IIT logo" className="h-12 sm:h-16 transition-transform hover:scale-110" />
        <img src="/wharton.png" alt="Wharton logo" className="h-12 sm:h-16 transition-transform hover:scale-110" />
        <img src="/mit.png" alt="MIT logo" className="h-12 sm:h-16 transition-transform hover:scale-110" />
      </div>
    </div>
  </div>
);

const ActionButtons = () => (
  <div className="flex flex-row flex-wrap sm:flex-nowrap gap-3 md:gap-4 items-center pt-2">
    <Button
      asChild
      size="lg"
      className="w-full sm:w-auto bg-yellow-400 text-blue-900 hover:bg-yellow-300 font-extrabold shadow-lg shadow-yellow-400/30 border-2 border-yellow-400 hover:scale-105 transition-transform hover:shadow-yellow-400/50 text-sm md:text-base py-2 px-3 md:px-4"
    >
      <Link href="#register" className="flex items-center justify-center gap-1 md:gap-2">
        <Zap className="w-3 h-3 md:w-4 md:h-4" />
        <span>SIGN UP NOW</span>
      </Link>
    </Button>

    <Button
      asChild
      size="lg"
      variant="outline"
      className="w-full sm:w-auto border-2 border-yellow-400 text-yellow-400 hover:text-blue-900 hover:bg-yellow-400 font-bold shadow-lg hover:scale-105 transition-transform text-sm md:text-base py-2 px-3 md:px-4" // Adjusted hover state for outline
    >
      <Link href="#process" className="flex items-center justify-center gap-1 md:gap-2">
        <span>KNOW MORE</span>
        <span>↓</span>
      </Link>
    </Button>
  </div>
);

const EligibilityBadge = () => (
   <div className="absolute -bottom-4 -left-4 bg-white p-2 md:p-3 rounded-lg shadow-xl border-2 border-yellow-400 z-20"> {/* Added z-20 */}
    <div className="flex items-center gap-2">
      <div className="bg-yellow-400 p-1 md:p-2 rounded-full">
        <Trophy className="h-4 w-4 md:h-5 md:w-5 text-blue-900" />
      </div>
      <div>
        <p className="text-blue-900 font-bold text-base md:text-lg">ELIGIBILITY</p>
        <p className="text-xs text-gray-700 font-medium">CLASSES 9th - 12th</p>
      </div>
    </div>
  </div>
);

const ImageSection = () => (
  <div className="relative mt-8 lg:mt-0">
    {/* Decorative blur effect */}
    <div className="absolute -inset-4 bg-gradient-to-r from-teal-400 to-purple-500 rounded-2xl opacity-15 blur-lg"></div>
    {/* Carousel container */}
    <div className="relative overflow-hidden rounded-xl border-2 border-yellow-400/30 shadow-lg">
      <ImageCarousel />
    </div>
    {/* Eligibility Badge - positioned relative to this container */}
    <EligibilityBadge />
  </div>
);

const BackgroundDecorations = () => (
  <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
    <div className="absolute top-1/4 -left-20 w-64 h-64 bg-yellow-400/5 rounded-full blur-3xl"></div>
    <div className="absolute bottom-1/4 -right-20 w-80 h-160 bg-teal-400/5 rounded-full blur-3xl"></div>
  </div>
);

// --- Main Hero Section Component ---

const HeroSection = () => {
  return (
    <section className="min-h-screen flex flex-col justify-center bg-primary text-white overflow-hidden relative">
      {/* Spacer for potential fixed header */}
      <div className="h-16 md:h-20"></div>

      <div className="container relative z-10 py-8 md:py-0 flex-grow flex items-center">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 lg:gap-20 items-center">

          {/* Left Column Content */}
          <div className="space-y-6 md:space-y-8">
            <ApplicationStatusBanner />
            <HeroHeadline />
            <HeroDescription />
            <AlumniLogos />
            <ActionButtons />
          </div>

          {/* Right Column Content */}
          <ImageSection />

        </div>
      </div>

      {/* Background elements */}
      <BackgroundDecorations />

      {/* Shared Animation styles */}
      {/* Kept global styles here as they might be less component-specific or simpler to manage globally */}
      <style jsx global>{`
        @keyframes float {
          0%, 100% { transform: translateY(0) rotate(45deg); }
          50% { transform: translateY(-10px) rotate(45deg); }
        }
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
        @keyframes pulse {
          0%, 100% { opacity: 0.1; }
          50% { opacity: 0.2; }
        }
        .animate-pulse {
          animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }
      `}</style>
    </section>
  );
};

export default HeroSection;