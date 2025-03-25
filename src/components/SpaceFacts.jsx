import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

const SpaceFacts = () => {
  const [activeCategory, setActiveCategory] = useState("amazing");

  const categories = [
    { id: "amazing", label: "Amazing Facts" },
    { id: "discoveries", label: "Recent Discoveries" },
    { id: "missions", label: "Space Missions" },
  ];

  const facts = {
    amazing: [
      {
        title: "Sols 4486-4487: Ankle-Breaking Kind of Terrain!",
        description:
          "One of our geologists remarked that they wouldn't like to even walk over this without solid boots coming way up over the ankles — this is definitely the kind of terrain to result in twisted and broken ankles!",
        image: "https://assets.science.nasa.gov/dynamicimage/assets/science/missions/msl/2025/curiosity-rover-updates/march/https___mars.nasa.gov_msl-raw-images_proj_msl_redops_ods_surface_sol_04484_opgs_edr_fcam_FRB_795566969EDR_F1140918FHAZ00302M_.JPG?w=1024&h=1024&fit=clip&crop=faces%2Cfocalpoint",
        url: "https://science.nasa.gov/blog/sols-4486-4487-ankle-breaking-kind-of-terrain/",
      },
      {
        title: "10 Things for Mars 10",
        description:
          "Scientists from around the world are gathering this week in California to take stock of the state of science from Mars and discuss goals for the next steps in exploration of the Red Planet.",
        image: "https://science.nasa.gov/wp-content/uploads/2024/07/pia26401-2500x.jpg",
        url: "https://science.nasa.gov/solar-system/planets/mars/10-things-for-mars-10/",
      },
      {
        title: "New Insights into How Mars Became Uninhabitable",
        description: "NASA's Curiosity rover, currently exploring Gale crater on Mars, is providing new details about how the ancient Martian climate went from potentially suitable for life",
        image: "https://science.nasa.gov/wp-content/uploads/2024/09/mars-wet-lpi-16x9-1.jpg",
        url: "https://science.nasa.gov/solar-system/planets/mars/nasa-new-insights-into-how-mars-became-uninhabitable/",
      },
    ],
    discoveries: [
      {
        title: " Next-Generation Water Satellite Maps Seafloor From Space",
        description:
          "There are better maps of the Moon's surface than of the bottom of Earth's ocean. Researchers have been working for decades to change that.",
        image: "https://www.nasa.gov/wp-content/uploads/2025/03/1-paramount-seamount-noaa.jpg",
        url: "https://www.nasa.gov/missions/swot/next-generation-water-satellite-maps-seafloor-from-space/",
      },
      {
        title: "NASA's Curiosity Rover Discovers a Surprise in a Martian Rock",
        description: "Scientists were stunned on May 30 when a rock that NASA's Curiosity Mars rover drove over cracked open to reveal something never seen before on the Red Planet",
        image: "https://www.nasa.gov/wp-content/uploads/2024/07/1-pia26309-curiosity-views-16x9-1.jpg?resize=1536,864",
        url: "https://www.nasa.gov/missions/mars-science-laboratory/curiosity-rover/nasas-curiosity-rover-discovers-a-surprise-in-a-martian-rock/ ",
      },
      {
        title: "NASA's Curiosity Reaches Mars Ridge Where Water Left Debris Pileup",
        description:
          "Three billion years ago, amid one of the last wet periods on Mars, powerful debris flows carried mud and boulders down the side of a hulking mountain.",
        image: "https://www.nasa.gov/wp-content/uploads/2023/09/pia26019.jpg",
        url: "https://www.nasa.gov/missions/mars-science-laboratory/curiosity-rover/nasas-curiosity-reaches-mars-ridge-where-water-left-debris-pileup-2/",
      },
    ],
    missions: [
      {
        title: "NASA's Curiosity Rover Captures Shining Clouds on Mars",
        description:
          "The science team is studying the clouds, which arrived earlier and formed higher than expected, to learn more about the Red Planet",
        image: "https://www.nasa.gov/wp-content/uploads/2021/05/1-pia24622-curiosity-spots-clouds-1041.jpg",
        url: "https://www.nasa.gov/centers-and-facilities/jpl/nasas-curiosity-rover-captures-shining-clouds-on-mars/",
      },
      {
        title: "NASA's Curiosity Rover Finds an Ancient Oasis on Mars",
        description:
          "If you could travel back in time 3.5 billion years, what would Mars look like? The picture is evolving among scientists working with NASA's Curiosity rover.",
        image: "https://www.nasa.gov/wp-content/uploads/2019/10/pia21261_0.jpg",
        url: "https://www.nasa.gov/solar-system/nasas-curiosity-rover-finds-an-ancient-oasis-on-mars/",
      },
      {
        title: "Curiosity's Mars Methane Mystery Continues",
        description:
          "Curiosity's team conducted a follow-on methane experiment this past weekend.",
        image: "https://www.nasa.gov/wp-content/uploads/2019/06/methane20190623-1041.jpg",
        url: "https://www.nasa.gov/missions/mars-science-laboratory/curiosity-rover/curiositys-mars-methane-mystery-continues/",
      },
    ],
  };

  return (
    <section id="space-facts" className="py-20 px-4 bg-gradient-to-b from-gray-900 to-black">
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600">
            Fascinating Space Facts
          </h2>
          <p className="text-lg text-gray-300 max-w-3xl mx-auto">
            Expand your cosmic knowledge with these incredible facts about our universe
          </p>
        </motion.div>

        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={`px-5 py-2 rounded-full transition-colors ${
                activeCategory === category.id
                  ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white"
                  : "bg-gray-800 hover:bg-gray-700 text-gray-300"
              }`}
            >
              {category.label}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {facts[activeCategory].map((fact, index) => (
            <motion.a
              key={fact.title}
              href={fact.url}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-gray-900/60 backdrop-blur-sm rounded-xl overflow-hidden border border-gray-800 group hover:border-blue-500/50 transition-all hover:shadow-lg hover:shadow-blue-500/10 cursor-pointer flex flex-col h-full"
            >
              <div className="h-48 overflow-hidden">
                <img
                  src={fact.image || "/placeholder.svg"}
                  alt={fact.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
              </div>
              <div className="p-6 flex flex-col flex-grow">
                <h3 className="text-xl font-bold mb-2 group-hover:text-blue-400 transition-colors">{fact.title}</h3>
                <p className="text-gray-300 mb-4 flex-grow">{fact.description}</p>
                <div className="flex items-center text-blue-400 group-hover:text-blue-300 transition-colors mt-auto">
                  <span className="mr-1">Read full article</span>
                  <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SpaceFacts;