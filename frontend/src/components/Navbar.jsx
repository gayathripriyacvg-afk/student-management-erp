import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, Users, BookOpen, Award } from 'lucide-react';

const Navbar = () => {
  const location = useLocation();

  const navItems = [
    { name: 'Dashboard', path: '/', icon: <LayoutDashboard size={20} /> },
    { name: 'Students', path: '/students', icon: <Users size={20} /> },
    { name: 'Courses', path: '/courses', icon: <BookOpen size={20} /> },
    { name: 'Marks', path: '/marks', icon: <Award size={20} /> },
  ];

  return (
    <nav className="floating-nav" style={{
      position: 'fixed',
      left: '2rem',
      top: '2rem',
      bottom: '2rem',
      width: '14rem',
      padding: '2.5rem 1rem',
      display: 'flex',
      flexDirection: 'column',
      gap: '1rem',
      zIndex: 100
    }}>
      <div style={{ 
        marginBottom: '2rem', 
        padding: '0 1rem',
        display: 'flex',
        alignItems: 'center',
        gap: '0.75rem'
      }}>
        <div style={{ 
          width: '40px', 
          height: '40px', 
          borderRadius: '12px', 
          background: 'hsl(var(--primary))',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'white',
          fontWeight: 'bold',
          fontSize: '1.2rem'
        }}>S</div>
        <span style={{ fontWeight: 700, fontSize: '1.1rem', color: '#0f172a' }}>StudentERP</span>
      </div>

      {navItems.map((item) => (
        <Link
          key={item.path}
          to={item.path}
          style={{
            color: location.pathname === item.path ? 'hsl(var(--primary))' : '#64748b',
            textDecoration: 'none',
            display: 'flex',
            alignItems: 'center',
            gap: '1rem',
            padding: '1rem',
            borderRadius: '1rem',
            background: location.pathname === item.path ? 'hsla(var(--primary), 0.08)' : 'transparent',
            transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
            fontWeight: location.pathname === item.path ? 600 : 500
          }}
        >
          <span style={{ 
            color: location.pathname === item.path ? 'hsl(var(--primary))' : '#94a3b8',
            transition: 'color 0.3s'
          }}>
            {item.icon}
          </span>
          <span style={{ fontSize: '0.95rem' }}>{item.name}</span>
        </Link>
      ))}

      <div style={{ marginTop: 'auto', padding: '1rem' }}>
        <div style={{ 
          padding: '1rem', 
          background: '#f8fafc', 
          borderRadius: '1rem', 
          fontSize: '0.8rem',
          color: '#64748b',
          border: '1px solid #f1f5f9'
        }}>
          <p style={{ fontWeight: 600, color: '#0f172a', marginBottom: '0.25rem' }}>Pro Version</p>
          <p>Get advanced analytics and more features.</p>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
