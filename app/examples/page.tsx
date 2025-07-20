import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import MarkdownRenderer from "@/components/markdown-renderer"
import { ArrowLeft, FileText } from "lucide-react"
import Link from "next/link"

// Hardcoded example resumes for demonstration
const exampleResumes = [
  {
    id: "software-dev",
    title: "Software Developer Resume",
    description: "A resume tailored for a full-time software development role.",
    markdown: `
# John Doe
john.doe@example.com | +91 9876543210 | Bangalore, India
[LinkedIn](https://linkedin.com/in/johndoe) | [GitHub](https://github.com/johndoe) | [Portfolio](https://johndoe.dev)

## Professional Summary
Highly motivated Computer Science graduate with a strong foundation in data structures, algorithms, and full-stack web development. Eager to apply technical skills and problem-solving abilities to contribute to innovative software solutions.

## Education
* **B.Tech Computer Science** - Indian Institute of Technology, Bangalore
  * 2020 - 2024 | CGPA: 8.9/10
  * Relevant Coursework: Advanced Algorithms, Distributed Systems, Machine Learning, Database Management

## Skills
**Technical Skills:** JavaScript, Python, React, Node.js, Express.js, MongoDB, SQL, Git, AWS, Docker, REST APIs
**Soft Skills:** Problem Solving, Teamwork, Communication, Adaptability, Critical Thinking
**Languages:** English, Hindi

## Experience & Projects
* **Full Stack Developer Intern** at Tech Solutions Inc. (May 2023 - Aug 2023)
  * Bangalore, India
  * Technologies: React, Node.js, PostgreSQL
  * Developed and deployed a real-time chat application, improving user engagement by 15%. Implemented secure authentication using JWT.

* **E-commerce Platform (Personal Project)** (Jan 2023 - Apr 2023)
  * Remote
  * Technologies: Next.js, Stripe, Tailwind CSS
  * Built a responsive e-commerce site with product listings, shopping cart, and secure payment gateway.

## Career Objective
Seeking a challenging full-time Software Developer position to leverage my technical expertise and contribute to cutting-edge projects in a dynamic environment.
`,
  },
  {
    id: "data-science-intern",
    title: "Data Science Internship Resume",
    description: "An example resume for a data science internship.",
    markdown: `
# Jane Smith
jane.smith@example.com | +91 9988776655 | Mumbai, India
[LinkedIn](https://linkedin.com/in/janesmith) | [GitHub](https://github.com/janesmith)

## Professional Summary
Enthusiastic and analytical student pursuing a degree in Data Science, with hands-on experience in data analysis, machine learning, and statistical modeling. Passionate about extracting insights from complex datasets to drive informed decisions.

## Education
* **B.Sc. Data Science** - University of Mumbai
  * 2021 - 2025 | Percentage: 88%
  * Relevant Coursework: Probability & Statistics, Machine Learning, Data Visualization, Big Data Analytics

## Skills
**Technical Skills:** Python (Pandas, NumPy, Scikit-learn), R, SQL, Tableau, Power BI, Jupyter Notebooks, Git
**Soft Skills:** Analytical Thinking, Data Interpretation, Presentation, Collaboration, Attention to Detail
**Languages:** English, Marathi

## Experience & Projects
* **Predictive Analytics Project (Academic)** (Oct 2023 - Dec 2023)
  * Mumbai, India
  * Technologies: Python, Scikit-learn
  * Developed a machine learning model to predict customer churn for a telecom company, achieving 85% accuracy.

* **Data Visualization Dashboard (Personal Project)** (Feb 2024 - Mar 2024)
  * Remote
  * Technologies: Tableau
  * Created interactive dashboards to visualize COVID-19 spread data, identifying key trends and patterns.

## Career Objective
Seeking a Data Science Internship to apply and expand my analytical skills in a real-world setting, contributing to data-driven initiatives and learning from industry experts.
`,
  },
  {
    id: "hackathon-participant",
    title: "Hackathon Participant Profile",
    description: "A profile highlighting skills and projects for hackathon applications.",
    markdown: `
# Alex Sharma
alex.sharma@example.com | +91 7766554433 | Delhi, India
[GitHub](https://github.com/alexsharma)

## Professional Summary
Creative and agile developer with a passion for rapid prototyping and building innovative solutions under pressure. Experienced in collaborative coding environments and eager to tackle new challenges in hackathons.

## Education
* **B.Tech Information Technology** - Delhi Technological University
  * 2020 - 2024 | CGPA: 8.2/10
  * Relevant Coursework: Web Technologies, Mobile Application Development, Cloud Computing

## Skills
**Technical Skills:** HTML, CSS, JavaScript, React Native, Firebase, Node.js, Express, Git, Figma
**Soft Skills:** Creativity, Quick Learning, Teamwork, Time Management, Adaptability
**Languages:** English, Hindi

## Experience & Projects
* **HealthConnect App (Hackathon Project)** (Nov 2023)
  * Delhi, India
  * Technologies: React Native, Firebase
  * Developed a mobile app prototype for connecting patients with doctors in 24 hours, winning "Best UI/UX" award.

* **Smart Home Automation (Personal Project)** (Apr 2023 - Jun 2023)
  * Remote
  * Technologies: Python, Raspberry Pi
  * Built a prototype for voice-controlled home automation system.

## Career Objective
Actively participating in hackathons to collaborate on exciting projects, learn new technologies, and expand my network within the tech community.
`,
  },
]

export default function ExamplesPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 py-12 px-6">
      {/* Background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-cyan-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse delay-1000"></div>
      </div>

      <header className="relative z-10 max-w-7xl mx-auto flex justify-between items-center mb-8">
        <div className="flex items-center space-x-2">
          <FileText className="h-8 w-8 text-purple-400" />
          <span className="text-2xl font-bold text-white">RankUp Examples</span>
        </div>
        <Link href="/">
          <Button variant="ghost" className="text-gray-300 hover:text-white">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Home
          </Button>
        </Link>
      </header>

      <main className="relative z-10 max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-white text-center mb-10">Explore Our AI-Generated Resume Examples</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {exampleResumes.map((example) => (
            <Card key={example.id} className="bg-white/5 border-gray-700 backdrop-blur-sm flex flex-col">
              <CardHeader>
                <CardTitle className="text-white text-xl">{example.title}</CardTitle>
                <p className="text-gray-400 text-sm">{example.description}</p>
              </CardHeader>
              <CardContent className="flex-grow">
                <div className="bg-white p-6 rounded-lg text-black shadow-lg min-h-[400px] max-h-[600px] overflow-y-auto font-sans text-sm leading-normal">
                  <MarkdownRenderer markdown={example.markdown} />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </main>
    </div>
  )
}
