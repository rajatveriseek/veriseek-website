import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Trophy, Users } from "lucide-react"
import SharkathonTimeline from "@/components/sharkathon/timeline"
import RegistrationForm from "@/components/sharkathon/registration-form"
import SharkathonFAQ from "@/components/sharkathon/faq"
import React from "react"

// Import the image utility
import { getImageUrl } from "@/lib/image-utils"

export const metadata = {
  title: "Sharkathon | Veriseek Education's Premier Investment Competition",
  description:
    "Sharkathon is India's First inter school competition testing for Problem Solving, critical thinking, finance, Decision Making and communication skills.",
}

export default function SharkathonPage() {
  return (
    <React.Fragment>
      {/* Hero Section */}
      <section className="pt-32 pb-16 bg-primary text-white">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <div className="inline-block bg-secondary text-primary px-4 py-1 rounded-full text-sm font-medium">
                Now Accepting Applications
              </div>
              <h1 className="text-4xl md:text-5xl font-bold leading-tight">Sharkathon - Think like a shark</h1>
              <p className="text-lg md:text-xl opacity-90">
                India's First inter school competition testing for Problem Solving, critical thinking, finance, Decision
                Making and communication skills
              </p>
              <div className="flex flex-wrap gap-4">
                <Button
                  asChild
                  size="lg"
                  className="bg-secondary text-primary hover:bg-secondary/90 font-bold shadow-lg border-2 border-secondary transition-all hover:scale-105"
                >
                  <Link href="#register">Register Now</Link>
                </Button>
                <Button
                  asChild
                  size="lg"
                  variant="outline"
                  className="border-white text-white hover:bg-white/20 font-bold border-2 shadow-lg transition-all hover:scale-105 [&>a]:text-white"
                >
                  <Link href="#process">Learn More</Link>
                </Button>
              </div>
            </div>
            <div className="relative">
              {/* Replace the hero section image */}
              <Image
                src={getImageUrl("sharkathon-hero") || "/placeholder.svg"}
                alt="Students evaluating business ideas at Sharkathon"
                width={600}
                height={400}
                className="rounded-lg shadow-xl"
              />
              <div className="absolute -bottom-6 -left-6 bg-white p-4 rounded-lg shadow-lg">
                <div className="flex items-center gap-3">
                  <div className="bg-secondary p-2 rounded-full">
                    <Trophy className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <p className="text-primary font-bold">Recognition & Awards</p>
                    <p className="text-sm text-gray-600">for Top Performers</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Competition Overview */}
      <section className="py-16" id="overview">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-primary">Why Join Sharkathon?</h2>
            <p className="text-gray-600 mt-2 max-w-2xl mx-auto">
              Built by experts from MIT, Wharton, and IIT, Sharkathon is designed to transform
              students into future-ready leaders by equipping them with high-impact, real-world skills.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-16">
            <div className="space-y-4">
              <div className="text-3xl font-bold text-primary">01.</div>
              <h3 className="text-lg font-semibold text-primary">Critical Thinking & Strategic Decision-Making</h3>
              <p className="text-gray-600">Master structured thinking, problem-solving, and real-world decision-making essential for
              future CEOs, entrepreneurs and industry leaders.</p>
            </div>

            <div className="space-y-4">
              <div className="text-3xl font-bold text-primary">02.</div>
              <h3 className="text-lg font-semibold text-primary">Business & Investment Skills</h3>
              <p className="text-gray-600">Learn data analysis, assess business models, and think like an investor, the same
              skills sharks, top executives and startup founders use to evaluate opportunities.</p>
            </div>

            <div className="space-y-4">
              <div className="text-3xl font-bold text-primary">03.</div>
              <h3 className="text-lg font-semibold text-primary">Effective Communication & Persuasion</h3>
              <p className="text-gray-600">Develop the ability to ask the right questions, challenge ideas, and articulate
              compelling investment rationales, crucial for success in business and beyond.</p>
            </div>

            <div className="space-y-4">
              <div className="text-3xl font-bold text-primary">04.</div>
              <h3 className="text-lg font-semibold text-primary">Future-Ready Career Advantage</h3>
              <p className="text-gray-600">Gain a competitive edge in college applications and careers by demonstrating real-
              world business experience, leadership, and high-stakes decision-making skills.</p>
            </div>

            <div className="space-y-4">
              <div className="text-3xl font-bold text-primary">05.</div>
              <h3 className="text-lg font-semibold text-primary">Exclusive Industry Access & Internships</h3>
              <p className="text-gray-600">Get mentored by top investors, venture capitalists, and business leaders while
              accessing internship opportunities that set you apart.</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            <Card className="border-none shadow-lg">
              <CardContent className="p-6">
                <h3 className="text-xl font-bold text-primary mb-4">Eligibility & Fee</h3>
                <ul className="space-y-3 text-gray-600">
                  <li>• Open to individual students from Classes 9 to 12</li>
                  <li>• Fees: INR 2,500 (inclusive of taxes)</li>
                  <li>• Includes learning resources, competition access, and event-day provisions</li>
                  <li>• No prior commerce knowledge required, focus on logic, problem-solving, and
                  decision-making</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-none shadow-lg">
              <CardContent className="p-6">
                <h3 className="text-xl font-bold text-primary mb-4">Important Dates</h3>
                <ul className="space-y-3 text-gray-600">
                  <li>• Registration Deadline: 20th June 2025</li>
                  <li>• Access to Learning Resources: 1st July 2025</li>
                  <li>• Intra-School Test (Online): 13th July 2025</li>
                  <li>• Inter-School Case Study Round (Online): 25th July 2025</li>
                  <li>• National Finals (Delhi NCR/Online): 3rd August 2025</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-none shadow-lg">
              <CardContent className="p-6">
                <h3 className="text-xl font-bold text-primary mb-4">Skills You Will Gain</h3>
                <ul className="space-y-3 text-gray-600">
                  <li>• Critical Thinking</li>
                  <li>• Problem-Solving</li>
                  <li>• Decision-Making</li>
                  <li>• Startup Investing Skills</li>
                  <li>• Communication</li>
                </ul>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-8">
            <h2 className="text-3xl font-bold text-primary text-center">Simulation Process</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <Card className="border-none shadow-lg bg-primary text-white">
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold mb-4">Step 1: Foundation (Online Test)</h3>
                  <p className="text-white/90">
                    Assess your business acumen through a proctored online test designed to challenge your
                    analytical skills, critical thinking and problem-solving skills.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-none shadow-lg bg-primary text-white">
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold mb-4">Step 2: Case Study Analysis</h3>
                  <p className="text-white/90">
                    Analyse real-world business scenarios, evaluate data, and develop strategic insights.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-none shadow-lg bg-primary text-white">
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold mb-4">Step 3: Live Business Pitches</h3>
                  <p className="text-white/90">
                    Engage with real entrepreneurs, ask critical investment questions, and decide, would you
                    invest? Gain direct exposure to how top investors think.
                  </p>
                </CardContent>
              </Card>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-lg mt-8">
              <div className="flex items-center gap-4">
                <Users className="h-12 w-12 text-primary" />
                <p className="text-gray-700">
                  <span className="font-bold text-primary">Expert Judging Panel:</span> Evaluation by eminent venture
                  capital, debt firms, and leading CXOs from startups, ensuring high-level scrutiny and real-world
                  relevance.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Competition Process */}
      <section className="py-16 bg-gray-50" id="process">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-primary">The Sharkathon Journey</h2>
            <p className="text-gray-600 mt-2 max-w-2xl mx-auto">
              From registration to the final evaluation, follow the path to success
            </p>
          </div>

          <SharkathonTimeline />
          <div className="text-center mb-12 mt-12">
            <h2 className="text-3xl font-bold text-primary">Competition Process</h2>
            <p className="text-gray-600 mt-2 max-w-2xl mx-auto">
              Experience our comprehensive program that develops your investment acumen and analytical skills
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            <div className="relative h-[300px] rounded-lg overflow-hidden">
              {/* Replace the competition process images */}
              <Image
                src={getImageUrl("sharkathon-mentorship") || "/placeholder.svg"}
                alt="Mentorship session at Veriseek"
                fill
                className="object-cover"
              />
            </div>
            <div className="relative h-[300px] rounded-lg overflow-hidden">
              {/* Replace the competition process images */}
              <Image
                src={getImageUrl("sharkathon-workshop") || "/placeholder.svg"}
                alt="Student participation in Sharkathon workshop"
                fill
                className="object-cover"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="border-none shadow-lg bg-primary text-white">
              <CardContent className="p-6">
                <h3 className="text-xl font-bold mb-4">Stage 1: Intra-School Round</h3>
                <p className="text-white/90">
                  Students begin their Sharkathon journey with an online, proctored MCQ test designed to assess critical
                  thinking, problem-solving, and analytical reasoning skills. The top performers from each school will
                  qualify for the next stage.
                </p>
              </CardContent>
            </Card>
            <Card className="border-none shadow-lg bg-primary text-white">
              <CardContent className="p-6">
                <h3 className="text-xl font-bold mb-4">Stage 2: Inter-School Quarter-Finals</h3>
                <p className="text-white/90">
                  Qualified students form teams of three and engage in a strategic case study analysis. They will assess
                  financial data from real businesses, identify key insights, and develop strategic recommendations.
                  Submissions are evaluated on analytical depth, creativity, feasibility, and clarity.
                </p>
              </CardContent>
            </Card>
            <Card className="border-none shadow-lg bg-primary text-white">
              <CardContent className="p-6">
                <h3 className="text-xl font-bold mb-4">Stage 3: Semi-Finals and Finals</h3>
                <p className="text-white/90">
                  Top-performing teams advance to the final stage, where they will evaluate live business pitches from
                  real entrepreneurs and industry professionals. They will need to ask the right questions, assess
                  financial viability, and justify investment decisions. The best teams will be recognised with awards
                  and certificates.
                </p>
              </CardContent>
            </Card>
          </div>

          <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="relative h-[300px] rounded-lg overflow-hidden">
              {/* Replace the competition process images */}
              <Image
                src={getImageUrl("sharkathon-presentation") || "/placeholder.svg"}
                alt="Professional evaluation presentation"
                fill
                className="object-cover"
              />
            </div>
            <div className="relative h-[300px] rounded-lg overflow-hidden">
              {/* Replace the competition process images */}
              <Image
                src={getImageUrl("sharkathon-panel") || "/placeholder.svg"}
                alt="Expert panel discussion"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Registration Form */}
      <section className="py-16 bg-gray-50" id="register">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-primary">Register for Sharkathon</h2>
            <p className="text-gray-600 mt-2 max-w-2xl mx-auto">
              Take the first step toward an incredible investment evaluation journey
            </p>
          </div>

          <div className="max-w-3xl mx-auto">
            <RegistrationForm />
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-primary">Frequently Asked Questions</h2>
            <p className="text-gray-600 mt-2 max-w-2xl mx-auto">Find answers to common questions about Sharkathon</p>
          </div>

          <div className="max-w-3xl mx-auto">
            <SharkathonFAQ />
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-primary text-white">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <h2 className="text-3xl font-bold">Ready to Think Like an Investor?</h2>
            <p className="text-white/80">
              Join Sharkathon today and embark on an exciting journey of critical thinking, analysis, and investment
              evaluation.
            </p>
            <Button
              asChild
              size="lg"
              className="bg-secondary text-primary hover:bg-secondary/90 font-bold shadow-lg border-2 border-secondary transition-all hover:scale-105"
            >
              <Link href="#register">Register Now</Link>
            </Button>
          </div>
        </div>
      </section>
    </React.Fragment>
  )
}

