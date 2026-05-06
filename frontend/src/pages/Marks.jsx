import React, { useState, useEffect } from 'react';
import { getStudents, getMarks, addMarks, deleteMarks, updateMarks } from '../services/api';
import { Plus, Trash2, Edit2, User, Award, Book, X, Search, ChevronRight } from 'lucide-react';

const Marks = () => {
  const [students, setStudents] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [marks, setMarks] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [editingMarks, setEditingMarks] = useState(null);
  const [formData, setFormData] = useState({ subject: '', marks: '' });

  useEffect(() => { fetchStudents(); }, []);
  useEffect(() => { if (selectedStudent) fetchMarks(selectedStudent._id); }, [selectedStudent]);

  const fetchStudents = async () => {
    try {
      const response = await getStudents();
      setStudents(response.data);
    } catch (error) { console.error("Error fetching students:", error); }
  };

  const fetchMarks = async (studentId) => {
    try {
      const response = await getMarks(studentId);
      setMarks(response.data);
    } catch (error) { console.error("Error fetching marks:", error); }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingMarks) { await updateMarks(editingMarks._id, formData); }
      else { await addMarks({ ...formData, studentId: selectedStudent._id }); }
      setShowModal(false); setEditingMarks(null);
      setFormData({ subject: '', marks: '' });
      fetchMarks(selectedStudent._id);
    } catch (error) { console.error("Error saving marks:", error); }
  };

  const filteredStudents = students.filter(s => s.name.toLowerCase().includes(searchTerm.toLowerCase()));

  return (
    <div className="animate-slide-up" style={{ display: 'grid', gridTemplateColumns: '350px 1fr', gap: '3rem' }}>
      <div className="premium-card" style={{ padding: '2rem', height: 'fit-content' }}>
        <h2 style={{ fontSize: '1.25rem', fontWeight: 800, marginBottom: '1.5rem', color: '#0f172a' }}>Select Student</h2>
        <div style={{ position: 'relative', marginBottom: '1.5rem' }}>
          <Search size={18} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} />
          <input 
            type="text" 
            placeholder="Search students..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{ paddingLeft: '3rem', fontSize: '0.9rem', background: '#f8fafc' }}
          />
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', maxHeight: '500px', overflowY: 'auto' }}>
          {filteredStudents.map(s => (
            <button
              key={s._id}
              onClick={() => setSelectedStudent(s)}
              style={{
                textAlign: 'left',
                padding: '1rem 1.25rem',
                borderRadius: '1rem',
                background: selectedStudent?._id === s._id ? 'hsla(var(--primary), 0.08)' : 'transparent',
                border: selectedStudent?._id === s._id ? '1px solid hsla(var(--primary), 0.1)' : '1px solid #f1f5f9',
                color: selectedStudent?._id === s._id ? 'hsl(var(--primary))' : '#475569',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
              }}
            >
              <div>
                <div style={{ fontWeight: 700, fontSize: '0.95rem' }}>{s.name}</div>
                <div style={{ fontSize: '0.75rem', opacity: 0.7 }}>{s.course || 'No course'}</div>
              </div>
              <ChevronRight size={18} style={{ opacity: selectedStudent?._id === s._id ? 1 : 0, transition: 'opacity 0.3s' }} />
            </button>
          ))}
        </div>
      </div>

      <div>
        {selectedStudent ? (
          <div className="animate-slide-up">
            <header style={{ marginBottom: '3rem', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
              <div>
                <h1 style={{ fontSize: '2.5rem', fontWeight: 800, color: '#0f172a' }}>{selectedStudent.name}</h1>
                <p style={{ color: '#64748b', fontWeight: 500 }}>Academic Gradebook & Performance</p>
              </div>
              <button className="btn-primary" onClick={() => setShowModal(true)}>
                <Plus size={20} /> Add Subject Marks
              </button>
            </header>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: '1.5rem' }}>
              {marks.map(m => (
                <div key={m._id} className="premium-card" style={{ padding: '2rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
                    <div style={{ padding: '0.75rem', background: '#f8fafc', borderRadius: '12px', color: '#64748b' }}>
                      <Book size={20} />
                    </div>
                    <div style={{ display: 'flex', gap: '0.5rem' }}>
                      <button onClick={() => { setEditingMarks(m); setFormData({subject: m.subject, marks: m.marks}); setShowModal(true); }} style={{ background: 'none', border: 'none', color: '#94a3b8', cursor: 'pointer' }}>
                        <Edit2 size={16} />
                      </button>
                      <button onClick={async () => { if(window.confirm("Delete?")) { await deleteMarks(m._id); fetchMarks(selectedStudent._id); } }} style={{ background: 'none', border: 'none', color: '#94a3b8', cursor: 'pointer' }}>
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                  <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#0f172a', marginBottom: '0.5rem' }}>{m.subject}</h3>
                  <div style={{ fontSize: '2rem', fontWeight: 800, color: m.marks >= 80 ? '#10b981' : m.marks >= 50 ? '#f59e0b' : '#ef4444' }}>
                    {m.marks}<span style={{ fontSize: '0.9rem', color: '#94a3b8', fontWeight: 600 }}>/100</span>
                  </div>
                  <div style={{ marginTop: '1rem', height: '6px', background: '#f1f5f9', borderRadius: '3px', overflow: 'hidden' }}>
                    <div style={{ width: `${m.marks}%`, height: '100%', background: m.marks >= 80 ? '#10b981' : m.marks >= 50 ? '#f59e0b' : '#ef4444', borderRadius: '3px' }}></div>
                  </div>
                </div>
              ))}
              {marks.length === 0 && (
                <div style={{ gridColumn: '1 / -1', padding: '6rem 0', textAlign: 'center', color: '#94a3b8', background: 'white', borderRadius: '1.5rem', border: '2px dashed #e2e8f0' }}>
                  <Award size={64} style={{ marginBottom: '1rem', opacity: 0.1 }} />
                  <p>No grades recorded for this student yet.</p>
                </div>
              )}
            </div>
          </div>
        ) : (
          <div className="premium-card" style={{ height: '500px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: '3rem' }}>
            <div style={{ width: '80px', height: '80px', borderRadius: '24px', background: '#f8fafc', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#cbd5e1', marginBottom: '2rem' }}>
              <User size={40} />
            </div>
            <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#0f172a', marginBottom: '1rem' }}>No Student Selected</h2>
            <p style={{ color: '#64748b', maxWidth: '300px' }}>Please choose a student from the list on the left to view their academic records.</p>
          </div>
        )}
      </div>

      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="premium-card animate-slide-up" style={{ width: '100%', maxWidth: '450px', padding: '3rem', position: 'relative' }} onClick={e => e.stopPropagation()}>
            <button onClick={() => setShowModal(false)} style={{ position: 'absolute', right: '1.5rem', top: '1.5rem', background: 'none', border: 'none', color: '#94a3b8', cursor: 'pointer' }}>
              <X size={24} />
            </button>
            <h2 style={{ marginBottom: '2.5rem', fontSize: '1.75rem', fontWeight: 800 }}>{editingMarks ? 'Edit Grade' : 'Add Subject Grade'}</h2>
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.9rem', fontWeight: 600, color: '#475569', marginBottom: '0.5rem' }}>Subject Name</label>
                <input type="text" required value={formData.subject} onChange={(e) => setFormData({...formData, subject: e.target.value})} placeholder="e.g. Mathematics" />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '0.9rem', fontWeight: 600, color: '#475569', marginBottom: '0.5rem' }}>Score (0-100)</label>
                <input type="number" required min="0" max="100" value={formData.marks} onChange={(e) => setFormData({...formData, marks: e.target.value})} placeholder="85" />
              </div>
              <button type="submit" className="btn-primary" style={{ marginTop: '1.5rem', width: '100%', justifyContent: 'center' }}>
                {editingMarks ? 'Update Grade' : 'Add to Gradebook'}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Marks;
