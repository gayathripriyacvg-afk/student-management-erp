import React, { useState, useEffect } from 'react';
import { getStudents, addStudent, deleteStudent, updateStudent } from '../services/api';
import { Plus, Trash2, Edit2, Search, X, User, Users, GraduationCap } from 'lucide-react';

const Students = () => {
  const [students, setStudents] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [editingStudent, setEditingStudent] = useState(null);
  const [formData, setFormData] = useState({ name: '', email: '', age: '', course: '' });

  useEffect(() => { fetchStudents(); }, []);

  const fetchStudents = async () => {
    try {
      const response = await getStudents();
      setStudents(response.data);
    } catch (error) { console.error("Error fetching students:", error); }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingStudent) { await updateStudent(editingStudent._id, formData); }
      else { await addStudent(formData); }
      setShowModal(false); setEditingStudent(null);
      setFormData({ name: '', email: '', age: '', course: '' });
      fetchStudents();
    } catch (error) { console.error("Error saving student:", error); }
  };

  const filteredStudents = students.filter(s => 
    s.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    s.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="animate-in">
      <header style={{ marginBottom: 'var(--space-lg)', display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: '1rem' }}>
        <div>
          <h1>Students</h1>
          <p style={{ color: 'hsl(var(--text-muted))', fontWeight: 500 }}>Manage directory and enrollment records.</p>
        </div>
        <button className="btn-primary" onClick={() => setShowModal(true)}>
          <Plus size={20} /> Add Student
        </button>
      </header>

      <div className="premium-card" style={{ padding: '0', overflow: 'hidden' }}>
        <div style={{ padding: 'var(--space-md)', borderBottom: '1px solid hsl(var(--card-border))', display: 'flex', flexWrap: 'wrap', gap: '1rem', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ position: 'relative', width: '100%', maxWidth: '350px' }}>
            <Search size={18} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'hsl(var(--text-muted))' }} />
            <input type="text" placeholder="Search records..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} style={{ paddingLeft: '3rem' }} />
          </div>
          <div style={{ fontSize: '0.85rem', fontWeight: 600, color: 'hsl(var(--text-muted))' }}>
            {filteredStudents.length} Students listed
          </div>
        </div>

        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', minWidth: '700px' }}>
            <thead>
              <tr style={{ background: 'hsl(var(--secondary))', borderBottom: '1px solid hsl(var(--card-border))' }}>
                <th style={{ padding: '1rem var(--space-md)', color: 'hsl(var(--text-muted))', fontWeight: 700, fontSize: '0.75rem', textTransform: 'uppercase' }}>Identity</th>
                <th style={{ padding: '1rem var(--space-md)', color: 'hsl(var(--text-muted))', fontWeight: 700, fontSize: '0.75rem', textTransform: 'uppercase' }}>Course</th>
                <th style={{ padding: '1rem var(--space-md)', color: 'hsl(var(--text-muted))', fontWeight: 700, fontSize: '0.75rem', textTransform: 'uppercase' }}>Age</th>
                <th style={{ padding: '1rem var(--space-md)', color: 'hsl(var(--text-muted))', fontWeight: 700, fontSize: '0.75rem', textTransform: 'uppercase', textAlign: 'right' }}>Management</th>
              </tr>
            </thead>
            <tbody>
              {filteredStudents.length > 0 ? filteredStudents.map(student => (
                <tr key={student._id} style={{ borderBottom: '1px solid hsl(var(--background))' }}>
                  <td style={{ padding: '1.25rem var(--space-md)' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
                      <div style={{ width: '36px', height: '36px', borderRadius: '10px', background: 'hsl(var(--secondary))', color: 'hsl(var(--text-muted))', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <User size={18} />
                      </div>
                      <div>
                        <div style={{ fontWeight: 700, fontSize: '0.95rem' }}>{student.name}</div>
                        <div style={{ fontSize: '0.8rem', color: 'hsl(var(--text-muted))' }}>{student.email}</div>
                      </div>
                    </div>
                  </td>
                  <td style={{ padding: '1.25rem var(--space-md)' }}>
                    <span style={{ padding: '0.35rem 0.85rem', borderRadius: '2rem', background: 'hsla(var(--primary), 0.08)', color: 'hsl(var(--primary))', fontSize: '0.8rem', fontWeight: 700, display: 'inline-flex', alignItems: 'center', gap: '0.4rem' }}>
                      <GraduationCap size={14} /> {student.course || 'None'}
                    </span>
                  </td>
                  <td style={{ padding: '1.25rem var(--space-md)', fontWeight: 500, color: 'hsl(var(--text-muted))' }}>{student.age || '-'}</td>
                  <td style={{ padding: '1.25rem var(--space-md)', textAlign: 'right' }}>
                    <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'flex-end' }}>
                      <button onClick={() => { setEditingStudent(student); setFormData({name: student.name, email: student.email, age: student.age || '', course: student.course || ''}); setShowModal(true); }} style={{ padding: '0.5rem', borderRadius: '0.75rem', border: '1px solid hsl(var(--card-border))', background: 'white', color: 'hsl(var(--text-muted))', cursor: 'pointer' }}>
                        <Edit2 size={16} />
                      </button>
                      <button onClick={async () => { if(window.confirm("Delete student?")) { await deleteStudent(student._id); fetchStudents(); } }} style={{ padding: '0.5rem', borderRadius: '0.75rem', border: '1px solid hsl(var(--card-border))', background: 'white', color: '#ef4444', cursor: 'pointer' }}>
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              )) : (
                <tr>
                  <td colSpan="4" style={{ padding: 'var(--space-xl) 0', textAlign: 'center', color: 'hsl(var(--text-muted))' }}>
                    <Users size={48} style={{ opacity: 0.1, marginBottom: '1rem' }} />
                    <p>No records found.</p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="premium-card animate-in" style={{ width: '100%', maxWidth: '480px', padding: 'var(--space-lg)', position: 'relative' }} onClick={e => e.stopPropagation()}>
            <button onClick={() => setShowModal(false)} style={{ position: 'absolute', right: '1.25rem', top: '1.25rem', background: 'none', border: 'none', color: 'hsl(var(--text-muted))', cursor: 'pointer' }}>
              <X size={24} />
            </button>
            <h2 style={{ marginBottom: '2rem' }}>{editingStudent ? 'Edit Student' : 'New Enrollment'}</h2>
            <form onSubmit={handleSubmit} style={{ display: 'grid', gap: '1.25rem' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, marginBottom: '0.5rem' }}>Full Name</label>
                <input type="text" required value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} placeholder="Alex" />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, marginBottom: '0.5rem' }}>Email Address</label>
                <input type="email" required value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} placeholder="alex@edu.com" />
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.25rem' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, marginBottom: '0.5rem' }}>Age</label>
                  <input type="number" value={formData.age} onChange={(e) => setFormData({...formData, age: e.target.value})} />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, marginBottom: '0.5rem' }}>Course</label>
                  <input type="text" value={formData.course} onChange={(e) => setFormData({...formData, course: e.target.value})} />
                </div>
              </div>
              <button type="submit" className="btn-primary" style={{ marginTop: '1rem', width: '100%' }}>
                {editingStudent ? 'Update Record' : 'Create Record'}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Students;
