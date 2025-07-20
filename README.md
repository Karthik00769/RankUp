# RankUp: AI-Powered Resume Builder for Students(VibeCode-India 2025)

Welcome to **RankUp**—a project I developed to empower Tier-2 and Tier-3 college students in India to create professional, ATS-friendly resumes with ease. By harnessing the capabilities of Google Gemini AI, RankUp delivers tailored resume content, intelligent suggestions, and seamless PDF export, all within a modern, user-friendly interface.

## Project Highlights

- **AI-Driven Resume Generation:** Integrates Google Gemini AI to craft and evaluate resumes based on user input, ensuring high-quality, professional results.
- **Student-Centric Design:** Specifically built for the unique needs of Tier-2/Tier-3 students, with dedicated sections for jobs, internships, and hackathons.
- **Guided, Stepwise Builder:** Features an intuitive, multi-step form to collect personal information, education, skills, experience, and career objectives.
- **Live Markdown Preview:** Instantly visualize your resume as you build it, with real-time Markdown rendering.
- **Effortless PDF Export:** Download your completed resume as a polished PDF, powered by html2pdf.js.
- **Curated Example Resumes:** Access a library of sample resumes for various roles and scenarios to jumpstart your own.
- **Modern, Responsive UI:** Built with Tailwind CSS and Radix UI for a seamless experience across devices.

## Technology Stack

- **Framework:** Next.js (React, TypeScript)
- **AI Integration:** Google Gemini AI via `@ai-sdk/google`
- **UI Components:** Radix UI, Tailwind CSS, Lucide Icons
- **Form Management:** React Hook Form, Zod validation
- **PDF Generation:** html2pdf.js (dynamically loaded)
- **Markdown Rendering:** Custom renderer for optimal formatting

## Getting Started

### Prerequisites
- Node.js (v18 or higher recommended)
- npm, pnpm, or yarn

### Installation Steps
1. **Clone the repository:**
   ```bash
   git clone <your-repo-url>
   cd resume-builder
   ```
2. **Install dependencies:**
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```
3. **Configure environment variables:**
   - Create a `.env` file in the project root.
   - Add your Google Gemini API key:
     ```env
     NEXT_PUBLIC_GEMINI_API_KEY=your-gemini-api-key-here
     ```

### Running the Application
```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```
Navigate to [http://localhost:3000](http://localhost:3000) to access the app.

## How to Use RankUp
- Click **Get Started** to launch the resume builder.
- Complete each section: Personal Info, Education, Skills, Experience, and Career Objective.
- Preview your AI-generated resume and download it as a PDF.
- Visit the **Examples** page for inspiration and guidance.

## Example Resumes Included
- Software Developer Resume
- Data Science Internship Resume
- Hackathon Participant Profile

## Project Structure
- `components/` – UI and form components
- `lib/` – AI integration, PDF export, and utility functions
- `app/` – Next.js pages and routing
- `types/` – TypeScript type definitions
