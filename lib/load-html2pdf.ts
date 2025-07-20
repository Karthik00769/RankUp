/**
 * Dynamically loads the browser bundle of html2pdf.js from a CDN
 * and returns the global `window.html2pdf` function.
 */
export async function loadHtml2Pdf(): Promise<typeof import("html2pdf.js") | any> {
  if (typeof window === "undefined") {
    throw new Error("loadHtml2Pdf must run in the browser")
  }

  // Already loaded?
  if ((window as any).html2pdf) return (window as any).html2pdf

  // Prevent duplicate <script> tags if called twice very quickly
  if ((window as any)._html2pdfLoading) {
    return new Promise((res, rej) => {
      const check = () => {
        if ((window as any).html2pdf) {
          res((window as any).html2pdf)
        } else {
          setTimeout(check, 50)
        }
      }
      check()
    })
  }
  ;(window as any)._html2pdfLoading = true

  // Load the UMD bundle from a reliable CDN
  const script = document.createElement("script")
  script.src = "https://cdnjs.cloudflare.com/ajax/libs/html2pdf.js/0.9.3/html2pdf.bundle.min.js"
  script.async = true

  return new Promise((resolve, reject) => {
    script.onload = () => {
      delete (window as any)._html2pdfLoading
      if ((window as any).html2pdf) {
        resolve((window as any).html2pdf)
      } else {
        reject(new Error("html2pdf failed to initialise"))
      }
    }
    script.onerror = () => {
      delete (window as any)._html2pdfLoading
      reject(new Error("Failed to load html2pdf.js"))
    }
    document.body.appendChild(script)
  })
}
