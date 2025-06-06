"use client"
import React from 'react';

export default function SchoolMarquee() {
  const schoolLogos = [
    { src: "/schools/amity.png", alt: "Amity School", name: "Amity School" },
    { src: "/schools/kp.png", alt: "Kunskappaskolan school", name: "Kunskappaskolan school" },
    { src: "/schools/gwh.png", alt: "Greenwood high", name: "Greenwood high" },
    { src: "/schools/cps.png", alt: "centre point", name: "centre point" },
    { src: "/schools/heritage.png", alt: "heritage", name: "heritage" },
    { src: "/schools/pathway.png", alt: "pathway", name: "pathway" },
  ];

  return (
    <div className="w-full bg-gradient-to-r from-blue-50 to-indigo-50 py-12 overflow-hidden">
      {/* Header */}
      <div className="text-center mb-8">
        <h2 className="text-4xl font-bold text-gray-800 mb-4">
          Schools Already Participating
        </h2>
        <div className="w-24 h-1 bg-gradient-to-r from-blue-400 to-blue-600 mx-auto mb-4"></div>
        <p className="text-gray-600 max-w-2xl mx-auto text-lg">
          Join these prestigious institutions that have already registered for the competition
        </p>
      </div>

      {/* Marquee */}
      <div className="relative w-full overflow-hidden">
        <div className="flex w-max animate-marquee whitespace-nowrap">
          {/* Duplicated once only */}
          {[...schoolLogos, ...schoolLogos].map((school, index) => (
            <div
              key={index}
              className="flex-shrink-0 mx-[120px] group cursor-pointer"
            >
              <div className={`flex items-center justify-center ${
                school.name === "centre point" || school.name === "Amity School" || school.name ==="pathway" || school.name ==="heritage" ? "w-48 h-32" : "w-32 h-24"
              }`}>
                <img 
                  src={school.src} 
                  alt={school.alt}
                  className="max-w-full max-h-full object-contain hover:scale-110 transition-transform duration-300 filter hover:brightness-110"
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom text */}
      <div className="text-center mt-8">
        <p className="text-gray-500 text-sm">
          And many more schools joining every day...
        </p>
      </div>

      {/* Smoother Marquee Animation */}
      <style dangerouslySetInnerHTML={{
        __html: `
          @keyframes marquee {
            0% {
              transform: translateX(0%);
            }
            100% {
              transform: translateX(-50%);
            }
          }

          .animate-marquee {
            animation: marquee 25s linear infinite;
          }

          .animate-marquee:hover {
            animation-play-state: paused;
          }
        `
      }} />
    </div>
  );
}
