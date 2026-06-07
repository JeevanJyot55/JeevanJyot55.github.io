import { useState, useEffect, useRef } from 'react';
import { Briefcase, Code2, Database, Gamepad2, GraduationCap, ArrowUp, ArrowDown, ArrowLeft, ArrowRight, RotateCcw } from 'lucide-react';
import confetti from 'canvas-confetti';
import './FunPlayground.css';

const GRID_SIZE = 15;
const INITIAL_SPEED = 150;

export default function FunPlayground({ activeColor }) {
  // --- SNAKE GAME STATE ---
  const [snake, setSnake] = useState([[7, 8], [7, 9], [7, 10]]);
  const [food, setFood] = useState([4, 4]);
  const [direction, setDirection] = useState([0, -1]); // moving UP initially
  const [gameOver, setGameOver] = useState(false);
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(120);
  const [gameStarted, setGameStarted] = useState(false);
  const [activeFocus, setActiveFocus] = useState('google');
  const gameInterval = useRef(null);

  const focusItems = [
    {
      id: 'google',
      label: 'Google',
      icon: <Briefcase size={16} />,
      title: 'Software engineering at Google',
      description: 'Working with AI integration in Android development for Google Photos, with a focus on customer impact.',
      stats: ['Kotlin', 'Java', 'Jetpack Compose']
    },
    {
      id: 'ai',
      label: 'AI',
      icon: <Code2 size={16} />,
      title: 'AI agents and translation systems',
      description: 'Built LLM-integrated workflow automation and an ML model translating C into Python.',
      stats: ['Python', 'Transformers', 'LLMs']
    },
    {
      id: 'data',
      label: 'Data',
      icon: <Database size={16} />,
      title: 'Big data systems',
      description: 'Supported CS 544 students with Spark, Docker, BigQuery, GitLab workflows, and project debugging.',
      stats: ['Spark', 'Docker', 'BigQuery']
    },
    {
      id: 'school',
      label: 'School',
      icon: <GraduationCap size={16} />,
      title: 'CS + Economics at UW-Madison',
      description: 'Studying software systems, algorithms, databases, machine learning methods, economics, and finance.',
      stats: ['CS', 'Economics', 'Finance']
    }
  ];

  const selectedFocus = focusItems.find((item) => item.id === activeFocus) || focusItems[0];

  // --- SNAKE GAME LOGIC ---
  const generateFood = () => {
    let newFood;
    while (true) {
      newFood = [
        Math.floor(Math.random() * GRID_SIZE),
        Math.floor(Math.random() * GRID_SIZE)
      ];
      // Check if food coordinates collide with snake body
      const collides = snake.some(cell => cell[0] === newFood[0] && cell[1] === newFood[1]);
      if (!collides) break;
    }
    setFood(newFood);
  };

  const resetGame = () => {
    setSnake([[7, 8], [7, 9], [7, 10]]);
    setDirection([0, -1]);
    setGameOver(false);
    setScore(0);
    setGameStarted(false);
    if (gameInterval.current) clearInterval(gameInterval.current);
  };

  const startGame = () => {
    resetGame();
    generateFood();
    setGameStarted(true);
  };

  const changeDirection = (newDir) => {
    // Avoid reversing directly into self
    if (direction[0] + newDir[0] === 0 && direction[1] + newDir[1] === 0) return;
    setDirection(newDir);
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!gameStarted || gameOver) return;
      switch (e.key) {
        case 'ArrowUp':
          e.preventDefault();
          changeDirection([0, -1]);
          break;
        case 'ArrowDown':
          e.preventDefault();
          changeDirection([0, 1]);
          break;
        case 'ArrowLeft':
          e.preventDefault();
          changeDirection([-1, 0]);
          break;
        case 'ArrowRight':
          e.preventDefault();
          changeDirection([1, 0]);
          break;
        default:
          break;
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [direction, gameStarted, gameOver]);

  // Main game tick
  useEffect(() => {
    if (!gameStarted || gameOver) return;

    gameInterval.current = setInterval(() => {
      setSnake((prevSnake) => {
        const head = prevSnake[0];
        const newHead = [head[0] + direction[0], head[1] + direction[1]];

        // Wall collisions
        if (
          newHead[0] < 0 ||
          newHead[0] >= GRID_SIZE ||
          newHead[1] < 0 ||
          newHead[1] >= GRID_SIZE
        ) {
          setGameOver(true);
          clearInterval(gameInterval.current);
          return prevSnake;
        }

        // Self collisions
        const selfCollide = prevSnake.some(
          (cell) => cell[0] === newHead[0] && cell[1] === newHead[1]
        );
        if (selfCollide) {
          setGameOver(true);
          clearInterval(gameInterval.current);
          return prevSnake;
        }

        const newSnake = [newHead, ...prevSnake];

        // Food collision
        if (newHead[0] === food[0] && newHead[1] === food[1]) {
          setScore((s) => {
            const nextScore = s + 10;
            if (nextScore > highScore) {
              setHighScore(nextScore);
              confetti({
                particleCount: 50,
                angle: 60,
                spread: 55,
                origin: { x: 0 },
                colors: [activeColor]
              });
            }
            return nextScore;
          });
          generateFood();
        } else {
          newSnake.pop();
        }

        return newSnake;
      });
    }, INITIAL_SPEED);

    return () => clearInterval(gameInterval.current);
  }, [gameStarted, gameOver, direction, food, highScore]);

  return (
    <section id="playground" className="playground-section section">
      <div className="playground-container container">
        <div className="section-header">
          <span className="eyebrow">The Fun Side</span>
          <h2 className="section-title">Playground. Interactive breaks.</h2>
          <p className="section-subtitle">
            A small interactive corner: play a quick arcade round or skim the work areas I keep coming back to.
          </p>
        </div>

        <div className="playground-grid">
          {/* Left block: arcade game */}
          <div className="playground-card glass arcade-card">
            <div className="card-top-header">
              <Gamepad2 size={16} className="play-icon" style={{ color: activeColor }} />
              <span>Arcade Simulator</span>
            </div>

            <div className="game-wrapper">
              <div className="game-stats">
                <div className="stat-box">
                  <span className="stat-lbl">SCORE</span>
                  <span className="stat-val" style={{ color: activeColor }}>{score}</span>
                </div>
                <div className="stat-box">
                  <span className="stat-lbl">HIGH SCORE</span>
                  <span className="stat-val">{highScore}</span>
                </div>
              </div>

              {!gameStarted ? (
                <div className="game-overlay start-overlay">
                  <h4 className="overlay-title">Neon Snake</h4>
                  <p className="overlay-desc">Use arrow keys or controls below to play.</p>
                  <button className="action-btn action-btn-primary" onClick={startGame} style={{ backgroundColor: activeColor }}>
                    Launch Arcade
                  </button>
                </div>
              ) : gameOver ? (
                <div className="game-overlay over-overlay">
                  <h4 className="overlay-title error-color">System Crash</h4>
                  <p className="overlay-desc">Score: {score} | High Score: {highScore}</p>
                  <button className="action-btn action-btn-secondary restart-btn" onClick={startGame}>
                    <RotateCcw size={14} style={{ marginRight: 6 }} />
                    Reboot Game
                  </button>
                </div>
              ) : (
                <div className="snake-board">
                  {Array.from({ length: GRID_SIZE }).map((_, y) => (
                    <div key={y} className="board-row">
                      {Array.from({ length: GRID_SIZE }).map((_, x) => {
                        const isHead = snake[0][0] === x && snake[0][1] === y;
                        const isBody = snake.slice(1).some(cell => cell[0] === x && cell[1] === y);
                        const isFood = food[0] === x && food[1] === y;

                        return (
                          <div
                            key={x}
                            className={`board-cell ${isHead ? 'cell-head' : isBody ? 'cell-body' : isFood ? 'cell-food' : ''}`}
                            style={{
                              backgroundColor: isHead ? activeColor : isBody ? `${activeColor}aa` : isFood ? '#ff2d55' : 'transparent',
                              boxShadow: isFood ? '0 0 10px #ff2d5599' : isHead ? `0 0 8px ${activeColor}` : 'none'
                            }}
                          ></div>
                        );
                      })}
                    </div>
                  ))}
                </div>
              )}

              {/* Mobile Game Controls */}
              <div className="mobile-dpad">
                <div className="dpad-row">
                  <button className="dpad-btn" onClick={() => changeDirection([0, -1])} aria-label="Move Up">
                    <ArrowUp size={16} />
                  </button>
                </div>
                <div className="dpad-row">
                  <button className="dpad-btn" onClick={() => changeDirection([-1, 0])} aria-label="Move Left">
                    <ArrowLeft size={16} />
                  </button>
                  <div className="dpad-spacer"></div>
                  <button className="dpad-btn" onClick={() => changeDirection([1, 0])} aria-label="Move Right">
                    <ArrowRight size={16} />
                  </button>
                </div>
                <div className="dpad-row">
                  <button className="dpad-btn" onClick={() => changeDirection([0, 1])} aria-label="Move Down">
                    <ArrowDown size={16} />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Right block: portfolio focus panel */}
          <div className="playground-card glass focus-card">
            <div className="card-top-header">
              <Code2 size={16} className="play-icon" style={{ color: activeColor }} />
              <span>Builder Snapshot</span>
            </div>

            <div className="focus-wrapper">
              <div className="focus-selector">
                {focusItems.map((item) => (
                  <button
                    key={item.id}
                    className={`focus-chip ${activeFocus === item.id ? 'focus-chip-active' : ''}`}
                    onClick={() => setActiveFocus(item.id)}
                    style={{ '--focus-color': activeColor }}
                  >
                    {item.icon}
                    <span>{item.label}</span>
                  </button>
                ))}
              </div>

              <div className="focus-display">
                <div className="focus-orbit" style={{ borderColor: activeColor }}>
                  <div className="focus-orbit-core" style={{ backgroundColor: activeColor }}>
                    {selectedFocus.icon}
                  </div>
                </div>
                <h3>{selectedFocus.title}</h3>
                <p>{selectedFocus.description}</p>
              </div>

              <div className="focus-stat-grid">
                {selectedFocus.stats.map((stat) => (
                  <span key={stat} style={{ borderColor: `${activeColor}55` }}>{stat}</span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
