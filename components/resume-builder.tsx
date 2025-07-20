"use client"

import { useState, useCallback } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft } from "lucide-react"
import PersonalInfoForm from "@/components/forms/personal-info-form"
import EducationForm from "@/components/forms/education-form"
import SkillsForm from "@/components/forms/skills-form"
import ExperienceForm from "@/components/forms/experience-form"
import TargetForm from "@/components/forms/target-form"
import ResumePreview from "@/components/resume-preview"
import type { ResumeData } from "@/types/resume"

interface ResumeBuilderProps {
  onBack: () => void
}

const steps = [
  { id: "personal", title: "Personal Info", component: PersonalInfoForm },
  { id: "education", title: "Education", component: EducationForm },
  { id: "skills", title: "Skills", component: SkillsForm },
  { id: "experience", title: "Experience", component: ExperienceForm },
  { id: "target", title: "Target & Goals", component: TargetForm },
  { id: "preview", title: "Preview & Generate", component: ResumePreview },
]

export default function ResumeBuilder({ onBack }: ResumeBuilderProps) {
  const [currentStep, setCurrentStep] = useState(0)
  const [resumeData, setResumeData] = useState<ResumeData>({
    personal: {},
    education: [],
    skills: { technical: [], soft: [], languages: [] },
    experience: [],
    target: { type: "job", description: "" },
  })

  const updateResumeData = useCallback(
    (section: keyof ResumeData, data: any) => {
      setResumeData((prev) => ({
        ...prev,
        [section]: data,
      }))
    },
    [], // <— dependencies are empty so the function identity stays the same
  )

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1)
    }
  }

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
    }
  }

  const CurrentStepComponent = steps[currentStep].component

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-cyan-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse delay-1000"></div>
      </div>

      {/* Header */}
      <header className="relative z-10 p-6 border-b border-gray-800">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <Button variant="ghost" onClick={onBack} className="text-gray-300 hover:text-white">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Home
          </Button>

          {/* Progress Bar */}
          <div className="flex items-center space-x-2">
            {steps.map((step, index) => (
              <div
                key={step.id}
                className={`w-3 h-3 rounded-full ${index <= currentStep ? "bg-purple-500" : "bg-gray-600"}`}
              />
            ))}
          </div>

          <div className="text-gray-300">
            Step {currentStep + 1} of {steps.length}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative z-10 p-6">
        <div className="max-w-4xl mx-auto">
          <Card className="bg-white/5 border-gray-700 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-white text-2xl">{steps[currentStep].title}</CardTitle>
            </CardHeader>
            <CardContent>
              <CurrentStepComponent
                data={resumeData}
                updateData={updateResumeData}
                onNext={nextStep}
                onPrev={prevStep}
                isFirst={currentStep === 0}
                isLast={currentStep === steps.length - 1}
              />
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}
