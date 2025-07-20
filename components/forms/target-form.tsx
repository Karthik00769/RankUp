"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft, ArrowRight, Briefcase, Code, Trophy } from "lucide-react"
import type { ResumeData } from "@/types/resume"

interface TargetFormProps {
  data: ResumeData
  updateData: (section: keyof ResumeData, data: any) => void
  onNext: () => void
  onPrev: () => void
  isFirst: boolean
  isLast: boolean
}

export default function TargetForm({ data, updateData, onNext, onPrev }: TargetFormProps) {
  const [target, setTarget] = useState({
    type: data.target?.type || "job",
    description: data.target?.description || "",
    industry: data.target?.industry || "",
    role: data.target?.role || "",
  })

  useEffect(() => {
    updateData("target", target)
  }, [target, updateData])

  const handleChange = (field: string, value: string) => {
    setTarget((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const targetTypes = [
    {
      id: "job",
      title: "Full-time Job",
      description: "Looking for permanent employment opportunities",
      icon: Briefcase,
    },
    {
      id: "internship",
      title: "Internship",
      description: "Seeking internship opportunities to gain experience",
      icon: Code,
    },
    {
      id: "hackathon",
      title: "Hackathon",
      description: "Participating in hackathons and competitions",
      icon: Trophy,
    },
  ]

  const industries = [
    "Technology/Software",
    "Finance/Banking",
    "Healthcare",
    "E-commerce",
    "Education",
    "Gaming",
    "Consulting",
    "Startup",
    "Government",
    "Non-profit",
    "Other",
  ]

  const roles = {
    job: [
      "Software Developer",
      "Frontend Developer",
      "Backend Developer",
      "Full Stack Developer",
      "Data Scientist",
      "DevOps Engineer",
      "Product Manager",
      "UI/UX Designer",
      "Quality Assurance",
      "Business Analyst",
    ],
    internship: [
      "Software Development Intern",
      "Data Science Intern",
      "Product Management Intern",
      "UI/UX Design Intern",
      "Marketing Intern",
      "Research Intern",
      "Business Development Intern",
    ],
    hackathon: [
      "Full Stack Developer",
      "Frontend Specialist",
      "Backend Specialist",
      "Data Scientist",
      "UI/UX Designer",
      "Team Lead",
      "Idea Generator",
    ],
  }

  const isValid = target.type && target.description

  return (
    <div className="space-y-6">
      <div>
        <Label className="text-gray-300 text-lg mb-4 block">What are you targeting? *</Label>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {targetTypes.map((type) => {
            const Icon = type.icon
            return (
              <Card
                key={type.id}
                className={`cursor-pointer transition-all ${
                  target.type === type.id
                    ? "bg-purple-500/20 border-purple-500"
                    : "bg-white/5 border-gray-600 hover:bg-white/10"
                }`}
                onClick={() => handleChange("type", type.id)}
              >
                <CardHeader className="text-center">
                  <div className="w-12 h-12 mx-auto mb-2 bg-purple-500/20 rounded-lg flex items-center justify-center">
                    <Icon className="h-6 w-6 text-purple-400" />
                  </div>
                  <CardTitle className="text-white text-lg">{type.title}</CardTitle>
                  <CardDescription className="text-gray-400">{type.description}</CardDescription>
                </CardHeader>
              </Card>
            )
          })}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <Label className="text-gray-300">Preferred Industry</Label>
          <Select onValueChange={(value) => handleChange("industry", value)}>
            <SelectTrigger className="bg-white/10 border-gray-600 text-white">
              <SelectValue placeholder="Select industry" />
            </SelectTrigger>
            <SelectContent>
              {industries.map((industry) => (
                <SelectItem key={industry} value={industry}>
                  {industry}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label className="text-gray-300">Target Role</Label>
          <Select onValueChange={(value) => handleChange("role", value)}>
            <SelectTrigger className="bg-white/10 border-gray-600 text-white">
              <SelectValue placeholder="Select role" />
            </SelectTrigger>
            <SelectContent>
              {roles[target.type as keyof typeof roles]?.map((role) => (
                <SelectItem key={role} value={role}>
                  {role}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div>
        <Label className="text-gray-300">Career Objective/Goal *</Label>
        <Textarea
          value={target.description}
          onChange={(e) => handleChange("description", e.target.value)}
          className="bg-white/10 border-gray-600 text-white placeholder-gray-400 min-h-[120px]"
          placeholder={`Describe your career goals and what you're looking for in ${
            target.type === "job" ? "a job" : target.type === "internship" ? "an internship" : "hackathon participation"
          }...`}
        />
        <div className="text-sm text-gray-400 mt-2">
          This will help our AI generate a more targeted resume for your specific goals.
        </div>
      </div>

      <div className="flex justify-between">
        <Button
          onClick={onPrev}
          variant="outline"
          className="border-gray-600 text-gray-300 hover:bg-gray-800 bg-transparent"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Previous
        </Button>

        <Button
          onClick={onNext}
          disabled={!isValid}
          className="bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-700 hover:to-cyan-700"
        >
          Generate Resume <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </div>
  )
}
