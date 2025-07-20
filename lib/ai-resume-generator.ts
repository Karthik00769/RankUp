import { generateText } from "ai"
import { createGoogleGenerativeAI } from "@ai-sdk/google"
import type { ResumeData } from "@/types/resume"

/**
 * IMPORTANT: the Gemini API key is now loaded from the environment variable NEXT_PUBLIC_GEMINI_API_KEY.
 * In production, ensure this is set in your .env file or deployment environment.
 */
const GEMINI_API_KEY = process.env.NEXT_PUBLIC_GEMINI_API_KEY
if (!GEMINI_API_KEY) {
  throw new Error("GEMINI API key not set. Please define NEXT_PUBLIC_GEMINI_API_KEY in your .env file.")
}

// Create a custom Google provider with the API key
const googleWithKey = createGoogleGenerativeAI({ apiKey: GEMINI_API_KEY })

// Now obtain the specific Gemini model from that provider
const geminiModel = googleWithKey("gemini-1.5-flash")

export async function generateResume(data: ResumeData): Promise<string> {
  const { personal, education, skills, experience, target } = data

  const prompt = `
You are an expert resume writer specialising in Tier-2/Tier-3 Indian students.
Create a concise, professional, and ATS-friendly resume in Markdown format using the information below.
Ensure all sections are clearly marked with Markdown headers.

# ${personal.fullName || "Your Name"}
${personal.email || "your.email@example.com"} | ${personal.phone || "+91 9876543210"} | ${personal.location || "City, State"}
${personal.linkedin ? `[LinkedIn](${personal.linkedin})` : ""}${personal.github ? ` | [GitHub](${personal.github})` : ""}${personal.portfolio ? ` | [Portfolio](${personal.portfolio})` : ""}

## Professional Summary
${personal.summary || target?.description || "Motivated student seeking opportunities in technology and software development."}

## Education
${education
  .map(
    (e) => `* **${e.degree}** - ${e.institution}, ${e.location}
  * ${e.startYear} - ${e.endYear} | CGPA: ${e.cgpa || "N/A"}
  * Relevant Coursework: ${e.relevant_coursework || "N/A"}`,
  )
  .join("\n\n")}

## Skills
**Technical Skills:** ${skills.technical.join(", ") || "N/A"}
**Soft Skills:** ${skills.soft.join(", ") || "N/A"}
**Languages:** ${skills.languages.join(", ") || "N/A"}

## Experience & Projects
${experience
  .map(
    (
      ex,
    ) => `* **${ex.title}** ${ex.company ? `at ${ex.company}` : ""} (${ex.startDate} - ${ex.current ? "Present" : ex.endDate})
  * ${ex.location || "N/A"}
  * Technologies: ${ex.technologies || "N/A"}
  * ${ex.description || "Description of responsibilities and achievements."}`,
  )
  .join("\n\n")}

## Career Objective
${target?.description || "Seeking opportunities to apply my skills and contribute to innovative projects."}

=== IMPORTANT FORMATTING RULES ===
- Use standard Markdown for headers (#, ##), bold (**), and lists (*).
- Ensure contact info is on one line or clearly separated.
- Keep descriptions concise and achievement-oriented.
- Do NOT include any introductory or concluding remarks outside the resume content.
`.trim()

  try {
    const { text } = await generateText({
      model: geminiModel,
      prompt,
      maxTokens: 2048,
      temperature: 0.7,
    }).catch((err) => {
      // prevent secondary un-handled promise rejection
      throw err
    })

    return text
  } catch (err) {
    console.error("Error generating resume with Gemini AI:", err)
    return basicFallbackResume(data)
  }
}

export async function evaluateResumeLikelihood(resumeText: string): Promise<number> {
  const prompt = `
Given the following text, evaluate on a scale of 0 to 100 how much it resembles a professional resume.
Consider structure, content, keywords, and overall presentation.
Output ONLY the numerical percentage. Do not include any other text or characters.

Resume Text:
---
${resumeText}
---
`
  try {
    const { text } = await generateText({
      model: geminiModel,
      prompt,
      maxTokens: 10, // Expecting only a number
      temperature: 0.1, // Keep it deterministic
    }).catch((err) => {
      throw err
    })

    const parsedPercentage = Number.parseInt(text.trim(), 10)
    if (isNaN(parsedPercentage)) {
      console.warn("AI returned non-numeric likelihood:", text)
      return 50 // Default fallback if parsing fails
    }
    return Math.max(0, Math.min(100, parsedPercentage)) // Ensure it's between 0 and 100
  } catch (err) {
    console.error("Error evaluating resume likelihood with Gemini AI:", err)
    return 50 // Fallback likelihood
  }
}

/* ---------- simple fallback in case AI call fails ---------- */
function basicFallbackResume(data: ResumeData): string {
  const { personal } = data
  return `
# ${personal.fullName?.toUpperCase() || "YOUR NAME"}
${personal.email || "your.email@example.com"} | ${personal.phone || "+91 9876543210"} | ${personal.location || "India"}

## Professional Summary
Motivated student seeking opportunities in ${data.target?.industry || "technology"}.

## Education
* **Degree** - Institution, Location
  * StartYear - EndYear | CGPA: N/A
  * Relevant Coursework: N/A

## Skills
**Technical Skills:** Programming, Data Structures
**Soft Skills:** Communication, Teamwork
**Languages:** English

## Experience & Projects
* **Project Title** at Organization (Start - End)
  * Location
  * Technologies: Tech1, Tech2
  * Description of project.

## Career Objective
Seeking opportunities to apply my skills and contribute to innovative projects.
  `.trim()
}
