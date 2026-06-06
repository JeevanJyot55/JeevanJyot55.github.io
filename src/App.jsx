import { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Showcase from './components/Showcase';
import TechSpecs from './components/TechSpecs';
import InteractiveOS from './components/InteractiveOS';
import FunPlayground from './components/FunPlayground';
import Timeline from './components/Timeline';
import Education from './components/Education';
import Footer from './components/Footer';
import './App.css';

export default function App() {
  // Global States: Theme (dark/light) & Accent Color
  const [theme, setTheme] = useState('dark');
  const [activeColor, setActiveColor] = useState('#0071e3');
  const [activeColorRgb, setActiveColorRgb] = useState('0, 113, 227');

  // Toggle Dark/Light Mode
  const toggleTheme = () => {
    const nextTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(nextTheme);
    document.documentElement.setAttribute('data-theme', nextTheme);
  };

  // Change Accent Colors dynamically
  const handleColorChange = (colorHex, colorRgb) => {
    setActiveColor(colorHex);
    setActiveColorRgb(colorRgb);
    document.documentElement.style.setProperty('--accent-color', colorHex);
    document.documentElement.style.setProperty('--accent-color-rgb', colorRgb);
  };

  // Initial Sync
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    document.documentElement.style.setProperty('--accent-color', activeColor);
    document.documentElement.style.setProperty('--accent-color-rgb', activeColorRgb);

    if (window.location.hash) {
      window.history.replaceState(null, '', window.location.pathname + window.location.search);
    }
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
  }, []);

  return (
    <div className="app-viewport">
      {/* Translucent navigation header */}
      <Navbar theme={theme} toggleTheme={toggleTheme} activeColor={activeColor} />
      
      {/* Page Content Blocks */}
      <main className="main-content">
        <Hero activeColor={activeColor} />
        <Timeline activeColor={activeColor} />
        <Education activeColor={activeColor} />
        <Showcase activeColor={activeColor} />
        <TechSpecs activeColor={activeColor} />
        <InteractiveOS 
          activeColor={activeColor} 
          handleColorChange={handleColorChange} 
          theme={theme}
          toggleTheme={toggleTheme}
        />
        <FunPlayground activeColor={activeColor} />
        <Footer activeColor={activeColor} />
      </main>
    </div>
  );
}
