"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem
} from "@/components/ui/select"
import { submitRegistration } from "@/app/actions/registration"

const RegistrationForm = () => {
  const [formStep, setFormStep] = useState(1)
  const [formSubmitted, setFormSubmitted] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formError, setFormError] = useState("")
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    school: "",
    grade: "",
    teamName: "",
    teamSize: "",
    projectIdea: "",
    howHeard: "",
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (name: string, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const nextStep = () => {
    if (
      !formData.firstName ||
      !formData.lastName ||
      !formData.email ||
      !formData.phone ||
      !formData.school ||
      !formData.grade
    ) {
      setFormError("Please fill in all required fields")
      return
    }
    setFormError("")
    setFormStep(formStep + 1)
  }

  const prevStep = () => {
    setFormError("")
    setFormStep(formStep - 1)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (
      !formData.teamName ||
      !formData.teamSize ||
      !formData.projectIdea ||
      !formData.howHeard
    ) {
      setFormError("Please fill in all required fields")
      return
    }

    setFormError("")
    setIsSubmitting(true)

    try {
      const form = e.target as HTMLFormElement
      const formDataPayload = new FormData(form)
      formDataPayload.append("program", "sharkathon")

      await submitRegistration(formDataPayload)
      setFormSubmitted(true)
    } catch (error) {
      setFormError("Something went wrong. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  if (formSubmitted) {
    return (
      <Card className="border-none shadow-lg">
        <CardContent className="p-6">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-primary mb-4">Registration Successful!</h2>
            <p className="mb-6">Thanks for registering for Sharkathon. We'll be in touch soon!</p>
            <Button
              onClick={() => {
                setFormSubmitted(false)
                setFormStep(1)
                setFormData({
                  firstName: "",
                  lastName: "",
                  email: "",
                  phone: "",
                  school: "",
                  grade: "",
                  teamName: "",
                  teamSize: "",
                  projectIdea: "",
                  howHeard: "",
                })
              }}
            >
              Register Another
            </Button>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="border-none shadow-lg">
      <CardContent className="p-6">
        <form onSubmit={handleSubmit}>
          {formError && <div className="mb-6 p-4 bg-red-50 text-red-600 rounded-md">{formError}</div>}

          {formStep === 1 && (
            <div className="space-y-8">
              <div className="space-y-4">
                <h3 className="text-xl font-bold text-primary mb-4">Personal Information</h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">First Name *</Label>
                    <Input name="firstName" value={formData.firstName} onChange={handleInputChange} required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">Last Name *</Label>
                    <Input name="lastName" value={formData.lastName} onChange={handleInputChange} required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email *</Label>
                    <Input type="email" name="email" value={formData.email} onChange={handleInputChange} required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone *</Label>
                    <Input name="phone" value={formData.phone} onChange={handleInputChange} required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="school">School *</Label>
                    <Input name="school" value={formData.school} onChange={handleInputChange} required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="grade">Grade Level *</Label>
                    <Select name="grade" value={formData.grade} onValueChange={(value) => handleSelectChange("grade", value)} required>
                      <SelectTrigger id="grade">
                        <SelectValue placeholder="Select grade" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="9">9th Grade</SelectItem>
                        <SelectItem value="10">10th Grade</SelectItem>
                        <SelectItem value="11">11th Grade</SelectItem>
                        <SelectItem value="12">12th Grade</SelectItem>
                      </SelectContent>
                    </Select>
                    <input type="hidden" name="grade" value={formData.grade} />
                  </div>
                </div>

                <div className="flex justify-end mt-6">
                  <Button type="button" onClick={nextStep} className="bg-primary text-white hover:bg-primary/90">
                    Next Step
                  </Button>
                </div>
              </div>
            </div>
          )}

          {formStep === 2 && (
            <div className="space-y-4">
              <h3 className="text-xl font-bold text-primary mb-4">Team & Project Information</h3>

              <div className="space-y-2">
                <Label htmlFor="teamName">Team Name *</Label>
                <Input name="teamName" value={formData.teamName} onChange={handleInputChange} required />
              </div>

              <div className="space-y-2">
                <Label htmlFor="teamSize">Team Size *</Label>
                <Select name="teamSize" value={formData.teamSize} onValueChange={(value) => handleSelectChange("teamSize", value)} required>
                  <SelectTrigger id="teamSize">
                    <SelectValue placeholder="Select team size" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">1 member</SelectItem>
                    <SelectItem value="2">2 members</SelectItem>
                    <SelectItem value="3">3 members</SelectItem>
                    <SelectItem value="4">4 members</SelectItem>
                  </SelectContent>
                </Select>
                <input type="hidden" name="teamSize" value={formData.teamSize} />
              </div>

              <div className="space-y-2">
                <Label htmlFor="projectIdea">Project Idea *</Label>
                <Input name="projectIdea" value={formData.projectIdea} onChange={handleInputChange} required />
              </div>

              <div className="space-y-2">
                <Label htmlFor="howHeard">How did you hear about Sharkathon? *</Label>
                <Select name="howHeard" value={formData.howHeard} onValueChange={(value) => handleSelectChange("howHeard", value)} required>
                  <SelectTrigger id="howHeard">
                    <SelectValue placeholder="Select an option" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="school">School</SelectItem>
                    <SelectItem value="social">Social Media</SelectItem>
                    <SelectItem value="friend">Friend</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
                <input type="hidden" name="howHeard" value={formData.howHeard} />
              </div>

              <div className="flex justify-end mt-6">
                <Button
                  type="submit"
                  className="bg-primary text-white hover:bg-primary/90"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Submitting..." : "Submit Registration"}
                </Button>
              </div>
            </div>
          )}
        </form>
      </CardContent>
    </Card>
  )
}

export default RegistrationForm
