import { Link } from 'react-router-dom';

function Footer() {
  return (
    <footer className="site-footer">
      <div className="container footer-wrap">
        <div>
          <Link className="brand brand-footer" to="/">
            <span className="brand-mark">PG</span>
            <span className="brand-text">Phil Gardner</span>
          </Link>
          <p>UX engineer and front-end developer with mastery in accessible, responsive design.</p>
        </div>
        <div className="footer-links">
          <Link to="/about">About</Link>
          <Link to="/resume">Phil's Resume</Link>
          <Link className="desktop-only" to="/game">Snake</Link>
          <Link className="desktop-only" to="/space-invaders">Sleep Invaders</Link>
          <Link className="mobile-only" to="/games">GAMES!</Link>
        </div>
      </div>
      <div className="container footer-meta">
        <p>&copy; {new Date().getFullYear()} Phil A. Gardner</p>
        <p>Raleigh, NC</p>
      </div>
    </footer>
  );
}

export default Footer;