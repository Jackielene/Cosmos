"use client"

import { useRef, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  X,
  Info,
  Clock,
  Ruler,
  Thermometer,
  Globe,
  Compass,
  Rocket,
  CloudRain,
  Mountain,
  Orbit,
  Sparkles,
} from "lucide-react"

// Comprehensive planet data
const planetData = {
  mercury: {
    name: "Mercury",
    type: "Terrestrial Planet",
    color: "#A9A9A9",
    overview:
      "Mercury is the smallest and innermost planet in the Solar System. It is named after the Roman deity Mercury, the messenger of the gods. Mercury is a rocky planet with a heavily cratered surface similar to the Moon's appearance.",
    diameter: "4,879 km (0.38 × Earth)",
    distance: "57.9 million km (0.39 AU) from Sun",
    dayLength: "58.6 Earth days",
    yearLength: "88 Earth days",
    moons: "0",
    mass: "3.3011 × 10^23 kg (0.055 × Earth)",
    volume: "6.083 × 10^10 km³ (0.056 × Earth)",
    gravity: "3.7 m/s² (0.38 × Earth)",
    temperature: "-173°C to 427°C",
    atmosphere: "Minimal - Thin exosphere composed of oxygen, sodium, hydrogen, helium, and potassium",
    surfaceFeatures: "Heavily cratered terrain, smooth plains, dorsa (ridges), rupes (cliffs), valles (valleys)",
    funFacts: [
      "Mercury has the most eccentric orbit of all the planets in the Solar System.",
      "Despite being the closest planet to the Sun, Venus is actually hotter than Mercury due to its dense atmosphere.",
      "A day on Mercury (from sunrise to sunrise) lasts 176 Earth days.",
      "Mercury's surface resembles our Moon with numerous impact craters and ancient lava flows.",
      "Mercury has a large iron core that takes up about 60% of its mass.",
    ],
    exploration:
      "Mercury has been visited by two spacecraft: NASA's Mariner 10 (1974-1975) and MESSENGER (2008-2015). The European Space Agency's BepiColombo mission launched in 2018 and is expected to reach Mercury in 2025.",
  },
  venus: {
    name: "Venus",
    type: "Terrestrial Planet",
    color: "#E6E6FA",
    overview:
      "Venus is the second planet from the Sun and is often called Earth's 'sister planet' due to their similar size and mass. However, Venus has an extremely thick atmosphere that traps heat, making it the hottest planet in our solar system with surface temperatures that can melt lead.",
    diameter: "12,104 km (0.95 × Earth)",
    distance: "108.2 million km (0.72 AU) from Sun",
    dayLength: "243 Earth days (retrograde rotation)",
    yearLength: "225 Earth days",
    moons: "0",
    mass: "4.8675 × 10^24 kg (0.815 × Earth)",
    volume: "9.2843 × 10^11 km³ (0.857 × Earth)",
    gravity: "8.87 m/s² (0.904 × Earth)",
    temperature: "462°C (average)",
    atmosphere: "Very dense - 96.5% carbon dioxide, 3.5% nitrogen, traces of sulfur dioxide and other gases",
    surfaceFeatures: "Volcanic plains, highland regions, impact craters, lava channels, mountain ranges",
    funFacts: [
      "Venus rotates in the opposite direction to most planets, meaning the Sun rises in the west and sets in the east.",
      "A day on Venus is longer than a year on Venus.",
      "Venus has the most circular orbit of any planet, with an eccentricity of less than 1%.",
      "The atmospheric pressure on Venus's surface is 92 times that of Earth, equivalent to the pressure at a depth of 900 meters in Earth's oceans.",
      "Venus is the brightest natural object in Earth's night sky after the Moon.",
    ],
    exploration:
      "Venus has been explored by numerous spacecraft including NASA's Mariner and Pioneer Venus missions, the Soviet Venera landers, and ESA's Venus Express. NASA's DAVINCI+ and VERITAS missions are scheduled to launch in the late 2020s.",
  },
  earth: {
    name: "Earth",
    type: "Terrestrial Planet",
    color: "#1E90FF",
    overview:
      "Earth is the third planet from the Sun and the only astronomical object known to harbor life. About 71% of Earth's surface is covered with water, making it appear blue from space. Earth's atmosphere and magnetic field protect the planet from harmful solar radiation and help maintain a habitable environment.",
    diameter: "12,742 km",
    distance: "149.6 million km (1 AU) from Sun",
    dayLength: "23.9 hours",
    yearLength: "365.25 days",
    moons: "1 (Luna)",
    mass: "5.97237 × 10^24 kg",
    volume: "1.08321 × 10^12 km³",
    gravity: "9.8 m/s²",
    temperature: "-88°C to 58°C",
    atmosphere: "78% nitrogen, 21% oxygen, 1% argon, carbon dioxide, and other gases",
    surfaceFeatures: "Oceans, continents, mountains, plains, deserts, forests, ice caps",
    funFacts: [
      "Earth is the only planet not named after a god or goddess in Roman/Greek mythology.",
      "Earth's rotation is gradually slowing at approximately 17 milliseconds per hundred years.",
      "The highest point on Earth is Mount Everest (8,848.86 meters), and the deepest point is the Challenger Deep in the Mariana Trench (10,994 meters below sea level).",
      "Earth's magnetic field is generated by the movement of molten iron in its outer core.",
      "Earth has a powerful magnetic field that protects us from harmful solar radiation and creates the beautiful auroras at the poles.",
    ],
    exploration:
      "Earth is continuously observed by thousands of satellites for weather forecasting, communications, navigation, and scientific research. The International Space Station has been continuously occupied since 2000, providing a platform for Earth observation and scientific experiments.",
  },
  mars: {
    name: "Mars",
    type: "Terrestrial Planet",
    color: "#CD5C5C",
    overview:
      "Mars is the fourth planet from the Sun and is often called the 'Red Planet' due to its reddish appearance caused by iron oxide (rust) on its surface. Mars has a thin atmosphere and features that resemble both the impact craters of the Moon and the valleys, deserts, and polar ice caps of Earth.",
    diameter: "6,779 km (0.53 × Earth)",
    distance: "227.9 million km (1.52 AU) from Sun",
    dayLength: "24.6 hours",
    yearLength: "687 Earth days",
    moons: "2 (Phobos and Deimos)",
    mass: "6.4171 × 10^23 kg (0.107 × Earth)",
    volume: "1.6318 × 10^11 km³ (0.151 × Earth)",
    gravity: "3.72 m/s² (0.38 × Earth)",
    temperature: "-153°C to 20°C",
    atmosphere: "Thin - 95.3% carbon dioxide, 2.7% nitrogen, 1.6% argon",
    surfaceFeatures:
      "Olympus Mons (largest volcano in the solar system), Valles Marineris (vast canyon system), polar ice caps, impact craters, ancient river valleys",
    funFacts: [
      "Mars has the largest dust storms in the solar system, which can last for months and cover the entire planet.",
      "Olympus Mons on Mars is the tallest mountain in the solar system, standing at 21.9 km and covering an area the size of Arizona.",
      "Evidence suggests that Mars once had liquid water on its surface and may have been habitable in the past.",
      "The red color of Mars comes from iron oxide (rust) on its surface.",
      "A year on Mars is almost twice as long as a year on Earth, but a day is only slightly longer.",
    ],
    exploration:
      "Mars has been explored by numerous missions including NASA's Viking landers, Spirit and Opportunity rovers, Curiosity rover, and Perseverance rover. The UAE's Hope orbiter and China's Tianwen-1 mission also reached Mars in 2021. Future missions include NASA and ESA's Mars Sample Return mission.",
  },
  jupiter: {
    name: "Jupiter",
    type: "Gas Giant",
    color: "#F5DEB3",
    overview:
      "Jupiter is the fifth planet from the Sun and the largest in the Solar System. It is a gas giant primarily composed of hydrogen and helium. Jupiter's iconic feature is the Great Red Spot, a giant storm that has been observed for at least 400 years.",
    diameter: "139,820 km (11 × Earth)",
    distance: "778.5 million km (5.2 AU) from Sun",
    dayLength: "9.93 hours",
    yearLength: "11.86 Earth years",
    moons: "79 confirmed moons, including the four large Galilean moons: Io, Europa, Ganymede, and Callisto",
    mass: "1.8982 × 10^27 kg (317.8 × Earth)",
    volume: "1.4313 × 10^15 km³ (1,321 × Earth)",
    gravity: "24.79 m/s² (2.53 × Earth)",
    temperature: "-145°C (cloud tops)",
    atmosphere: "90% hydrogen, 10% helium, traces of methane, ammonia, water vapor",
    surfaceFeatures: "No solid surface - banded cloud patterns, Great Red Spot, numerous storms and vortices",
    funFacts: [
      "Jupiter has the shortest day of all the planets, rotating once every 9.93 hours despite its enormous size.",
      "The Great Red Spot is a storm that has been raging for at least 400 years and is large enough to fit 2-3 Earths inside it.",
      "Jupiter's magnetic field is 14 times stronger than Earth's and creates the largest magnetosphere in the solar system.",
      "Jupiter has a faint ring system, though not as prominent as Saturn's.",
      "Jupiter's moon Ganymede is the largest moon in the solar system, even larger than the planet Mercury.",
    ],
    exploration:
      "Jupiter has been visited by several spacecraft including Pioneer 10 and 11, Voyager 1 and 2, Galileo (which orbited from 1995-2003), New Horizons, and Juno (currently in orbit since 2016). ESA's JUICE mission is scheduled to launch in 2023 to study Jupiter's moons.",
  },
  saturn: {
    name: "Saturn",
    type: "Gas Giant",
    color: "#F4A460",
    overview:
      "Saturn is the sixth planet from the Sun and is famous for its spectacular ring system, which is composed primarily of ice particles with a smaller amount of rocky debris and dust. Like Jupiter, Saturn is a gas giant composed mainly of hydrogen and helium.",
    diameter: "116,460 km (9.14 × Earth)",
    distance: "1.43 billion km (9.5 AU) from Sun",
    dayLength: "10.7 hours",
    yearLength: "29.46 Earth years",
    moons: "82 confirmed moons, including Titan, the second-largest moon in the solar system",
    mass: "5.6834 × 10^26 kg (95.16 × Earth)",
    volume: "8.2713 × 10^14 km³ (763.6 × Earth)",
    gravity: "10.44 m/s² (1.07 × Earth)",
    temperature: "-178°C (cloud tops)",
    atmosphere: "96% hydrogen, 3% helium, traces of methane, ammonia, water vapor",
    surfaceFeatures: "No solid surface - banded cloud patterns, periodic storms, hexagonal cloud pattern at north pole",
    funFacts: [
      "Saturn's rings extend up to 282,000 km from the planet but are only about 10 meters thick in most places.",
      "Saturn has the lowest density of all the planets in our solar system - it would float in water if there were an ocean large enough.",
      "Saturn's moon Titan has a thick atmosphere and liquid methane lakes on its surface.",
      "The Cassini spacecraft discovered geysers of water erupting from Saturn's moon Enceladus, suggesting a subsurface ocean.",
      "Saturn's hexagonal cloud pattern at its north pole is a unique feature in our solar system, with each side measuring about 13,800 km.",
    ],
    exploration:
      "Saturn has been visited by Pioneer 11, Voyager 1 and 2, and the Cassini-Huygens mission, which orbited Saturn from 2004 to 2017 and deployed the Huygens probe to the surface of Titan in 2005.",
  },
  uranus: {
    name: "Uranus",
    type: "Ice Giant",
    color: "#ADD8E6",
    overview:
      "Uranus is the seventh planet from the Sun and is classified as an 'ice giant.' It has a unique feature among the planets: its axis of rotation is tilted sideways, nearly parallel to its orbital plane, causing it to rotate on its side. Uranus appears as a featureless blue-green sphere due to methane in its atmosphere.",
    diameter: "50,724 km (4 × Earth)",
    distance: "2.87 billion km (19.2 AU) from Sun",
    dayLength: "17.24 hours",
    yearLength: "84 Earth years",
    moons: "27 known moons, all named after characters from the works of Shakespeare and Alexander Pope",
    mass: "8.6810 × 10^25 kg (14.54 × Earth)",
    volume: "6.833 × 10^13 km³ (63.1 × Earth)",
    gravity: "8.69 m/s² (0.89 × Earth)",
    temperature: "-224°C (cloud tops)",
    atmosphere: "83% hydrogen, 15% helium, 2% methane",
    surfaceFeatures: "No solid surface - mostly featureless blue-green appearance with occasional cloud features",
    funFacts: [
      "Uranus rotates on its side with an axial tilt of 98 degrees, likely caused by a massive collision early in its history.",
      "Uranus was the first planet discovered using a telescope, by William Herschel in 1781.",
      "Uranus has 13 known rings, which are dark and narrow compared to Saturn's.",
      "During parts of its 84-year orbit, either the north or south pole faces the Sun continuously for 42 years, creating extreme seasonal changes.",
      "Uranus is the coldest planet in our solar system, with a minimum temperature of -224°C, despite not being the farthest from the Sun.",
    ],
    exploration:
      "Uranus has only been visited by one spacecraft, Voyager 2, which flew by in 1986. No dedicated missions to Uranus are currently in operation, though several have been proposed for the 2030s.",
  },
  neptune: {
    name: "Neptune",
    type: "Ice Giant",
    color: "#4169E1",
    overview:
      "Neptune is the eighth and farthest known planet from the Sun. Like Uranus, it is classified as an 'ice giant' and has a similar composition. Neptune has the strongest winds in the solar system, reaching speeds of 2,100 km/h. Its most notable feature is the Great Dark Spot, a storm similar to Jupiter's Great Red Spot.",
    diameter: "49,244 km (3.9 × Earth)",
    distance: "4.5 billion km (30.1 AU) from Sun",
    dayLength: "16.11 hours",
    yearLength: "165 Earth years",
    moons: "14 known moons, the largest being Triton",
    mass: "1.02413 × 10^26 kg (17.15 × Earth)",
    volume: "6.254 × 10^13 km³ (57.7 × Earth)",
    gravity: "11.15 m/s² (1.14 × Earth)",
    temperature: "-218°C (cloud tops)",
    atmosphere: "80% hydrogen, 19% helium, 1.5% methane",
    surfaceFeatures: "No solid surface - dynamic atmosphere with visible storms and cloud bands",
    funFacts: [
      "Neptune was the first planet to be predicted mathematically before it was actually observed.",
      "Neptune has the strongest winds in the solar system, reaching speeds of up to 2,100 km/h (1,300 mph).",
      "Neptune's moon Triton orbits in the opposite direction to Neptune's rotation, suggesting it was captured rather than formed with the planet.",
      "Neptune has only completed one orbit around the Sun since its discovery in 1846.",
      "Neptune's Great Dark Spot, observed by Voyager 2 in 1989, had disappeared when the Hubble Space Telescope observed the planet in 1994, demonstrating the dynamic nature of its atmosphere.",
    ],
    exploration:
      "Like Uranus, Neptune has only been visited by Voyager 2, which flew by in 1989. There are currently no approved missions to return to Neptune, though several concepts have been proposed.",
  },
  pluto: {
    name: "Pluto",
    type: "Dwarf Planet",
    color: "#DEB887",
    overview:
      "Pluto is a dwarf planet in the Kuiper belt, a ring of bodies beyond the orbit of Neptune. It was discovered in 1930 and was considered the ninth planet until 2006, when it was reclassified as a dwarf planet. Pluto has a highly eccentric orbit that sometimes brings it closer to the Sun than Neptune.",
    diameter: "2,377 km (0.18 × Earth)",
    distance: "5.9 billion km (39.5 AU) from Sun (average)",
    dayLength: "6.4 Earth days (retrograde rotation)",
    yearLength: "248 Earth years",
    moons: "5 (Charon, Nix, Hydra, Kerberos, and Styx)",
    mass: "1.303 × 10^22 kg (0.00218 × Earth)",
    volume: "7.057 × 10^9 km³ (0.00651 × Earth)",
    gravity: "0.62 m/s² (0.063 × Earth)",
    temperature: "-233°C to -223°C",
    atmosphere: "Thin and variable - nitrogen, methane, carbon monoxide",
    surfaceFeatures:
      "Mountains, glaciers, plains, nitrogen ice sheet (Sputnik Planitia), varied terrain with evidence of geological activity",
    funFacts: [
      "Pluto's largest moon, Charon, is so large relative to Pluto that the two are sometimes referred to as a 'double dwarf planet system.'",
      "Pluto has a heart-shaped region called Tombaugh Regio, named after its discoverer, Clyde Tombaugh.",
      "Pluto's atmosphere expands and contracts as it moves closer to or farther from the Sun during its orbit.",
      "New Horizons revealed that Pluto has blue skies and red water ice on its surface.",
      "Despite being demoted to dwarf planet status, Pluto has mountains, glaciers, and a thin atmosphere, making it more complex than many expected.",
    ],
    exploration:
      "Pluto was visited by NASA's New Horizons spacecraft, which flew by in July 2015, providing the first close-up images and detailed data about Pluto and its moons.",
  },
}

const PlanetModal = ({ planet, isOpen, onClose }) => {
  const modalRef = useRef(null)

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        onClose()
      }
    }

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside)
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [isOpen, onClose])

  useEffect(() => {
    const handleEscKey = (event) => {
      if (event.key === "Escape") {
        onClose()
      }
    }

    if (isOpen) {
      document.addEventListener("keydown", handleEscKey)
    }

    return () => {
      document.removeEventListener("keydown", handleEscKey)
    }
  }, [isOpen, onClose])

  if (!planet) return null

  // Get detailed planet data or use provided data
  const detailedPlanet = planetData[planet.name.toLowerCase()] || planet

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
        >
          {/* Close Button Outside the Modal */}
          <button
            onClick={onClose}
            className="absolute top-8 right-8 z-50 p-3 rounded-full bg-gray-800/90 text-gray-300 hover:bg-red-600 hover:text-white transition-all duration-200 transform hover:scale-105 cursor-pointer shadow-lg"
            aria-label="Close modal"
          >
            <X className="h-6 w-6" />
          </button>

          <motion.div
            ref={modalRef}
            initial={{ scale: 0.9, y: 20, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            exit={{ scale: 0.9, y: 20, opacity: 0 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="relative w-full max-w-5xl max-h-[90vh] overflow-y-auto rounded-2xl bg-gradient-to-b from-gray-900 to-black border border-gray-800 shadow-2xl"
          >
            <div className="relative h-64 sm:h-80 overflow-hidden rounded-t-2xl">
              <div className="absolute inset-0 bg-gradient-to-b from-transparent to-gray-900 z-10"></div>
              <motion.img
                src={
                  planet.image ||
                  `/planets/${detailedPlanet.name.toLowerCase()}.jpg` ||
                  "/placeholder.svg?height=800&width=1200"
                }
                alt={detailedPlanet.name}
                className="w-full h-full object-cover"
                initial={{ scale: 1 }}
                animate={{ scale: 1.05 }}
                transition={{ repeat: Number.POSITIVE_INFINITY, repeatType: "reverse", duration: 10 }}
              />
              <div className="absolute bottom-0 left-0 right-0 p-6 z-20">
                <div className="flex items-center">
                  <div className="w-6 h-6 rounded-full mr-3" style={{ backgroundColor: detailedPlanet.color }}></div>
                  <h2 className="text-4xl font-bold text-white">{detailedPlanet.name}</h2>
                </div>
                <p className="text-gray-300 mt-2">{detailedPlanet.type}</p>
              </div>
            </div>

            <div className="p-6 sm:p-8">
              {/* Overview */}
              <div className="mb-8">
                <h3 className="text-2xl font-bold mb-4 flex items-center">
                  <Info className="mr-2 h-5 w-5 text-blue-400" /> Overview
                </h3>
                <p className="text-gray-300 leading-relaxed">{detailedPlanet.overview || detailedPlanet.description}</p>
              </div>

              {/* Key facts */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                <div className="bg-gray-800/50 p-4 rounded-lg border border-gray-700 hover:border-blue-500/50 transition-colors">
                  <div className="flex items-center mb-2">
                    <Ruler className="h-4 w-4 text-blue-400 mr-2" />
                    <span className="text-sm text-gray-400">Diameter</span>
                  </div>
                  <span className="text-lg font-medium">{detailedPlanet.diameter}</span>
                </div>
                <div className="bg-gray-800/50 p-4 rounded-lg border border-gray-700 hover:border-blue-500/50 transition-colors">
                  <div className="flex items-center mb-2">
                    <Compass className="h-4 w-4 text-blue-400 mr-2" />
                    <span className="text-sm text-gray-400">Distance from Sun</span>
                  </div>
                  <span className="text-lg font-medium">{detailedPlanet.distance}</span>
                </div>
                <div className="bg-gray-800/50 p-4 rounded-lg border border-gray-700 hover:border-blue-500/50 transition-colors">
                  <div className="flex items-center mb-2">
                    <Clock className="h-4 w-4 text-blue-400 mr-2" />
                    <span className="text-sm text-gray-400">Day Length</span>
                  </div>
                  <span className="text-lg font-medium">{detailedPlanet.dayLength}</span>
                </div>
                <div className="bg-gray-800/50 p-4 rounded-lg border border-gray-700 hover:border-blue-500/50 transition-colors">
                  <div className="flex items-center mb-2">
                    <Globe className="h-4 w-4 text-blue-400 mr-2" />
                    <span className="text-sm text-gray-400">Moons</span>
                  </div>
                  <span className="text-lg font-medium">{detailedPlanet.moons}</span>
                </div>
              </div>

              {/* Physical Characteristics */}
              <div className="mb-8">
                <h3 className="text-2xl font-bold mb-4 flex items-center">
                  <Thermometer className="mr-2 h-5 w-5 text-blue-400" />
                  Physical Characteristics
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-gray-800/30 p-4 rounded-lg">
                    <span className="block text-sm text-gray-400 mb-1">Mass</span>
                    <span className="font-medium">{detailedPlanet.mass || "Data not available"}</span>
                  </div>
                  <div className="bg-gray-800/30 p-4 rounded-lg">
                    <span className="block text-sm text-gray-400 mb-1">Volume</span>
                    <span className="font-medium">{detailedPlanet.volume || "Data not available"}</span>
                  </div>
                  <div className="bg-gray-800/30 p-4 rounded-lg">
                    <span className="block text-sm text-gray-400 mb-1">Gravity</span>
                    <span className="font-medium">{detailedPlanet.gravity || "Data not available"}</span>
                  </div>
                  <div className="bg-gray-800/30 p-4 rounded-lg">
                    <span className="block text-sm text-gray-400 mb-1">Temperature</span>
                    <span className="font-medium">{detailedPlanet.temperature || "Data not available"}</span>
                  </div>
                </div>
              </div>

              {/* Atmosphere */}
              <div className="mb-8">
                <h3 className="text-2xl font-bold mb-4 flex items-center">
                  <CloudRain className="mr-2 h-5 w-5 text-blue-400" />
                  Atmosphere
                </h3>
                <div className="bg-gray-800/20 rounded-lg p-5 border-l-4 border-blue-500">
                  <p className="text-gray-300">{detailedPlanet.atmosphere || "Atmospheric data not available"}</p>
                </div>
              </div>

              {/* Surface Features */}
              <div className="mb-8">
                <h3 className="text-2xl font-bold mb-4 flex items-center">
                  <Mountain className="mr-2 h-5 w-5 text-blue-400" />
                  Surface Features
                </h3>
                <div className="bg-gray-800/20 rounded-lg p-5 border-l-4 border-purple-500">
                  <p className="text-gray-300">{detailedPlanet.surfaceFeatures || "Surface data not available"}</p>
                </div>
              </div>

              {/* Orbital Information */}
              <div className="mb-8">
                <h3 className="text-2xl font-bold mb-4 flex items-center">
                  <Orbit className="mr-2 h-5 w-5 text-blue-400" />
                  Orbital Information
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-gray-800/30 p-4 rounded-lg">
                    <span className="block text-sm text-gray-400 mb-1">Distance from Sun</span>
                    <span className="font-medium">{detailedPlanet.distance}</span>
                  </div>
                  <div className="bg-gray-800/30 p-4 rounded-lg">
                    <span className="block text-sm text-gray-400 mb-1">Orbital Period</span>
                    <span className="font-medium">{detailedPlanet.yearLength}</span>
                  </div>
                </div>
              </div>

              {/* Fun Facts */}
              <div className="mb-8">
                <h3 className="text-2xl font-bold mb-4 flex items-center">
                  <Sparkles className="mr-2 h-5 w-5 text-blue-400" />
                  Fun Facts
                </h3>
                {detailedPlanet.funFacts ? (
                  <ul className="space-y-3">
                    {detailedPlanet.funFacts.map((fact, index) => (
                      <motion.li
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="flex items-start"
                      >
                        <div className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-500/20 flex items-center justify-center mt-0.5 mr-3">
                          <span className="text-blue-400 text-sm font-bold">{index + 1}</span>
                        </div>
                        <p className="text-gray-300">{fact}</p>
                      </motion.li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-gray-400 italic">Fun facts coming soon!</p>
                )}
              </div>

              {/* Exploration History */}
              {detailedPlanet.exploration && (
                <div className="mb-8">
                  <h3 className="text-2xl font-bold mb-4 flex items-center">
                    <Rocket className="mr-2 h-5 w-5 text-blue-400" />
                    Exploration History
                  </h3>
                  <div className="bg-gray-800/20 rounded-lg p-5 border-l-4 border-green-500">
                    <p className="text-gray-300">{detailedPlanet.exploration}</p>
                  </div>
                </div>
              )}
            </div>

            {/* Footer with NASA link */}
            <div className="p-6 border-t border-gray-800 bg-gray-900/50">
              <a
                href={
                  planet.nasaLink ||
                  `https://solarsystem.nasa.gov/planets/${detailedPlanet.name.toLowerCase()}/overview/`
                }
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center text-blue-400 hover:text-blue-300 transition-colors"
              >
                <span className="mr-2">Learn more at NASA Solar System Exploration</span>
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                  />
                </svg>
              </a>
            </div>

            {/* Decorative elements */}
            <div className="absolute top-20 right-10 w-20 h-20 rounded-full bg-blue-500/10 blur-2xl"></div>
            <div className="absolute bottom-20 left-10 w-32 h-32 rounded-full bg-purple-500/10 blur-3xl"></div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default PlanetModal

