import { useState } from 'react';

export default function ProfileCards() {
  // Sample data based on the image
  const profiles = [
    {
      name: "Mr. Rajat Kumar",
      title: "Nandan Capital, Ex McKinsey and Wharton Alum,",
      company: "Nandan Capital",
      image: "/rajat-bg-bw.png",
      logos: [
        { src: "/wharton.png", alt: "Wharton" },
        { src: "/nandancapital.png", alt: "nandan capital" }
      ]
    },
    {
      name: "Mr. Mayank Kapoor",
      title: "CTO CarDekho, Alum IIT Delhi & MIT",
      company: "Cardekho",
      image: "/mayank-bg-bw.png",
      logos: [
        { src: "/iit.png", alt: "IIT" },
        { src: "/cardekho.png", alt: "Cardekho" }
      ]
    },
    {
      name: "Mr. Shalabh Gupta",
      title: "Founder NUUK, Alum IIT Delhi & IIM Ahmedabad",
      company: "NUUK",
      image: "/shalabh-bg-bw.png",
      logos: [
        { src: "/iima.png", alt: "Logo 1" },
        { src: "/nuuk.png", alt: "Logo 2" }
      ]
    }
  ];

  return (
    <div className="flex flex-col w-full bg-white">
      {/* Added Heading Section */}
      <div className="text-center pt-10 mb-10">
        <h2 className="text-4xl font-bold text-primary mb-2">Leaders and Mentors Associated</h2>
        <div className="w-24 h-1 bg-gradient-to-r from-blue-400 to-blue-600 mx-auto"></div>
        <p className="text-gray-600 mt-2 max-w-2xl mx-auto text-l">
          Learn from top industry leaders who have made a significant impact.
        </p>
      </div>
      
      <div className="flex justify-center items-center px-4 py-2 pb-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl">
          {profiles.map((profile, index) => (
            <ProfileCard key={index} profile={profile} />
          ))}
        </div>
      </div>
    </div>
  );
}

function ProfileCard({ profile }) {
  return (
    <div className="rounded-lg overflow-hidden bg-primary border border-gray-800 relative h-6xl w-64 pb-2 shadow-2xl">
      {/* Yellow brush stroke effect in background */}
      <div className="absolute top-0 right-0 w-2/3 h-2/3 bg-yellow-400 opacity-70 rounded-full blur-xl transform translate-x-8 -translate-y-8 z-0"></div>
      
      {/* Dark gradient overlay */}
      <div className="absolute inset-0 bg-secondary"></div>
      
      {/* Card content */}
      <div className="relative z-20 h-full flex flex-col">
        {/* Image section - increased height from h-64 to h-72 */}
        <div className="flex-grow flex items-center justify-center overflow-hidden">
          <img 
            src={profile.image} 
            alt={profile.name} 
            className="w-full h-72 object-cover object-center"
          />
        </div>
        
        {/* Text content - decreased padding from p-4 to p-3 */}
        <div className="p-3 text-black">
          <h3 className="font-bold text-lg">{profile.name}</h3>
          <p className="text-m text-black">
            {profile.title}<br />
            {profile.company}
          </p>
          
          {/* Logos - decreased margin top from mt-2 to mt-1 and height from h-16 to h-14 */}
          <div className="flex items-center gap-2 mt-1">
            {profile.logos.map((logo, idx) => (
              <img 
                key={idx}
                src={logo.src} 
                alt={logo.alt}
                className="h-14 object-contain"
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}