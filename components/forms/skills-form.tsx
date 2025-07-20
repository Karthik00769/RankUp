"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, ArrowRight, Plus, X } from "lucide-react"
import type { ResumeData } from "@/types/resume"

interface SkillsFormProps {
  data: ResumeData
  updateData: (section: keyof ResumeData, data: any) => void
  onNext: () => void
  onPrev: () => void
  isFirst: boolean
  isLast: boolean
}

export default function SkillsForm({ data, updateData, onNext, onPrev }: SkillsFormProps) {
  const [skills, setSkills] = useState({
    technical: data.skills?.technical || [],
    soft: data.skills?.soft || [],
    languages: data.skills?.languages || [],
  })

  const [inputValues, setInputValues] = useState({
    technical: "",
    soft: "",
    languages: "",
  })

  useEffect(() => {
    updateData("skills", skills)
  }, [skills, updateData])

  const addSkill = (category: "technical" | "soft" | "languages") => {
    const value = inputValues[category].trim()
    if (value && !skills[category].includes(value)) {
      setSkills((prev) => ({
        ...prev,
        [category]: [...prev[category], value],
      }))
      setInputValues((prev) => ({
        ...prev,
        [category]: "",
      }))
    }
  }

  const removeSkill = (category: "technical" | "soft" | "languages", skill: string) => {
    setSkills((prev) => ({
      ...prev,
      [category]: prev[category].filter((s) => s !== skill),
    }))
  }

  const handleKeyPress = (e: React.KeyboardEvent, category: "technical" | "soft" | "languages") => {
    if (e.key === "Enter") {
      e.preventDefault()
      addSkill(category)
    }
  }

  const suggestedTechnicalSkills = [
    "JavaScript",
    "Python",
    "Java",
    "React",
    "Node.js",
    "HTML/CSS",
    "SQL",
    "Git",
    "MongoDB",
    "Express.js",
    "TypeScript",
    "C++",
    "AWS",
    "Docker",
    "Linux",
  ]

  const suggestedSoftSkills = [
    "Communication",
    "Leadership",
    "Problem Solving",
    "Teamwork",
    "Time Management",
    "Critical Thinking",
    "Adaptability",
    "Project Management",
    "Public Speaking",
  ]

  const suggestedLanguages = ["English", "Hindi", "Tamil", "Telugu", "Bengali", "Marathi", "Gujarati", "Kannada"]

  const isValid = skills.technical.length > 0

  return (
    <div className="space-y-8">
      {/* Technical Skills */}
      <div>
        <Label className="text-gray-300 text-lg mb-4 block">Technical Skills *</Label>
        <div className="flex gap-2 mb-4">
          <Input
            value={inputValues.technical}
            onChange={(e) => setInputValues((prev) => ({ ...prev, technical: e.target.value }))}
            onKeyPress={(e) => handleKeyPress(e, "technical")}
            className="bg-white/10 border-gray-600 text-white placeholder-gray-400"
            placeholder="Add a technical skill..."
          />
          <Button onClick={() => addSkill("technical")} className="bg-purple-600 hover:bg-purple-700">
            <Plus className="h-4 w-4" />
          </Button>
        </div>

        <div className="flex flex-wrap gap-2 mb-4">
          {skills.technical.map((skill, index) => (
            <Badge key={index} variant="secondary" className="bg-purple-500/20 text-purple-300 border-purple-500/30">
              {skill}
              <button
                onClick={() => removeSkill("technical", skill)}
                className="ml-2 hover:text-red-300"
                title={`Remove ${skill}`}
                aria-label={`Remove ${skill}`}
              >
                <X className="h-3 w-3" />
              </button>
            </Badge>
          ))}
        </div>

        <div className="text-sm text-gray-400 mb-2">Suggested skills:</div>
        <div className="flex flex-wrap gap-2">
          {suggestedTechnicalSkills
            .filter((skill) => !skills.technical.includes(skill))
            .map((skill) => (
              <Badge
                key={skill}
                variant="outline"
                className="cursor-pointer border-gray-600 text-gray-400 hover:bg-purple-500/20 hover:text-purple-300"
                onClick={() => {
                  setSkills((prev) => ({
                    ...prev,
                    technical: [...prev.technical, skill],
                  }))
                }}
              >
                + {skill}
              </Badge>
            ))}
        </div>
      </div>

      {/* Soft Skills */}
      <div>
        <Label className="text-gray-300 text-lg mb-4 block">Soft Skills</Label>
        <div className="flex gap-2 mb-4">
          <Input
            value={inputValues.soft}
            onChange={(e) => setInputValues((prev) => ({ ...prev, soft: e.target.value }))}
            onKeyPress={(e) => handleKeyPress(e, "soft")}
            className="bg-white/10 border-gray-600 text-white placeholder-gray-400"
            placeholder="Add a soft skill..."
          />
          <Button onClick={() => addSkill("soft")} className="bg-cyan-600 hover:bg-cyan-700">
            <Plus className="h-4 w-4" />
          </Button>
        </div>

        <div className="flex flex-wrap gap-2 mb-4">
          {skills.soft.map((skill, index) => (
            <Badge key={index} variant="secondary" className="bg-cyan-500/20 text-cyan-300 border-cyan-500/30">
              {skill}
              <button
                onClick={() => removeSkill("soft", skill)}
                className="ml-2 hover:text-red-300"
                title={`Remove ${skill}`}
                aria-label={`Remove ${skill}`}
              >
                <X className="h-3 w-3" />
              </button>
            </Badge>
          ))}
        </div>

        <div className="text-sm text-gray-400 mb-2">Suggested skills:</div>
        <div className="flex flex-wrap gap-2">
          {suggestedSoftSkills
            .filter((skill) => !skills.soft.includes(skill))
            .map((skill) => (
              <Badge
                key={skill}
                variant="outline"
                className="cursor-pointer border-gray-600 text-gray-400 hover:bg-cyan-500/20 hover:text-cyan-300"
                onClick={() => {
                  setSkills((prev) => ({
                    ...prev,
                    soft: [...prev.soft, skill],
                  }))
                }}
              >
                + {skill}
              </Badge>
            ))}
        </div>
      </div>

      {/* Languages */}
      <div>
        <Label className="text-gray-300 text-lg mb-4 block">Languages</Label>
        <div className="flex gap-2 mb-4">
          <Input
            value={inputValues.languages}
            onChange={(e) => setInputValues((prev) => ({ ...prev, languages: e.target.value }))}
            onKeyPress={(e) => handleKeyPress(e, "languages")}
            className="bg-white/10 border-gray-600 text-white placeholder-gray-400"
            placeholder="Add a language..."
          />
          <Button onClick={() => addSkill("languages")} className="bg-pink-600 hover:bg-pink-700">
            <Plus className="h-4 w-4" />
          </Button>
        </div>

        <div className="flex flex-wrap gap-2 mb-4">
          {skills.languages.map((skill, index) => (
            <Badge key={index} variant="secondary" className="bg-pink-500/20 text-pink-300 border-pink-500/30">
              {skill}
              <button
                onClick={() => removeSkill("languages", skill)}
                className="ml-2 hover:text-red-300"
                title={`Remove ${skill}`}
                aria-label={`Remove ${skill}`}
              >
                <X className="h-3 w-3" />
              </button>
            </Badge>
          ))}
        </div>

        <div className="text-sm text-gray-400 mb-2">Suggested languages:</div>
        <div className="flex flex-wrap gap-2">
          {suggestedLanguages
            .filter((lang) => !skills.languages.includes(lang))
            .map((lang) => (
              <Badge
                key={lang}
                variant="outline"
                className="cursor-pointer border-gray-600 text-gray-400 hover:bg-pink-500/20 hover:text-pink-300"
                onClick={() => {
                  setSkills((prev) => ({
                    ...prev,
                    languages: [...prev.languages, lang],
                  }))
                }}
              >
                + {lang}
              </Badge>
            ))}
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
          Next Step <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </div>
  )
}
