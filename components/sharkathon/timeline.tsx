import React from 'react'; // Import React
import { FaRegFileAlt, FaBook, FaLaptop, FaUsers, FaSearch } from "react-icons/fa";

export default function SharkathonTimeline() {
  const lighterNavyBlue = "#0d21a1"; // Used for mobile timeline icons background/border

  const timelineSteps = [
    {
      icon: <FaRegFileAlt className="text-primary text-3xl" />,
      title: "Step 1: Register & Secure Your Spot",
      description: "Submit your application with essential details to secure your spot.",
      date: ' 20th June 2025' // Added date
    },
    {
      icon: <FaBook className="text-primary text-3xl" />,
      title: "Step 2: Access Study Resources & Prepare",
      description: "Use our curated materials to prepare for the upcoming competition.",
      date: '1st July 2025' // Added date
    },
    {
      icon: <FaLaptop className="text-primary text-3xl" />,
      title: "The Entry Round",
      description: "Solve a short decision-making challenge designed to test how you think, not what you know.",
      date: '13th July 2025' // Added date
    },
    {
      icon: <FaUsers className="text-primary text-3xl" />,
      title: "Business Case Round",
      description: "Look at a company’s numbers and story, then submit your recommendation on what they should do next.",
      date: '25th July 2025' // Added date
    },
    {
      icon: <FaSearch className="text-primary text-3xl" />,
      title: "Finals",
      description: "Break down real startup pitches, question the founders to finally decide will you invest or not. Then pitch your verdict to actual investors, or probably Sharks",
      date: '3rd August 2025' // Added date
    }
  ];

  return (
    <div className="" > {/* Consider adding background color or padding if needed */}
      <div className="text-center mb-10">
        <h2 className="text-4xl font-bold text-white mb-2">The <img 
    src="/logo.png" 
    alt="Sharkathon" 
    className="h-12 inline-block align-text-bottom"
  /> Journey</h2>
        <div className="w-96 h-1 bg-gradient-to-r from-blue-400 to-blue-600 mx-auto"></div>
        <p className="text-secondary mt-4 text-lg max-w-2xl mx-auto mb-8"> {/* Ensure 'text-secondary' is defined */}
          From registration to the final evaluation, follow the path to success
        </p>
      </div>

      <div className="max-w-7xl mx-auto px-6 mt-2">
        {/* Desktop Timeline */}
        <div className="hidden md:block relative">
          {/* Horizontal Line */}
          <div className="absolute top-[50px] left-0 right-0 h-1" style={{ backgroundColor: "#FAD133" }}></div>

          {/* Reverted to original flex layout with gap */}
          <div className="flex items-start gap-10 pt-[12px]">
            {timelineSteps.map((step, index) => (
              // Reverted to original alignment: items-start, text-left
              <div key={index} className="relative flex flex-col items-start text-left">
                {/* Icon */}
                <div
                  className="z-10 p-4 rounded-full border-4 shadow-lg"
                  style={{
                    backgroundColor: "#FAD133",
                    borderColor: "#FAD133",
                  }}
                >
                  {/* Still cloning to ensure icon visibility */}
                  {React.cloneElement(step.icon, { className: "text-black text-3xl" })}
                </div>

                {/* Title */}
                <h3 className="mt-6 text-lg font-bold text-white leading-snug">
                  {step.title}
                </h3>

                 {/* Date */}
                 <p className="mt-1 text-sm font-semibold text-yellow-300"> {/* Kept Date field */}
                  {step.date}
                </p>

                {/* Description */}
                {/* Adjusted max-width for better wrapping in left-aligned view with gap */}
                <p className="mt-2 text-sm text-gray-300 leading-relaxed max-w-[200px] sm:max-w-xs"> {/* Increased top margin, added max-width */}
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Mobile Timeline (Remains Left Aligned) */}
        <div className="md:hidden">
          <div className="relative">
            {/* Vertical line */}
            <div className="absolute left-6 top-0 bottom-0 w-1.5" style={{ backgroundColor: "#0d21a130" }}></div> {/* Example using lighterNavyBlue with opacity */}

            <div className="space-y-14">
              {timelineSteps.map((step, index) => (
                // Mobile items are inherently aligned left by default structure
                <div key={index} className="relative flex items-start">
                  {/* Icon */}
                  <div
                    className="z-10 p-3 rounded-full border-4 shadow-lg mr-6 flex-shrink-0"
                    style={{ backgroundColor: lighterNavyBlue, borderColor: lighterNavyBlue }}
                  >
                     {/* Clone element for color control */}
                     {React.cloneElement(step.icon, { className: "text-white text-xl" })}
                  </div>

                  {/* Details */}
                  <div className="pt-1">
                    <h3 className="text-base font-bold text-[#0a2a5e] leading-snug">
                      {step.title}
                    </h3>
                     {/* Date */}
                    <p className="mt-1 text-xs font-semibold text-blue-800">
                      {step.date}
                    </p>
                    <p className="mt-2 text-sm text-gray-600 leading-relaxed pr-2">
                      {step.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}