"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { ArrowRight } from "lucide-react"
import type { ResumeData } from "@/types/resume"

interface PersonalInfoFormProps {
  data: ResumeData
  updateData: (section: keyof ResumeData, data: any) => void
  onNext: () => void
  onPrev: () => void
  isFirst: boolean
  isLast: boolean
}

export default function PersonalInfoForm({ data, updateData, onNext }: PersonalInfoFormProps) {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    location: "",
    linkedin: "",
    github: "",
    portfolio: "",
    summary: "",
    ...data.personal,
  })

  useEffect(() => {
    updateData("personal", formData)
  }, [formData, updateData])

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const isValid = formData.fullName && formData.email && formData.phone

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <Label htmlFor="fullName" className="text-gray-300">
            Full Name *
          </Label>
          <Input
            id="fullName"
            value={formData.fullName}
            onChange={(e) => handleChange("fullName", e.target.value)}
            className="bg-white/10 border-gray-600 text-white placeholder-gray-400"
            placeholder="Enter your full name"
          />
        </div>

        <div>
          <Label htmlFor="email" className="text-gray-300">
            Email *
          </Label>
          <Input
            id="email"
            type="email"
            value={formData.email}
            onChange={(e) => handleChange("email", e.target.value)}
            className="bg-white/10 border-gray-600 text-white placeholder-gray-400"
            placeholder="your.email@example.com"
          />
        </div>

        <div>
          <Label htmlFor="phone" className="text-gray-300">
            Phone Number *
          </Label>
          <Input
            id="phone"
            value={formData.phone}
            onChange={(e) => handleChange("phone", e.target.value)}
            className="bg-white/10 border-gray-600 text-white placeholder-gray-400"
            placeholder="+91 9876543210"
          />
        </div>

        <div>
          <Label htmlFor="location" className="text-gray-300">
            Location
          </Label>
          <Input
            id="location"
            value={formData.location}
            onChange={(e) => handleChange("location", e.target.value)}
            className="bg-white/10 border-gray-600 text-white placeholder-gray-400"
            placeholder="City, State"
          />
        </div>

        <div>
          <Label htmlFor="linkedin" className="text-gray-300">
            LinkedIn Profile
          </Label>
          <Input
            id="linkedin"
            value={formData.linkedin}
            onChange={(e) => handleChange("linkedin", e.target.value)}
            className="bg-white/10 border-gray-600 text-white placeholder-gray-400"
            placeholder="linkedin.com/in/yourprofile"
          />
        </div>

        <div>
          <Label htmlFor="github" className="text-gray-300">
            GitHub Profile
          </Label>
          <Input
            id="github"
            value={formData.github}
            onChange={(e) => handleChange("github", e.target.value)}
            className="bg-white/10 border-gray-600 text-white placeholder-gray-400"
            placeholder="github.com/yourusername"
          />
        </div>
      </div>

      <div>
        <Label htmlFor="portfolio" className="text-gray-300">
          Portfolio Website
        </Label>
        <Input
          id="portfolio"
          value={formData.portfolio}
          onChange={(e) => handleChange("portfolio", e.target.value)}
          className="bg-white/10 border-gray-600 text-white placeholder-gray-400"
          placeholder="https://yourportfolio.com"
        />
      </div>

      <div>
        <Label htmlFor="summary" className="text-gray-300">
          Professional Summary
        </Label>
        <Textarea
          id="summary"
          value={formData.summary}
          onChange={(e) => handleChange("summary", e.target.value)}
          className="bg-white/10 border-gray-600 text-white placeholder-gray-400 min-h-[100px]"
          placeholder="Brief description of your background, skills, and career objectives..."
        />
      </div>

      <div className="flex justify-end">
        <Button
          onClick={onNext}
          disabled={!isValid}
          className="bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-700 hover:to-cyan-700"
        >
          Next Step <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </div>
  )
}
