import { useEffect, useMemo, useRef, useState } from 'react';

const GRID_SIZE = 16;
const TICK_MS = 130;
const INITIAL_SNAKE = [
  { x: 8, y: 8 },
  { x: 7, y: 8 },
  { x: 6, y: 8 },
];
const INITIAL_DIRECTION = { x: 1, y: 0 };

function randomFoodPosition(snake) {
  while (true) {
    const candidate = {
      x: Math.floor(Math.random() * GRID_SIZE),
      y: Math.floor(Math.random() * GRID_SIZE),
    };

    if (!snake.some((segment) => segment.x === candidate.x && segment.y === candidate.y)) {
      return candidate;
    }
  }
}

function SnakeGame() {
  const [snake, setSnake] = useState(INITIAL_SNAKE);
  const [direction, setDirection] = useState(INITIAL_DIRECTION);
  const [food, setFood] = useState(() => randomFoodPosition(INITIAL_SNAKE));
  const [score, setScore] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [isGameOver, setIsGameOver] = useState(false);

  const snakeRef = useRef(snake);
  const directionRef = useRef(direction);
  const foodRef = useRef(food);

  useEffect(() => {
    snakeRef.current = snake;
  }, [snake]);

  useEffect(() => {
    directionRef.current = direction;
  }, [direction]);

  useEffect(() => {
    foodRef.current = food;
  }, [food]);

  const updateDirection = (nextDirection) => {
    const current = directionRef.current;

    if (current.x + nextDirection.x === 0 && current.y + nextDirection.y === 0) {
      return;
    }

    setDirection(nextDirection);
  };

  const startGame = () => {
    if (isGameOver) {
      const nextFood = randomFoodPosition(INITIAL_SNAKE);
      setSnake(INITIAL_SNAKE);
      setDirection(INITIAL_DIRECTION);
      setFood(nextFood);
      setScore(0);
      setIsGameOver(false);
      setIsRunning(true);
      return;
    }

    setIsRunning(true);
  };

  const resetGame = () => {
    const nextFood = randomFoodPosition(INITIAL_SNAKE);
    setSnake(INITIAL_SNAKE);
    setDirection(INITIAL_DIRECTION);
    setFood(nextFood);
    setScore(0);
    setIsGameOver(false);
    setIsRunning(false);
  };

  useEffect(() => {
    const onKeyDown = (event) => {
      if (event.key === ' ') {
        event.preventDefault();

        if (isGameOver) {
          resetGame();
          return;
        }

        setIsRunning((running) => !running);
        return;
      }

      if (event.key === 'ArrowUp') {
        event.preventDefault();
        updateDirection({ x: 0, y: -1 });
      }

      if (event.key === 'ArrowDown') {
        event.preventDefault();
        updateDirection({ x: 0, y: 1 });
      }

      if (event.key === 'ArrowLeft') {
        event.preventDefault();
        updateDirection({ x: -1, y: 0 });
      }

      if (event.key === 'ArrowRight') {
        event.preventDefault();
        updateDirection({ x: 1, y: 0 });
      }
    };

    window.addEventListener('keydown', onKeyDown);

    return () => {
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [isGameOver]);

  useEffect(() => {
    if (!isRunning || isGameOver) {
      return undefined;
    }

    const timer = window.setInterval(() => {
      const currentSnake = snakeRef.current;
      const currentDirection = directionRef.current;
      const currentFood = foodRef.current;
      const head = currentSnake[0];
      const nextHead = {
        x: head.x + currentDirection.x,
        y: head.y + currentDirection.y,
      };

      const hitsWall =
        nextHead.x < 0 ||
        nextHead.x >= GRID_SIZE ||
        nextHead.y < 0 ||
        nextHead.y >= GRID_SIZE;
      const hitsSelf = currentSnake.some(
        (segment) => segment.x === nextHead.x && segment.y === nextHead.y
      );

      if (hitsWall || hitsSelf) {
        setIsGameOver(true);
        setIsRunning(false);
        return;
      }

      const ateFood = nextHead.x === currentFood.x && nextHead.y === currentFood.y;
      const nextSnake = ateFood
        ? [nextHead, ...currentSnake]
        : [nextHead, ...currentSnake.slice(0, -1)];

      setSnake(nextSnake);

      if (ateFood) {
        setScore((currentScore) => currentScore + 1);
        setFood(randomFoodPosition(nextSnake));
      }
    }, TICK_MS);

    return () => {
      window.clearInterval(timer);
    };
  }, [isRunning, isGameOver]);

  const cells = useMemo(() => {
    const head = snake[0];

    return Array.from({ length: GRID_SIZE * GRID_SIZE }, (_, index) => {
      const x = index % GRID_SIZE;
      const y = Math.floor(index / GRID_SIZE);
      const isSnake = snake.some((segment) => segment.x === x && segment.y === y);
      const isHead = head.x === x && head.y === y;
      const isFood = food.x === x && food.y === y;

      return {
        key: `${x}-${y}`,
        isSnake,
        isHead,
        isFood,
      };
    });
  }, [snake, food]);

  return (
    <section className="section game-section">
      <div className="container game-shell">
        <div className="game-copy">
          <p className="eyebrow">Arcade mode</p>
          <h1>GAME!</h1>
          <p>
            A clean break from managed services: use the arrow keys to steer, eat the signal nodes,
            and keep the snake out of the walls.
          </p>
          <div className="game-stats">
            <div className="game-stat-card">
              <span>Score</span>
              <strong>{score}</strong>
            </div>
            <div className="game-stat-card">
              <span>Status</span>
              <strong>{isGameOver ? 'Game over' : isRunning ? 'Running' : 'Ready'}</strong>
            </div>
          </div>
          <div className="game-actions">
            <button className="button button-primary" type="button" onClick={startGame}>
              {isGameOver ? 'Play Again' : isRunning ? 'In Progress' : 'Start Game'}
            </button>
            <button className="button button-secondary" type="button" onClick={resetGame}>
              Reset
            </button>
          </div>
          <div className="game-pad" aria-label="Touch controls for snake">
            <button type="button" className="game-pad-button game-pad-up" onClick={() => updateDirection({ x: 0, y: -1 })}>
              Up
            </button>
            <button type="button" className="game-pad-button game-pad-left" onClick={() => updateDirection({ x: -1, y: 0 })}>
              Left
            </button>
            <button type="button" className="game-pad-button game-pad-right" onClick={() => updateDirection({ x: 1, y: 0 })}>
              Right
            </button>
            <button type="button" className="game-pad-button game-pad-down" onClick={() => updateDirection({ x: 0, y: 1 })}>
              Down
            </button>
          </div>
          <ul className="game-controls">
            <li>Arrow keys move the snake.</li>
            <li>On mobile, use the direction pad below the buttons.</li>
            <li>Press space to pause or resume.</li>
            <li>Touch a wall or your tail and the run ends.</li>
          </ul>
        </div>

        <div className="game-board-wrap">
          <div className="game-board" role="img" aria-label={`Snake game board. Current score ${score}.`}>
            {cells.map((cell) => (
              <span
                key={cell.key}
                className={`game-cell${cell.isSnake ? ' is-snake' : ''}${cell.isHead ? ' is-head' : ''}${cell.isFood ? ' is-food' : ''}`}
              />
            ))}
          </div>
          {isGameOver ? <p className="game-banner">Signal lost. Reset and go again.</p> : null}
        </div>
      </div>
    </section>
  );
}

export default SnakeGame;