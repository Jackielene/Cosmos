import { useState } from "react";
import { motion } from "framer-motion";

const PlanetCard = ({ planet }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      className="relative h-full rounded-xl overflow-hidden group cursor-pointer"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: planet.index * 0.1 }}
      viewport={{ once: true, margin: "-100px" }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/80 z-10"></div>

      {/* Planet Image */}
      <motion.div
        className="h-full w-full"
        animate={{
          scale: isHovered ? 1.1 : 1,
          rotate: isHovered ? 5 : 0,
        }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <img src={planet.image || "/placeholder.svg"} alt={planet.name} className="h-full w-full object-cover" />
      </motion.div>

      {/* Planet Info */}
      <div className="absolute bottom-0 left-0 right-0 p-4 z-20">
        <h3 className="text-xl font-bold mb-1 text-white">{planet.name}</h3>
        <div className="flex items-center mb-2">
          <div className="w-3 h-3 rounded-full mr-2" style={{ backgroundColor: planet.color }}></div>
          <span className="text-sm text-gray-300">{planet.type}</span>
        </div>

        {/* Stats */}
        <motion.div
          className="grid grid-cols-2 gap-2 text-sm text-gray-300 overflow-hidden"
          initial={{ height: 0, opacity: 0 }}
          animate={{
            height: isHovered ? "auto" : 0,
            opacity: isHovered ? 1 : 0,
          }}
          transition={{ duration: 0.3 }}
        >
          <div>
            <span className="block text-gray-400">Diameter</span>
            <span className="font-medium">{planet.diameter}</span>
          </div>
          <div>
            <span className="block text-gray-400">Distance from Sun</span>
            <span className="font-medium">{planet.distance}</span>
          </div>
          <div>
            <span className="block text-gray-400">Day Length</span>
            <span className="font-medium">{planet.dayLength}</span>
          </div>
          <div>
            <span className="block text-gray-400">Moons</span>
            <span className="font-medium">{planet.moons}</span>
          </div>
        </motion.div>

        {/* Explore Button */}
        <motion.button
          className="mt-3 px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full text-sm font-medium w-full opacity-0 group-hover:opacity-100 transition-opacity"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          initial={{ y: 20 }}
          animate={{ y: isHovered ? 0 : 20 }}
        >
          Explore
        </motion.button>
      </div>
    </motion.div>
  );
};

export default PlanetCard;
