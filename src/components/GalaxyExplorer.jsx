"use client"

import { useRef, useState, useEffect } from "react"
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion"
import { ChevronDown } from "lucide-react"

const GalaxyExplorer = ({ id }) => {
  const sectionRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  })

  // Single state to track which fact is expanded
  const [expandedFact, setExpandedFact] = useState(null)
  // State to track if we're on mobile
  const [isMobile, setIsMobile] = useState(false)
  // State for active category in mobile view
  const [activeCategory, setActiveCategory] = useState(null)

  // Check if we're on mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
      // Set default active category on mobile
      if (window.innerWidth < 768 && !activeCategory) {
        setActiveCategory(Object.keys(cosmicFacts)[0])
      }
    }

    // Initial check
    checkMobile()

    // Add resize listener
    window.addEventListener("resize", checkMobile)

    // Cleanup
    return () => window.removeEventListener("resize", checkMobile)
  }, [activeCategory])

  // Animation values
  const bgOpacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0])
  const bgScale = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [1.1, 1, 1, 1.1])
  const bgRotateZ = useTransform(scrollYProgress, [0, 1], [0, 5])
  const titleY = useTransform(scrollYProgress, [0, 0.1], [50, 0])
  const titleOpacity = useTransform(scrollYProgress, [0, 0.1], [0, 1])

  // Cosmic facts organized by categories
  const cosmicFacts = {
    galaxies: [
      {
        title: "Milky Way",
        icon: "🌌",
        description: "Our home galaxy contains over 100 billion stars and has a supermassive black hole at its center.",
        trivia: [
          "The Milky Way is a barred spiral galaxy with a diameter of 100,000-200,000 light-years.",
          "It takes the Sun about 225-250 million years to complete one orbit around the galactic center.",
          "The supermassive black hole at the center, Sagittarius A*, has a mass of about 4 million times that of our Sun.",
          "The Milky Way is part of the Local Group, a collection of more than 54 galaxies.",
        ],
        color: "from-blue-500 to-purple-600",
      },
      {
        title: "Andromeda Galaxy",
        icon: "🔭",
        description:
          "The nearest major galaxy to the Milky Way, set to collide with our galaxy in about 4.5 billion years.",
        trivia: [
          "Andromeda is the largest galaxy in our Local Group, containing approximately 1 trillion stars.",
          "It's visible to the naked eye on dark, moonless nights, appearing as a fuzzy patch in the constellation Andromeda.",
          "The collision between Andromeda and the Milky Way will create a new, larger elliptical galaxy sometimes called 'Milkomeda'.",
          "Andromeda contains at least two spiral arms and a prominent dust lane visible in telescopic images.",
        ],
        color: "from-indigo-500 to-blue-600",
      },
      {
        title: "Triangulum Galaxy",
        icon: "🔺",
        description: "The third-largest galaxy in our Local Group, known for its prominent spiral structure.",
        trivia: [
          "The Triangulum Galaxy is about 60,000 light-years in diameter, making it much smaller than both the Milky Way and Andromeda.",
          "It contains about 40 billion stars, compared to the 100+ billion in the Milky Way.",
          "It's one of the most distant objects visible to the naked eye, at approximately 2.73 million light-years from Earth.",
          "Unlike most spiral galaxies, Triangulum doesn't appear to have a central bulge containing a supermassive black hole.",
        ],
        color: "from-red-500 to-orange-600",
      },
    ],
    cosmicPhenomena: [
      {
        title: "Black Holes",
        icon: "⚫",
        description:
          "Regions of spacetime where gravity is so strong that nothing—not even light—can escape once it passes the event horizon.",
        trivia: [
          "The point of no return around a black hole is called the event horizon.",
          "Stellar black holes form when massive stars collapse at the end of their life cycles.",
          "Supermassive black holes, found at the centers of most galaxies, can have masses millions or billions times that of our Sun.",
          "Black holes don't actually 'suck' matter in; objects fall into them due to their immense gravitational pull.",
        ],
        color: "from-gray-800 to-gray-900",
      },
      {
        title: "Neutron Stars",
        icon: "💫",
        description: "Incredibly dense stellar remnants formed from the collapsed cores of massive stars.",
        trivia: [
          "A neutron star typically has a mass of about 1.4 times that of our Sun, but compressed into a sphere only about 20 kilometers (12 miles) in diameter.",
          "A teaspoon of neutron star material would weigh about 10 million tons on Earth.",
          "Neutron stars can rotate extremely rapidly, with some spinning more than 700 times per second.",
          "Pulsars are rotating neutron stars that emit beams of electromagnetic radiation from their poles.",
        ],
        color: "from-yellow-500 to-orange-600",
      },
      {
        title: "Supernovas",
        icon: "💥",
        description:
          "Powerful and luminous stellar explosions that occur during the final evolutionary stages of massive stars.",
        trivia: [
          "A supernova can briefly outshine an entire galaxy and radiate more energy than our Sun will emit over its entire lifetime.",
          "They play a crucial role in enriching the universe with heavier elements, as the explosion disperses elements created inside the star.",
          "The most recent supernova observed in our Milky Way was SN 1604, also known as Kepler's Supernova.",
          "There are two main types of supernovas: Type I (which don't show hydrogen in their spectra) and Type II (which do).",
        ],
        color: "from-red-600 to-yellow-500",
      },
    ],
    cosmicMysteries: [
      {
        title: "Dark Matter",
        icon: "🔮",
        description:
          "A mysterious form of matter that doesn't interact with the electromagnetic force but would still have gravitational effects.",
        trivia: [
          "Dark matter makes up about 27% of the universe, while ordinary matter makes up only about 5%.",
          "Scientists infer its existence from gravitational effects on visible matter and background radiation.",
          "Despite numerous experiments, dark matter particles have never been directly detected.",
          "Leading candidates for dark matter include WIMPs (Weakly Interacting Massive Particles) and axions.",
        ],
        color: "from-purple-800 to-indigo-900",
      },
      {
        title: "Dark Energy",
        icon: "✨",
        description: "A mysterious force that appears to be accelerating the expansion of the universe.",
        trivia: [
          "Dark energy makes up approximately 68% of the universe and is growing stronger as the universe expands.",
          "Its discovery in 1998 led to the 2011 Nobel Prize in Physics for Saul Perlmutter, Brian Schmidt, and Adam Riess.",
          "The simplest explanation for dark energy is that it is the 'cosmological constant' or energy density of empty space.",
          "Alternative theories include quintessence, a dynamic field whose energy density can vary in time and space.",
        ],
        color: "from-blue-900 to-purple-900",
      },
      {
        title: "Cosmic Microwave Background",
        icon: "📡",
        description: "The thermal radiation left over from the Big Bang, filling all space.",
        trivia: [
          "The CMB is the oldest light in the universe, dating back to about 380,000 years after the Big Bang.",
          "It was accidentally discovered in 1965 by Arno Penzias and Robert Wilson, who initially thought it was caused by pigeon droppings on their antenna.",
          "The temperature of the CMB is extremely uniform across the sky at about 2.7 Kelvin (-270.45°C).",
          "Tiny temperature fluctuations in the CMB provide crucial evidence for the Big Bang theory and information about the early universe.",
        ],
        color: "from-green-700 to-teal-600",
      },
    ],
    cosmicScales: [
      {
        title: "Observable Universe",
        icon: "🔍",
        description: "The region of the universe that we can theoretically observe from Earth.",
        trivia: [
          "The observable universe is a sphere with a diameter of about 93 billion light-years, despite being only 13.8 billion years old.",
          "This apparent contradiction is due to the expansion of space itself.",
          "It contains an estimated 2 trillion galaxies and approximately 10^24 stars.",
          "The edge of the observable universe is called the particle horizon, beyond which events cannot affect us.",
        ],
        color: "from-blue-600 to-cyan-500",
      },
      {
        title: "Cosmic Distances",
        icon: "📏",
        description: "The mind-boggling scales of space that challenge human comprehension.",
        trivia: [
          "Light from the Sun takes about 8 minutes and 20 seconds to reach Earth.",
          "The nearest star system to our own, Alpha Centauri, is about 4.37 light-years away.",
          "If the Sun were the size of a grain of sand, the nearest star would be about 4.3 kilometers (2.7 miles) away.",
          "The Milky Way galaxy is so large that if you could travel at the speed of light, it would still take 100,000 years to cross it.",
        ],
        color: "from-amber-600 to-orange-500",
      },
      {
        title: "Cosmic Time",
        icon: "⏳",
        description: "The vast timescales of cosmic evolution and the universe's history.",
        trivia: [
          "The universe is approximately 13.8 billion years old.",
          "The first stars didn't form until about 100-200 million years after the Big Bang.",
          "Our Sun is about 4.6 billion years old, roughly one-third the age of the universe.",
          "The Earth will remain habitable for only another 1-2 billion years as the Sun gradually becomes more luminous.",
        ],
        color: "from-teal-600 to-emerald-500",
      },
    ],
  }

  // Toggle expanded fact - ensures only one card is expanded at a time
  const toggleFact = (category, index) => {
    const factId = `${category}-${index}`
    // If clicking the same card that's already expanded, close it
    if (expandedFact === factId) {
      setExpandedFact(null)
    } else {
      // Otherwise, open the clicked card and close any other
      setExpandedFact(factId)
    }
  }

  // Check if a fact is expanded
  const isExpanded = (category, index) => {
    return expandedFact === `${category}-${index}`
  }

  // Random star positions for background
  const generateStars = (count) => {
    return Array.from({ length: count }).map((_, i) => ({
      id: i,
      size: Math.random() * 2 + 1,
      x: Math.random() * 100,
      y: Math.random() * 100,
      opacity: Math.random() * 0.7 + 0.3,
      delay: Math.random() * 5,
    }))
  }

  const stars = generateStars(150)

  // Mobile category navigation
  const renderMobileCategoryNav = () => {
    return (
      <div className="mb-6 overflow-x-auto scrollbar-hide">
        <div className="flex space-x-2 pb-2">
          {Object.keys(cosmicFacts).map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`whitespace-nowrap px-4 py-2 rounded-full text-sm transition-colors ${
                activeCategory === category
                  ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white"
                  : "bg-gray-800/60 text-gray-300 hover:bg-gray-700/60"
              }`}
            >
              {category.replace(/([A-Z])/g, " $1").replace(/^./, (str) => str.toUpperCase())}
            </button>
          ))}
        </div>
      </div>
    )
  }

  return (
    <section id={id} ref={sectionRef} className="relative py-16 md:py-24 overflow-hidden min-h-screen">
      {/* Cosmic Background */}
      <div className="absolute inset-0 z-0">
        <motion.div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            opacity: bgOpacity,
            scale: bgScale,
            rotateZ: bgRotateZ,
            backgroundImage: "url('/galaxy-bg.jpg')",
          }}
        />

        {/* Star field */}
        <div className="absolute inset-0">
          {stars.map((star) => (
            <motion.div
              key={star.id}
              className="absolute rounded-full bg-white"
              style={{
                width: star.size,
                height: star.size,
                left: `${star.x}%`,
                top: `${star.y}%`,
                opacity: star.opacity,
              }}
              animate={{
                opacity: [star.opacity, star.opacity * 0.5, star.opacity],
              }}
              transition={{
                duration: 2 + star.delay,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
              }}
            />
          ))}
        </div>

        {/* Nebula overlay */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-br from-purple-900/30 via-transparent to-blue-900/30"
          style={{
            opacity: useTransform(scrollYProgress, [0, 0.5, 1], [0.3, 0.6, 0.3]),
          }}
        />

        {/* Dark overlay */}
        <div className="absolute inset-0 bg-black/70"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Header Section */}
        <motion.div
          className="text-center mb-12 md:mb-16"
          style={{
            y: titleY,
            opacity: titleOpacity,
          }}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="inline-block mb-4"
          >
            <div className="relative">
              <motion.div
                className="absolute inset-0"
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.5, 0.8, 0.5],
                }}
                transition={{
                  duration: 3,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "easeInOut",
                }}
              ></motion.div>
            </div>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-4xl md:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 mb-4 md:mb-6 tracking-tight"
          >
            Cosmic Wonders
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto mb-6 md:mb-8 leading-relaxed px-2"
          >
            Journey through the vast cosmos and discover the mind-bending facts about our universe, from the smallest
            particles to the largest structures ever observed.
          </motion.p>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1 }}
            className="animate-bounce flex justify-center"
          >
            <ChevronDown className="w-6 h-6 text-gray-400" />
          </motion.div>
        </motion.div>

        {/* Cosmic Scale Visualization - Mobile Optimized */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true, margin: "-100px" }}
          className="relative mb-16 md:mb-24 p-4 md:p-6 bg-gradient-to-r from-blue-900/30 to-purple-900/30 rounded-2xl backdrop-blur-sm border border-blue-800/30"
        >
          <h2 className="text-2xl md:text-3xl font-bold text-center text-white mb-6 md:mb-8 flex items-center justify-center gap-3">
            <span>The Cosmic Scale</span>
          </h2>

          <div className="relative h-16 mb-6 md:mb-8">
            <div className="absolute inset-0 h-1 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 top-1/2 -translate-y-1/2 rounded-full"></div>

            {/* Scale markers - Adjusted for mobile */}
            {[
              { label: "Earth", position: 5, color: "bg-blue-500", size: "w-3 md:w-4 h-3 md:h-4" },
              { label: "Solar System", position: 20, color: "bg-yellow-500", size: "w-4 md:w-5 h-4 md:h-5" },
              { label: "Milky Way", position: 40, color: "bg-purple-500", size: "w-5 md:w-6 h-5 md:h-6" },
              { label: "Local Group", position: 60, color: "bg-pink-500", size: "w-6 md:w-7 h-6 md:h-7" },
              { label: "Observable Universe", position: 90, color: "bg-red-500", size: "w-7 md:w-8 h-7 md:h-8" },
            ].map((marker, index) => (
              <div key={index} className="absolute top-1/2 -translate-y-1/2" style={{ left: `${marker.position}%` }}>
                <div
                  className={`${marker.color} ${marker.size} rounded-full shadow-lg mb-1`}
                  style={{ boxShadow: `0 10px 15px -3px ${marker.color.replace("bg-", "rgba(")}, 0.5)` }}
                ></div>
                <div className="text-[10px] md:text-xs text-gray-300 absolute -left-10 -bottom-8 w-20 text-center">
                  {marker.label}
                </div>
              </div>
            ))}
          </div>

          <p className="text-sm md:text-base text-gray-300 text-center max-w-3xl mx-auto">
            If the Earth were the size of a marble (1cm), the Sun would be a ball 1.1 meters in diameter, 117 meters
            away. The nearest star would be 271 kilometers away, and the Milky Way galaxy would span 100 million
            kilometers.
          </p>
        </motion.div>

        {/* Mobile Category Navigation */}
        {isMobile && renderMobileCategoryNav()}

        {/* Fact Categories */}
        {Object.entries(cosmicFacts).map(([category, facts], categoryIndex) => (
          <motion.div
            key={category}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: categoryIndex * 0.1 }}
            viewport={{ once: true, margin: "-100px" }}
            className={`mb-16 md:mb-20 ${isMobile && activeCategory !== category ? "hidden" : ""}`}
          >
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-6 md:mb-8 border-b border-gray-800 pb-4 capitalize">
              {category.replace(/([A-Z])/g, " $1").replace(/^./, (str) => str.toUpperCase())}
            </h2>

            {/* Responsive grid layout */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
              {facts.map((fact, index) => {
                // Create a unique ID for this fact
                const factId = `${category}-${index}`
                // Check if this specific fact is expanded
                const isThisExpanded = expandedFact === factId

                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className={`bg-gray-900/60 backdrop-blur-lg rounded-2xl border overflow-hidden transition-all duration-500 
                      ${
                        isThisExpanded
                          ? "shadow-xl border-" + fact.color.split("-")[1] + "-500/50"
                          : "border-gray-800 hover:border-blue-700/50 hover:shadow-lg"
                      }
                    `}
                    animate={
                      isThisExpanded
                        ? {
                            boxShadow: [
                              "0 20px 25px -5px rgba(30, 64, 175, 0.1)",
                              "0 20px 25px -5px rgba(30, 64, 175, 0.3)",
                              "0 20px 25px -5px rgba(30, 64, 175, 0.1)",
                            ],
                            transition: {
                              boxShadow: {
                                duration: 2,
                                repeat: Number.POSITIVE_INFINITY,
                                repeatType: "reverse",
                              },
                            },
                          }
                        : {}
                    }
                    style={{
                      position: "relative",
                      zIndex: isThisExpanded ? 10 : 1,
                    }}
                  >
                    {/* Card Header */}
                    <motion.div
                      className={`p-4 md:p-6 cursor-pointer transition-colors duration-300 ${
                        isThisExpanded ? "bg-gradient-to-r " + fact.color + " bg-opacity-20" : ""
                      }`}
                      onClick={() => toggleFact(category, index)}
                      whileHover={{
                        backgroundColor: "rgba(30, 41, 59, 0.8)",
                        transition: { duration: 0.2 },
                      }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <div className="flex items-center gap-3 md:gap-4">
                        <motion.div
                          className="text-4xl md:text-5xl"
                          animate={
                            isThisExpanded
                              ? {
                                  scale: [1, 1.2, 1],
                                  transition: { duration: 0.4 },
                                }
                              : {}
                          }
                        >
                          {fact.icon}
                        </motion.div>
                        <div className="flex-1">
                          <h3 className="text-lg md:text-xl font-bold text-white mb-1 flex items-center justify-between">
                            {fact.title}
                            <motion.div
                              animate={{ rotate: isThisExpanded ? 180 : 0 }}
                              transition={{ duration: 0.3, ease: "easeInOut" }}
                            >
                              <ChevronDown className="w-5 h-5 text-gray-400" />
                            </motion.div>
                          </h3>
                          <p className="text-xs md:text-sm text-gray-400">{fact.description}</p>
                        </div>
                      </div>
                    </motion.div>

                    {/* Expanded Content with AnimatePresence for smooth transitions */}
                    <AnimatePresence>
                      {isThisExpanded && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{
                            height: "auto",
                            opacity: 1,
                            transition: {
                              height: { duration: 0.4, ease: "easeOut" },
                              opacity: { duration: 0.5, delay: 0.1 },
                            },
                          }}
                          exit={{
                            height: 0,
                            opacity: 0,
                            transition: {
                              height: { duration: 0.3, ease: "easeIn" },
                              opacity: { duration: 0.2 },
                            },
                          }}
                          className="overflow-hidden"
                        >
                          <div className="p-4 md:p-6 pt-0 border-t border-gray-800">
                            <h4 className="text-base md:text-lg font-semibold text-blue-400 mb-3">Did You Know?</h4>
                            <ul className="space-y-3">
                              {fact.trivia.map((item, i) => (
                                <motion.li
                                  key={i}
                                  initial={{ opacity: 0, x: -10 }}
                                  animate={{ opacity: 1, x: 0 }}
                                  transition={{ duration: 0.3, delay: 0.2 + i * 0.1 }}
                                  className="flex items-start gap-2 text-sm md:text-base text-gray-300"
                                >
                                  <div className="min-w-5 mt-1">
                                    <div className={`w-2 h-2 rounded-full bg-gradient-to-r ${fact.color}`}></div>
                                  </div>
                                  <span>{item}</span>
                                </motion.li>
                              ))}
                            </ul>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                )
              })}
            </div>
          </motion.div>
        ))}

        {/* Video Section - Mobile Optimized */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true, margin: "-100px" }}
          className="relative rounded-2xl overflow-hidden shadow-2xl border border-gray-800 mb-16 md:mb-20"
          style={{ boxShadow: "0 25px 50px -12px rgba(7, 89, 133, 0.25)" }}
        >
          {/* Animated border glow */}
          <motion.div
            className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl opacity-30 blur-sm"
            animate={{
              opacity: [0.2, 0.4, 0.2],
            }}
            transition={{
              duration: 4,
              repeat: Number.POSITIVE_INFINITY,
              repeatType: "reverse",
            }}
          />

          <div className="aspect-video relative z-10">
            <iframe
              width="100%"
              height="100%"
              src="https://www.youtube.com/embed/F353xaKnQ2I?si=yKR5YpQcfNms_MoJ&amp;start=11&amp;end=27&amp;autoplay=1&amp;mute=1&amp;hd=1&amp;vq=hd1080&amp;rel=0&amp;loop=1&amp;playlist=F353xaKnQ2I"
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
            ></iframe>
          </div>

          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent flex items-end p-4 md:p-8">
            <div className="max-w-2xl">
              <h3 className="text-xl md:text-3xl font-bold text-white mb-2">The Observable Universe</h3>
              <p className="text-sm md:text-lg text-gray-300">
                Extending 46.5 billion light-years in all directions, it contains an estimated 2 trillion galaxies, each
                with billions of stars. Despite being 13.8 billion years old, the observable universe is much larger due
                to the expansion of space itself.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Quote Section - Mobile Optimized */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true, margin: "-100px" }}
          className="text-center mb-16 md:mb-20 px-4"
        >
          <div className="max-w-4xl mx-auto relative">
            <div className="text-4xl md:text-6xl text-gray-700 absolute -top-6 md:-top-10 left-0">"</div>
            <blockquote className="text-xl md:text-2xl text-gray-300 italic font-light leading-relaxed px-6">
              The universe is not only stranger than we imagine, it is stranger than we can imagine.
            </blockquote>
            <div className="text-4xl md:text-6xl text-gray-700 absolute -bottom-6 md:-bottom-10 right-0">"</div>
            <p className="text-gray-400 mt-6">— Sir Arthur Eddington, Astrophysicist</p>
          </div>
        </motion.div>

        {/* Call to Action - Mobile Optimized */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true, margin: "-100px" }}
          className="text-center bg-gradient-to-r from-blue-900/30 to-purple-900/30 rounded-2xl p-6 md:p-10 backdrop-blur-sm border border-blue-800/30"
        >
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">Continue Your Cosmic Journey</h2>
          <p className="text-sm md:text-base text-gray-300 max-w-2xl mx-auto mb-6 md:mb-8">
            The universe is vast and full of wonders waiting to be discovered. Explore more cosmic phenomena and expand
            your understanding of our place in the cosmos.
          </p>
        </motion.div>
      </div>
    </section>
  )
}

export default GalaxyExplorer

