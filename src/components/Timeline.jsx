import { Calendar, Briefcase } from 'lucide-react';
import { portfolioData } from '../portfolioData';
import ScrollFade from './ScrollFade';
import './Timeline.css';

export default function Timeline({ activeColor }) {
  const experiences = portfolioData.experience;

  return (
    <section id="timeline" className="timeline-section section">
      <div className="timeline-container container">
        <div className="section-header">
          <span className="eyebrow">Professional Roadmap</span>
          <h2 className="section-title">Career Journey. Tested milestones.</h2>
          <p className="section-subtitle">
            A chronological timeline of roles, engineering contributions, and team operations.
          </p>
        </div>

        <div className="timeline-track-wrapper">
          <div className="timeline-axis-line" style={{ backgroundColor: `${activeColor}22` }}></div>
          
          <div className="timeline-nodes-list">
            {experiences.map((exp, idx) => (
              <div key={idx} className="timeline-node">
                {/* Visual marker node on the axis line */}
                <div className="timeline-marker" style={{ borderColor: activeColor, backgroundColor: 'var(--bg-primary)' }}>
                  <Briefcase size={12} style={{ color: activeColor }} />
                </div>
                
                {/* Content card */}
                <ScrollFade>
                  <div className="timeline-content-card glass">
                    <div className="node-header">
                      <div className="node-title-group">
                        <span className="node-period">
                          <Calendar size={12} style={{ marginRight: 6 }} />
                          {exp.period}
                        </span>
                        <h3 className="node-role">{exp.role}</h3>
                        <span className="node-company" style={{ color: activeColor }}>{exp.company}</span>
                      </div>
                    </div>

                    <ul className="node-bullet-points">
                      {exp.highlights.map((highlight, hIdx) => (
                        <li key={hIdx} className="node-bullet-item">
                          <span className="bullet-indicator" style={{ backgroundColor: activeColor }}></span>
                          <p className="bullet-text">{highlight}</p>
                        </li>
                      ))}
                    </ul>
                  </div>
                </ScrollFade>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
