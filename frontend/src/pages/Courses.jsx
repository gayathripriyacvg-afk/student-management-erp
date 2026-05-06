import React, { useState, useEffect } from 'react';
import { getCourses, addCourse, deleteCourse, updateCourse } from '../services/api';
import { Plus, Trash2, Edit2, Search, X, BookOpen, Clock, User, ArrowRight } from 'lucide-react';

const Courses = () => {
  const [courses, setCourses] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [editingCourse, setEditingCourse] = useState(null);
  const [formData, setFormData] = useState({ courseName: '', duration: '', instructor: '' });

  useEffect(() => { fetchCourses(); }, []);

  const fetchCourses = async () => {
    try {
      const response = await getCourses();
      setCourses(response.data);
    } catch (error) { console.error("Error fetching courses:", error); }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingCourse) { await updateCourse(editingCourse._id, formData); }
      else { await addCourse(formData); }
      setShowModal(false); setEditingCourse(null);
      setFormData({ courseName: '', duration: '', instructor: '' });
      fetchCourses();
    } catch (error) { console.error("Error saving course:", error); }
  };

  const filteredCourses = courses.filter(c => 
    c.courseName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.instructor?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="animate-in">
      <header style={{ marginBottom: 'var(--space-lg)', display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: '1rem' }}>
        <div>
          <h1>Courses</h1>
          <p style={{ color: 'hsl(var(--text-muted))', fontWeight: 500 }}>Browse academic programs and modules.</p>
        </div>
        <button className="btn-primary" onClick={() => setShowModal(true)}>
          <Plus size={20} /> New Course
        </button>
      </header>

      <div style={{ position: 'relative', marginBottom: 'var(--space-lg)', maxWidth: '350px' }}>
        <Search size={18} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'hsl(var(--text-muted))' }} />
        <input type="text" placeholder="Search courses..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} style={{ paddingLeft: '3rem' }} />
      </div>

      <div className="grid-responsive">
        {filteredCourses.length > 0 ? filteredCourses.map(course => (
          <div key={course._id} className="premium-card" style={{ padding: 'var(--space-md)', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: 'hsla(var(--primary), 0.1)', color: 'hsl(var(--primary))', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <BookOpen size={24} />
              </div>
              <div style={{ display: 'flex', gap: '0.4rem' }}>
                <button onClick={() => { setEditingCourse(course); setFormData({courseName: course.courseName, duration: course.duration || '', instructor: course.instructor || ''}); setShowModal(true); }} style={{ padding: '0.5rem', borderRadius: '0.75rem', border: '1px solid hsl(var(--card-border))', background: 'white', color: 'hsl(var(--text-muted))', cursor: 'pointer' }}>
                  <Edit2 size={16} />
                </button>
                <button onClick={async () => { if(window.confirm("Delete course?")) { await deleteCourse(course._id); fetchCourses(); } }} style={{ padding: '0.5rem', borderRadius: '0.75rem', border: '1px solid hsl(var(--card-border))', background: 'white', color: '#ef4444', cursor: 'pointer' }}>
                  <Trash2 size={16} />
                </button>
              </div>
            </div>

            <div>
              <h3 style={{ marginBottom: '0.5rem' }}>{course.courseName}</h3>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: 'hsl(var(--text-muted))', fontSize: '0.85rem', fontWeight: 500 }}>
                  <Clock size={14} /> {course.duration || 'TBA'}
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: 'hsl(var(--text-muted))', fontSize: '0.85rem', fontWeight: 500 }}>
                  <User size={14} /> {course.instructor || 'TBA'}
                </div>
              </div>
            </div>

            <div style={{ marginTop: 'auto', paddingTop: '1rem', borderTop: '1px solid hsl(var(--card-border))', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: '0.8rem', fontWeight: 700, color: 'hsl(var(--text-muted))' }}>Active module</span>
              <button style={{ color: 'hsl(var(--primary))', background: 'none', border: 'none', fontWeight: 800, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.9rem' }}>
                Manage <ArrowRight size={16} />
              </button>
            </div>
          </div>
        )) : (
          <div style={{ gridColumn: '1 / -1', padding: 'var(--space-xl) 0', textAlign: 'center', color: 'hsl(var(--text-muted))' }}>
            <BookOpen size={64} style={{ opacity: 0.1, marginBottom: '1rem' }} />
            <p>No courses found.</p>
          </div>
        )}
      </div>

      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="premium-card animate-in" style={{ width: '100%', maxWidth: '450px', padding: 'var(--space-lg)', position: 'relative' }} onClick={e => e.stopPropagation()}>
            <button onClick={() => setShowModal(false)} style={{ position: 'absolute', right: '1.25rem', top: '1.25rem', background: 'none', border: 'none', color: 'hsl(var(--text-muted))', cursor: 'pointer' }}>
              <X size={24} />
            </button>
            <h2 style={{ marginBottom: '2rem' }}>{editingCourse ? 'Edit Program' : 'New Program'}</h2>
            <form onSubmit={handleSubmit} style={{ display: 'grid', gap: '1.25rem' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, marginBottom: '0.5rem' }}>Course Name</label>
                <input type="text" required value={formData.courseName} onChange={(e) => setFormData({...formData, courseName: e.target.value})} placeholder="Mastering MERN" />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, marginBottom: '0.5rem' }}>Duration</label>
                <input type="text" value={formData.duration} onChange={(e) => setFormData({...formData, duration: e.target.value})} placeholder="e.g. 6 Months" />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, marginBottom: '0.5rem' }}>Lead Instructor</label>
                <input type="text" value={formData.instructor} onChange={(e) => setFormData({...formData, instructor: e.target.value})} placeholder="Full name" />
              </div>
              <button type="submit" className="btn-primary" style={{ marginTop: '1rem', width: '100%' }}>
                {editingCourse ? 'Save Changes' : 'Create Program'}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Courses;
