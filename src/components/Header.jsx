import { useState } from 'react';
import { NavLink } from 'react-router-dom';

const navItems = [
  { label: 'Home', to: '/' },
  { label: 'About', to: '/about' },
  { label: "Phil's Resume", to: '/resume' },
];

const gameItems = [
  { label: 'Snake', to: '/game' },
  { label: 'Sleep Invaders', to: '/space-invaders' },
];

function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [gameDropdownOpen, setGameDropdownOpen] = useState(false);

  return (
    <header className="site-header">
      <div className="container nav-wrap">
        <NavLink className="brand" to="/" onClick={() => setIsOpen(false)}>
          <span className="brand-mark">PG</span>
          <span className="brand-text">Phil Gardner</span>
        </NavLink>
        <button
          className="menu-toggle"
          type="button"
          aria-expanded={isOpen}
          aria-controls="site-nav"
          onClick={() => setIsOpen((open) => !open)}
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
        <nav className={`site-nav${isOpen ? ' is-open' : ''}`} id="site-nav">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.to === '/'}
              className={({ isActive }) => (isActive ? 'active' : undefined)}
              onClick={() => setIsOpen(false)}
            >
              {item.label}
            </NavLink>
          ))}
          <div
            className="nav-dropdown"
            onMouseEnter={() => setGameDropdownOpen(true)}
            onMouseLeave={() => setGameDropdownOpen(false)}
          >
            <span className="nav-dropdown-trigger">GAME! ▾</span>
            <div className={`nav-dropdown-menu${gameDropdownOpen ? ' is-open' : ''}`}>
              {gameItems.map((item) => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  className={({ isActive }) => (isActive ? 'active' : undefined)}
                  onClick={() => {
                    setIsOpen(false);
                    setGameDropdownOpen(false);
                  }}
                >
                  {item.label}
                </NavLink>
              ))}
            </div>
          </div>
        </nav>
      </div>
    </header>
  );
}

export default Header;