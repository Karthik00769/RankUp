"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft, ArrowRight, Plus, Trash2 } from "lucide-react"
import type { ResumeData } from "@/types/resume"

interface EducationFormProps {
  data: ResumeData
  updateData: (section: keyof ResumeData, data: any) => void
  onNext: () => void
  onPrev: () => void
  isFirst: boolean
  isLast: boolean
}

interface Education {
  id: string
  degree: string
  institution: string
  location: string
  startYear: string
  endYear: string
  cgpa: string
  relevant_coursework: string
}

export default function EducationForm({ data, updateData, onNext, onPrev }: EducationFormProps) {
  const [educationList, setEducationList] = useState<Education[]>(
    data.education.length > 0
      ? data.education
      : [
          {
            id: "1",
            degree: "",
            institution: "",
            location: "",
            startYear: "",
            endYear: "",
            cgpa: "",
            relevant_coursework: "",
          },
        ],
  )

  useEffect(() => {
    updateData("education", educationList)
  }, [educationList, updateData])

  const addEducation = () => {
    const newEducation: Education = {
      id: Date.now().toString(),
      degree: "",
      institution: "",
      location: "",
      startYear: "",
      endYear: "",
      cgpa: "",
      relevant_coursework: "",
    }
    setEducationList([...educationList, newEducation])
  }

  const removeEducation = (id: string) => {
    if (educationList.length > 1) {
      setEducationList(educationList.filter((edu) => edu.id !== id))
    }
  }

  const updateEducation = (id: string, field: keyof Education, value: string) => {
    setEducationList(educationList.map((edu) => (edu.id === id ? { ...edu, [field]: value } : edu)))
  }

  const isValid = educationList.every((edu) => edu.degree && edu.institution)

  return (
    <div className="space-y-6">
      {educationList.map((education, index) => (
        <Card key={education.id} className="bg-white/5 border-gray-600">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-white text-lg">Education {index + 1}</CardTitle>
            {educationList.length > 1 && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => removeEducation(education.id)}
                className="text-red-400 hover:text-red-300"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            )}
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label className="text-gray-300">Degree/Course *</Label>
                <Input
                  value={education.degree}
                  onChange={(e) => updateEducation(education.id, "degree", e.target.value)}
                  className="bg-white/10 border-gray-600 text-white placeholder-gray-400"
                  placeholder="B.Tech Computer Science"
                />
              </div>

              <div>
                <Label className="text-gray-300">Institution *</Label>
                <Input
                  value={education.institution}
                  onChange={(e) => updateEducation(education.id, "institution", e.target.value)}
                  className="bg-white/10 border-gray-600 text-white placeholder-gray-400"
                  placeholder="University/College Name"
                />
              </div>

              <div>
                <Label className="text-gray-300">Location</Label>
                <Input
                  value={education.location}
                  onChange={(e) => updateEducation(education.id, "location", e.target.value)}
                  className="bg-white/10 border-gray-600 text-white placeholder-gray-400"
                  placeholder="City, State"
                />
              </div>

              <div>
                <Label className="text-gray-300">CGPA/Percentage</Label>
                <Input
                  value={education.cgpa}
                  onChange={(e) => updateEducation(education.id, "cgpa", e.target.value)}
                  className="bg-white/10 border-gray-600 text-white placeholder-gray-400"
                  placeholder="8.5/10 or 85%"
                />
              </div>

              <div>
                <Label className="text-gray-300">Start Year</Label>
                <Select onValueChange={(value) => updateEducation(education.id, "startYear", value)}>
                  <SelectTrigger className="bg-white/10 border-gray-600 text-white">
                    <SelectValue placeholder="Select year" />
                  </SelectTrigger>
                  <SelectContent>
                    {Array.from({ length: 10 }, (_, i) => 2024 - i).map((year) => (
                      <SelectItem key={year} value={year.toString()}>
                        {year}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label className="text-gray-300">End Year</Label>
                <Select onValueChange={(value) => updateEducation(education.id, "endYear", value)}>
                  <SelectTrigger className="bg-white/10 border-gray-600 text-white">
                    <SelectValue placeholder="Select year" />
                  </SelectTrigger>
                  <SelectContent>
                    {Array.from({ length: 10 }, (_, i) => 2030 - i).map((year) => (
                      <SelectItem key={year} value={year.toString()}>
                        {year}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div>
              <Label className="text-gray-300">Relevant Coursework</Label>
              <Input
                value={education.relevant_coursework}
                onChange={(e) => updateEducation(education.id, "relevant_coursework", e.target.value)}
                className="bg-white/10 border-gray-600 text-white placeholder-gray-400"
                placeholder="Data Structures, Algorithms, Web Development..."
              />
            </div>
          </CardContent>
        </Card>
      ))}

      <Button
        onClick={addEducation}
        variant="outline"
        className="w-full border-gray-600 text-gray-300 hover:bg-gray-800 bg-transparent"
      >
        <Plus className="h-4 w-4 mr-2" />
        Add Another Education
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
          disabled={!isValid}
          className="bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-700 hover:to-cyan-700"
        >
          Next Step <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </div>
  )
}
