import React, { useState, useEffect } from 'react';
import { getStudents, addStudent, deleteStudent, updateStudent } from '../services/api';
import { Plus, Trash2, Edit2, Search, X, User, Users, Mail, GraduationCap } from 'lucide-react';

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

  const handleEdit = (student) => {
    setEditingStudent(student);
    setFormData({ name: student.name, email: student.email, age: student.age || '', course: student.course || '' });
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure?")) {
      try { await deleteStudent(id); fetchStudents(); }
      catch (error) { console.error("Error deleting student:", error); }
    }
  };

  const filteredStudents = students.filter(s => 
    s.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    s.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="animate-slide-up">
      <header style={{ marginBottom: '3rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h1 style={{ fontSize: '2.5rem', fontWeight: 800, color: '#0f172a' }}>Students</h1>
          <p style={{ color: '#64748b', fontWeight: 500 }}>Manage and oversee all student records.</p>
        </div>
        <button className="btn-primary" onClick={() => setShowModal(true)}>
          <Plus size={20} /> Add New Student
        </button>
      </header>

      <div className="premium-card" style={{ padding: '0', overflow: 'hidden' }}>
        <div style={{ padding: '1.5rem', borderBottom: '1px solid #f1f5f9', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ position: 'relative', width: '100%', maxWidth: '400px' }}>
            <Search size={20} style={{ position: 'absolute', left: '1.25rem', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} />
            <input 
              type="text" 
              placeholder="Search by name or email..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{ paddingLeft: '3.5rem', background: '#f8fafc' }}
            />
          </div>
          <div style={{ color: '#64748b', fontSize: '0.9rem', fontWeight: 600 }}>
            Showing {filteredStudents.length} students
          </div>
        </div>

        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
            <thead>
              <tr style={{ background: '#f8fafc', borderBottom: '1px solid #f1f5f9' }}>
                <th style={{ padding: '1.25rem 2rem', color: '#64748b', fontWeight: 600, fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Student</th>
                <th style={{ padding: '1.25rem 2rem', color: '#64748b', fontWeight: 600, fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Course</th>
                <th style={{ padding: '1.25rem 2rem', color: '#64748b', fontWeight: 600, fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Age</th>
                <th style={{ padding: '1.25rem 2rem', color: '#64748b', fontWeight: 600, fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.05em', textAlign: 'right' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredStudents.length > 0 ? filteredStudents.map(student => (
                <tr key={student._id} style={{ borderBottom: '1px solid #f8fafc', transition: 'background 0.3s' }}>
                  <td style={{ padding: '1.25rem 2rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                      <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: '#e2e8f0', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#64748b' }}>
                        <User size={20} />
                      </div>
                      <div>
                        <div style={{ fontWeight: 700, color: '#0f172a' }}>{student.name}</div>
                        <div style={{ fontSize: '0.85rem', color: '#64748b' }}>{student.email}</div>
                      </div>
                    </div>
                  </td>
                  <td style={{ padding: '1.25rem 2rem' }}>
                    <span style={{ 
                      padding: '0.4rem 1rem', 
                      borderRadius: '2rem', 
                      background: '#eff6ff', 
                      color: '#2563eb',
                      fontSize: '0.85rem',
                      fontWeight: 600,
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '0.5rem'
                    }}>
                      <GraduationCap size={14} /> {student.course || 'Unassigned'}
                    </span>
                  </td>
                  <td style={{ padding: '1.25rem 2rem', color: '#64748b', fontWeight: 500 }}>{student.age || '-'}</td>
                  <td style={{ padding: '1.25rem 2rem', textAlign: 'right' }}>
                    <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'flex-end' }}>
                      <button onClick={() => handleEdit(student)} style={{ padding: '0.6rem', borderRadius: '0.75rem', background: '#f8fafc', border: '1px solid #e2e8f0', color: '#64748b', cursor: 'pointer', transition: 'all 0.2s' }} onMouseEnter={e => e.currentTarget.style.color = '#4f46e5'}>
                        <Edit2 size={18} />
                      </button>
                      <button onClick={() => handleDelete(student._id)} style={{ padding: '0.6rem', borderRadius: '0.75rem', background: '#f8fafc', border: '1px solid #e2e8f0', color: '#64748b', cursor: 'pointer', transition: 'all 0.2s' }} onMouseEnter={e => e.currentTarget.style.color = '#ef4444'}>
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              )) : (
                <tr>
                  <td colSpan="4" style={{ padding: '6rem 0', textAlign: 'center', color: '#94a3b8' }}>
                    <Users size={48} style={{ marginBottom: '1rem', opacity: 0.2 }} />
                    <p>No students found.</p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="premium-card animate-slide-up" style={{ width: '100%', maxWidth: '500px', padding: '3rem', position: 'relative' }} onClick={e => e.stopPropagation()}>
            <button onClick={() => setShowModal(false)} style={{ position: 'absolute', right: '1.5rem', top: '1.5rem', background: 'none', border: 'none', color: '#94a3b8', cursor: 'pointer' }}>
              <X size={24} />
            </button>
            <h2 style={{ marginBottom: '2.5rem', fontSize: '1.75rem', fontWeight: 800, color: '#0f172a' }}>{editingStudent ? 'Edit Student' : 'Add New Student'}</h2>
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.9rem', fontWeight: 600, color: '#475569', marginBottom: '0.5rem' }}>Full Name</label>
                <input type="text" required value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} placeholder="e.g. Alex Rivera" />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '0.9rem', fontWeight: 600, color: '#475569', marginBottom: '0.5rem' }}>Email</label>
                <input type="email" required value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} placeholder="alex@university.com" />
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.9rem', fontWeight: 600, color: '#475569', marginBottom: '0.5rem' }}>Age</label>
                  <input type="number" value={formData.age} onChange={(e) => setFormData({...formData, age: e.target.value})} placeholder="20" />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.9rem', fontWeight: 600, color: '#475569', marginBottom: '0.5rem' }}>Course</label>
                  <input type="text" value={formData.course} onChange={(e) => setFormData({...formData, course: e.target.value})} placeholder="e.g. Computer Science" />
                </div>
              </div>
              <button type="submit" className="btn-primary" style={{ marginTop: '1.5rem', width: '100%', justifyContent: 'center' }}>
                {editingStudent ? 'Update Details' : 'Confirm & Add Student'}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Students;
