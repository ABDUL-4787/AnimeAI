import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { GameProvider } from './context/GameContext';
import { HUD } from './components/HUD';
import { ParticleBackground } from './components/ParticleBackground';
import { LandingPage } from './pages/LandingPage';
import { LoginPage } from './pages/LoginPage';
import { IntroSequence } from './pages/IntroSequence';
import { CharacterCreation } from './pages/CharacterCreation';
import { WorldMap } from './pages/WorldMap';
import { PythonWorld } from './pages/PythonWorld';
import { LessonWorkspace } from './pages/LessonWorkspace';
import { ProfilePage } from './pages/ProfilePage';

function AppContent() {
  return (
    <div className="relative min-h-screen">
      {/* Dynamic Cyber Particle Layer */}
      <ParticleBackground />
      
      {/* Floating HUD Interface */}
      <HUD />
      
      {/* Application Routing */}
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/intro" element={<IntroSequence />} />
        <Route path="/create-character" element={<CharacterCreation />} />
        <Route path="/world" element={<WorldMap />} />
        <Route path="/world/python" element={<PythonWorld />} />
        <Route path="/quest/:questId" element={<LessonWorkspace />} />
        <Route path="/profile" element={<ProfilePage />} />
      </Routes>
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <GameProvider>
        <AppContent />
      </GameProvider>
    </BrowserRouter>
  );
}
