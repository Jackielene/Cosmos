import { Github } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-black border-t border-gray-800">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600">
              Cosmos
            </h3>
            <p className="text-gray-400 mb-4">
              Exploring the wonders of our cosmic neighborhood and beyond.
            </p>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4 text-white">Explore</h4>
            <ul className="space-y-2">
              {["Planets", "Galaxy", "Space Facts", "Space Missions"].map((item, index) => (
                <li key={index}>
                  <a 
                    href={item === "Space Facts" || item === "Space Missions" 
                      ? "#space-facts" 
                      : `#${item.toLowerCase().replace(/\s/g, '-')}`} 
                    className="text-gray-400 hover:text-blue-400 transition-colors"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4 text-white">Contact</h4>
            <ul className="space-y-2">
              <li className="text-gray-400">Email: info@solarsystem.edu</li>
              <li className="text-gray-400">Phone: +1 (555) 123-4567</li>
              <li className="text-gray-400">Address: 123 Space Avenue, Universe</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-6 flex justify-center">
          <p className="text-gray-500 text-sm text-center">
            © {new Date().getFullYear()} Cosmos Educational Website. All rights reserved.
          </p>
        </div>
        <p className="text-gray-500 text-sm text-center mt-4">Made with ❤️ by Kiel</p>
      </div>
    </footer>
  );
};

export default Footer;
