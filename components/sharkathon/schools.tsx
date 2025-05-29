"use client"
import React from 'react';

export default function SchoolMarquee() {
  // Sample school logos - replace these with your actual school logo paths
  const schoolLogos = [
    { src: "/schools/amity.jpg", alt: "Amity School", name: "Amity School" },
    { src: "/schools/kp.jpg", alt: "Kunskappaskolan school", name: "Kunskappaskolan school" },
    { src: "/schools/gwh.jpg", alt: "Greenwood high", name: "Greenwood high" },
    { src: "/schools/cps.png", alt: "centre point", name: "centre point" },
  ];

  // Duplicate the array to create seamless loop
  const duplicatedLogos = [...schoolLogos, ...schoolLogos];

  return (
    <div className="w-full bg-gradient-to-r from-blue-50 to-indigo-50 py-12 overflow-hidden">
      {/* Header Section */}
      <div className="text-center mb-8">
        <h2 className="text-4xl font-bold text-gray-800 mb-4">
          Schools Already Participating
        </h2>
        <div className="w-24 h-1 bg-gradient-to-r from-blue-400 to-blue-600 mx-auto mb-4"></div>
        <p className="text-gray-600 max-w-2xl mx-auto text-lg">
          Join these prestigious institutions that have already registered for the competition
        </p>
      </div>

      {/* Marquee Container */}
      <div className="relative">
        {/* Gradient overlays for smooth fade effect */}
        
        
        {/* Scrolling logos container */}
        <div className="flex animate-marquee items-center">
          {duplicatedLogos.map((school, index) => (
            <div
              key={index}
              className="flex-shrink-0 mx-12 group cursor-pointer"
            >
              <div className={`flex items-center justify-center ${
                school.name === "centre point" || school.name === "Amity School" ? "w-32 h-32" : "w-24 h-24"
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

      {/* Custom CSS for marquee animation */}
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
            animation: marquee 30s linear infinite;
          }
          
          .animate-marquee:hover {
            animation-play-state: paused;
          }
        `
      }} />
    </div>
  );
}