import { useState } from 'react';
import { Mail, ArrowUp, Send, Check } from 'lucide-react';
import confetti from 'canvas-confetti';
import { portfolioData } from '../portfolioData';
import './Footer.css';

export default function Footer({ activeColor }) {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [isSent, setIsSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;
    
    setLoading(true);

    // Simulate API delivery
    setTimeout(() => {
      setLoading(false);
      setIsSent(true);
      
      // Fire confetti celebrating form submit
      confetti({
        particleCount: 100,
        spread: 60,
        origin: { y: 0.8 },
        colors: [activeColor, '#ffffff']
      });

      // Clear fields
      setFormData({ name: '', email: '', message: '' });

      // Reset success status after delay
      setTimeout(() => {
        setIsSent(false);
      }, 5000);
    }, 1200);
  };

  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const directoryLinks = [
    {
      title: "Explore",
      links: [
        { label: "Home", url: "#home" },
        { label: "Projects Showcase", url: "#projects" },
        { label: "Technical Specs", url: "#specs" },
        { label: "Playground", url: "#playground" }
      ]
    },
    {
      title: "Social Connections",
      links: [
        { label: "GitHub Codes", url: portfolioData.personal.socials.github },
        { label: "LinkedIn Professional", url: portfolioData.personal.socials.linkedin },
        { label: "Twitter Feed", url: portfolioData.personal.socials.twitter }
      ]
    },
    {
      title: "System Services",
      links: [
        { label: "Resume Portfolio", url: portfolioData.personal.resumeUrl },
        { label: "JeevanOS Console", url: "#os" },
        { label: "Email Node", url: portfolioData.personal.socials.email }
      ]
    }
  ];

  return (
    <footer id="contact" className="footer-section section">
      <div className="footer-container container">
        
        {/* Contact Form and Text Block */}
        <div className="footer-top-grid">
          <div className="contact-info-block">
            <span className="eyebrow">Get in touch</span>
            <h2 className="section-title">Let's build.</h2>
            <p className="contact-desc">
              Have a project in mind, want to talk software engineering, or want to connect about internships, AI systems, or data tooling? Drop me a message.
            </p>
            <div className="quick-contact-methods">
              <a href={portfolioData.personal.socials.email} className="quick-link">
                <Mail size={16} style={{ color: activeColor }} />
                <span>jeevanjsingh5125@gmail.com</span>
              </a>
            </div>
          </div>

          <div className="contact-form-block glass">
            {isSent ? (
              <div className="form-success-message">
                <div className="success-icon-badge" style={{ backgroundColor: `${activeColor}22`, color: activeColor }}>
                  <Check size={28} />
                </div>
                <h3>Message Sent</h3>
                <p>Thank you! Your inquiry has been received. I will respond to your node shortly.</p>
              </div>
            ) : (
              <form onSubmit={handleFormSubmit} className="contact-form">
                <div className="form-group">
                  <label htmlFor="name" className="form-label">Name</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    placeholder="John Doe"
                    className="form-input"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="email" className="form-label">Email Address</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    placeholder="john@example.com"
                    className="form-input"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="message" className="form-label">Message</label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    rows="4"
                    placeholder="Describe your project..."
                    className="form-input"
                  ></textarea>
                </div>
                <button 
                  type="submit" 
                  disabled={loading}
                  className="action-btn action-btn-primary form-submit-btn"
                  style={{ backgroundColor: activeColor }}
                >
                  {loading ? 'Sending...' : (
                    <>
                      <Send size={14} style={{ marginRight: 8 }} />
                      Send Message
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>

        <hr className="footer-divider" />

        {/* Directory Sitemap Grid */}
        <div className="footer-sitemap-grid">
          {directoryLinks.map((col) => (
            <div key={col.title} className="sitemap-col">
              <h4 className="sitemap-title">{col.title}</h4>
              <ul className="sitemap-list">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <a href={link.url} className="sitemap-link">{link.label}</a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
          
          <div className="sitemap-col scroll-top-col">
            <button className="scroll-top-btn glass" onClick={handleScrollToTop} aria-label="Scroll to top">
              <ArrowUp size={16} />
            </button>
            <span className="scroll-label">Scroll to Top</span>
          </div>
        </div>

        {/* Copyright and system indicators */}
        <div className="footer-bottom">
          <p className="copyright-text">
            Copyright © 2026 {portfolioData.personal.name}. All rights reserved. Simulated with pure digital creativity.
          </p>
          <div className="footer-system-status">
            <span className="status-dot"></span>
            <span>All systems operational</span>
          </div>
        </div>
        
      </div>
    </footer>
  );
}
