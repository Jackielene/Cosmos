import { useEffect, useState, useRef } from "react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

const ParallaxBackground = ({
  className,
  starCount = 100,
  planetCount = 3,
  children,
}) => {
  const [stars, setStars] = useState([]);
  const [planets, setPlanets] = useState([]);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const containerRef = useRef(null);

  useEffect(() => {
    const generatedStars = Array.from({ length: starCount }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 2 + 1,
      opacity: Math.random() * 0.7 + 0.3,
      speed: Math.random() * 0.05 + 0.01,
    }));
    setStars(generatedStars);

    const planetImages = [
      "https://images.unsplash.com/photo-1614732414444-096e5f1122d5?w=150&q=80",
      "https://images.unsplash.com/photo-1614314107768-6018061e5f01?w=150&q=80",
      "https://images.unsplash.com/photo-1614642264762-d0a3b8bf3700?w=150&q=80",
      "https://images.unsplash.com/photo-1639921884918-8d28ab2e39a4?w=150&q=80",
      "https://images.unsplash.com/photo-1614313913007-2b4ae8ce32d6?w=150&q=80",
    ];

    const generatedPlanets = Array.from({ length: planetCount }, (_, i) => ({
      id: i,
      x: Math.random() * 80 + 10,
      y: Math.random() * 80 + 10,
      size: Math.random() * 40 + 20,
      image: planetImages[i % planetImages.length],
      speed: Math.random() * 0.02 + 0.005,
    }));
    setPlanets(generatedPlanets);
  }, [starCount, planetCount]);

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (containerRef.current) {
        const { left, top, width, height } = containerRef.current.getBoundingClientRect();
        setMousePosition({ x: (e.clientX - left) / width, y: (e.clientY - top) / height });
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div ref={containerRef} className={cn("relative w-full h-full overflow-hidden bg-black", className)}>
      {stars.map((star) => (
        <div
          key={star.id}
          className="absolute rounded-full bg-white"
          style={{
            left: `${star.x + (mousePosition.x - 0.5) * -star.speed * 100}%`,
            top: `${star.y + (mousePosition.y - 0.5) * -star.speed * 100}%`,
            width: `${star.size}px`,
            height: `${star.size}px`,
            opacity: star.opacity,
            boxShadow: `0 0 ${star.size * 2}px rgba(255, 255, 255, ${star.opacity})`,
          }}
        />
      ))}

      {planets.map((planet) => (
        <motion.div
          key={planet.id}
          className="absolute rounded-full overflow-hidden"
          style={{
            left: `${planet.x + (mousePosition.x - 0.5) * -planet.speed * 100}%`,
            top: `${planet.y + (mousePosition.y - 0.5) * -planet.speed * 100}%`,
            width: `${planet.size}px`,
            height: `${planet.size}px`,
          }}
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.5 }}
        >
          <img src={planet.image} alt="Planet" className="w-full h-full object-cover rounded-full" />
        </motion.div>
      ))}

      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black opacity-70" />
      <div className="relative z-10">{children}</div>
    </div>
  );
};

export default ParallaxBackground;
