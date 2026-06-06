import { BookOpen, GraduationCap, Users } from 'lucide-react';
import { portfolioData } from '../portfolioData';
import ScrollFade from './ScrollFade';
import './Education.css';

export default function Education({ activeColor }) {
  const { education, linkedinHighlights } = portfolioData;

  return (
    <section id="education" className="education-section section">
      <div className="education-container container">
        <div className="section-header">
          <span className="eyebrow">Education</span>
          <h2 className="section-title">School, coursework, and campus groups.</h2>
          <p className="section-subtitle">
            The academic side of the portfolio: UW-Madison, Berkeley summer coursework, technical classes, and organizations.
          </p>
        </div>

        <div className="education-grid">
          <div className="education-main-column">
            {education.map((item) => (
              <ScrollFade key={item.school}>
                <article className="education-card glass">
                  <div className="education-card-header">
                    <div className="education-icon" style={{ color: activeColor, backgroundColor: `${activeColor}18` }}>
                      {item.logo ? (
                        <img src={item.logo} alt={`${item.school} logo`} className="education-logo-img" />
                      ) : (
                        <GraduationCap size={22} />
                      )}
                    </div>
                    <div>
                      <span className="education-period">{item.period}</span>
                      <h3>{item.school}</h3>
                      <p>{item.degree}</p>
                      <span className="education-location">{item.location}</span>
                    </div>
                  </div>

                  {item.gpa && (
                    <div className="education-gpa" style={{ borderColor: `${activeColor}55` }}>
                      <span>GPA</span>
                      <strong style={{ color: activeColor }}>{item.gpa}</strong>
                    </div>
                  )}

                </article>
              </ScrollFade>
            ))}
          </div>

          <aside className="education-side-column">
            <ScrollFade>
              <div className="education-mini-card glass profile-stats-card">
                <div className="mini-card-heading">
                  <BookOpen size={16} style={{ color: activeColor }} />
                  <h3>Coursework</h3>
                </div>
                <div className="course-list">
                  {linkedinHighlights.courses.map((course) => (
                    <div className="course-item" key={`${course.code}-${course.title}`}>
                      <strong>{course.code}</strong>
                      <span>{course.title}</span>
                    </div>
                  ))}
                </div>
              </div>
            </ScrollFade>

            <ScrollFade>
              <div className="education-mini-card glass">
                <div className="mini-card-heading">
                  <Users size={16} style={{ color: activeColor }} />
                  <h3>Organizations</h3>
                </div>
                <div className="pill-list">
                  {linkedinHighlights.organizations.map((org) => (
                    <span key={org}>{org}</span>
                  ))}
                </div>
              </div>
            </ScrollFade>
          </aside>
        </div>
      </div>
    </section>
  );
}
