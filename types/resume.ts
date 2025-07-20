export interface PersonalInfo {
  fullName?: string
  email?: string
  phone?: string
  location?: string
  linkedin?: string
  github?: string
  portfolio?: string
  summary?: string
}

export interface Education {
  id: string
  degree: string
  institution: string
  location: string
  startYear: string
  endYear: string
  cgpa: string
  relevant_coursework: string
}

export interface Skills {
  technical: string[]
  soft: string[]
  languages: string[]
}

export interface Experience {
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

export interface Target {
  type: "job" | "internship" | "hackathon"
  description: string
  industry?: string
  role?: string
}

export interface ResumeData {
  personal: PersonalInfo
  education: Education[]
  skills: Skills
  experience: Experience[]
  target: Target
}
