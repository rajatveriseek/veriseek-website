"use client"

import { useState, useEffect, useCallback } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { ChevronLeft, ChevronRight, Quote } from "lucide-react"

type Testimonial = {
  id: number
  quote: string
  name: string
  title: string
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    quote:
      "The entrepreneurship workshop opened my eyes to possibilities I never considered before. The mentors were supportive and the network I built has been incredibly valuable for my future plans.",
    name: "Rohil",
    title: "Entrepreneurship Workshop Participant",
  },
  {
    id: 2,
    quote:
      "Participating in Sharkathon was a game-changer for me. I learned how to think critically about business ideas and gained confidence in my analytical abilities.",
    name: "Anish",
    title: "Sharkathon Finalist",
  },
  {
    id: 3,
    quote:
      "The financial literacy program taught me practical skills that I use every day. Understanding investment and budgeting at a young age has given me a huge advantage.",
    name: "Ayush",
    title: "Financial Literacy Program Graduate",
  },
  {
    id: 4,
    quote:
      "The mentorship I received through Veriseek helped me develop my business idea from concept to reality. I'm now running my own small business while still in high school!",
    name: "Yash",
    title: "Student Entrepreneur",
  },
]

export default function TestimonialCarousel() {
  const [activeIndex, setActiveIndex] = useState(0)

  const nextTestimonial = useCallback(() => {
    setActiveIndex((current) => (current + 1) % testimonials.length)
  }, [])

  const prevTestimonial = useCallback(() => {
    setActiveIndex((current) => (current - 1 + testimonials.length) % testimonials.length)
  }, [])

  useEffect(() => {
    const interval = setInterval(nextTestimonial, 8000)
    return () => clearInterval(interval)
  }, [nextTestimonial])

  return (
    <div className="relative">
      <div className="overflow-hidden">
        <div className="flex items-center justify-center">
          <Card className="border-none shadow-lg max-w-3xl">
            <CardContent className="p-8">
              <div className="flex flex-col items-center text-center space-y-4">
                <Quote className="h-12 w-12 text-secondary opacity-80" />
                <p className="text-lg text-gray-700 italic">"{testimonials[activeIndex].quote}"</p>
                <div>
                  <p className="font-semibold text-primary">{testimonials[activeIndex].name}</p>
                  <p className="text-sm text-gray-500">{testimonials[activeIndex].title}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <button
        onClick={prevTestimonial}
        className="absolute left-0 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full shadow-md"
        aria-label="Previous testimonial"
      >
        <ChevronLeft className="h-6 w-6 text-primary" />
      </button>

      <button
        onClick={nextTestimonial}
        className="absolute right-0 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full shadow-md"
        aria-label="Next testimonial"
      >
        <ChevronRight className="h-6 w-6 text-primary" />
      </button>

      <div className="flex justify-center mt-6 space-x-2">
        {testimonials.map((_, index) => (
          <button
            key={index}
            onClick={() => setActiveIndex(index)}
            className={`h-2 w-2 rounded-full ${activeIndex === index ? "bg-primary" : "bg-gray-300"} transition-colors`}
            aria-label={`Go to testimonial ${index + 1}`}
          />
        ))}
      </div>
    </div>
  )
}

