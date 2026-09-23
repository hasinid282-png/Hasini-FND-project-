import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import DetectorPage from './pages/DetectorPage';
import DatabasePage from './pages/DatabasePage';
import AnalyticsPage from './pages/AnalyticsPage';
import GuidePage from './pages/GuidePage';

export default function App() {
  return (
    <ThemeProvider>
      <Router>
        <div className="min-h-screen flex flex-col bg-[var(--navy-bg)] text-[var(--text-main)] selection:bg-blue-600/30 selection:text-white transition-colors duration-200">
          <Navbar />
          <main className="flex-1">
            <Routes>
              <Route path="/" element={<DetectorPage />} />
              <Route path="/database" element={<DatabasePage />} />
              <Route path="/analytics" element={<AnalyticsPage />} />
              <Route path="/guide" element={<GuidePage />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </ThemeProvider>
  );
}
