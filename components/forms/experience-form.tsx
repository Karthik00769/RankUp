"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft, ArrowRight, Plus, Trash2 } from "lucide-react"
import type { ResumeData } from "@/types/resume"

interface ExperienceFormProps {
  data: ResumeData
  updateData: (section: keyof ResumeData, data: any) => void
  onNext: () => void
  onPrev: () => void
  isFirst: boolean
  isLast: boolean
}

interface Experience {
  id: string
  type: "internship" | "project" | "work" | "hackathon"
  title: string
  company: string
  location: string
  startDate: string
  endDate: string
  current: boolean
  description: string
  technologies: string
}

export default function ExperienceForm({ data, updateData, onNext, onPrev }: ExperienceFormProps) {
  const [experienceList, setExperienceList] = useState<Experience[]>(
    data.experience.length > 0
      ? data.experience
      : [
          {
            id: "1",
            type: "project",
            title: "",
            company: "",
            location: "",
            startDate: "",
            endDate: "",
            current: false,
            description: "",
            technologies: "",
          },
        ],
  )

  useEffect(() => {
    updateData("experience", experienceList)
  }, [experienceList, updateData])

  const addExperience = () => {
    const newExperience: Experience = {
      id: Date.now().toString(),
      type: "project",
      title: "",
      company: "",
      location: "",
      startDate: "",
      endDate: "",
      current: false,
      description: "",
      technologies: "",
    }
    setExperienceList([...experienceList, newExperience])
  }

  const removeExperience = (id: string) => {
    if (experienceList.length > 1) {
      setExperienceList(experienceList.filter((exp) => exp.id !== id))
    }
  }

  const updateExperience = (id: string, field: keyof Experience, value: any) => {
    setExperienceList(experienceList.map((exp) => (exp.id === id ? { ...exp, [field]: value } : exp)))
  }

  const getTypeLabel = (type: string) => {
    switch (type) {
      case "internship":
        return "Internship"
      case "project":
        return "Project"
      case "work":
        return "Work Experience"
      case "hackathon":
        return "Hackathon"
      default:
        return "Experience"
    }
  }

  const getCompanyLabel = (type: string) => {
    switch (type) {
      case "internship":
        return "Company"
      case "project":
        return "Organization/Personal"
      case "work":
        return "Company"
      case "hackathon":
        return "Event Name"
      default:
        return "Company/Organization"
    }
  }

  return (
    <div className="space-y-6">
      {experienceList.map((experience, index) => (
        <Card key={experience.id} className="bg-white/5 border-gray-600">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-white text-lg">
              {getTypeLabel(experience.type)} {index + 1}
            </CardTitle>
            {experienceList.length > 1 && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => removeExperience(experience.id)}
                className="text-red-400 hover:text-red-300"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            )}
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label className="text-gray-300">Type</Label>
                <Select onValueChange={(value) => updateExperience(experience.id, "type", value)}>
                  <SelectTrigger className="bg-white/10 border-gray-600 text-white">
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="project">Project</SelectItem>
                    <SelectItem value="internship">Internship</SelectItem>
                    <SelectItem value="work">Work Experience</SelectItem>
                    <SelectItem value="hackathon">Hackathon</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label className="text-gray-300">Title/Role</Label>
                <Input
                  value={experience.title}
                  onChange={(e) => updateExperience(experience.id, "title", e.target.value)}
                  className="bg-white/10 border-gray-600 text-white placeholder-gray-400"
                  placeholder="Software Developer Intern"
                />
              </div>

              <div>
                <Label className="text-gray-300">{getCompanyLabel(experience.type)}</Label>
                <Input
                  value={experience.company}
                  onChange={(e) => updateExperience(experience.id, "company", e.target.value)}
                  className="bg-white/10 border-gray-600 text-white placeholder-gray-400"
                  placeholder="Company/Organization name"
                />
              </div>

              <div>
                <Label className="text-gray-300">Location</Label>
                <Input
                  value={experience.location}
                  onChange={(e) => updateExperience(experience.id, "location", e.target.value)}
                  className="bg-white/10 border-gray-600 text-white placeholder-gray-400"
                  placeholder="City, State or Remote"
                />
              </div>

              <div>
                <Label className="text-gray-300">Start Date</Label>
                <Input
                  type="month"
                  value={experience.startDate}
                  onChange={(e) => updateExperience(experience.id, "startDate", e.target.value)}
                  className="bg-white/10 border-gray-600 text-white"
                />
              </div>

              <div>
                <Label className="text-gray-300">End Date</Label>
                <Input
                  type="month"
                  value={experience.endDate}
                  onChange={(e) => updateExperience(experience.id, "endDate", e.target.value)}
                  className="bg-white/10 border-gray-600 text-white"
                  disabled={experience.current}
                />
                <div className="flex items-center mt-2">
                  <input
                    type="checkbox"
                    id={`current-${experience.id}`}
                    checked={experience.current}
                    onChange={(e) => updateExperience(experience.id, "current", e.target.checked)}
                    className="mr-2"
                  />
                  <Label htmlFor={`current-${experience.id}`} className="text-gray-300 text-sm">
                    Currently working on this
                  </Label>
                </div>
              </div>
            </div>

            <div>
              <Label className="text-gray-300">Technologies Used</Label>
              <Input
                value={experience.technologies}
                onChange={(e) => updateExperience(experience.id, "technologies", e.target.value)}
                className="bg-white/10 border-gray-600 text-white placeholder-gray-400"
                placeholder="React, Node.js, MongoDB, AWS..."
              />
            </div>

            <div>
              <Label className="text-gray-300">Description</Label>
              <Textarea
                value={experience.description}
                onChange={(e) => updateExperience(experience.id, "description", e.target.value)}
                className="bg-white/10 border-gray-600 text-white placeholder-gray-400 min-h-[100px]"
                placeholder="Describe your responsibilities, achievements, and impact..."
              />
            </div>
          </CardContent>
        </Card>
      ))}

      <Button
        onClick={addExperience}
        variant="outline"
        className="w-full border-gray-600 text-gray-300 hover:bg-gray-800 bg-transparent"
      >
        <Plus className="h-4 w-4 mr-2" />
        Add Another Experience
      </Button>

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
          className="bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-700 hover:to-cyan-700"
        >
          Next Step <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </div>
  )
}
