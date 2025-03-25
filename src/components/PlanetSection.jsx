"use client"

import { useState, useEffect, useRef } from "react"
import PlanetCard from "./PlanetCard"
import PlanetModal from "./PlanetModal"
import { motion, AnimatePresence } from "framer-motion"
import { Filter, ChevronDown, Globe, Sun, Zap } from "lucide-react"
import mercuryImage from "../assets/planets/mercury.jpg"
import venusImage from "../assets/planets/venus.webp"
import earthImage from "../assets/planets/earth.jpg"
import marsImage from "../assets/planets/mars.jpg"
import jupiterImage from "../assets/planets/jupiter.jpg"
import saturnImage from "../assets/planets/saturn.jpeg"
import uranusImage from "../assets/planets/uranus.jpg"
import neptuneImage from "../assets/planets/neptune.jpg"

const planets = [
  {
    index: 0,
    name: "Mercury",
    type: "Terrestrial Planet",
    color: "#A6A6A6",
    diameter: "4,879 km",
    distance: "57.9 million km",
    dayLength: "58.6 Earth days",
    moons: "0",
    image: mercuryImage,
    description: "The smallest and innermost planet in the Solar System.",
  },
  {
    index: 1,
    name: "Venus",
    type: "Terrestrial Planet",
    color: "#E6C229",
    diameter: "12,104 km",
    distance: "108.2 million km",
    dayLength: "243 Earth days",
    moons: "0",
    image: venusImage,
    description: "The hottest planet with a thick, toxic atmosphere.",
  },
  {
    index: 2,
    name: "Earth",
    type: "Terrestrial Planet",
    color: "#4D9DE0",
    diameter: "12,756 km",
    distance: "149.6 million km",
    dayLength: "24 hours",
    moons: "1",
    image: earthImage,
    description: "Our home planet and the only known planet with life.",
  },
  {
    index: 3,
    name: "Mars",
    type: "Terrestrial Planet",
    color: "#E15241",
    diameter: "6,792 km",
    distance: "227.9 million km",
    dayLength: "24.6 hours",
    moons: "2",
    image: marsImage,
    description: "The 'Red Planet' with the largest volcano in the solar system.",
  },
  {
    index: 4,
    name: "Jupiter",
    type: "Gas Giant",
    color: "#E8A87C",
    diameter: "142,984 km",
    distance: "778.5 million km",
    dayLength: "9.9 hours",
    moons: "79",
    image: jupiterImage,
    description: "The largest planet in our solar system with a distinctive Great Red Spot.",
  },
  {
    index: 5,
    name: "Saturn",
    type: "Gas Giant",
    color: "#F2D096",
    diameter: "120,536 km",
    distance: "1.4 billion km",
    dayLength: "10.7 hours",
    moons: "82",
    image: saturnImage,
    description: "Known for its beautiful rings made of ice and rock particles.",
  },
  {
    index: 6,
    name: "Uranus",
    type: "Ice Giant",
    color: "#85D2D0",
    diameter: "51,118 km",
    distance: "2.9 billion km",
    dayLength: "17.2 hours",
    moons: "27",
    image: uranusImage,
    description: "The 'sideways planet' because it rotates on its side.",
  },
  {
    index: 7,
    name: "Neptune",
    type: "Ice Giant",
    color: "#3066BE",
    diameter: "49,528 km",
    distance: "4.5 billion km",
    dayLength: "16.1 hours",
    moons: "14",
    image: neptuneImage,
    description: "The windiest planet with the strongest winds in the Solar System.",
  },
]

// Filter options with icons
const filterOptions = [
  { value: "all", label: "All Planets", icon: <Globe size={18} /> },
  { value: "terrestrial", label: "Terrestrial", icon: <Sun size={18} /> },
  { value: "gas", label: "Gas Giants", icon: <Zap size={18} /> },
  { value: "ice", label: "Ice Giants", icon: <Globe size={18} /> },
]

// Custom hook for media query
const useMediaQuery = (query) => {
  const [matches, setMatches] = useState(false)

  useEffect(() => {
    const media = window.matchMedia(query)
    if (media.matches !== matches) {
      setMatches(media.matches)
    }

    const listener = () => setMatches(media.matches)
    media.addEventListener("change", listener)

    return () => media.removeEventListener("change", listener)
  }, [matches, query])

  return matches
}

const PlanetSection = ({ id }) => {
  const [filter, setFilter] = useState("all")
  const [filteredPlanets, setFilteredPlanets] = useState(planets)
  const [activePlanet, setActivePlanet] = useState(null)
  const [isFilterOpen, setIsFilterOpen] = useState(false)
  const isMobile = useMediaQuery("(max-width: 768px)")
  const filterRef = useRef(null)

  // Close filter dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (filterRef.current && !filterRef.current.contains(event.target)) {
        setIsFilterOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  useEffect(() => {
    if (filter === "all") {
      setFilteredPlanets(planets)
    } else {
      setFilteredPlanets(planets.filter((planet) => planet.type.toLowerCase().includes(filter)))
    }
  }, [filter])

  const handlePlanetClick = (planet) => {
    setActivePlanet(planet)
  }

  const closeActivePlanet = () => {
    setActivePlanet(null)
  }

  const handleFilterChange = (value) => {
    setFilter(value)
    if (isMobile) {
      setIsFilterOpen(false)
    }
  }

  return (
    <section id={id} className="py-20 px-4 min-h-screen bg-gradient-to-b from-slate-900 to-slate-800 text-white">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl font-bold text-center mb-8">Explore Our Solar System</h2>

        {/* Desktop Filter */}
        {!isMobile && (
          <motion.div
            className="mb-10 bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-1 overflow-hidden"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="grid grid-cols-4 gap-2">
              {filterOptions.map((option) => (
                <motion.button
                  key={option.value}
                  onClick={() => handleFilterChange(option.value)}
                  className={`flex items-center justify-center gap-2 py-3 px-4 rounded-lg transition-all duration-300 ${
                    filter === option.value
                      ? "bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg"
                      : "hover:bg-slate-700/50 text-slate-300"
                  }`}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {option.icon}
                  <span>{option.label}</span>
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}

        {/* Mobile Filter Button & Dropdown */}
        {isMobile && (
          <div className="mb-8 relative" ref={filterRef}>
            <motion.button
              onClick={() => setIsFilterOpen(!isFilterOpen)}
              className="w-full flex items-center justify-between bg-slate-800 border border-slate-700 hover:bg-slate-700 text-white py-3 px-4 rounded-lg"
              whileTap={{ scale: 0.98 }}
            >
              <div className="flex items-center gap-2">
                <Filter size={18} />
                <span>{filterOptions.find((opt) => opt.value === filter)?.label || "Filter Planets"}</span>
              </div>
              <ChevronDown
                size={18}
                className={`transition-transform duration-300 ${isFilterOpen ? "rotate-180" : ""}`}
              />
            </motion.button>

            <AnimatePresence>
              {isFilterOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -10, height: 0 }}
                  animate={{ opacity: 1, y: 0, height: "auto" }}
                  exit={{ opacity: 0, y: -10, height: 0 }}
                  transition={{ duration: 0.2 }}
                  className="absolute left-0 right-0 z-10 mt-2 bg-slate-800 border border-slate-700 rounded-lg shadow-xl overflow-hidden"
                >
                  {filterOptions.map((option) => (
                    <motion.button
                      key={option.value}
                      onClick={() => handleFilterChange(option.value)}
                      className={`w-full flex items-center gap-2 py-3 px-4 text-left ${
                        filter === option.value
                          ? "bg-gradient-to-r from-indigo-600 to-purple-600 text-white"
                          : "hover:bg-slate-700 text-slate-300"
                      }`}
                      whileHover={{ backgroundColor: "rgba(255,255,255,0.05)" }}
                      whileTap={{ scale: 0.98 }}
                    >
                      {option.icon}
                      <span>{option.label}</span>
                    </motion.button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )}

        {/* Results Count */}
        <motion.div
          className="mb-6 flex items-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <span className="inline-block bg-slate-800/50 backdrop-blur-sm border border-slate-700 px-3 py-1 rounded-full text-sm">
            {filteredPlanets.length} planets found
          </span>
        </motion.div>

        {/* Planet Grid with Animation */}
        <motion.div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6" layout>
          <AnimatePresence>
            {filteredPlanets.map((planet) => (
              <motion.div
                key={planet.name}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                className="h-80"
                onClick={() => handlePlanetClick(planet)}
                whileHover={{ y: -5, transition: { duration: 0.2 } }}
              >
                <PlanetCard planet={planet} />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Empty State */}
        {filteredPlanets.length === 0 && (
          <motion.div
            className="text-center py-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <p className="text-slate-400 mb-4">No planets match your filter criteria</p>
            <button
              onClick={() => setFilter("all")}
              className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 rounded-lg transition-colors"
            >
              Show All Planets
            </button>
          </motion.div>
        )}
      </div>

      <PlanetModal planet={activePlanet} isOpen={activePlanet !== null} onClose={closeActivePlanet} />
    </section>
  )
}

export default PlanetSection

