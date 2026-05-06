import React, { useState, useEffect } from 'react';
import { getStudents, getMarks, addMarks, deleteMarks, updateMarks } from '../services/api';
import { Plus, Trash2, Edit2, User, Award, Book, X } from 'lucide-react';

const Marks = () => {
  const [students, setStudents] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [marks, setMarks] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editingMarks, setEditingMarks] = useState(null);
  const [formData, setFormData] = useState({
    subject: '',
    marks: ''
  });

  useEffect(() => {
    fetchStudents();
  }, []);

  useEffect(() => {
    if (selectedStudent) {
      fetchMarks(selectedStudent._id);
    }
  }, [selectedStudent]);

  const fetchStudents = async () => {
    try {
      const response = await getStudents();
      setStudents(response.data);
    } catch (error) {
      console.error("Error fetching students:", error);
    }
  };

  const fetchMarks = async (studentId) => {
    try {
      const response = await getMarks(studentId);
      setMarks(response.data);
    } catch (error) {
      console.error("Error fetching marks:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingMarks) {
        await updateMarks(editingMarks._id, formData);
      } else {
        await addMarks({ ...formData, studentId: selectedStudent._id });
      }
      setShowModal(false);
      setEditingMarks(null);
      setFormData({ subject: '', marks: '' });
      fetchMarks(selectedStudent._id);
    } catch (error) {
      console.error("Error saving marks:", error);
    }
  };

  const handleEdit = (m) => {
    setEditingMarks(m);
    setFormData({
      subject: m.subject,
      marks: m.marks
    });
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure?")) {
      try {
        await deleteMarks(id);
        fetchMarks(selectedStudent._id);
      } catch (error) {
        console.error("Error deleting marks:", error);
      }
    }
  };

  return (
    <div className="animate-fade-in" style={{ display: 'grid', gridTemplateColumns: '300px 1fr', gap: '3rem' }}>
      <div className="glass-card" style={{ padding: '1.5rem', borderRadius: '1rem', height: 'fit-content' }}>
        <h2 style={{ fontSize: '1.25rem', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <User size={20} /> Students
        </h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          {students.map(s => (
            <button
              key={s._id}
              onClick={() => setSelectedStudent(s)}
              style={{
                textAlign: 'left',
                padding: '1rem',
                borderRadius: '0.75rem',
                background: selectedStudent?._id === s._id ? 'hsla(var(--primary), 0.1)' : 'transparent',
                border: selectedStudent?._id === s._id ? '1px solid hsla(var(--primary), 0.2)' : '1px solid transparent',
                color: selectedStudent?._id === s._id ? 'hsl(var(--primary))' : 'white',
                cursor: 'pointer',
                transition: 'all 0.3s ease'
              }}
            >
              <div style={{ fontWeight: 600 }}>{s.name}</div>
              <div style={{ fontSize: '0.8rem', opacity: 0.6 }}>{s.email}</div>
            </button>
          ))}
          {students.length === 0 && <div style={{ opacity: 0.4, padding: '2rem', textAlign: 'center' }}>No students found.</div>}
        </div>
      </div>

      <div>
        {selectedStudent ? (
          <div className="animate-fade-in">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2.5rem' }}>
              <div>
                <h1 style={{ fontSize: '2.5rem', fontWeight: 700 }}>{selectedStudent.name}</h1>
                <p style={{ color: 'rgba(255,255,255,0.6)' }}>Academic Performance</p>
              </div>
              <button className="btn-primary" onClick={() => setShowModal(true)} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Plus size={20} /> Add Marks
              </button>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '1.5rem', marginBottom: '3rem' }}>
              {marks.map(m => (
                <div key={m._id} className="glass-card" style={{ padding: '1.5rem', borderRadius: '1rem', position: 'relative' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
                    <Book size={20} style={{ color: 'hsl(var(--primary))' }} />
                    <div style={{ display: 'flex', gap: '0.5rem' }}>
                      <button onClick={() => handleEdit(m)} style={{ background: 'transparent', border: 'none', color: 'rgba(255,255,255,0.4)', cursor: 'pointer' }}>
                        <Edit2 size={14} />
                      </button>
                      <button onClick={() => handleDelete(m._id)} style={{ background: 'transparent', border: 'none', color: 'rgba(255,255,255,0.4)', cursor: 'pointer' }}>
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </div>
                  <h3 style={{ fontSize: '1rem', marginBottom: '0.25rem' }}>{m.subject}</h3>
                  <div style={{ fontSize: '1.5rem', fontWeight: 700, color: m.marks >= 80 ? '#10b981' : m.marks >= 50 ? '#f59e0b' : '#f43f5e' }}>
                    {m.marks} <span style={{ fontSize: '0.9rem', fontWeight: 400, opacity: 0.5 }}>/ 100</span>
                  </div>
                </div>
              ))}
              {marks.length === 0 && (
                <div style={{ gridColumn: '1 / -1', padding: '4rem', textAlign: 'center', color: 'rgba(255,255,255,0.4)', background: 'rgba(255,255,255,0.02)', borderRadius: '1rem' }}>
                  No marks recorded for this student.
                </div>
              )}
            </div>
          </div>
        ) : (
          <div style={{ height: '400px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', color: 'rgba(255,255,255,0.3)' }}>
            <Award size={64} style={{ marginBottom: '1.5rem', opacity: 0.2 }} />
            <p>Select a student from the sidebar to view and manage marks.</p>
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
          <div className="glass-card animate-fade-in" style={{ width: '100%', maxWidth: '400px', padding: '2.5rem', borderRadius: '1.5rem', position: 'relative' }}>
            <button 
              onClick={() => { setShowModal(false); setEditingMarks(null); }}
              style={{ position: 'absolute', right: '1.5rem', top: '1.5rem', background: 'transparent', border: 'none', color: 'white', cursor: 'pointer' }}
            >
              <X size={24} />
            </button>
            <h2 style={{ marginBottom: '2rem', fontSize: '1.8rem' }}>{editingMarks ? 'Edit Marks' : 'Add Marks'}</h2>
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <label style={{ fontSize: '0.9rem', color: 'rgba(255,255,255,0.6)' }}>Subject</label>
                <input 
                  type="text" required
                  value={formData.subject}
                  onChange={(e) => setFormData({...formData, subject: e.target.value})}
                  placeholder="Mathematics"
                />
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <label style={{ fontSize: '0.9rem', color: 'rgba(255,255,255,0.6)' }}>Marks (out of 100)</label>
                <input 
                  type="number" required min="0" max="100"
                  value={formData.marks}
                  onChange={(e) => setFormData({...formData, marks: e.target.value})}
                  placeholder="85"
                />
              </div>
              <button type="submit" className="btn-primary" style={{ marginTop: '1rem' }}>
                {editingMarks ? 'Update Marks' : 'Add Marks'}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Marks;
