import { useState, useEffect, useRef } from 'react';
import { Film, Gamepad2, Shuffle, Star, ArrowUp, ArrowDown, ArrowLeft, ArrowRight, RotateCcw } from 'lucide-react';
import confetti from 'canvas-confetti';
import './FunPlayground.css';

const GRID_SIZE = 15;
const INITIAL_SPEED = 150;
const MOVIE_POOL = [
  { title: 'Inception', year: '2010', genre: 'Sci-Fi', vibe: 'Dream logic and layered heists', rating: '8.8' },
  { title: 'Interstellar', year: '2014', genre: 'Sci-Fi', vibe: 'Cosmic scale with emotional stakes', rating: '8.7' },
  { title: 'The Dark Knight', year: '2008', genre: 'Action', vibe: 'Gritty hero pressure cooker', rating: '9.0' },
  { title: 'Spider-Verse', year: '2018', genre: 'Animation', vibe: 'Comic-book energy and style', rating: '8.4' },
  { title: 'Everything Everywhere', year: '2022', genre: 'Adventure', vibe: 'Multiverse chaos with heart', rating: '7.8' },
  { title: 'The Social Network', year: '2010', genre: 'Drama', vibe: 'Builder drama and sharp dialogue', rating: '7.8' },
  { title: 'Parasite', year: '2019', genre: 'Thriller', vibe: 'Sharp social twists', rating: '8.5' },
  { title: 'Whiplash', year: '2014', genre: 'Drama', vibe: 'Intensity turned all the way up', rating: '8.5' },
  { title: 'La La Land', year: '2016', genre: 'Musical', vibe: 'Dreamy Los Angeles ambition', rating: '8.0' },
  { title: 'Dune: Part Two', year: '2024', genre: 'Sci-Fi', vibe: 'Epic desert politics', rating: '8.5' },
  { title: 'Top Gun: Maverick', year: '2022', genre: 'Action', vibe: 'Clean blockbuster adrenaline', rating: '8.2' },
  { title: 'Oppenheimer', year: '2023', genre: 'Drama', vibe: 'High-stakes genius and fallout', rating: '8.3' }
];

const getRandomMoviePair = () => {
  const firstIndex = Math.floor(Math.random() * MOVIE_POOL.length);
  let secondIndex = Math.floor(Math.random() * MOVIE_POOL.length);

  while (secondIndex === firstIndex) {
    secondIndex = Math.floor(Math.random() * MOVIE_POOL.length);
  }

  return [MOVIE_POOL[firstIndex], MOVIE_POOL[secondIndex]];
};

export default function FunPlayground({ activeColor }) {
  // --- SNAKE GAME STATE ---
  const [snake, setSnake] = useState([[7, 8], [7, 9], [7, 10]]);
  const [food, setFood] = useState([4, 4]);
  const [direction, setDirection] = useState([0, -1]); // moving UP initially
  const [gameOver, setGameOver] = useState(false);
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(120);
  const [gameStarted, setGameStarted] = useState(false);
  const [moviePair, setMoviePair] = useState(() => getRandomMoviePair());
  const [moviePicks, setMoviePicks] = useState([]);
  const gameInterval = useRef(null);

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

  const shuffleMovies = () => {
    setMoviePair(getRandomMoviePair());
  };

  const pickMovie = (movie) => {
    setMoviePicks((currentPicks) => [movie, ...currentPicks].slice(0, 5));
    setMoviePair(getRandomMoviePair());
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
            A small interactive corner: play a quick arcade round or make a few CineRank-style movie picks.
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

          {/* Right block: movie this-or-that game */}
          <div className="playground-card glass movie-game-card">
            <div className="card-top-header">
              <Film size={16} className="play-icon" style={{ color: activeColor }} />
              <span>Movie This or That</span>
            </div>

            <div className="movie-game-wrapper">
              <div className="movie-round-header">
                <div>
                  <span className="movie-round-label">CineRank mini</span>
                  <h3>What are you watching?</h3>
                </div>
                <button className="movie-shuffle-btn" onClick={shuffleMovies} type="button">
                  <Shuffle size={14} />
                  New Pair
                </button>
              </div>

              <div className="movie-pair-grid">
                {moviePair.map((movie) => (
                  <button
                    key={`${movie.title}-${movie.year}`}
                    className="movie-choice-card"
                    onClick={() => pickMovie(movie)}
                    type="button"
                    style={{ '--movie-color': activeColor }}
                  >
                    <span className="movie-choice-genre">{movie.genre}</span>
                    <h4>{movie.title}</h4>
                    <p>{movie.vibe}</p>
                    <div className="movie-choice-meta">
                      <span>{movie.year}</span>
                      <span>
                        <Star size={12} fill="currentColor" />
                        {movie.rating}
                      </span>
                    </div>
                  </button>
                ))}
              </div>

              <div className="movie-picks-panel">
                <span className="movie-picks-label">Recent picks</span>
                {moviePicks.length > 0 ? (
                  <div className="movie-picks-list">
                    {moviePicks.map((movie, index) => (
                      <span key={`${movie.title}-${index}`}>{movie.title}</span>
                    ))}
                  </div>
                ) : (
                  <p>No picks yet. Choose a side to start the streak.</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
