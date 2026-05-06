import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, Users, BookOpen, Award } from 'lucide-react';

const Navbar = () => {
  const location = useLocation();

  const navItems = [
    { name: 'Dashboard', path: '/', icon: <LayoutDashboard size={22} /> },
    { name: 'Students', path: '/students', icon: <Users size={22} /> },
    { name: 'Courses', path: '/courses', icon: <BookOpen size={22} /> },
    { name: 'Marks', path: '/marks', icon: <Award size={22} /> },
  ];

  return (
    <>
      {/* Desktop Sidebar */}
      <nav className="desktop-nav" style={{
        position: 'fixed',
        left: '1.5rem',
        top: '1.5rem',
        bottom: '1.5rem',
        width: '15rem',
        background: 'white',
        borderRadius: '1.5rem',
        padding: '2rem 1rem',
        display: 'flex',
        flexDirection: 'column',
        gap: '0.75rem',
        boxShadow: 'var(--shadow-md)',
        border: '1px solid hsl(var(--card-border))',
        zIndex: 100
      }}>
        <div style={{ padding: '0 1rem', marginBottom: '2.5rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <div style={{ width: '38px', height: '38px', background: 'hsl(var(--primary))', borderRadius: '10px', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold' }}>S</div>
          <span style={{ fontWeight: 800, fontSize: '1.2rem', color: 'hsl(var(--foreground))' }}>ERP Studio</span>
        </div>

        {navItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '1rem',
              padding: '0.85rem 1.25rem',
              borderRadius: '1rem',
              textDecoration: 'none',
              transition: 'all 0.3s ease',
              background: location.pathname === item.path ? 'hsla(var(--primary), 0.1)' : 'transparent',
              color: location.pathname === item.path ? 'hsl(var(--primary))' : 'hsl(var(--text-muted))',
              fontWeight: location.pathname === item.path ? 700 : 500
            }}
          >
            {item.icon}
            <span style={{ fontSize: '0.95rem' }}>{item.name}</span>
          </Link>
        ))}
      </nav>

      {/* Mobile Bottom Nav */}
      <nav className="mobile-nav" style={{
        position: 'fixed',
        bottom: '0',
        left: '0',
        right: '0',
        background: 'white',
        display: 'none',
        justifyContent: 'space-around',
        padding: '0.75rem 0.5rem 1.5rem',
        borderTop: '1px solid hsl(var(--card-border))',
        zIndex: 1000
      }}>
        {navItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '0.25rem',
              textDecoration: 'none',
              color: location.pathname === item.path ? 'hsl(var(--primary))' : 'hsl(var(--text-muted))',
              fontWeight: 600,
              fontSize: '0.7rem'
            }}
          >
            {item.icon}
            <span>{item.name}</span>
          </Link>
        ))}
      </nav>

      <style>{`
        @media (max-width: 1024px) {
          .desktop-nav { display: none !important; }
          .mobile-nav { display: flex !important; }
        }
      `}</style>
    </>
  );
};

export default Navbar;
