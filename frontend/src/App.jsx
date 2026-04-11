import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Achievements from './pages/Achievements';
import Tournaments from './pages/Tournaments';
import Admin from './pages/Admin';
import WhatIsUltimate from './pages/WhatIsUltimate';
import Trainings from './pages/Trainings';
import Events from './pages/Events';

function App() {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900">
      <Navbar />
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/achievements" element={<Achievements />} />
          <Route path="/tournaments" element={<Tournaments />} />
          <Route path="/eventos" element={<Events />} />
          <Route path="/entrenamientos" element={<Trainings />} />
          <Route path="/que-es-el-ultimate" element={<WhatIsUltimate />} />
          <Route path="/admin" element={<Admin />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
