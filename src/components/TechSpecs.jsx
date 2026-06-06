import { useState } from 'react';
import { Cpu, CheckCircle } from 'lucide-react';
import { portfolioData } from '../portfolioData';
import './TechSpecs.css';

export default function TechSpecs({ activeColor }) {
  const { chip, description, categories } = portfolioData.skills;
  const [selectedCategory, setSelectedCategory] = useState(0);

  return (
    <section id="specs" className="techspecs-section section">
      <div className="techspecs-container container">
        <div className="section-header">
          <span className="eyebrow">Technical Capabilities</span>
          <h2 className="section-title">Tech Specs. Engineered to scale.</h2>
          <p className="section-subtitle">
            A breakdown of system components, engineering frameworks, and architectural capabilities.
          </p>
        </div>

        <div className="specs-dashboard-grid">
          {/* Left panel: capability overview */}
          <div className="specs-silicon-panel glass">
            <div className="silicon-header">
              <div className="silicon-icon-wrap" style={{ '--color-theme': activeColor }}>
                <Cpu size={32} />
              </div>
              <div className="silicon-header-text">
                <h3 className="silicon-title">{chip}</h3>
                <span className="silicon-subtitle">Technical Profile</span>
              </div>
            </div>
            
            <p className="silicon-description">{description}</p>

            <div className="silicon-cores-breakdown">
              <div className="core-spec-item">
                <div className="core-spec-label">
                  <span className="bullet" style={{ backgroundColor: activeColor }}></span>
                  <span>Development Efficiency</span>
                </div>
                <span className="core-spec-value">Low overhead, high speed</span>
              </div>
              <div className="core-spec-item">
                <div className="core-spec-label">
                  <span className="bullet" style={{ backgroundColor: activeColor }}></span>
                  <span>Multitasking Capacity</span>
                </div>
                <span className="core-spec-value">Concurrent rendering systems</span>
              </div>
              <div className="core-spec-item">
                <div className="core-spec-label">
                  <span className="bullet" style={{ backgroundColor: activeColor }}></span>
                  <span>Compilation Speed</span>
                </div>
                <span className="core-spec-value">Instant HMR feedback</span>
              </div>
            </div>
            
            <div className="silicon-chip-badge" style={{ borderColor: activeColor, color: activeColor }}>
              JEEVAN TECH PROFILE
            </div>
          </div>

          {/* Right panel: Tabbed category specifications list */}
          <div className="specs-details-panel glass">
            <div className="specs-tabs">
              {categories.map((cat, idx) => (
                <button
                  key={cat.title}
                  className={`spec-tab-btn ${selectedCategory === idx ? 'tab-active' : ''}`}
                  onClick={() => setSelectedCategory(idx)}
                  style={{ '--active-border': activeColor }}
                >
                  <span className="tab-title">{cat.title}</span>
                  <span className="tab-score" style={{ color: selectedCategory === idx ? activeColor : 'inherit' }}>
                    {cat.score}
                  </span>
                </button>
              ))}
            </div>

            <div className="specs-content-body">
              <div className="active-cat-header">
                <h4 className="active-cat-title">{categories[selectedCategory].title}</h4>
                <div className="capacity-bar-container">
                  <span className="capacity-bar-label">Operational Capacity: {categories[selectedCategory].score}</span>
                  <div className="capacity-bar-track">
                    <div 
                      className="capacity-bar-fill"
                      style={{ 
                        width: categories[selectedCategory].score,
                        backgroundColor: activeColor,
                        boxShadow: `0 0 10px ${activeColor}55`
                      }}
                    ></div>
                  </div>
                </div>
              </div>

              <div className="specs-list-details">
                {categories[selectedCategory].specs.map((spec) => (
                  <div key={spec.name} className="detail-row">
                    <div className="detail-name-col">
                      <CheckCircle size={16} className="detail-check" style={{ color: activeColor }} />
                      <span className="detail-name">{spec.name}</span>
                    </div>
                    <div className="detail-value-col">
                      <p className="detail-desc">{spec.value}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
