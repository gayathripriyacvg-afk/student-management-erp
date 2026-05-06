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
      <main style={{ marginLeft: '14rem', padding: '2rem 4rem 2rem 2rem' }}>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/students" element={<Students />} />
          <Route path="/courses" element={<Courses />} />
          <Route path="/marks" element={<Marks />} />
        </Routes>
      </main>
    </Router>
  );
}

export default App;
