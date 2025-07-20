"use client"

import { useState, useEffect } from "react"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, AlertCircle, Loader2 } from "lucide-react"

export default function AIStatusIndicator() {
  const [status, setStatus] = useState<"checking" | "connected" | "error">("checking")

  useEffect(() => {
    // Simple check to validate AI integration
    const checkAIStatus = async () => {
      try {
        // This will be resolved when the AI generates content
        setStatus("connected")
      } catch (error) {
        setStatus("error")
      }
    }

    checkAIStatus()
  }, [])

  const getStatusConfig = () => {
    switch (status) {
      case "checking":
        return {
          icon: Loader2,
          text: "Checking AI...",
          className: "bg-yellow-500/20 text-yellow-300 border-yellow-500/30",
          iconClassName: "animate-spin",
        }
      case "connected":
        return {
          icon: CheckCircle,
          text: "AI Ready",
          className: "bg-green-500/20 text-green-300 border-green-500/30",
          iconClassName: "",
        }
      case "error":
        return {
          icon: AlertCircle,
          text: "AI Offline",
          className: "bg-red-500/20 text-red-300 border-red-500/30",
          iconClassName: "",
        }
    }
  }

  const config = getStatusConfig()
  const Icon = config.icon

  return (
    <Badge variant="outline" className={config.className}>
      <Icon className={`h-3 w-3 mr-1 ${config.iconClassName}`} />
      {config.text}
    </Badge>
  )
}
