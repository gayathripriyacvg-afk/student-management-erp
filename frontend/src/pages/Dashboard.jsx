import React from 'react';
import { Users, BookOpen, Award, TrendingUp, Calendar, ArrowUpRight } from 'lucide-react';

const Dashboard = () => {
  const stats = [
    { label: 'Total Students', value: '0', icon: <Users />, color: '#6366f1', trend: '+0%' },
    { label: 'Active Courses', value: '0', icon: <BookOpen />, color: '#ec4899', trend: '+0%' },
    { label: 'Avg Performance', value: '0%', icon: <Award />, color: '#10b981', trend: '+0%' },
    { label: 'Total Subjects', value: '0', icon: <Calendar />, color: '#f59e0b', trend: '+0%' },
  ];

  return (
    <div className="animate-slide-up">
      <header style={{ marginBottom: '3rem', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
        <div>
          <p style={{ color: '#64748b', fontWeight: 500, marginBottom: '0.5rem' }}>Welcome back, Admin</p>
          <h1 style={{ fontSize: '2.5rem', fontWeight: 800, color: '#0f172a', letterSpacing: '-0.02em' }}>Dashboard Overview</h1>
        </div>
        <div style={{ display: 'flex', gap: '1rem' }}>
          <button style={{ padding: '0.75rem 1.25rem', borderRadius: '1rem', border: '1px solid #e2e8f0', background: 'white', fontWeight: 600, color: '#64748b', cursor: 'pointer' }}>Download Report</button>
          <button className="btn-primary">Generate Stats</button>
        </div>
      </header>
      
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '2rem' }}>
        {stats.map((stat, i) => (
          <div key={i} className="premium-card" style={{ padding: '1.75rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.5rem' }}>
              <div style={{ 
                width: '48px', 
                height: '48px', 
                borderRadius: '14px', 
                background: `${stat.color}10`, 
                color: stat.color,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                {stat.icon}
              </div>
              <span style={{ 
                fontSize: '0.8rem', 
                fontWeight: 700, 
                color: '#10b981', 
                background: '#10b98110', 
                padding: '0.25rem 0.75rem', 
                borderRadius: '2rem',
                display: 'flex',
                alignItems: 'center',
                gap: '0.25rem'
              }}>
                <TrendingUp size={12} /> {stat.trend}
              </span>
            </div>
            <h3 style={{ color: '#64748b', fontSize: '0.9rem', fontWeight: 600, marginBottom: '0.5rem' }}>{stat.label}</h3>
            <p style={{ fontSize: '2.25rem', fontWeight: 800, color: '#0f172a' }}>{stat.value}</p>
          </div>
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '2rem', marginTop: '3rem' }}>
        <div className="premium-card" style={{ padding: '2rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
            <h2 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#0f172a' }}>Recent Students</h2>
            <button style={{ color: 'hsl(var(--primary))', background: 'none', border: 'none', fontWeight: 600, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
              View All <ArrowUpRight size={18} />
            </button>
          </div>
          <div style={{ color: '#94a3b8', textAlign: 'center', padding: '4rem 0' }}>
            <Users size={48} style={{ marginBottom: '1rem', opacity: 0.2 }} />
            <p>No student data available yet.</p>
          </div>
        </div>

        <div className="premium-card" style={{ padding: '2rem', background: 'linear-gradient(180deg, #6366f1 0%, #4f46e5 100%)', color: 'white', borderColor: 'transparent' }}>
          <h2 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '1rem' }}>Quick Actions</h2>
          <p style={{ fontSize: '0.9rem', opacity: 0.8, marginBottom: '2rem' }}>Manage your institution efficiently with these quick shortcuts.</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <button style={{ padding: '1rem', borderRadius: '1rem', border: 'none', background: 'rgba(255,255,255,0.1)', color: 'white', fontWeight: 600, textAlign: 'left', cursor: 'pointer' }}>Assign Course to Student</button>
            <button style={{ padding: '1rem', borderRadius: '1rem', border: 'none', background: 'rgba(255,255,255,0.1)', color: 'white', fontWeight: 600, textAlign: 'left', cursor: 'pointer' }}>Update Semester Marks</button>
            <button style={{ padding: '1rem', borderRadius: '1rem', border: 'none', background: 'white', color: '#4f46e5', fontWeight: 700, textAlign: 'center', cursor: 'pointer', marginTop: '1rem' }}>Schedule Exam</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
