import { useState, useEffect, useRef, useCallback } from 'react';

const CANVAS_WIDTH = 600;
const CANVAS_HEIGHT = 500;
const PLAYER_WIDTH = 40;
const PLAYER_HEIGHT = 20;
const BULLET_WIDTH = 4;
const BULLET_HEIGHT = 10;
const ALIEN_WIDTH = 30;
const ALIEN_HEIGHT = 20;
const ALIEN_ROWS = 4;
const ALIEN_COLS = 8;
const ALIEN_PADDING = 15;

function SpaceInvaders() {
  const canvasRef = useRef(null);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [gameWon, setGameWon] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);
  const [lives, setLives] = useState(3);

  const gameState = useRef({
    playerX: CANVAS_WIDTH / 2 - PLAYER_WIDTH / 2,
    bullets: [],
    aliens: [],
    alienDirection: 1,
    alienSpeed: 1,
    lastShot: 0,
    keys: { left: false, right: false, space: false },
  });

  const initAliens = useCallback(() => {
    const aliens = [];
    for (let row = 0; row < ALIEN_ROWS; row++) {
      for (let col = 0; col < ALIEN_COLS; col++) {
        aliens.push({
          x: 50 + col * (ALIEN_WIDTH + ALIEN_PADDING),
          y: 50 + row * (ALIEN_HEIGHT + ALIEN_PADDING),
          alive: true,
        });
      }
    }
    return aliens;
  }, []);

  const startGame = useCallback(() => {
    gameState.current = {
      playerX: CANVAS_WIDTH / 2 - PLAYER_WIDTH / 2,
      bullets: [],
      aliens: initAliens(),
      alienDirection: 1,
      alienSpeed: 1,
      lastShot: 0,
      keys: { left: false, right: false, space: false },
    };
    setScore(0);
    setLives(3);
    setGameOver(false);
    setGameWon(false);
    setGameStarted(true);
  }, [initAliens]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowLeft' || e.key === 'a') gameState.current.keys.left = true;
      if (e.key === 'ArrowRight' || e.key === 'd') gameState.current.keys.right = true;
      if (e.key === ' ' || e.key === 'ArrowUp') {
        e.preventDefault();
        gameState.current.keys.space = true;
      }
    };

    const handleKeyUp = (e) => {
      if (e.key === 'ArrowLeft' || e.key === 'a') gameState.current.keys.left = false;
      if (e.key === 'ArrowRight' || e.key === 'd') gameState.current.keys.right = false;
      if (e.key === ' ' || e.key === 'ArrowUp') gameState.current.keys.space = false;
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, []);

  useEffect(() => {
    if (!gameStarted || gameOver || gameWon) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animationId;

    const gameLoop = () => {
      const state = gameState.current;
      const now = Date.now();

      // Move player
      if (state.keys.left && state.playerX > 0) {
        state.playerX -= 5;
      }
      if (state.keys.right && state.playerX < CANVAS_WIDTH - PLAYER_WIDTH) {
        state.playerX += 5;
      }

      // Shoot
      if (state.keys.space && now - state.lastShot > 300) {
        state.bullets.push({
          x: state.playerX + PLAYER_WIDTH / 2 - BULLET_WIDTH / 2,
          y: CANVAS_HEIGHT - 40,
        });
        state.lastShot = now;
      }

      // Move bullets
      state.bullets = state.bullets
        .map((b) => ({ ...b, y: b.y - 7 }))
        .filter((b) => b.y > -BULLET_HEIGHT);

      // Check bullet-alien collisions
      state.bullets.forEach((bullet) => {
        state.aliens.forEach((alien) => {
          if (
            alien.alive &&
            bullet.x < alien.x + ALIEN_WIDTH &&
            bullet.x + BULLET_WIDTH > alien.x &&
            bullet.y < alien.y + ALIEN_HEIGHT &&
            bullet.y + BULLET_HEIGHT > alien.y
          ) {
            alien.alive = false;
            bullet.y = -100;
            setScore((s) => s + 10);
          }
        });
      });

      // Move aliens
      let hitEdge = false;
      state.aliens.forEach((alien) => {
        if (alien.alive) {
          alien.x += state.alienSpeed * state.alienDirection;
          if (alien.x <= 0 || alien.x >= CANVAS_WIDTH - ALIEN_WIDTH) {
            hitEdge = true;
          }
        }
      });

      if (hitEdge) {
        state.alienDirection *= -1;
        state.aliens.forEach((alien) => {
          alien.y += 10;
          if (alien.y + ALIEN_HEIGHT >= CANVAS_HEIGHT - 30) {
            setGameOver(true);
          }
        });
        state.alienSpeed += 0.1;
      }

      // Check win
      if (state.aliens.every((a) => !a.alive)) {
        setGameWon(true);
      }

      // Draw
      ctx.fillStyle = '#0a0a0f';
      ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

      // Draw player
      ctx.font = '28px serif';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText('☕', state.playerX + PLAYER_WIDTH / 2, CANVAS_HEIGHT - 45);

      // Draw bullets
      ctx.fillStyle = '#ff6b35';
      state.bullets.forEach((bullet) => {
        ctx.fillRect(bullet.x, bullet.y, BULLET_WIDTH, BULLET_HEIGHT);
      });

      // Draw aliens
      ctx.font = '24px serif';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      state.aliens.forEach((alien) => {
        if (alien.alive) {
          ctx.fillText('☹', alien.x + ALIEN_WIDTH / 2, alien.y + ALIEN_HEIGHT / 2);
        }
      });

      // Draw ground
      ctx.fillStyle = '#1a1a2e';
      ctx.fillRect(0, CANVAS_HEIGHT - 20, CANVAS_WIDTH, 20);

      animationId = requestAnimationFrame(gameLoop);
    };

    animationId = requestAnimationFrame(gameLoop);
    return () => cancelAnimationFrame(animationId);
  }, [gameStarted, gameOver, gameWon]);

  return (
    <div className="space-invaders">
      <div className="game-header">
        <h1>Sleep Invaders</h1>
        <div className="game-stats">
          <span>Score: {score}</span>
          <span>Lives: {lives}</span>
        </div>
      </div>

      <div className="game-container">
        <canvas
          ref={canvasRef}
          width={CANVAS_WIDTH}
          height={CANVAS_HEIGHT}
          className="game-canvas"
        />

        {!gameStarted && (
          <div className="game-overlay">
            <h2>Sleep Invaders</h2>
            <p>Use ← → or A/D to move, Space to shoot</p>
            <button className="button button-primary" onClick={startGame}>
              Start Game
            </button>
          </div>
        )}

        {gameOver && (
          <div className="game-overlay">
            <h2>Game Over</h2>
            <p>Final Score: {score}</p>
            <button className="button button-primary" onClick={startGame}>
              Try Again
            </button>
          </div>
        )}

        {gameWon && (
          <div className="game-overlay">
            <h2>You Win!</h2>
            <p>Final Score: {score}</p>
            <button className="button button-primary" onClick={startGame}>
              Play Again
            </button>
          </div>
        )}
      </div>

      <div className="game-controls">
        <p>Controls: Arrow keys or A/D to move, Space to shoot</p>
      </div>
    </div>
  );
}

export default SpaceInvaders;