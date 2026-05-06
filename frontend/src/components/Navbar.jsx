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
    <nav className="glass" style={{
      position: 'fixed',
      left: '2rem',
      top: '50%',
      transform: 'translateY(-50%)',
      padding: '1.5rem 1rem',
      display: 'flex',
      flexDirection: 'column',
      gap: '1.5rem',
      zIndex: 100,
      minWidth: '10rem'
    }}>
      <div className="logo" style={{ 
        marginBottom: '1rem', 
        textAlign: 'center', 
        fontWeight: 'bold', 
        fontSize: '1.2rem',
        color: 'hsl(var(--primary))',
        letterSpacing: '2px'
      }}>
        STUDENT ERP
      </div>
      {navItems.map((item) => (
        <Link
          key={item.path}
          to={item.path}
          style={{
            color: location.pathname === item.path ? 'hsl(var(--primary))' : 'rgba(255,255,255,0.6)',
            textDecoration: 'none',
            display: 'flex',
            alignItems: 'center',
            gap: '1rem',
            padding: '0.75rem 1rem',
            borderRadius: '0.75rem',
            background: location.pathname === item.path ? 'rgba(255,255,255,0.05)' : 'transparent',
            transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
            border: location.pathname === item.path ? '1px solid rgba(255,255,255,0.1)' : '1px solid transparent'
          }}
        >
          {item.icon}
          <span style={{ fontSize: '0.95rem', fontWeight: 500 }}>{item.name}</span>
        </Link>
      ))}
    </nav>
  );
};

export default Navbar;
