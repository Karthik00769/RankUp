"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowRight, FileText, Sparkles, Users, Zap } from "lucide-react"
import ResumeBuilder from "@/components/resume-builder"
import AIStatusIndicator from "@/components/ai-status-indicator"
import UnhandledRejectionSilencer from "@/components/unhandled-rejection-silencer"
import Link from "next/link"

export default function HomePage() {
  const [showBuilder, setShowBuilder] = useState(false)

  if (showBuilder) {
    return (
      <>
        <UnhandledRejectionSilencer />
        <ResumeBuilder onBack={() => setShowBuilder(false)} />
      </>
    )
  }

  return (
    <>
      <UnhandledRejectionSilencer /> {/* globally active on the landing page, too */}
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-cyan-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse delay-1000"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-pulse delay-500"></div>
        </div>

        {/* Header */}
        <header className="relative z-10 p-6">
          <nav className="flex justify-between items-center max-w-7xl mx-auto">
            <div className="flex items-center space-x-2">
              <FileText className="h-8 w-8 text-purple-400" />
              <span className="text-2xl font-bold text-white">RankUp</span>
            </div>
            <div className="flex items-center gap-4">
              <AIStatusIndicator />
              <Button
                variant="outline"
                className="border-purple-400 text-purple-400 hover:bg-purple-400 hover:text-white bg-transparent"
                onClick={() => setShowBuilder(true)}
              >
                Get Started
              </Button>
            </div>
          </nav>
        </header>

        {/* Hero Section */}
        <main className="relative z-10 px-6 py-20">
          <div className="max-w-7xl mx-auto text-center">
            <div className="mb-8">
              <span className="inline-flex items-center px-4 py-2 rounded-full bg-purple-500/20 text-purple-300 text-sm font-medium mb-6">
                <Sparkles className="w-4 h-4 mr-2" />
                AI-Powered Career Advancement
              </span>
              <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
                Elevate Your Career with
                <span className="bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
                  {" "}
                  RankUp
                </span>
              </h1>
              <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
                Designed specifically for Tier-2/Tier-3 students. Create professional resumes, enhance your profile, and
                achieve your career goals with AI-powered guidance.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
              <Button
                size="lg"
                className="bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-700 hover:to-cyan-700 text-white px-8 py-4 text-lg"
                onClick={() => setShowBuilder(true)}
              >
                Start Building <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Link href="/examples">
                {" "}
                {/* Updated Link */}
                <Button
                  size="lg"
                  variant="outline"
                  className="border-gray-600 text-gray-300 hover:bg-gray-800 px-8 py-4 text-lg bg-transparent"
                >
                  View Examples
                </Button>
              </Link>
            </div>

            {/* Features Grid */}
            <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              <Card className="bg-white/5 border-gray-700 backdrop-blur-sm">
                <CardHeader>
                  <div className="w-12 h-12 bg-purple-500/20 rounded-lg flex items-center justify-center mb-4">
                    <Zap className="h-6 w-6 text-purple-400" />
                  </div>
                  <CardTitle className="text-white">AI-Powered</CardTitle>
                  <CardDescription className="text-gray-400">
                    Smart suggestions and content generation using Google Gemini AI
                  </CardDescription>
                </CardHeader>
              </Card>

              <Card className="bg-white/5 border-gray-700 backdrop-blur-sm">
                <CardHeader>
                  <div className="w-12 h-12 bg-cyan-500/20 rounded-lg flex items-center justify-center mb-4">
                    <Users className="h-6 w-6 text-cyan-400" />
                  </div>
                  <CardTitle className="text-white">Student-Focused</CardTitle>
                  <CardDescription className="text-gray-400">
                    Tailored specifically for Tier-2/Tier-3 college students
                  </CardDescription>
                </CardHeader>
              </Card>

              <Card className="bg-white/5 border-gray-700 backdrop-blur-sm">
                <CardHeader>
                  <div className="w-12 h-12 bg-pink-500/20 rounded-lg flex items-center justify-center mb-4">
                    <FileText className="h-6 w-6 text-pink-400" />
                  </div>
                  <CardTitle className="text-white">Career Ready</CardTitle>
                  <CardDescription className="text-gray-400">
                    Perfect for jobs, internships, and hackathon applications
                  </CardDescription>
                </CardHeader>
              </Card>
            </div>
          </div>
        </main>

        {/* Stats Section */}
        <section className="relative z-10 py-20 px-6">
          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              <div>
                <div className="text-3xl font-bold text-white mb-2">10K+</div>
                <div className="text-gray-400">Resumes Created</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-white mb-2">95%</div>
                <div className="text-gray-400">Success Rate</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-white mb-2">500+</div>
                <div className="text-gray-400">Companies</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-white mb-2">24/7</div>
                <div className="text-gray-400">AI Support</div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  )
}
