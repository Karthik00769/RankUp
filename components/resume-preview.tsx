"use client"

import { Badge } from "@/components/ui/badge"
import { loadHtml2Pdf } from "@/lib/load-html2pdf"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft, Download, Eye, Loader2, Sparkles } from "lucide-react"
import type { ResumeData } from "@/types/resume"
import { generateResume, evaluateResumeLikelihood } from "@/lib/ai-resume-generator"
import MarkdownRenderer from "@/components/markdown-renderer" // New import for Markdown rendering

interface ResumePreviewProps {
  data: ResumeData
  updateData: (section: keyof ResumeData, data: any) => void
  onNext: () => void
  onPrev: () => void
  isFirst: boolean
  isLast: boolean
}

export default function ResumePreview({ data, onPrev }: ResumePreviewProps) {
  const [generatedResume, setGeneratedResume] = useState<string>("")
  const [isGenerating, setIsGenerating] = useState(false)
  const [showPreview, setShowPreview] = useState(false)
  const [resumeLikelihood, setResumeLikelihood] = useState<number | null>(null)
  const [isEvaluatingAI, setIsEvaluatingAI] = useState(false)

  const resumeContentRef = useRef<HTMLDivElement>(null)

  const handleGenerateResume = async () => {
    setIsGenerating(true)
    setResumeLikelihood(null) // Reset likelihood
    try {
      console.log("Starting AI resume generation with Gemini...")
      const resume = await generateResume(data)
      setGeneratedResume(resume)
      setShowPreview(true)

      // Evaluate likelihood after generation
      setIsEvaluatingAI(true)
      const likelihood = await evaluateResumeLikelihood(resume)
      setResumeLikelihood(likelihood)
      setIsEvaluatingAI(false)

      console.log("Resume generated and evaluated successfully!")
    } catch (error) {
      console.error("Error generating or evaluating resume:", error)
      // Fallback to basic resume if AI fails
      const basicResume = generateBasicResume(data)
      setGeneratedResume(
        basicResume +
          "\n\n⚠️ Note: This resume was generated using fallback mode. For AI-enhanced content, please check your internet connection and try again.",
      )
      setShowPreview(true)
      setIsEvaluatingAI(false) // Ensure loading state is cleared
    } finally {
      setIsGenerating(false)
    }
  }

  // This basic fallback is now only used if AI generation fails completely.
  // The main preview will always use the AI-generated content.
  const generateBasicResume = (data: ResumeData) => {
    const { personal, education, skills, experience, target } = data

    return `
# ${personal.fullName || "Your Name"}
${personal.email || "your.email@example.com"} | ${personal.phone || "+91 9876543210"} | ${personal.location || "City, State"}
${personal.linkedin ? `[LinkedIn](${personal.linkedin})` : ""}${personal.github ? ` | [GitHub](${personal.github})` : ""}${personal.portfolio ? ` | [Portfolio](${personal.portfolio})` : ""}

## Professional Summary
${personal.summary || target?.description || "Motivated student seeking opportunities in technology and software development."}

## Education
${education
  .map(
    (edu) => `* **${edu.degree}** - ${edu.institution}, ${edu.location}
  * ${edu.startYear} - ${edu.endYear} | CGPA: ${edu.cgpa || "N/A"}
  * Relevant Coursework: ${edu.relevant_coursework || "N/A"}`,
  )
  .join("\n\n")}

## Skills
**Technical Skills:** ${skills.technical?.length ? skills.technical.join(", ") : "N/A"}
**Soft Skills:** ${skills.soft?.length ? skills.soft.join(", ") : "N/A"}
**Languages:** ${skills.languages?.length ? skills.languages.join(", ") : "N/A"}

## Experience & Projects
${experience
  .map(
    (
      exp,
    ) => `* **${exp.title}** ${exp.company ? `at ${exp.company}` : ""} (${exp.startDate} - ${exp.current ? "Present" : exp.endDate})
  * ${exp.location || "N/A"}
  * Technologies: ${exp.technologies || "N/A"}
  * ${exp.description || "Description of responsibilities and achievements."}`,
  )
  .join("\n\n")}

## Career Objective
${target?.description || "Seeking opportunities to apply my skills and contribute to innovative projects."}
    `.trim()
  }

  const downloadPdf = async () => {
    if (!resumeContentRef.current) return

    const opt = {
      margin: 0.5,
      filename: `${data.personal.fullName || "Resume"}_Resume.pdf`,
      image: { type: "jpeg", quality: 0.98 },
      html2canvas: { scale: 2, logging: false, dpi: 192, letterRendering: true },
      jsPDF: { unit: "in", format: "letter", orientation: "portrait" },
    }

    try {
      // ALWAYS get html2pdf from the loader (handles first-time + cached cases)
      const html2pdf = await loadHtml2Pdf()

      if (typeof html2pdf !== "function") {
        throw new Error("html2pdf is not a callable function")
      }

      await html2pdf().from(resumeContentRef.current).set(opt).save()
    } catch (err) {
      console.error("PDF generation failed:", err)
      alert("Failed to generate PDF. Please try again or check console for details.")
    }
  }

  if (showPreview) {
    return (
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
          <Button
            onClick={() => setShowPreview(false)}
            variant="outline"
            className="border-gray-600 text-gray-300 hover:bg-gray-800"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Generate
          </Button>

          <div className="flex gap-2">
            {isEvaluatingAI ? (
              <Badge className="bg-yellow-500/20 text-yellow-300 border-yellow-500/30">
                <Loader2 className="h-3 w-3 mr-1 animate-spin" />
                Evaluating...
              </Badge>
            ) : resumeLikelihood !== null ? (
              <Badge
                className={`text-white font-bold text-lg px-4 py-2 ${
                  resumeLikelihood >= 80
                    ? "bg-green-600/30 border-green-500"
                    : resumeLikelihood >= 50
                      ? "bg-yellow-600/30 border-yellow-500"
                      : "bg-red-600/30 border-red-500"
                }`}
              >
                Resume Score: {resumeLikelihood}%
              </Badge>
            ) : null}
            <Button onClick={downloadPdf} className="bg-green-600 hover:bg-green-700">
              <Download className="mr-2 h-4 w-4" />
              Download PDF
            </Button>
          </div>
        </div>

        <Card className="bg-white/5 border-gray-700">
          <CardHeader>
            <CardTitle className="text-white flex items-center">
              <Eye className="mr-2 h-5 w-5" />
              Resume Preview
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div
              ref={resumeContentRef}
              className="bg-white p-8 rounded-lg text-black shadow-lg min-h-[800px] font-sans text-sm leading-normal"
            >
              {generatedResume ? (
                <MarkdownRenderer markdown={generatedResume} />
              ) : (
                <div className="text-center text-gray-500 py-20">
                  <Loader2 className="h-10 w-10 animate-spin mx-auto mb-4" />
                  <p>Generating your professional resume...</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <Card className="bg-white/5 border-gray-700">
        <CardHeader>
          <CardTitle className="text-white flex items-center">
            <Sparkles className="mr-2 h-5 w-5" />
            AI Resume Generation
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="text-gray-300">
            <p className="mb-4">
              Ready to generate your professional resume! Our AI will analyze your information and create a tailored
              resume for your target role.
            </p>

            <div className="bg-gradient-to-r from-purple-500/10 to-cyan-500/10 border border-purple-500/30 rounded-lg p-6 mb-6">
              <h3 className="text-purple-300 font-semibold mb-3 flex items-center">
                <Sparkles className="mr-2 h-5 w-5" />
                Powered by Google Gemini AI
              </h3>
              <div className="grid md:grid-cols-2 gap-4 text-sm text-gray-300">
                <div>
                  <h4 className="font-medium text-white mb-2">Content Enhancement:</h4>
                  <ul className="space-y-1">
                    <li>• Optimized for {data.target?.type || "your target role"}</li>
                    <li>• Industry-specific keywords for {data.target?.industry || "technology"}</li>
                    <li>• ATS-friendly formatting</li>
                    <li>• Action-oriented descriptions</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-medium text-white mb-2">Student-Focused:</h4>
                  <ul className="space-y-1">
                    <li>• Highlights potential over experience</li>
                    <li>• Emphasizes learning and growth</li>
                    <li>• Showcases projects effectively</li>
                    <li>• Tailored for Tier-2/3 students</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
              <div className="bg-white/5 rounded-lg p-3">
                <div className="text-2xl font-bold text-purple-400">{data.education?.length || 0}</div>
                <div className="text-sm text-gray-400">Education</div>
              </div>
              <div className="bg-white/5 rounded-lg p-3">
                <div className="text-2xl font-bold text-cyan-400">{data.skills?.technical?.length || 0}</div>
                <div className="text-sm text-gray-400">Tech Skills</div>
              </div>
              <div className="bg-white/5 rounded-lg p-3">
                <div className="text-2xl font-bold text-pink-400">{data.experience?.length || 0}</div>
                <div className="text-sm text-gray-400">Experiences</div>
              </div>
              <div className="bg-white/5 rounded-lg p-3">
                <div className="text-2xl font-bold text-green-400">1</div>
                <div className="text-sm text-gray-400">Target Role</div>
              </div>
            </div>
          </div>

          <Button
            onClick={handleGenerateResume}
            disabled={isGenerating}
            className="w-full bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-700 hover:to-cyan-700 py-4 text-lg"
          >
            {isGenerating ? (
              <>
                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                Generating Your Resume...
              </>
            ) : (
              <>
                <Sparkles className="mr-2 h-5 w-5" />
                Generate AI-Powered Resume
              </>
            )}
          </Button>
        </CardContent>
      </Card>

      <div className="flex justify-between">
        <Button
          onClick={onPrev}
          variant="outline"
          className="border-gray-600 text-gray-300 hover:bg-gray-800 bg-transparent"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Previous
        </Button>
      </div>
    </div>
  )
}
