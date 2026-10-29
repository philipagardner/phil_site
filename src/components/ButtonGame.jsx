export const DEFAULT_GAME = {
  title: '',
  goal: 20,
  color: '#e53935',
  shape: 'circle',
  label: '',
  trophy: '🏆',
  winMessage: 'Congrats! You won the button game!'
};

function shade(hex, amount) {
  const value = parseInt(hex.slice(1), 16);
  const target = amount < 0 ? 0 : 255;
  const weight = Math.abs(amount);
  const channel = (shift) => {
    const base = (value >> shift) & 255;
    return Math.round(base + (target - base) * weight);
  };

  return `rgb(${channel(16)}, ${channel(8)}, ${channel(0)})`;
}

function ButtonGame({ game = DEFAULT_GAME, clicks, onClick }) {
  const config = { ...DEFAULT_GAME, ...game };
  const goal = config.goal;
  const won = clicks >= goal;
  const shown = Math.min(clicks, goal);
  const progress = shown / goal;
  const colorVars = {
    '--game-highlight': shade(config.color, 0.45),
    '--game-main': config.color,
    '--game-dark': shade(config.color, -0.25),
    '--game-deep': shade(config.color, -0.5)
  };

  return (
    <div className="button-game" style={colorVars}>
      {config.title && <div className="button-game-title">{config.title}</div>}
      <div className="button-game-count" aria-live="polite">
        {shown} / {goal}
      </div>
      <div
        className="button-game-progress"
        role="progressbar"
        aria-valuemin={0}
        aria-valuemax={goal}
        aria-valuenow={shown}
      >
        <div className="button-game-progress-fill" style={{ width: `${progress * 100}%` }} />
      </div>

      <div className={`button-game-base button-game-base-${config.shape}`}>
        <button
          type="button"
          className={`button-game-button button-game-button-${config.shape}`}
          onClick={onClick}
          disabled={won}
          aria-label={config.label || 'Big button'}
        >
          {config.label}
        </button>
      </div>

      {won ? (
        <div className="button-game-win" role="status">
          <div className="button-game-trophy" aria-hidden="true">
            {config.trophy}
          </div>
          <strong>{config.winMessage}</strong>
        </div>
      ) : (
        <p className="button-game-hint">Press the button {goal} times.</p>
      )}
    </div>
  );
}

export default ButtonGame;
