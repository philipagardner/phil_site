function GameMenu() {
  return (
    <div className="game-menu">
      <h1>Choose a Game</h1>
      <div className="game-links">
        <a href="/game" className="game-link">
          Snake
        </a>
        <a href="/game/space-invaders" className="game-link">
          Sleep Invaders
        </a>
      </div>
    </div>
  );
}

export default GameMenu;