import { useState, useRef } from 'react';
import { X, ExternalLink, Clock, DollarSign, Film, LockKeyhole, MessageCircle, Network, ShieldCheck, Sparkles, Star, TrendingUp } from 'lucide-react';
import { Github } from './CustomIcons';
import ScrollFade from './ScrollFade';
import { portfolioData } from '../portfolioData';
import './Showcase.css';

function ProjectCard({ project, onSelect }) {
  const cardRef = useRef(null);

  const handleMouseMove = (e, cardRef) => {
    if (!cardRef.current) return;
    const card = cardRef.current;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left; // x coordinate within element
    const y = e.clientY - rect.top;  // y coordinate within element
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    // Calculate rotation degree (max 8 degrees)
    const rotateX = ((centerY - y) / centerY) * 8;
    const rotateY = ((x - centerX) / centerX) * 8;
    
    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
    
    // Set reflection gradient angle
    const angle = Math.atan2(y - centerY, x - centerX) * (180 / Math.PI);
    card.style.setProperty('--reflection-angle', `${angle}deg`);
    card.style.setProperty('--reflection-opacity', '0.15');
  };

  const handleMouseLeave = (cardRef) => {
    if (!cardRef.current) return;
    const card = cardRef.current;
    card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
    card.style.setProperty('--reflection-opacity', '0');
  };

  return (
    <ScrollFade
      className="showcase-grid-wrap"
    >
      <div
        ref={cardRef}
        className="project-card glass grid-card"
        onMouseMove={(e) => handleMouseMove(e, cardRef)}
        onMouseLeave={() => handleMouseLeave(cardRef)}
        onClick={() => onSelect(project)}
        style={{ '--accent-theme': project.accentColor }}
      >
        <div className="card-reflection"></div>
        <div className="card-header">
          <span className="project-category" style={{ color: project.accentColor }}>{project.tech[0]}</span>
          <h3 className="project-card-title">{project.title}</h3>
          <p className="project-card-subtitle">{project.subtitle}</p>
        </div>

        <div className="card-content">
          {project.imageType === 'laptop' && (
            <div className="laptop-device">
              <div className="screen-frame">
                <div className="screen-content">
                  <div className="laptop-code-editor">
                    <div className="editor-dots"><span className="dot-r"></span><span className="dot-y"></span><span className="dot-g"></span></div>
                    <pre><code>{`class ProjectTitan {\n  constructor() {\n    this.fps = 120;\n    this.status = "Active";\n  }\n  async init() {\n    await db.connect();\n    console.log("Titan Ready");\n  }\n}`}</code></pre>
                  </div>
                </div>
              </div>
              <div className="keyboard-base">
                <div className="notch"></div>
              </div>
            </div>
          )}

          {project.imageType === 'stock' && (
            <div className="stock-device" style={{ '--stock-color': project.accentColor }}>
              <div className="stock-badge">
                <DollarSign size={20} />
              </div>
              <div className="stock-chart">
                <div className="stock-bar stock-bar-1"></div>
                <div className="stock-bar stock-bar-2"></div>
                <div className="stock-bar stock-bar-3"></div>
                <div className="stock-bar stock-bar-4"></div>
                <div className="stock-trend">
                  <TrendingUp size={34} />
                </div>
              </div>
              <span className="stock-label">MARKET SIGNAL</span>
            </div>
          )}

          {project.imageType === 'ml' && (
            <div className="ml-device" style={{ '--ml-color': project.accentColor }}>
              <div className="ml-token-row">
                <span>C</span>
                <span>AST</span>
                <span>PY</span>
              </div>
              <div className="ml-network">
                <span className="ml-node node-a"></span>
                <span className="ml-node node-b"></span>
                <span className="ml-node node-c"></span>
                <span className="ml-node node-d"></span>
                <span className="ml-edge edge-1"></span>
                <span className="ml-edge edge-2"></span>
                <span className="ml-edge edge-3"></span>
                <Network size={30} className="ml-network-icon" />
              </div>
              <div className="ml-footer">
                <Sparkles size={14} />
                <span>ML TRANSLATION</span>
              </div>
            </div>
          )}

          {project.imageType === 'futuregram' && (
            <div className="futuregram-device" style={{ '--future-color': project.accentColor }}>
              <div className="future-post-card">
                <div className="future-card-header">
                  <Clock size={16} />
                  <span>24h</span>
                </div>
                <div className="future-lock-ring">
                  <MessageCircle size={28} />
                </div>
                <div className="future-progress">
                  <span></span>
                </div>
              </div>
              <span className="future-label">TIME-LOCKED SOCIAL</span>
            </div>
          )}

          {project.imageType === 'movie' && (
            <div className="movie-device" style={{ '--movie-color': project.accentColor }}>
              <div className="movie-ticket">
                <Film size={28} />
                <div className="movie-lines">
                  <span></span>
                  <span></span>
                </div>
              </div>
              <div className="movie-rating">
                <Star size={14} fill="currentColor" />
                <span>8.7</span>
              </div>
              <span className="movie-label">RANKED REVIEWS</span>
            </div>
          )}

          {project.imageType === 'security' && (
            <div className="security-device" style={{ '--security-color': project.accentColor }}>
              <div className="security-shield">
                <ShieldCheck size={46} />
                <LockKeyhole size={18} className="security-lock" />
              </div>
              <div className="security-code">
                <span></span>
                <span></span>
                <span></span>
              </div>
              <span className="security-label">AES-GCM</span>
            </div>
          )}

        </div>

        <div className="card-footer">
          <span className="card-cta-link" style={{ color: project.accentColor }}>Learn more</span>
        </div>
      </div>
    </ScrollFade>
  );
}

export default function Showcase() {
  const [selectedProject, setSelectedProject] = useState(null);

  return (
    <section id="projects" className="showcase-section section">
      <div className="ambient-glow-right"></div>
      
      <div className="showcase-container container">
        <div className="section-header">
          <span className="eyebrow">Portfolio</span>
          <h2 className="section-title">Projects. Designed for impact.</h2>
          <p className="section-subtitle">
            A gallery of interactive tools, applications, and experiments engineered with visual precision and computational efficiency.
          </p>
        </div>

        <div className="projects-grid">
          {portfolioData.projects.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
              onSelect={setSelectedProject}
            />
          ))}
        </div>
      </div>

      {/* Project details modal */}
      {selectedProject && (
        <div className="modal-overlay glass" onClick={() => setSelectedProject(null)}>
          <div className="project-modal" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setSelectedProject(null)} aria-label="Close modal">
              <X size={20} />
            </button>
            
            <div className="modal-header">
              <span className="eyebrow" style={{ color: selectedProject.accentColor }}>{selectedProject.tech.join(" • ")}</span>
              <h2 className="modal-title">{selectedProject.title}</h2>
              <p className="modal-subtitle" style={{ color: selectedProject.accentColor }}>{selectedProject.subtitle}</p>
            </div>

            <div className="modal-grid">
              <div className="modal-details">
                <h4 className="modal-section-title">Overview</h4>
                <p className="modal-description">{selectedProject.longDescription}</p>
                
                <h4 className="modal-section-title">Key Specifications</h4>
                <div className="specs-list">
                  {Object.entries(selectedProject.metrics).map(([key, val]) => (
                    <div key={key} className="spec-item">
                      <span className="spec-key">{key.toUpperCase()}</span>
                      <span className="spec-val" style={{ color: selectedProject.accentColor }}>{val}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="modal-sidebar">
                <h4 className="modal-section-title">Technologies Used</h4>
                <div className="tech-tags">
                  {selectedProject.tech.map((t) => (
                    <span key={t} className="tech-tag glass">{t}</span>
                  ))}
                </div>

                <h4 className="modal-section-title">Actions</h4>
                {selectedProject.restricted ? (
                  <p className="project-restriction-note glass">
                    {selectedProject.restrictionReason || 'Source cannot be shared publicly.'}
                  </p>
                ) : (
                  <div className="modal-actions">
                    <a href={selectedProject.sourceUrl || portfolioData.personal.socials.github} target="_blank" rel="noopener noreferrer" className="action-btn action-btn-primary" style={{ backgroundColor: selectedProject.accentColor }}>
                      <Github size={16} style={{ marginRight: 8 }} />
                      View Source
                    </a>
                    <a href={selectedProject.liveUrl || selectedProject.sourceUrl || portfolioData.personal.socials.github} target="_blank" rel="noopener noreferrer" className="action-btn action-btn-secondary">
                      <ExternalLink size={16} style={{ marginRight: 8 }} />
                      Open Project
                    </a>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
