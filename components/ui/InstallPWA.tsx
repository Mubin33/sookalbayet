"use client"

import * as React from "react"
import { Download } from "lucide-react"
import { Button } from "./Button"

export function InstallPWA() {
  const [deferredPrompt, setDeferredPrompt] = React.useState<any>(null)
  const [isInstallable, setIsInstallable] = React.useState(false)
  const [isInstalled, setIsInstalled] = React.useState(false)

  React.useEffect(() => {
    // Check if app is already installed
    if (window.matchMedia('(display-mode: standalone)').matches) {
      setIsInstalled(true)
    }

    const handleBeforeInstallPrompt = (e: any) => {
      // Prevent the mini-infobar from appearing on mobile
      e.preventDefault()
      // Stash the event so it can be triggered later
      setDeferredPrompt(e)
      setIsInstallable(true)
    }

    const handleAppInstalled = () => {
      setDeferredPrompt(null)
      setIsInstallable(false)
      setIsInstalled(true)
      console.log('PWA was installed')
    }

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt)
    window.addEventListener('appinstalled', handleAppInstalled)

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt)
      window.removeEventListener('appinstalled', handleAppInstalled)
    }
  }, [])

  const handleInstallClick = async () => {
    if (!deferredPrompt) return

    // Show the install prompt
    deferredPrompt.prompt()
    
    // Wait for the user to respond to the prompt
    const { outcome } = await deferredPrompt.userChoice
    console.log(`User response to the install prompt: ${outcome}`)
    
    // We've used the prompt, and can't use it again, throw it away
    setDeferredPrompt(null)
    setIsInstallable(false)
  }

  // If already installed or not installable, don't show the button
  if (isInstalled || !isInstallable) {
    return null
  }

  return (
    <div className="bg-primary-50 border border-primary-100 rounded-xl p-6 flex flex-col sm:flex-row items-center justify-between gap-4 mt-8 mb-4">
      <div>
        <h3 className="font-heading font-semibold text-primary-900 text-lg">Install Sookalbayet App</h3>
        <p className="text-primary-700 text-sm mt-1">Get a faster, more app-like experience on your device.</p>
      </div>
      <Button onClick={handleInstallClick} className="w-full sm:w-auto shrink-0 shadow-sm">
        <Download className="w-4 h-4 mr-2" />
        Install App
      </Button>
    </div>
  )
}
