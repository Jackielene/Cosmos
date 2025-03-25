import { motion } from "framer-motion";

const HeroSection = ({ onExplore }) => {
  return (
    <section id="hero" className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Video Background */}
      <div className="absolute inset-0">
        <video
          src="/earth.mp4"
          alt="Earth Video"
          className="w-full h-full object-cover object-center"
          autoPlay
          muted
          loop
          playsInline
        />
        <div className="absolute inset-0 bg-black/40"></div>
      </div>

      {/* Hero Content */}
      <div className="container mx-auto text-center relative z-10">
        <motion.h1
          className="text-5xl md:text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600 mb-4"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          Explore the Universe
        </motion.h1>
        <motion.p
          className="text-lg md:text-xl text-gray-300 mb-8 max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          Embark on a journey through our solar system and beyond. Discover planets, galaxies, and fascinating space
          facts.
        </motion.p>
        <motion.button
          className="bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold py-3 px-8 rounded-full hover:shadow-lg hover:shadow-blue-500/40 transition-shadow"
          onClick={onExplore}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.6, type: "spring", stiffness: 120 }}
        >
          Explore Now
        </motion.button>
      </div>
    </section>
  );
};

export default HeroSection;
