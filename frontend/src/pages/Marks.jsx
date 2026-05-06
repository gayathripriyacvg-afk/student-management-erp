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
    <div className="animate-in" style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-lg)' }}>
      <header>
        <h1>Academic Performance</h1>
        <p style={{ color: 'hsl(var(--text-muted))', fontWeight: 500 }}>Track and manage student grades across subjects.</p>
      </header>

      <div className="performance-layout" style={{ display: 'grid', gridTemplateColumns: 'minmax(250px, 320px) 1fr', gap: 'var(--space-lg)', alignItems: 'start' }}>
        <div className="premium-card" style={{ padding: 'var(--space-md)', position: 'sticky', top: 'var(--space-md)' }}>
          <h2 style={{ fontSize: '1.1rem', marginBottom: '1rem' }}>Students</h2>
          <div style={{ position: 'relative', marginBottom: '1.25rem' }}>
            <Search size={16} style={{ position: 'absolute', left: '0.85rem', top: '50%', transform: 'translateY(-50%)', color: 'hsl(var(--text-muted))' }} />
            <input type="text" placeholder="Search..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} style={{ paddingLeft: '2.5rem', fontSize: '0.85rem' }} />
          </div>
          <div style={{ display: 'grid', gap: '0.5rem', maxHeight: '400px', overflowY: 'auto' }}>
            {filteredStudents.map(s => (
              <button
                key={s._id}
                onClick={() => setSelectedStudent(s)}
                style={{
                  textAlign: 'left', padding: '0.75rem 1rem', borderRadius: '0.75rem', cursor: 'pointer', transition: 'all 0.2s', border: '1px solid transparent',
                  background: selectedStudent?._id === s._id ? 'hsla(var(--primary), 0.1)' : 'transparent',
                  color: selectedStudent?._id === s._id ? 'hsl(var(--primary))' : 'hsl(var(--text-muted))',
                  fontWeight: selectedStudent?._id === s._id ? 700 : 500,
                  display: 'flex', justifyContent: 'space-between', alignItems: 'center'
                }}
              >
                <span style={{ fontSize: '0.9rem' }}>{s.name}</span>
                <ChevronRight size={16} style={{ opacity: selectedStudent?._id === s._id ? 1 : 0 }} />
              </button>
            ))}
          </div>
        </div>

        <div>
          {selectedStudent ? (
            <div className="animate-in">
              <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--space-lg)', gap: '1rem' }}>
                <div>
                  <h2 style={{ fontSize: '1.5rem' }}>{selectedStudent.name}</h2>
                  <p style={{ color: 'hsl(var(--text-muted))', fontSize: '0.9rem' }}>Gradebook Overview</p>
                </div>
                <button className="btn-primary" onClick={() => setShowModal(true)}>
                  <Plus size={18} /> Add Grade
                </button>
              </div>

              <div className="grid-responsive" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))' }}>
                {marks.map(m => (
                  <div key={m._id} className="premium-card" style={{ padding: 'var(--space-md)' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1.25rem' }}>
                      <div style={{ padding: '0.5rem', background: 'hsl(var(--secondary))', borderRadius: '10px', color: 'hsl(var(--text-muted))' }}>
                        <Book size={18} />
                      </div>
                      <div style={{ display: 'flex', gap: '0.4rem' }}>
                        <button onClick={() => { setEditingMarks(m); setFormData({subject: m.subject, marks: m.marks}); setShowModal(true); }} style={{ background: 'none', border: 'none', color: 'hsl(var(--text-muted))', cursor: 'pointer' }}>
                          <Edit2 size={14} />
                        </button>
                        <button onClick={async () => { if(window.confirm("Delete record?")) { await deleteMarks(m._id); fetchMarks(selectedStudent._id); } }} style={{ background: 'none', border: 'none', color: '#ef4444', cursor: 'pointer' }}>
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </div>
                    <h3 style={{ fontSize: '1rem', marginBottom: '0.5rem' }}>{m.subject}</h3>
                    <div style={{ fontSize: '1.75rem', fontWeight: 800, color: m.marks >= 80 ? '#10b981' : m.marks >= 50 ? '#f59e0b' : '#ef4444' }}>
                      {m.marks}<span style={{ fontSize: '0.8rem', color: 'hsl(var(--text-muted))', fontWeight: 600 }}> / 100</span>
                    </div>
                    <div style={{ marginTop: '1rem', height: '6px', background: 'hsl(var(--secondary))', borderRadius: '3px', overflow: 'hidden' }}>
                      <div style={{ width: `${m.marks}%`, height: '100%', background: m.marks >= 80 ? '#10b981' : m.marks >= 50 ? '#f59e0b' : '#ef4444' }}></div>
                    </div>
                  </div>
                ))}
                {marks.length === 0 && (
                  <div style={{ gridColumn: '1 / -1', padding: 'var(--space-xl) 0', textAlign: 'center', border: '2px dashed hsl(var(--card-border))', borderRadius: '1.5rem', color: 'hsl(var(--text-muted))' }}>
                    <Award size={48} style={{ opacity: 0.1, marginBottom: '1rem' }} />
                    <p>No grades found for this student.</p>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div className="premium-card" style={{ padding: 'var(--space-xl)', textAlign: 'center', color: 'hsl(var(--text-muted))' }}>
              <User size={48} style={{ opacity: 0.1, marginBottom: '1rem' }} />
              <p>Select a student to manage their academic performance.</p>
            </div>
          )}
        </div>
      </div>

      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="premium-card animate-in" style={{ width: '100%', maxWidth: '400px', padding: 'var(--space-lg)', position: 'relative' }} onClick={e => e.stopPropagation()}>
            <button onClick={() => setShowModal(false)} style={{ position: 'absolute', right: '1.25rem', top: '1.25rem', background: 'none', border: 'none', color: 'hsl(var(--text-muted))', cursor: 'pointer' }}>
              <X size={24} />
            </button>
            <h2 style={{ marginBottom: '2rem' }}>{editingMarks ? 'Edit Score' : 'Add Score'}</h2>
            <form onSubmit={handleSubmit} style={{ display: 'grid', gap: '1.25rem' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, marginBottom: '0.5rem' }}>Subject</label>
                <input type="text" required value={formData.subject} onChange={(e) => setFormData({...formData, subject: e.target.value})} placeholder="e.g. History" />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, marginBottom: '0.5rem' }}>Marks (0-100)</label>
                <input type="number" required min="0" max="100" value={formData.marks} onChange={(e) => setFormData({...formData, marks: e.target.value})} placeholder="80" />
              </div>
              <button type="submit" className="btn-primary" style={{ marginTop: '1rem', width: '100%' }}>
                {editingMarks ? 'Save Grade' : 'Add Grade'}
              </button>
            </form>
          </div>
        </div>
      )}

      <style>{`
        @media (max-width: 768px) {
          .performance-layout { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
};

export default Marks;
