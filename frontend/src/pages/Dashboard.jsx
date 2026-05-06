import React from 'react';

const Dashboard = () => {
  return (
    <div className="animate-fade-in">
      <h1 style={{ marginBottom: '2rem', fontSize: '2.5rem', fontWeight: 700 }}>
        Welcome back, <span style={{ color: 'hsl(var(--primary))' }}>Admin</span>
      </h1>
      
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '2rem' }}>
        <div className="glass-card" style={{ padding: '2rem', borderRadius: '1rem' }}>
          <h3 style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.9rem', marginBottom: '0.5rem' }}>Total Students</h3>
          <p style={{ fontSize: '2rem', fontWeight: 700 }}>0</p>
          <div style={{ marginTop: '1rem', height: '4px', background: 'rgba(255,255,255,0.1)', borderRadius: '2px', overflow: 'hidden' }}>
            <div style={{ width: '0%', height: '100%', background: 'hsl(var(--primary))' }}></div>
          </div>
        </div>
        <div className="glass-card" style={{ padding: '2rem', borderRadius: '1rem' }}>
          <h3 style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.9rem', marginBottom: '0.5rem' }}>Active Courses</h3>
          <p style={{ fontSize: '2rem', fontWeight: 700 }}>0</p>
          <div style={{ marginTop: '1rem', height: '4px', background: 'rgba(255,255,255,0.1)', borderRadius: '2px', overflow: 'hidden' }}>
            <div style={{ width: '0%', height: '100%', background: '#f43f5e' }}></div>
          </div>
        </div>
        <div className="glass-card" style={{ padding: '2rem', borderRadius: '1rem' }}>
          <h3 style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.9rem', marginBottom: '0.5rem' }}>Average Marks</h3>
          <p style={{ fontSize: '2rem', fontWeight: 700 }}>0%</p>
          <div style={{ marginTop: '1rem', height: '4px', background: 'rgba(255,255,255,0.1)', borderRadius: '2px', overflow: 'hidden' }}>
            <div style={{ width: '0%', height: '100%', background: '#10b981' }}></div>
          </div>
        </div>
      </div>

      <div className="glass-card" style={{ marginTop: '3rem', padding: '2rem', borderRadius: '1rem' }}>
        <h2 style={{ marginBottom: '1.5rem', fontSize: '1.5rem' }}>Recent Activities</h2>
        <div style={{ color: 'rgba(255,255,255,0.4)', textAlign: 'center', padding: '3rem' }}>
          No recent activity to show. Start by adding students or courses.
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
