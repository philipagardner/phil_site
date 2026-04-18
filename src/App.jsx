import { Route, Routes } from 'react-router-dom';
import SiteLayout from './components/SiteLayout';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import GamePage from './pages/GamePage';
import ResumePage from './pages/ResumePage';
import SpaceInvaders from './components/SpaceInvaders';

function App() {
  return (
    <Routes>
      <Route element={<SiteLayout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/resume" element={<ResumePage />} />
        <Route path="/game" element={<GamePage />} />
        <Route path="/space-invaders" element={<SpaceInvaders />} />
      </Route>
    </Routes>
  );
}

export default App;