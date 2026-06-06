import { useState, useEffect } from 'react';
import { Menu, X, Sun, Moon, Command } from 'lucide-react';
import { Github, Linkedin } from './CustomIcons';
import { portfolioData } from '../portfolioData';
import './Navbar.css';

export default function Navbar({ theme, toggleTheme, activeColor }) {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  // Track active section via IntersectionObserver
  useEffect(() => {
    const sectionIds = ['home', 'timeline', 'education', 'projects', 'specs', 'os', 'playground', 'contact'];
    
    // Trigger when section occupies the middle 40% of the screen
    const observerOptions = {
      root: null,
      rootMargin: '-30% 0px -45% 0px',
      threshold: 0
    };

    const observerCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);

    return () => {
      observer.disconnect();
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const navLinks = [
    { name: 'Who is Jeevan?', id: 'home' },
    { name: 'Experience', id: 'timeline' },
    { name: 'Education', id: 'education' },
    { name: 'Projects', id: 'projects' },
    { name: 'Specs', id: 'specs' },
    { name: 'Interactive OS', id: 'os' },
    { name: 'Playground', id: 'playground' },
    { name: 'Contact', id: 'contact' },
  ];

  const handleNavClick = (e, id) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      const isMobile = window.innerWidth <= 768;
      const offset = isMobile ? 48 : 0; // Header height offset on mobile only
      
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
      setActiveSection(id);
    }
    setIsOpen(false);
  };

  return (
    <nav className={`navbar glass ${scrolled ? 'navbar-scrolled' : ''}`}>
      <div className="navbar-container">
        {/* Logo Section */}
        <a href="#home" onClick={(e) => handleNavClick(e, 'home')} className="navbar-logo">
          <Command size={20} style={{ color: activeColor }} />
          <span className="logo-text">Jeevan.dev</span>
        </a>

        {/* Navigation Link list */}
        <div className="navbar-links">
          {navLinks.map((link) => (
            <a
              key={link.id}
              href={`#${link.id}`}
              onClick={(e) => handleNavClick(e, link.id)}
              className={`navbar-link ${activeSection === link.id ? 'navbar-link-active' : ''}`}
              style={{ '--active-accent': activeColor }}
            >
              <span className="dot-indicator" style={{ backgroundColor: activeSection === link.id ? activeColor : 'transparent' }}></span>
              {link.name}
            </a>
          ))}
        </div>

        {/* Footer controls & social links */}
        <div className="navbar-controls">
          <div className="social-icons-wrapper">
            <a href={portfolioData.personal.socials.github} target="_blank" rel="noopener noreferrer" className="control-icon" aria-label="GitHub">
              <Github size={18} />
            </a>
            <a href={portfolioData.personal.socials.linkedin} target="_blank" rel="noopener noreferrer" className="control-icon" aria-label="LinkedIn">
              <Linkedin size={18} />
            </a>
          </div>
          <div className="theme-toggle-wrapper">
            <button onClick={toggleTheme} className="control-icon theme-toggle" aria-label="Toggle Theme">
              {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
            </button>
            
            <button 
              className="navbar-hamburger" 
              onClick={() => setIsOpen(!isOpen)}
              aria-label="Toggle Menu"
            >
              {isOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer (Only triggers on screens <= 768px) */}
      <div className={`navbar-drawer glass ${isOpen ? 'drawer-open' : ''}`}>
        <div className="drawer-links">
          {navLinks.map((link) => (
            <a
              key={link.id}
              href={`#${link.id}`}
              onClick={(e) => handleNavClick(e, link.id)}
              className={`drawer-link ${activeSection === link.id ? 'drawer-link-active' : ''}`}
              style={{ color: activeSection === link.id ? activeColor : 'inherit' }}
            >
              {link.name}
            </a>
          ))}
        </div>
      </div>
    </nav>
  );
}
