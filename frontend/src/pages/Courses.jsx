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

  const handleEdit = (course) => {
    setEditingCourse(course);
    setFormData({ courseName: course.courseName, duration: course.duration || '', instructor: course.instructor || '' });
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Delete this course?")) {
      try { await deleteCourse(id); fetchCourses(); }
      catch (error) { console.error("Error deleting course:", error); }
    }
  };

  const filteredCourses = courses.filter(c => 
    c.courseName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.instructor?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="animate-slide-up">
      <header style={{ marginBottom: '3rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h1 style={{ fontSize: '2.5rem', fontWeight: 800, color: '#0f172a' }}>Courses</h1>
          <p style={{ color: '#64748b', fontWeight: 500 }}>Browse and manage academic courses.</p>
        </div>
        <button className="btn-primary" onClick={() => setShowModal(true)}>
          <Plus size={20} /> Add New Course
        </button>
      </header>

      <div style={{ position: 'relative', marginBottom: '3rem', maxWidth: '400px' }}>
        <Search size={20} style={{ position: 'absolute', left: '1.25rem', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} />
        <input 
          type="text" 
          placeholder="Search by course name or instructor..." 
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{ paddingLeft: '3.5rem', background: 'white' }}
        />
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))', gap: '2rem' }}>
        {filteredCourses.length > 0 ? filteredCourses.map(course => (
          <div key={course._id} className="premium-card" style={{ padding: '2rem', display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ 
                width: '56px', 
                height: '56px', 
                borderRadius: '16px', 
                background: 'hsla(var(--primary), 0.1)', 
                color: 'hsl(var(--primary))',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <BookOpen size={28} />
              </div>
              <div style={{ display: 'flex', gap: '0.5rem' }}>
                <button onClick={() => handleEdit(course)} style={{ padding: '0.5rem', borderRadius: '0.75rem', background: '#f8fafc', border: '1px solid #e2e8f0', color: '#64748b', cursor: 'pointer' }}>
                  <Edit2 size={16} />
                </button>
                <button onClick={() => handleDelete(course._id)} style={{ padding: '0.5rem', borderRadius: '0.75rem', background: '#f8fafc', border: '1px solid #e2e8f0', color: '#64748b', cursor: 'pointer' }}>
                  <Trash2 size={16} />
                </button>
              </div>
            </div>

            <div>
              <h3 style={{ fontSize: '1.35rem', fontWeight: 800, color: '#0f172a', marginBottom: '1rem' }}>{course.courseName}</h3>
              <div style={{ display: 'flex', gap: '1.5rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#64748b', fontSize: '0.9rem', fontWeight: 500 }}>
                  <Clock size={16} /> {course.duration || 'Flexible'}
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#64748b', fontSize: '0.9rem', fontWeight: 500 }}>
                  <User size={16} /> {course.instructor || 'TBA'}
                </div>
              </div>
            </div>

            <div style={{ 
              marginTop: 'auto', 
              paddingTop: '1.5rem', 
              borderTop: '1px solid #f1f5f9',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}>
              <span style={{ fontSize: '0.85rem', fontWeight: 600, color: '#94a3b8' }}>Enrolled: 0 Students</span>
              <button style={{ color: 'hsl(var(--primary))', background: 'none', border: 'none', fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                Manage <ArrowRight size={18} />
              </button>
            </div>
          </div>
        )) : (
          <div style={{ gridColumn: '1 / -1', padding: '6rem 0', textAlign: 'center', color: '#94a3b8' }}>
            <BookOpen size={64} style={{ marginBottom: '1.5rem', opacity: 0.1 }} />
            <p>No courses found matching your search.</p>
          </div>
        )}
      </div>

      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="premium-card animate-slide-up" style={{ width: '100%', maxWidth: '500px', padding: '3rem', position: 'relative' }} onClick={e => e.stopPropagation()}>
            <button onClick={() => setShowModal(false)} style={{ position: 'absolute', right: '1.5rem', top: '1.5rem', background: 'none', border: 'none', color: '#94a3b8', cursor: 'pointer' }}>
              <X size={24} />
            </button>
            <h2 style={{ marginBottom: '2.5rem', fontSize: '1.75rem', fontWeight: 800 }}>{editingCourse ? 'Edit Course' : 'Create New Course'}</h2>
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.9rem', fontWeight: 600, color: '#475569', marginBottom: '0.5rem' }}>Course Title</label>
                <input type="text" required value={formData.courseName} onChange={(e) => setFormData({...formData, courseName: e.target.value})} placeholder="e.g. Advanced UI Design" />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '0.9rem', fontWeight: 600, color: '#475569', marginBottom: '0.5rem' }}>Duration</label>
                <input type="text" value={formData.duration} onChange={(e) => setFormData({...formData, duration: e.target.value})} placeholder="e.g. 12 Weeks" />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '0.9rem', fontWeight: 600, color: '#475569', marginBottom: '0.5rem' }}>Primary Instructor</label>
                <input type="text" value={formData.instructor} onChange={(e) => setFormData({...formData, instructor: e.target.value})} placeholder="e.g. Dr. Emily Chen" />
              </div>
              <button type="submit" className="btn-primary" style={{ marginTop: '1.5rem', width: '100%', justifyContent: 'center' }}>
                {editingCourse ? 'Save Changes' : 'Create Course'}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Courses;
