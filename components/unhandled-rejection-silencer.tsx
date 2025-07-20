"use client"

import { useEffect } from "react"

/**
 * Attaches a global listener that prevents the browser (and extensions like MetaMask)
 * from showing pop-ups for *any* un-handled Promise rejection.
 * The error is still logged to the console for developers.
 */
export default function UnhandledRejectionSilencer() {
  useEffect(() => {
    const handler = (event: PromiseRejectionEvent) => {
      // Log the original reason for debugging
      /* eslint-disable no-console */
      console.warn("Silenced unhandled promise rejection:", event.reason)
      /* eslint-enable no-console */

      // Prevent the default bubbling / extension pop-ups
      event.preventDefault()
    }

    window.addEventListener("unhandledrejection", handler)
    return () => window.removeEventListener("unhandledrejection", handler)
  }, [])

  // No visual output
  return null
}
