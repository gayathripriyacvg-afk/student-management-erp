import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Dashboard from './pages/Dashboard';
import Students from './pages/Students';
import Courses from './pages/Courses';
import Marks from './pages/Marks';

function App() {
  return (
    <Router>
      <div className="bg-mesh"></div>
      <Navbar />
      <div className="layout-content">
        <main className="container-responsive">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/students" element={<Students />} />
            <Route path="/courses" element={<Courses />} />
            <Route path="/marks" element={<Marks />} />
          </Routes>
        </main>
      </div>

      <style>{`
        .layout-content {
          margin-left: 17rem;
          transition: margin-left 0.3s ease;
        }
        @media (max-width: 1024px) {
          .layout-content {
            margin-left: 0;
            padding-bottom: 5rem; /* Space for mobile bottom nav */
          }
        }
      `}</style>
    </Router>
  );
}

export default App;
