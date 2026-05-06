import React from 'react';
import { Users, BookOpen, Award, TrendingUp, Calendar, ArrowUpRight } from 'lucide-react';

const Dashboard = () => {
  const stats = [
    { label: 'Total Students', value: '0', icon: <Users size={24} />, color: 'hsl(var(--primary))', trend: '+0%' },
    { label: 'Active Courses', value: '0', icon: <BookOpen size={24} />, color: '#ec4899', trend: '+0%' },
    { label: 'Avg Performance', value: '0%', icon: <Award size={24} />, color: '#10b981', trend: '+0%' },
    { label: 'Total Subjects', value: '0', icon: <Calendar size={24} />, color: '#f59e0b', trend: '+0%' },
  ];

  return (
    <div className="animate-in">
      <header style={{ marginBottom: 'var(--space-lg)', display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'flex-end', gap: '1rem' }}>
        <div>
          <p style={{ color: 'hsl(var(--text-muted))', fontWeight: 600, marginBottom: '0.25rem' }}>Welcome, Admin</p>
          <h1>Overview</h1>
        </div>
        <div style={{ display: 'flex', gap: '0.75rem' }}>
          <button style={{ padding: '0.75rem 1.25rem', borderRadius: 'var(--radius)', border: '1px solid hsl(var(--card-border))', background: 'white', fontWeight: 600, color: 'hsl(var(--text-muted))', cursor: 'pointer' }}>Export</button>
          <button className="btn-primary">New Action</button>
        </div>
      </header>
      
      <div className="grid-responsive" style={{ marginBottom: 'var(--space-xl)' }}>
        {stats.map((stat, i) => (
          <div key={i} className="premium-card" style={{ padding: 'var(--space-md)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
              <div style={{ 
                width: '44px', height: '44px', borderRadius: '12px', background: `${stat.color}10`, color: stat.color,
                display: 'flex', alignItems: 'center', justifyContent: 'center'
              }}>
                {stat.icon}
              </div>
              <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#10b981', background: '#10b98110', padding: '0.25rem 0.6rem', borderRadius: '1rem' }}>
                {stat.trend}
              </span>
            </div>
            <p style={{ color: 'hsl(var(--text-muted))', fontSize: '0.85rem', fontWeight: 600 }}>{stat.label}</p>
            <p style={{ fontSize: '2rem', fontWeight: 800 }}>{stat.value}</p>
          </div>
        ))}
      </div>

      <div className="grid-responsive" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 400px), 1fr))' }}>
        <div className="premium-card" style={{ padding: 'var(--space-md)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
            <h2>Recent Activity</h2>
            <button style={{ color: 'hsl(var(--primary))', background: 'none', border: 'none', fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
              View All <ArrowUpRight size={16} />
            </button>
          </div>
          <div style={{ textAlign: 'center', padding: 'var(--space-xl) 0', color: 'hsl(var(--text-muted))' }}>
            <Users size={40} style={{ opacity: 0.1, marginBottom: '1rem' }} />
            <p>No recent data found.</p>
          </div>
        </div>

        <div className="premium-card" style={{ padding: 'var(--space-md)', background: 'hsl(var(--primary))', color: 'white', borderColor: 'transparent' }}>
          <h2>Shortcuts</h2>
          <p style={{ opacity: 0.8, fontSize: '0.9rem', margin: '0.5rem 0 1.5rem' }}>Access common tasks quickly.</p>
          <div style={{ display: 'grid', gap: '0.75rem' }}>
            <button style={{ padding: '1rem', borderRadius: '0.75rem', border: 'none', background: 'rgba(255,255,255,0.1)', color: 'white', fontWeight: 600, textAlign: 'left', cursor: 'pointer' }}>Manage Students</button>
            <button style={{ padding: '1rem', borderRadius: '0.75rem', border: 'none', background: 'rgba(255,255,255,0.1)', color: 'white', fontWeight: 600, textAlign: 'left', cursor: 'pointer' }}>Generate Reports</button>
            <button style={{ padding: '1rem', borderRadius: '0.75rem', border: 'none', background: 'white', color: 'hsl(var(--primary))', fontWeight: 800, textAlign: 'center', cursor: 'pointer' }}>Upgrade Pro</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
