import { useState, useEffect, useRef } from "react"
import HeroSection from "./components/HeroSection"
import NavBar from "./components/Navbar"
import PlanetSection from "./components/PlanetSection"
import GalaxyExplorer from "./components/GalaxyExplorer"
import SpaceFacts from "./components/SpaceFacts"
import Footer from "./components/Footer";
import { ThemeProvider } from "./components/ThemeContext"

const CosmicLoader = () => {
  const canvasRef = useRef(null)
  const [loadingProgress, setLoadingProgress] = useState(0)

  // Simulate loading progress
  useEffect(() => {
    const interval = setInterval(() => {
      setLoadingProgress((prev) => {
        const newProgress = prev + Math.random() * 15
        return newProgress > 100 ? 100 : newProgress
      })
    }, 200)

    return () => clearInterval(interval)
  }, [])

  // Black hole animation
  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext("2d")
    let animationFrameId
    let particles = []

    // Set canvas dimensions
    const setCanvasDimensions = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    setCanvasDimensions()
    window.addEventListener("resize", setCanvasDimensions)

    // Create particles
    const createParticles = () => {
      particles = []
      const particleCount = Math.min(window.innerWidth, window.innerHeight) * 0.3

      for (let i = 0; i < particleCount; i++) {
        const angle = Math.random() * Math.PI * 2
        const radius = 50 + Math.random() * Math.min(window.innerWidth, window.innerHeight) * 0.4

        particles.push({
          x: Math.cos(angle) * radius,
          y: Math.sin(angle) * radius,
          size: Math.random() * 2 + 1,
          speedX: Math.cos(angle) * (0.2 + Math.random() * 0.5),
          speedY: Math.sin(angle) * (0.2 + Math.random() * 0.5),
          color: `hsl(${220 + Math.random() * 60}, 80%, ${50 + Math.random() * 30}%)`,
          alpha: Math.random() * 0.8 + 0.2,
          angle,
          radius,
          orbitSpeed: 0.002 + Math.random() * 0.003,
          orbitAngle: angle,
          distanceFromCenter: radius,
        })
      }
    }

    createParticles()

    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Center of the canvas
      const centerX = canvas.width / 2
      const centerY = canvas.height / 2

      // Draw black hole
      const blackHoleRadius = Math.min(canvas.width, canvas.height) * 0.08
      const gradientRadius = blackHoleRadius * 3

      // Outer glow
      const outerGlow = ctx.createRadialGradient(
        centerX,
        centerY,
        blackHoleRadius * 0.8,
        centerX,
        centerY,
        gradientRadius,
      )
      outerGlow.addColorStop(0, "rgba(30, 64, 175, 0.8)")
      outerGlow.addColorStop(0.5, "rgba(79, 70, 229, 0.3)")
      outerGlow.addColorStop(1, "rgba(0, 0, 0, 0)")

      ctx.fillStyle = outerGlow
      ctx.beginPath()
      ctx.arc(centerX, centerY, gradientRadius, 0, Math.PI * 2)
      ctx.fill()

      // Accretion disk
      const diskGradient = ctx.createRadialGradient(
        centerX,
        centerY,
        blackHoleRadius,
        centerX,
        centerY,
        blackHoleRadius * 2,
      )
      diskGradient.addColorStop(0, "rgba(59, 130, 246, 0.8)")
      diskGradient.addColorStop(0.5, "rgba(139, 92, 246, 0.5)")
      diskGradient.addColorStop(1, "rgba(0, 0, 0, 0)")

      ctx.save()
      ctx.translate(centerX, centerY)
      ctx.rotate(performance.now() * 0.0001)
      ctx.translate(-centerX, -centerY)

      ctx.fillStyle = diskGradient
      ctx.beginPath()
      ctx.ellipse(
        centerX,
        centerY,
        blackHoleRadius * 2,
        blackHoleRadius * 0.8,
        performance.now() * 0.0001,
        0,
        Math.PI * 2,
      )
      ctx.fill()
      ctx.restore()

      // Black hole center
      const blackHoleGradient = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, blackHoleRadius)
      blackHoleGradient.addColorStop(0, "rgba(0, 0, 0, 1)")
      blackHoleGradient.addColorStop(0.7, "rgba(0, 0, 0, 1)")
      blackHoleGradient.addColorStop(1, "rgba(30, 64, 175, 0.3)")

      ctx.fillStyle = blackHoleGradient
      ctx.beginPath()
      ctx.arc(centerX, centerY, blackHoleRadius, 0, Math.PI * 2)
      ctx.fill()

      // Update and draw particles
      particles.forEach((particle) => {
        // Update orbit angle
        particle.orbitAngle += particle.orbitSpeed

        // Calculate new position based on orbit
        const distanceFactor = 1 - loadingProgress / 200 // Particles move closer as loading progresses
        const newDistance = particle.distanceFromCenter * distanceFactor

        particle.x = centerX + Math.cos(particle.orbitAngle) * newDistance
        particle.y = centerY + Math.sin(particle.orbitAngle) * newDistance * 0.4 // Elliptical orbit

        // Draw particle
        ctx.globalAlpha = particle.alpha
        ctx.fillStyle = particle.color
        ctx.beginPath()
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2)
        ctx.fill()
        ctx.globalAlpha = 1

        // Draw trail
        if (Math.random() > 0.7) {
          ctx.strokeStyle = particle.color
          ctx.globalAlpha = particle.alpha * 0.3
          ctx.lineWidth = particle.size * 0.5
          ctx.beginPath()
          ctx.moveTo(particle.x, particle.y)
          ctx.lineTo(particle.x - particle.speedX * 10, particle.y - particle.speedY * 10)
          ctx.stroke()
          ctx.globalAlpha = 1
        }
      })

      // Draw loading text
      ctx.fillStyle = "white"
      ctx.font = "bold 16px Arial, sans-serif"
      ctx.textAlign = "center"
      ctx.fillText(`${Math.floor(loadingProgress)}%`, centerX, centerY + blackHoleRadius * 3)

      animationFrameId = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener("resize", setCanvasDimensions)
      cancelAnimationFrame(animationFrameId)
    }
  }, [loadingProgress])

  return (
    <div className="fixed inset-0 z-50 bg-black">
      <canvas ref={canvasRef} className="w-full h-full" />
      <div className="absolute bottom-10 left-0 right-0 text-center text-white text-lg font-light tracking-wider">
        ENTERING THE COSMOS
      </div>
    </div>
  )
}

const App = () => {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 3000) // Increased to 3 seconds to enjoy the animation
    return () => clearTimeout(timer)
  }, [])

  const scrollToSection = (sectionId) => {
    const section = document.getElementById(sectionId)
    if (section) {
      section.scrollIntoView({ behavior: "smooth" })
    }
  }

  if (isLoading) {
    return <CosmicLoader />
  }

  return (
    <ThemeProvider>
      <div className="min-h-screen bg-gradient-to-b from-black to-gray-900 text-white overflow-hidden">
        <NavBar onNavigate={scrollToSection} />
        <HeroSection onExplore={() => scrollToSection("planets")} />
        <PlanetSection id="planets" />
        <GalaxyExplorer id="galaxy" />
        <SpaceFacts id="facts" />
        <Footer />
      </div>
    </ThemeProvider>
  )
}

export default App

