import { createContext, useContext, useEffect } from "react";

const ThemeContext = createContext();

export const useTheme = () => useContext(ThemeContext);

export const ThemeProvider = ({ children }) => {
  // Always use dark mode
  useEffect(() => {
    document.documentElement.classList.add("dark");
  }, []);

  // Context values (simplified)
  const value = {
    isDarkMode: true,
    toggleTheme: () => {} // Empty function since we don't toggle anymore
  };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
};
