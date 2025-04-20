"use client"
import { useState, useRef } from 'react';
import { FiCalendar } from 'react-icons/fi';
import Link from 'next/link';
import { Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function ProgramTimeline() {
  const [selectedWeek, setSelectedWeek] = useState(1);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isHoveringTimeline, setIsHoveringTimeline] = useState(false);
  const timelineRef = useRef(null);

  // Handle transitioning between weeks
  const handleWeekChange = (weekNumber) => {
    if (weekNumber === selectedWeek || isTransitioning) return;
    setIsTransitioning(true);
    setTimeout(() => {
      setSelectedWeek(weekNumber);
      setTimeout(() => setIsTransitioning(false), 50);
    }, 200);
  };

  // Handle timeline hover state
  const handleTimelineHover = () => setIsHoveringTimeline(true);
  const handleTimelineLeave = () => setIsHoveringTimeline(false);

  const weeks = [
    {
      number: 1,
      date: "20th June 2025",
      image: "/register.jpeg",
      content: {
        sessions: [
          { time: "", title: "Step 1: Register and secure your spots" },
        ],
        description: "Submit your application with essential details to secure your spot."
      }
    },
    {
      number: 2,
      date: "1st July 2025",
      image: "/study-resources.jpeg",
      content: {
        sessions: [
          { time: "", title: "Step 2: Access Study Resources & Prepare" },
        ],
        description: "Use our curated materials to prepare for the upcoming competition."
      }
    },
    {
      number: 3,
      date: "13th July 2025",
      image: "/entry-round.jpeg",
      content: {
        sessions: [
          { time: "", title: "The Entry Round (Online)" },
        ],
        description: "Solve a short decision-making challenge designed to test how you think, not what you know."
      }
    },
    {
      number: 4,
      date: "25th July 2025",
      image: "/business-case.jpeg",
      content: {
        sessions: [
          { time: "", title: "Business Case Round (Online)" },
        ],
        description: "Look at a company's numbers and story, then submit your recommendation on what they should do next."
      }
    },
    {
      number: 5,
      date: "3rd August 2025",
      image: "/finals.jpeg",
      content: {
        sessions: [
          { time: "", title: "Finals (Offline/Online)" },
        ],
        description: "Break down real startup pitches, question the founders to finally decide will you invest or not. Then pitch your verdict to actual investors, or probably Sharks"
      }
    }
  ];

  const selectedWeekData = weeks.find(week => week.number === selectedWeek) || weeks[0];

  // Action Buttons Component
  const ActionButtons = () => (
    <div className="flex flex-row flex-wrap sm:flex-nowrap gap-3 md:gap-4 items-center justify-center pt-2">
      <Button
        asChild
        size="lg"
        className="w-full sm:w-auto bg-yellow-400 text-blue-900 hover:bg-yellow-300 font-extrabold shadow-lg border-2 border-yellow-400 hover:scale-105 transition-transform text-sm md:text-base py-2 px-3 md:px-4"
      >
        <Link href="/register" className="flex items-center justify-center gap-1 md:gap-2">
          <Zap className="w-3 h-3 md:w-4 md:h-4" />
          <span>SIGN UP NOW</span>
        </Link>
      </Button>

      <Button
        asChild
        size="lg"
        variant="outline"
        className="w-full sm:w-auto bg-yellow-400 text-blue-900 hover:bg-yellow-300 font-extrabold shadow-lg border-2 border-yellow-400 hover:scale-105 transition-transform text-sm md:text-base py-2 px-3 md:px-4"
      >
        <Link href="#process" className="flex items-center justify-center gap-1 md:gap-2">
          <span>KNOW MORE</span>
          <span>↓</span>
        </Link>
      </Button>
    </div>
  );

  return (
    <div className="text-white py-12">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-secondary mb-3">Programme Timeline</h2>
          <div className="w-48 h-1 bg-gradient-to-r from-blue-400 to-blue-600 mx-auto"></div>
        </div>

        {/* Tab Navigation */}
        <div className="flex mb-0 border-b border-gray-700 overflow-x-auto scrollbar-hide">
          {weeks.map((week) => (
            <button
              key={week.number}
              onClick={() => handleWeekChange(week.number)}
              className={`flex-1 pt-4 pb-3 px-2 md:px-4 transition-all duration-300 ease-in-out relative outline-none focus:outline-none rounded-t-md group ${
                selectedWeek === week.number
                  ? 'bg-gray-800/80 border-b-2 border-blue-400 z-10'
                  : 'bg-transparent hover:bg-gray-800/50'
              }`}
            >
              <div className="text-xs md:text-sm font-medium text-gray-400 group-hover:text-gray-300 transition-colors duration-300 text-center">
                STEP {week.number}
              </div>
              <div className={`text-sm md:text-base text-center font-semibold transition-colors duration-300 ${
                selectedWeek === week.number
                  ? 'text-blue-300'
                  : 'text-gray-300 group-hover:text-white'
              }`}>
                {week.date}
              </div>
            </button>
          ))}
        </div>

        {/* Content Area */}
        <div className="flex flex-col md:flex-row mt-10 md:mt-12 gap-8 md:gap-12">
          {/* Timeline */}
          <div
            ref={timelineRef}
            className="relative w-16 flex-shrink-0 hidden md:flex justify-center"
            onMouseEnter={handleTimelineHover}
            onMouseLeave={handleTimelineLeave}
          >
            <div className="absolute inset-0 cursor-pointer" onMouseEnter={handleTimelineHover}></div>
            <div className="absolute top-0 bottom-0 w-0.5">
              <div className="absolute inset-0 bg-secondary rounded-full"></div>
              <div 
                className={`absolute inset-0 bg-gradient-to-b from-blue-400 to-teal-400 rounded-full transition-all duration-500 ${
                  isHoveringTimeline ? 'opacity-100 shadow-glow' : 'opacity-0'
                }`}
              ></div>
            </div>
            <div className="sticky top-1/4">
              <div className={`mt-4 w-4 h-4 rounded-full bg-secondary shadow-lg transition-all duration-300 ${
                isHoveringTimeline ? 'scale-125 bg-blue-400' : ''
              }`}></div>
            </div>
          </div>

          {/* Content Cards */}
          <div className="flex-grow flex flex-col md:flex-row items-stretch gap-6">
            {/* Description Box */}
            <div className="flex-1 backdrop-blur-sm border border-gray-700/30 rounded-xl p-6 md:p-8 shadow-xl transition-all duration-300 ease-in-out md:min-h-[300px] flex flex-col">
              {/* Title */}
              <div className={`transition-opacity duration-300 ease-in-out ${
                isTransitioning ? 'opacity-0' : 'opacity-100'
              }`}>
                <h2 className="text-2xl md:text-3xl font-bold mb-8 text-gray-200 flex items-center gap-3">
                  <FiCalendar className="text-blue-400" />
                  {selectedWeekData.content.sessions[0]?.title || `Step ${selectedWeekData.number} Details`}
                </h2>
              </div>
              
              {/* Description */}
              <div className={`text-gray-200 leading-relaxed text-base md:text-lg flex-grow transition-opacity duration-300 ease-in-out ${
                isTransitioning ? 'opacity-0' : 'opacity-100'
              }`}>
                {selectedWeekData.content.description}
              </div>
            </div>

            {/* Image */}
            <div className="flex-1 md:max-w-[40%]">
              <div className="h-full rounded-xl overflow-hidden border border-gray-700/30 shadow-md">
                <img
                  src={selectedWeekData.image}
                  alt={`Step ${selectedWeekData.number} Illustration`}
                  className={`w-full h-full object-cover transition-opacity duration-300 ease-in-out ${
                    isTransitioning ? 'opacity-0' : 'opacity-100'
                  }`}
                  style={{ objectFit: 'cover', minHeight: '300px' }}
                />
              </div>
            </div>
          </div>
        </div>
        
        {/* Action Buttons - Now positioned below both columns and centered */}
        <div className={`mt-10 md:mt-12 mx-auto max-w-lg transition-opacity duration-300 ease-in-out ${
          isTransitioning ? 'opacity-0' : 'opacity-100'
        }`}>
          <ActionButtons />
        </div>
      </div>

      {/* Custom CSS */}
      <style jsx>{`
        .shadow-glow {
          box-shadow: 0 0 15px rgba(56, 189, 248, 0.6), 0 0 30px rgba(56, 189, 248, 0.3);
        }
        
        /* Ensure scrollbar is hidden on timeline navigation */
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        
        /* Responsive styles */
        @media (max-width: 768px) {
          .flex-col-mobile {
            flex-direction: column;
          }
        }
      `}</style>
    </div>
  );
}