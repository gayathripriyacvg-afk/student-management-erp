import React, { useState, useEffect } from 'react';
import { getStudents, addStudent, deleteStudent, updateStudent } from '../services/api';
import { Plus, Trash2, Edit2, Search, X } from 'lucide-react';

const Students = () => {
  const [students, setStudents] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [editingStudent, setEditingStudent] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    age: '',
    course: ''
  });

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    try {
      const response = await getStudents();
      setStudents(response.data);
    } catch (error) {
      console.error("Error fetching students:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingStudent) {
        await updateStudent(editingStudent._id, formData);
      } else {
        await addStudent(formData);
      }
      setShowModal(false);
      setEditingStudent(null);
      setFormData({ name: '', email: '', age: '', course: '' });
      fetchStudents();
    } catch (error) {
      console.error("Error saving student:", error);
    }
  };

  const handleEdit = (student) => {
    setEditingStudent(student);
    setFormData({
      name: student.name,
      email: student.email,
      age: student.age || '',
      course: student.course || ''
    });
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this student?")) {
      try {
        await deleteStudent(id);
        fetchStudents();
      } catch (error) {
        console.error("Error deleting student:", error);
      }
    }
  };

  const filteredStudents = students.filter(s => 
    s.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    s.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    s.course?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="animate-fade-in">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2.5rem' }}>
        <h1 style={{ fontSize: '2.5rem', fontWeight: 700 }}>Students</h1>
        <button className="btn-primary" onClick={() => setShowModal(true)} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <Plus size={20} /> Add Student
        </button>
      </div>

      <div className="glass-card" style={{ padding: '1.5rem', borderRadius: '1rem' }}>
        <div style={{ position: 'relative', marginBottom: '2rem', maxWidth: '400px' }}>
          <Search size={20} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'rgba(255,255,255,0.4)' }} />
          <input 
            type="text" 
            placeholder="Search students..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{ width: '100%', paddingLeft: '3rem' }}
          />
        </div>

        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
          <thead>
            <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
              <th style={{ padding: '1rem', color: 'rgba(255,255,255,0.6)', fontWeight: 500 }}>Name</th>
              <th style={{ padding: '1rem', color: 'rgba(255,255,255,0.6)', fontWeight: 500 }}>Email</th>
              <th style={{ padding: '1rem', color: 'rgba(255,255,255,0.6)', fontWeight: 500 }}>Course</th>
              <th style={{ padding: '1rem', color: 'rgba(255,255,255,0.6)', fontWeight: 500 }}>Age</th>
              <th style={{ padding: '1rem', color: 'rgba(255,255,255,0.6)', fontWeight: 500, textAlign: 'right' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredStudents.length > 0 ? filteredStudents.map(student => (
              <tr key={student._id} style={{ borderBottom: '1px solid rgba(255,255,255,0.05)', transition: 'background 0.3s ease' }}>
                <td style={{ padding: '1rem', fontWeight: 500 }}>{student.name}</td>
                <td style={{ padding: '1rem', opacity: 0.8 }}>{student.email}</td>
                <td style={{ padding: '1rem' }}>
                  <span style={{ 
                    padding: '0.25rem 0.75rem', 
                    borderRadius: '2rem', 
                    background: 'rgba(255,255,255,0.05)', 
                    fontSize: '0.85rem',
                    border: '1px solid rgba(255,255,255,0.1)'
                  }}>
                    {student.course || 'N/A'}
                  </span>
                </td>
                <td style={{ padding: '1rem', opacity: 0.8 }}>{student.age || '-'}</td>
                <td style={{ padding: '1rem', textAlign: 'right' }}>
                  <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'flex-end' }}>
                    <button onClick={() => handleEdit(student)} style={{ background: 'transparent', border: 'none', color: 'hsl(var(--primary))', cursor: 'pointer', padding: '0.5rem' }}>
                      <Edit2 size={18} />
                    </button>
                    <button onClick={() => handleDelete(student._id)} style={{ background: 'transparent', border: 'none', color: '#f43f5e', cursor: 'pointer', padding: '0.5rem' }}>
                      <Trash2 size={18} />
                    </button>
                  </div>
                </td>
              </tr>
            )) : (
              <tr>
                <td colSpan="5" style={{ padding: '4rem', textAlign: 'center', color: 'rgba(255,255,255,0.4)' }}>
                  {searchTerm ? "No students found matching your search." : "No students added yet."}
                </td>
              </tr>
            )}
          </tbody>
        </table>
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
              onClick={() => { setShowModal(false); setEditingStudent(null); }}
              style={{ position: 'absolute', right: '1.5rem', top: '1.5rem', background: 'transparent', border: 'none', color: 'white', cursor: 'pointer' }}
            >
              <X size={24} />
            </button>
            <h2 style={{ marginBottom: '2rem', fontSize: '1.8rem' }}>{editingStudent ? 'Edit Student' : 'Add New Student'}</h2>
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <label style={{ fontSize: '0.9rem', color: 'rgba(255,255,255,0.6)' }}>Full Name</label>
                <input 
                  type="text" required
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  placeholder="John Doe"
                />
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <label style={{ fontSize: '0.9rem', color: 'rgba(255,255,255,0.6)' }}>Email Address</label>
                <input 
                  type="email" required
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  placeholder="john@example.com"
                />
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  <label style={{ fontSize: '0.9rem', color: 'rgba(255,255,255,0.6)' }}>Age</label>
                  <input 
                    type="number"
                    value={formData.age}
                    onChange={(e) => setFormData({...formData, age: e.target.value})}
                    placeholder="20"
                  />
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  <label style={{ fontSize: '0.9rem', color: 'rgba(255,255,255,0.6)' }}>Course</label>
                  <input 
                    type="text"
                    value={formData.course}
                    onChange={(e) => setFormData({...formData, course: e.target.value})}
                    placeholder="Computer Science"
                  />
                </div>
              </div>
              <button type="submit" className="btn-primary" style={{ marginTop: '1rem' }}>
                {editingStudent ? 'Update Student' : 'Add Student'}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Students;
