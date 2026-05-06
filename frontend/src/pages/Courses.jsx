import React, { useState, useEffect } from 'react';
import { getCourses, addCourse, deleteCourse, updateCourse } from '../services/api';
import { Plus, Trash2, Edit2, Search, X, BookOpen, Clock, User } from 'lucide-react';

const Courses = () => {
  const [courses, setCourses] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [editingCourse, setEditingCourse] = useState(null);
  const [formData, setFormData] = useState({
    courseName: '',
    duration: '',
    instructor: ''
  });

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      const response = await getCourses();
      setCourses(response.data);
    } catch (error) {
      console.error("Error fetching courses:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingCourse) {
        await updateCourse(editingCourse._id, formData);
      } else {
        await addCourse(formData);
      }
      setShowModal(false);
      setEditingCourse(null);
      setFormData({ courseName: '', duration: '', instructor: '' });
      fetchCourses();
    } catch (error) {
      console.error("Error saving course:", error);
    }
  };

  const handleEdit = (course) => {
    setEditingCourse(course);
    setFormData({
      courseName: course.courseName,
      duration: course.duration || '',
      instructor: course.instructor || ''
    });
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this course?")) {
      try {
        await deleteCourse(id);
        fetchCourses();
      } catch (error) {
        console.error("Error deleting course:", error);
      }
    }
  };

  const filteredCourses = courses.filter(c => 
    c.courseName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.instructor?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="animate-fade-in">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2.5rem' }}>
        <h1 style={{ fontSize: '2.5rem', fontWeight: 700 }}>Courses</h1>
        <button className="btn-primary" onClick={() => setShowModal(true)} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <Plus size={20} /> Add Course
        </button>
      </div>

      <div style={{ position: 'relative', marginBottom: '2.5rem', maxWidth: '400px' }}>
        <Search size={20} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'rgba(255,255,255,0.4)' }} />
        <input 
          type="text" 
          placeholder="Search courses..." 
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{ width: '100%', paddingLeft: '3rem' }}
        />
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '2rem' }}>
        {filteredCourses.length > 0 ? filteredCourses.map(course => (
          <div key={course._id} className="glass-card" style={{ padding: '1.5rem', borderRadius: '1.25rem', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div style={{ background: 'hsla(var(--primary), 0.1)', color: 'hsl(var(--primary))', padding: '0.75rem', borderRadius: '0.75rem' }}>
                <BookOpen size={24} />
              </div>
              <div style={{ display: 'flex', gap: '0.5rem' }}>
                <button onClick={() => handleEdit(course)} style={{ background: 'transparent', border: 'none', color: 'rgba(255,255,255,0.4)', cursor: 'pointer', transition: 'color 0.3s' }}>
                  <Edit2 size={18} />
                </button>
                <button onClick={() => handleDelete(course._id)} style={{ background: 'transparent', border: 'none', color: 'rgba(255,255,255,0.4)', cursor: 'pointer', transition: 'color 0.3s' }}>
                  <Trash2 size={18} />
                </button>
              </div>
            </div>

            <div>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 600, marginBottom: '0.5rem' }}>{course.courseName}</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginTop: '1rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', color: 'rgba(255,255,255,0.6)', fontSize: '0.9rem' }}>
                  <Clock size={16} />
                  <span>{course.duration || 'Flexible duration'}</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', color: 'rgba(255,255,255,0.6)', fontSize: '0.9rem' }}>
                  <User size={16} />
                  <span>{course.instructor || 'Staff'}</span>
                </div>
              </div>
            </div>

            <button className="btn-primary" style={{ marginTop: '0.5rem', background: 'rgba(255,255,255,0.05)', color: 'white', border: '1px solid rgba(255,255,255,0.1)' }}>
              View Details
            </button>
          </div>
        )) : (
          <div style={{ gridColumn: '1 / -1', padding: '5rem', textAlign: 'center', color: 'rgba(255,255,255,0.4)' }}>
            No courses found.
          </div>
        )}
      </div>

      {showModal && (
        <div style={{ 
          position: 'fixed', 
          top: 0, left: 0, width: '100%', height: '100%', 
          background: 'rgba(0,0,0,0.8)', backdropFilter: 'blur(4px)',
          display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000
        }}>
          <div className="glass-card animate-fade-in" style={{ width: '100%', maxWidth: '500px', padding: '2.5rem', borderRadius: '1.5rem', position: 'relative' }}>
            <button 
              onClick={() => { setShowModal(false); setEditingCourse(null); }}
              style={{ position: 'absolute', right: '1.5rem', top: '1.5rem', background: 'transparent', border: 'none', color: 'white', cursor: 'pointer' }}
            >
              <X size={24} />
            </button>
            <h2 style={{ marginBottom: '2rem', fontSize: '1.8rem' }}>{editingCourse ? 'Edit Course' : 'Add New Course'}</h2>
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <label style={{ fontSize: '0.9rem', color: 'rgba(255,255,255,0.6)' }}>Course Name</label>
                <input 
                  type="text" required
                  value={formData.courseName}
                  onChange={(e) => setFormData({...formData, courseName: e.target.value})}
                  placeholder="Mastering React"
                />
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <label style={{ fontSize: '0.9rem', color: 'rgba(255,255,255,0.6)' }}>Duration</label>
                <input 
                  type="text"
                  value={formData.duration}
                  onChange={(e) => setFormData({...formData, duration: e.target.value})}
                  placeholder="3 Months"
                />
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <label style={{ fontSize: '0.9rem', color: 'rgba(255,255,255,0.6)' }}>Instructor</label>
                <input 
                  type="text"
                  value={formData.instructor}
                  onChange={(e) => setFormData({...formData, instructor: e.target.value})}
                  placeholder="Sarah Johnson"
                />
              </div>
              <button type="submit" className="btn-primary" style={{ marginTop: '1rem' }}>
                {editingCourse ? 'Update Course' : 'Add Course'}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Courses;
