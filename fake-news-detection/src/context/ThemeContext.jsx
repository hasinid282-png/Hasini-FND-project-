import React, { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext();

export function ThemeProvider({ children }) {
  // Default to 'navy-dark' (Deep Navy with Crisp White typography & accents)
  const [theme, setTheme] = useState(() => {
    try {
      return localStorage.getItem('veritas_theme') || 'navy-dark';
    } catch {
      return 'navy-dark';
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('veritas_theme', theme);
    } catch {
      // ignore
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'navy-dark' ? 'navy-light' : 'navy-dark'));
  };

  return (
    <ThemeContext.Provider value={{ theme, setTheme, toggleTheme, isDark: theme === 'navy-dark' }}>
      <div className={`min-h-screen ${theme === 'navy-dark' ? 'theme-navy-dark' : 'theme-navy-light'}`}>
        {children}
      </div>
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}
