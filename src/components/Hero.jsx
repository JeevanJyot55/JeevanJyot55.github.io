import { useState } from "react";
import {
  Activity,
  Briefcase,
  Code2,
  FileText,
  GraduationCap,
  Layers,
  Mail,
  MapPin,
  Sparkles,
  Zap,
} from "lucide-react";
import { Github, Linkedin } from "./CustomIcons";
import { portfolioData } from "../portfolioData";
import "./Hero.css";

export default function Hero({ activeColor }) {
  const { name, subSlogan, resumeUrl, socials } = portfolioData.personal;
  const [activeCore, setActiveCore] = useState(null);

  const chipCores = [
    {
      id: "full stack",
      name: "Full-stack Google Work",
      icon: <Sparkles size={20} />,
      desc: "Working with AI integration in Android development for Google Photos, with focus on practical customer impact.",
      techs: "Kotlin, Java, Jetpack Compose",
    },
    {
      id: "data",
      name: "Data Migration Tooling",
      icon: <Layers size={20} />,
      desc: "Building automated migration flows that reduce manual effort and help teams move faster.",
      techs: "Automation, backend tooling, platform optimization",
    },
    {
      id: "ai",
      name: "AI & Code Translation",
      icon: <Activity size={20} />,
      desc: "Previously reduced inference latency and built eval scripts; now exploring ML-assisted legacy code translation.",
      techs: "Python, PyTorch, TensorFlow, Scikit-learn",
    },
    {
      id: "teaching",
      name: "Big Data TA",
      icon: <Zap size={20} />,
      desc: "Helped students debug Spark, Docker, BigQuery, memory, network, and distributed systems issues.",
      techs: "Spark, Docker, BigQuery, Kafka, PostgreSQL",
    },
  ];

  const quickFacts = [
    {
      icon: <Briefcase size={16} />,
      label: "Software Engineering Intern at Google",
    },
    { icon: <GraduationCap size={16} />, label: "UW-Madison CS + Economics" },
    { icon: <MapPin size={16} />, label: "Madison, WI / Mountain View, CA" },
  ];

  const profileLinks = [
    { icon: <FileText size={16} />, label: "Resume", url: resumeUrl },
    { icon: <Github size={16} />, label: "GitHub", url: socials.github },
    { icon: <Linkedin size={16} />, label: "LinkedIn", url: socials.linkedin },
    { icon: <Mail size={16} />, label: "Email", url: socials.email },
  ];

  return (
    <section id="home" className="hero-section section">
      <div className="ambient-glow"></div>

      <div className="hero-container container">
        <div className="hero-content">
          <div className="hero-eyebrow fade-in-up">
            Portfolio / Resume / Projects
          </div>
          <h1 className="hero-name fade-in-up">{name}</h1>
          <h2
            className="hero-slogan fade-in-up"
            style={{ "--color-primary": activeColor }}
          >
            Software engineer, student, and builder.
          </h2>
          <p className="hero-subslogan fade-in-up">{subSlogan}</p>

          <div className="hero-facts fade-in-up">
            {quickFacts.map((fact) => (
              <div className="hero-fact glass" key={fact.label}>
                <span style={{ color: activeColor }}>{fact.icon}</span>
                <span>{fact.label}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="hero-graphic fade-in-up">
          <div className="portfolio-profile-card glass">
            <div className="profile-card-top">
              <div
                className="profile-avatar"
                style={{ borderColor: activeColor }}
              >
                <img
                  src="/google_logo.png"
                  alt="Google logo"
                  className="google-logo-img"
                />
              </div>
              <div>
                <span className="profile-kicker">Currently</span>
                <h3>Building at Google</h3>
                <p>Working on large data systems and customer impact.</p>
              </div>
            </div>

            <div className="profile-note">
              <Code2 size={18} style={{ color: activeColor }} />
              <p>
                This site is my little corner of the web: projects I have
                shipped, classes I am learning from, and the engineering
                problems I keep coming back to.
              </p>
            </div>

            <div className="profile-links">
              {profileLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.url}
                  target={link.url.startsWith("http") ? "_blank" : undefined}
                  rel={
                    link.url.startsWith("http")
                      ? "noopener noreferrer"
                      : undefined
                  }
                  className="profile-link"
                  style={{ "--profile-link-color": activeColor }}
                >
                  {link.icon}
                  <span>{link.label}</span>
                </a>
              ))}
            </div>
          </div>

          <div className="silicon-chip glass focus-grid-card">
            <div className="focus-grid-heading">
              <span>Impact</span>
            </div>

            <div className="chip-grid">
              {chipCores.map((core) => (
                <div
                  key={core.id}
                  className={`chip-core ${activeCore?.id === core.id ? "core-active" : ""}`}
                  style={{ "--hover-color": activeColor }}
                  onMouseEnter={() => setActiveCore(core)}
                  onMouseLeave={() => setActiveCore(null)}
                >
                  <div className="core-icon">{core.icon}</div>
                  <span className="core-title">{core.id.toUpperCase()}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="chip-info-panel glass">
            {activeCore ? (
              <div className="info-content active">
                <h3 className="info-title" style={{ color: activeColor }}>
                  {activeCore.name}
                </h3>
                <p className="info-desc">{activeCore.desc}</p>
                <div className="info-tech">
                  <strong>Stack:</strong> {activeCore.techs}
                </div>
              </div>
            ) : (
              <div className="info-content placeholder">
                <h3 className="info-title">A quick snapshot</h3>
                <p className="info-desc">
                  Hover over a block to see the real work behind this portfolio:
                  internships, projects, coursework, and teaching.
                </p>
                <div
                  className="info-pulse"
                  style={{ backgroundColor: activeColor }}
                ></div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
