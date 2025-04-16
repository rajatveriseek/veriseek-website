"use client"
import React from 'react';
import Link from 'next/link';
import { Button } from "@/components/ui/button";
import { Trophy, Zap, Triangle } from 'lucide-react';
import ImageCarousel from "@/components/sharkathon/carousel.jsx";

const HeroSection = () => {
  return (
    <section className="min-h-screen flex flex-col justify-center bg-primary text-white overflow-hidden relative">
      {/* Added a spacer div to create more space at the top */}
      <div className="h-16 md:h-20"></div>
      
      <div className="container relative z-10 py-8 md:py-0 flex-grow flex items-center">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <div className="space-y-8">
            {/* Moved this component down by placing it in the normal flow with proper spacing */}
            <div className="inline-block bg-yellow-400 text-blue-900 px-4 py-2 rounded-full text-sm font-bold tracking-wide transform hover:scale-105 transition-all mt-4 md:mt-6">
              <div className="flex items-center gap-2">
                <Zap className="w-4 h-4" />
                <span>NOW ACCEPTING APPLICATIONS</span>
              </div>
            </div>
            
            <div className="flex flex-col space-y-4 mt-6">
              {/* Replaced text with image */}
              <img 
                src="/logo.png" 
                alt="SHARKATHON" 
                className="max-w-xs w-full h-auto"
              />
              <div>
                <span className="text-white text-3xl">BECOME THE NEXT</span> <span className="text-yellow-400 text-3xl">BIG SHARK</span>
              </div>
            </div>
            
            <p className="text-lg md:text-xl opacity-90 leading-relaxed border-l-4 border-yellow-400 pl-4">
              Dive into an <span className="font-bold text-yellow-300">immersive experience</span> where you'll think and act like a shark investor. Analyse real businesses, grill entrepreneurs, and make <span className="font-bold text-yellow-300">strategic investment decisions</span>.
            </p>

            {/* Built by box */}
            <div className="border-2 border-yellow-400/50 p-4 rounded-lg backdrop-blur-sm transform hover:scale-[1.01] transition-all">
              <div className="flex flex-col sm:flex-row items-center sm:items-start sm:space-x-4 space-y-3 sm:space-y-0">
                <div className="text-center sm:text-left">
                  <p className="font-bold text-white-300">Built by elite alumni from</p>
                </div>
                <div className="flex flex-wrap justify-center sm:justify-start items-center gap-4">
                  <img src="/iima.png" alt="IIMA logo" className="h-12 sm:h-16 hover:scale-110 transition-transform" />
                  <img src="/iit.png" alt="IIT logo" className="h-12 sm:h-16 hover:scale-110 transition-transform" />
                  <img src="/wharton.png" alt="Wharton logo" className="h-12 sm:h-16 hover:scale-110 transition-transform" />
                  <img src="/mit.png" alt="MIT logo" className="h-12 sm:h-16 hover:scale-110 transition-transform" />
                </div>
              </div>
            </div>
            
            <div className="flex flex-wrap gap-4 items-center pt-2">
              <Button 
                asChild 
                size="lg"
                className="bg-yellow-400 text-blue-900 hover:bg-yellow-300 font-extrabold shadow-lg shadow-yellow-400/30 border-2 border-yellow-400 hover:scale-105 transition-transform hover:shadow-yellow-400/50"
              >
                <Link href="#register" className="flex items-center gap-2">
                  <Zap className="w-4 h-4" />
                  <span>SIGN UP NOW</span>
                </Link>
              </Button>
              
              <Button 
                asChild 
                size="lg"
                variant="outline" 
                className="border-2 border-yellow-400 text-blue-900 hover:bg-yellow-400 font-bold shadow-lg hover:scale-105 transition-transform"
              >
                <Link href="#process" className="flex items-center gap-2">
                  <span>KNOW MORE</span>
                  <span>↓</span>
                </Link>
              </Button>
            </div>
          </div>

          <div className="relative">
            <div className="absolute -inset-4 bg-gradient-to-r from-teal-400 to-purple-500 rounded-2xl opacity-15 blur-lg"></div>
            <div className="relative overflow-hidden rounded-xl border-2 border-yellow-400/30 shadow3xl">
              <ImageCarousel />
            </div>
            <div className="absolute -bottom-4 -left-4 bg-white p-3 rounded-lg shadow-xl border-2 border-yellow-400">
              <div className="flex items-center gap-2">
                <div className="bg-yellow-400 p-2 rounded-full">
                  <Trophy className="h-5 w-5 text-blue-900" />
                </div>
                <div>
                  <p className="text-blue-900 font-bold text-sm">ELIGIBILITY</p>
                  <p className="text-xs text-gray-700 font-medium">CLASSES 9th - 12th</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Background elements for visual interest */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 -left-20 w-64 h-64 bg-yellow-400/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 -right-20 w-80 h-80 bg-teal-400/5 rounded-full blur-3xl"></div>
      </div>

      {/* Animation styles */}
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