"use client"

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

const SharkathonFAQ = () => {
  return (
    <Accordion type="single" collapsible className="w-full">
      <AccordionItem value="item-1">
        <AccordionTrigger className="text-left font-medium text-primary">
          Who is eligible to participate in Sharkathon?
        </AccordionTrigger>
        <AccordionContent className="text-gray-600">
          Students from Grades 9 to 12 across India can participate.
        </AccordionContent>
      </AccordionItem>

      <AccordionItem value="item-2">
        <AccordionTrigger className="text-left font-medium text-primary">
          Is there a registration fee to participate?
        </AccordionTrigger>
        <AccordionContent className="text-gray-600">
          Yes, there is a registration fee of ₹2,500 (including GST), which covers study materials and participation
          costs.
        </AccordionContent>
      </AccordionItem>

      <AccordionItem value="item-3">
        <AccordionTrigger className="text-left font-medium text-primary">
          What is the format of the competition?
        </AccordionTrigger>
        <AccordionContent className="text-gray-600">
          The competition consists of three rounds – an online critical thinking test, an online case study-based
          analysis, and a live offline business evaluation round where students act as investors.
        </AccordionContent>
      </AccordionItem>

      <AccordionItem value="item-4">
        <AccordionTrigger className="text-left font-medium text-primary">
          What support will I receive during the competition?
        </AccordionTrigger>
        <AccordionContent className="text-gray-600">
          Participants will receive study materials, mentorship from industry professionals, and access to exclusive
          learning sessions.
        </AccordionContent>
      </AccordionItem>

      <AccordionItem value="item-5">
        <AccordionTrigger className="text-left font-medium text-primary">
          How are the winners selected?
        </AccordionTrigger>
        <AccordionContent className="text-gray-600">
          Winners are judged based on their analytical skills, strategic decision-making, and ability to evaluate
          investment opportunities effectively.
        </AccordionContent>
      </AccordionItem>

      <AccordionItem value="item-6">
        <AccordionTrigger className="text-left font-medium text-primary">
          Can I participate in Sharkathon multiple years?
        </AccordionTrigger>
        <AccordionContent className="text-gray-600">
          Yes, students can participate every year if they meet the eligibility criteria.
        </AccordionContent>
      </AccordionItem>

      <AccordionItem value="item-7">
        <AccordionTrigger className="text-left font-medium text-primary">
          How much time commitment is required?
        </AccordionTrigger>
        <AccordionContent className="text-gray-600">
          The competition requires approximately 20-30 hours of preparation, including study materials and practice
          sessions.
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  )
}

export default SharkathonFAQ

