import { Card, CardHeader, CardContent } from "@/components/ui/card"
import { cn } from "@/lib/utils" // Assuming you have a utility for classnames

// SVG component for the wavy underline with gradient
const WavyUnderline = ({ gradientId = "blueYellowGradient", className }) => (
  <svg
    viewBox="0 0 100 6"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={cn("h-[6px] mt-1 block", className)}
    preserveAspectRatio="none"
  >
    <defs>
      <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" style={{ stopColor: '#3B82F6', stopOpacity: 1 }} /> {/* Blue */}
        <stop offset="100%" style={{ stopColor: '#FACC15', stopOpacity: 1 }} /> {/* Yellow */}
      </linearGradient>
    </defs>
    <path
      d="M0 3 Q 12.5 6, 25 3 T 50 3 T 75 3 T 100 3"
      stroke={`url(#${gradientId})`}
      strokeWidth="1.5"
      fill="transparent"
    />
  </svg>
);


export function PricingCards() {
  return (
    // Outer container with increased max-width
    // Changed max-w-5xl to max-w-6xl
    <div className="max-w-7xl  mx-auto px-4 py-16">
      <div className="text-center">
          <h2 className="text-4xl font-bold text-secondary mb-2">Pricing</h2>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-400 to-blue-600 mx-auto mb-16"></div>
        </div>
        <br/>
      {/* Main container using flexbox for layout */}
      <div className="flex flex-col md:flex-row gap-0 relative mb-16">


        {/* Card 1 - Pricing Info (Dark Theme) */}
        <Card
          className={cn(
            "w-full md:w-1/2 bg-primary text-white rounded-xl", // Stays md:w-1/2 to share the new wider space
            "transition-all duration-300 z-10",
            "hover:shadow-lg"
          )}
        >
          <CardHeader className="pb-4 pt-8">
            <div className="font-semibold text-white-400 tracking-widest uppercase text-xl">
              + Cost and Logistics
            </div>
          </CardHeader>
          <CardContent className="space-y-8 py-8">
            {/* Individual Price */}
            <div>
              <div className="text-m text-white">Price (for individual participation):</div>
              <div className="inline-block relative">
                <div className="text-white font-bold text-2xl mt-1">
                  INR 3,500/-
                </div>
                <WavyUnderline className="w-50%" />
              </div>
            </div>

            {/* Group Price */}
            
          </CardContent>
        </Card>

        {/* Card 2 - Format & Facilities (Light Theme - Offset) */}
        <Card
          className={cn(
            "w-full h-max md:w-1/2 bg-secondary text-white-800 rounded-2xl shadow-2xl", // Stays md:w-1/2
            "transition-all duration-300",
            "hover:shadow-2xl",
            "-mt-0 md:-mt-6 md:-ml-8",
            "z-0"
          )}
        >
          <CardContent className="space-y-6 py-12 px-8">
             <div className="text-m font-medium text-white-700">
               + Hybrid Format: Students attend the first two rounds online. Final round attendance is optional to be attended both online/offline.
            </div>
             <div className="text-m font-medium text-white-700">
               + Includes learning resources, competition access, and hospitality provisions
            </div>
             
          </CardContent>
        </Card>

      </div>
    </div>
  );
}

export default PricingCards;