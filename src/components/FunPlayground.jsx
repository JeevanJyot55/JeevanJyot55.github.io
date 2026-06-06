import { useState, useEffect, useRef } from 'react';
import { Play, Pause, SkipForward, SkipBack, Music, Gamepad2, ArrowUp, ArrowDown, ArrowLeft, ArrowRight, RotateCcw } from 'lucide-react';
import confetti from 'canvas-confetti';
import { portfolioData } from '../portfolioData';
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
  const gameInterval = useRef(null);

  // --- MUSIC PLAYER STATE ---
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [trackProgress, setTrackProgress] = useState(30); // percentage
  const progressInterval = useRef(null);
  const tracks = portfolioData.arcade.tracks;

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

  // --- MUSIC PLAYER LOGIC ---
  useEffect(() => {
    if (isPlaying) {
      progressInterval.current = setInterval(() => {
        setTrackProgress((prev) => {
          if (prev >= 100) {
            // cycle to next track when finished
            setCurrentTrackIndex((idx) => (idx + 1) % tracks.length);
            return 0;
          }
          return prev + 1;
        });
      }, 1000);
    } else {
      if (progressInterval.current) clearInterval(progressInterval.current);
    }

    return () => clearInterval(progressInterval.current);
  }, [isPlaying]);

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const handleNextTrack = () => {
    setCurrentTrackIndex((prev) => (prev + 1) % tracks.length);
    setTrackProgress(0);
  };

  const handlePrevTrack = () => {
    setCurrentTrackIndex((prev) => (prev - 1 + tracks.length) % tracks.length);
    setTrackProgress(0);
  };

  return (
    <section id="playground" className="playground-section section">
      <div className="playground-container container">
        <div className="section-header">
          <span className="eyebrow">The Fun Side</span>
          <h2 className="section-title">Playground. Interactive breaks.</h2>
          <p className="section-subtitle">
            Take a load off! Play a quick classic arcade game or preview my coding soundtrack logs.
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

          {/* Right block: soundtrack player */}
          <div className="playground-card glass music-card">
            <div className="card-top-header">
              <Music size={16} className="play-icon" style={{ color: activeColor }} />
              <span>Focus Playlist</span>
            </div>

            <div className="music-wrapper">
              <div className="album-art-box">
                <div className="art-disc" style={{ 
                  animationPlayState: isPlaying ? 'running' : 'paused',
                  borderColor: activeColor 
                }}>
                  <div className="disc-inner">
                    <Music size={28} style={{ color: activeColor }} />
                  </div>
                </div>
                {/* Dynamic music wave animation */}
                {isPlaying && (
                  <div className="playing-waves">
                    <span className="wave-bar bar-active-1" style={{ backgroundColor: activeColor }}></span>
                    <span className="wave-bar bar-active-2" style={{ backgroundColor: activeColor, animationDelay: '0.2s' }}></span>
                    <span className="wave-bar bar-active-3" style={{ backgroundColor: activeColor, animationDelay: '0.4s' }}></span>
                    <span className="wave-bar bar-active-4" style={{ backgroundColor: activeColor, animationDelay: '0.1s' }}></span>
                  </div>
                )}
              </div>

              <div className="track-info">
                <h3 className="track-title">{tracks[currentTrackIndex].title}</h3>
                <p className="track-artist">{tracks[currentTrackIndex].artist}</p>
              </div>

              {/* Progress Slider */}
              <div className="music-progress-container">
                <div className="progress-bar-track">
                  <div 
                    className="progress-bar-fill" 
                    style={{ 
                      width: `${trackProgress}%`,
                      backgroundColor: activeColor 
                    }}
                  ></div>
                </div>
                <div className="time-stamps">
                  <span className="time-elapsed">
                    {Math.floor((trackProgress / 100) * 4)}:
                    {String(Math.floor(((trackProgress / 100) * 4 * 60) % 60)).padStart(2, '0')}
                  </span>
                  <span className="time-total">{tracks[currentTrackIndex].length}</span>
                </div>
              </div>

              {/* Player Controllers */}
              <div className="music-controls">
                <button className="music-ctrl-btn" onClick={handlePrevTrack} aria-label="Previous Track">
                  <SkipBack size={20} />
                </button>
                <button 
                  className="music-ctrl-btn play-pause-btn" 
                  onClick={handlePlayPause}
                  style={{ backgroundColor: activeColor }}
                  aria-label={isPlaying ? "Pause Track" : "Play Track"}
                >
                  {isPlaying ? <Pause size={20} fill="#fff" /> : <Play size={20} fill="#fff" style={{ marginLeft: 3 }} />}
                </button>
                <button className="music-ctrl-btn" onClick={handleNextTrack} aria-label="Next Track">
                  <SkipForward size={20} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
