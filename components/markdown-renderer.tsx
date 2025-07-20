import type React from "react"
import type { JSX } from "react"

interface MarkdownRendererProps {
  markdown: string
}

const MarkdownRenderer: React.FC<MarkdownRendererProps> = ({ markdown }) => {
  const lines = markdown.split("\n")
  const elements: JSX.Element[] = []
  let currentList: string[] = []
  let inSummary = false
  let inContact = false
  let currentSection: "personal" | "summary" | "education" | "skills" | "experience" | "objective" | null = null

  const renderList = () => {
    if (currentList.length > 0) {
      elements.push(
        <ul key={`list-${elements.length}`} className="list-disc list-inside text-sm text-gray-800 mb-2 pl-4">
          {currentList.map((item, i) => (
            <li key={i}>{item}</li>
          ))}
        </ul>,
      )
      currentList = []
    }
  }

  lines.forEach((line, index) => {
    const trimmedLine = line.trim()

    if (trimmedLine.startsWith("# ")) {
      // Main Name Header
      renderList()
      inSummary = false
      inContact = true
      currentSection = "personal"
      elements.push(
        <h1 key={`h1-${index}`} className="text-3xl font-bold text-purple-700 mb-1">
          {trimmedLine.substring(2)}
        </h1>,
      )
    } else if (trimmedLine.startsWith("## ")) {
      // Section Headers (Professional Summary, Education, Skills, Experience, Career Objective)
      renderList()
      inSummary = false
      inContact = false
      const headerText = trimmedLine.substring(3)
      if (headerText === "Professional Summary") {
        currentSection = "summary"
      } else if (headerText === "Education") {
        currentSection = "education"
      } else if (headerText === "Skills") {
        currentSection = "skills"
      } else if (headerText === "Experience & Projects") {
        currentSection = "experience"
      } else if (headerText === "Career Objective") {
        currentSection = "objective"
      } else {
        currentSection = null // Unknown section
      }

      elements.push(
        <h2
          key={`h2-${index}`}
          className="text-lg font-bold text-purple-800 border-b-2 border-purple-200 pb-1 mb-2 mt-4"
        >
          {headerText}
        </h2>,
      )
    } else if (inContact && trimmedLine !== "" && !trimmedLine.startsWith("## ")) {
      // Contact info lines right after the name
      elements.push(
        <p key={`contact-p-${index}`} className="text-xs text-gray-600 mb-1">
          {trimmedLine}
        </p>,
      )
    } else if (currentSection === "summary" && trimmedLine !== "") {
      // Professional Summary content
      elements.push(
        <p
          key={`summary-p-${index}`}
          className="text-sm text-gray-800 bg-purple-50/50 p-3 rounded-md mb-2 border border-purple-100"
        >
          {trimmedLine}
        </p>,
      )
    } else if (trimmedLine.startsWith("* ")) {
      // List items (for Education, Experience, Skills)
      currentList.push(trimmedLine.substring(2))
    } else if (trimmedLine.startsWith("**") && trimmedLine.endsWith("**")) {
      // Bolded lines (e.g., skill categories, titles)
      renderList()
      elements.push(
        <p key={`bold-p-${index}`} className="text-sm font-semibold text-gray-900 mt-2">
          {trimmedLine.replace(/\*\*/g, "")}
        </p>,
      )
    } else if (trimmedLine.startsWith("[") && trimmedLine.includes("](")) {
      // Links
      renderList()
      const match = trimmedLine.match(/\[(.*?)\]$$(.*?)$$/)
      if (match && match[1] && match[2]) {
        elements.push(
          <a
            key={`link-${index}`}
            href={match[2]}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:underline text-sm"
          >
            {match[1]}
          </a>,
        )
      } else {
        elements.push(
          <p key={`p-${index}`} className="text-sm text-gray-800">
            {trimmedLine}
          </p>,
        )
      }
    } else if (trimmedLine !== "") {
      // Regular paragraph
      renderList()
      elements.push(
        <p key={`p-${index}`} className="text-sm text-gray-800 mb-1">
          {trimmedLine}
        </p>,
      )
    }
  })
  renderList() // Render any remaining list items

  return <>{elements}</>
}

export default MarkdownRenderer
