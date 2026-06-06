import { useState, useEffect, useRef } from 'react';
import { Terminal, Settings, FileText } from 'lucide-react';
import confetti from 'canvas-confetti';
import { portfolioData } from '../portfolioData';
import './InteractiveOS.css';

export default function InteractiveOS({ activeColor, handleColorChange, theme, toggleTheme }) {
  // Terminal State
  const [terminalInput, setTerminalInput] = useState('');
  const [terminalHistory, setTerminalHistory] = useState([
    { type: 'system', text: 'Welcome to JeevanOS v1.0.0 Terminal.' },
    { type: 'system', text: 'Type "help" to see available commands.' },
    { type: 'system', text: '' }
  ]);
  const terminalBottomRef = useRef(null);
  const terminalInputRef = useRef(null);

  const colors = [
    { name: 'Blue', value: '#0071e3', rgb: '0, 113, 227' },
    { name: 'Green', value: '#30d158', rgb: '48, 209, 88' },
    { name: 'Purple', value: '#bf5af2', rgb: '191, 90, 242' },
    { name: 'Orange', value: '#ff9f0a', rgb: '255, 159, 10' }
  ];

  // Scroll to bottom of terminal whenever history updates
  useEffect(() => {
    if (terminalBottomRef.current) {
      terminalBottomRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [terminalHistory]);

  const focusTerminalInput = () => {
    if (terminalInputRef.current) {
      terminalInputRef.current.focus();
    }
  };

  const handleTerminalSubmit = (e) => {
    e.preventDefault();
    const command = terminalInput.trim().toLowerCase();
    if (!command) return;

    let response = [];
    response.push({ type: 'input', text: `jeevanos@user:~$ ${terminalInput}` });

    switch (command) {
      case 'help':
        response.push({ type: 'output', text: 'Available commands:' });
        response.push({ type: 'output', text: '  about      - Learn more about Jeevan' });
        response.push({ type: 'output', text: '  skills     - Display technical skill set summary' });
        response.push({ type: 'output', text: '  journey    - View the professional timeline summary' });
        response.push({ type: 'output', text: '  clear      - Clear the console history' });
        response.push({ type: 'output', text: '  sudo hire  - Run authorization for recruitment' });
        break;
      case 'about':
        response.push({ type: 'output', text: `${portfolioData.personal.name} is a ${portfolioData.personal.title}.` });
        response.push({ type: 'output', text: portfolioData.personal.subSlogan });
        break;
      case 'skills':
        response.push({ type: 'output', text: `System Report: High proficiency. Chip: ${portfolioData.skills.chip}.` });
        response.push({ type: 'output', text: portfolioData.skills.description });
        break;
      case 'journey':
        response.push({ type: 'output', text: 'Timeline Details:' });
        portfolioData.experience.forEach(exp => {
          response.push({ type: 'output', text: `  - ${exp.period}: ${exp.role} at ${exp.company}` });
        });
        break;
      case 'clear':
        setTerminalHistory([]);
        setTerminalInput('');
        return;
      case 'sudo hire':
        // Trigger high-fidelity confetti celebration
        confetti({
          particleCount: 150,
          spread: 80,
          origin: { y: 0.6 },
          colors: ['#0071e3', '#30d158', '#bf5af2', '#ff9f0a']
        });
        response.push({ type: 'output', text: 'ACCESS GRANTED. CONFETTI SUBROUTINE DEPLOYED.' });
        response.push({ type: 'output', text: 'Status: Let\'s build something epic together. Contact section unlocked.' });
        break;
      default:
        response.push({ type: 'error', text: `Command not found: ${command}. Type "help" for a list of command lines.` });
    }

    response.push({ type: 'output', text: '' }); // spacer
    setTerminalHistory([...terminalHistory, ...response]);
    setTerminalInput('');
  };

  return (
    <section id="os" className="interactiveos-section section">
      <div className="interactiveos-container container">
        <div className="section-header">
          <span className="eyebrow">Operating Sandbox</span>
          <h2 className="section-title">JeevanOS. Control center.</h2>
          <p className="section-subtitle">
            Configure system themes, change accents globally, read dashboard notes, or execute terminal commands directly in the sandbox interface.
          </p>
        </div>

        <div className="os-grid">
          {/* Left column: Widget Dashboard Deck */}
          <div className="widgets-column">
            {/* Widget 1: System Settings Accent Color Config */}
            <div className="widget-card glass setting-widget">
              <div className="widget-title-bar">
                <Settings size={14} className="widget-icon" />
                <span>System Preferences</span>
              </div>
              <div className="widget-body">
                <h4 className="setting-label">Appearance Theme</h4>
                <button className="theme-pill-btn action-btn" onClick={toggleTheme}>
                  Set {theme === 'dark' ? 'Light Mode' : 'Dark Mode'}
                </button>

                <h4 className="setting-label accent-margin">Accent Color</h4>
                <div className="color-selector-grid">
                  {colors.map((c) => (
                    <button
                      key={c.name}
                      onClick={() => handleColorChange(c.value, c.rgb)}
                      className={`color-bubble ${activeColor === c.value ? 'color-bubble-active' : ''}`}
                      style={{ 
                        backgroundColor: c.value,
                        boxShadow: activeColor === c.value ? `0 0 10px ${c.value}aa` : 'none'
                      }}
                      aria-label={`Select ${c.name} accent`}
                    ></button>
                  ))}
                </div>
              </div>
            </div>

            {/* Widget 2: notes pad */}
            <div className="widget-card glass notes-widget">
              <div className="widget-title-bar">
                <FileText size={14} className="widget-icon" />
                <span>Notes.app</span>
              </div>
              <div className="widget-body">
                <span className="note-date">Today at 11:07 AM</span>
                <p className="note-text">
                  Hey there! Thanks for visiting my website. I built this playground to show off my appreciation for sleek, animations, clean layouts, and functional systems.
                </p>
                <p className="note-text text-margin">
                  Try typing <code style={{ color: activeColor }}>sudo hire</code> into the terminal on the right for a fun surprise.
                </p>
              </div>
            </div>
          </div>

          {/* Right column: Terminal Console */}
          <div className="terminal-column glass" onClick={focusTerminalInput}>
            <div className="terminal-header">
              <div className="terminal-circles">
                <span className="term-dot term-dot-r"></span>
                <span className="term-dot term-dot-y"></span>
                <span className="term-dot term-dot-g"></span>
              </div>
              <div className="terminal-title">
                <Terminal size={12} style={{ marginRight: 6 }} />
                zsh — bash — 80×24
              </div>
            </div>
            
            <div className="terminal-body">
              <div className="terminal-scroll-area">
                {terminalHistory.map((line, idx) => (
                  <div 
                    key={idx} 
                    className={`terminal-line line-${line.type}`}
                  >
                    {line.text}
                  </div>
                ))}
                <div ref={terminalBottomRef}></div>
              </div>

              <form onSubmit={handleTerminalSubmit} className="terminal-prompt-row">
                <span className="terminal-prompt" style={{ color: activeColor }}>jeevanos@user:~$</span>
                <input
                  ref={terminalInputRef}
                  type="text"
                  value={terminalInput}
                  onChange={(e) => setTerminalInput(e.target.value)}
                  className="terminal-input"
                  autoCapitalize="off"
                  autoComplete="off"
                  autoCorrect="off"
                  spellCheck="false"
                  aria-label="Terminal input"
                />
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
