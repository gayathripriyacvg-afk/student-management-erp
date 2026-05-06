import axios from 'axios';

const API_URL = 'http://localhost:5000';

const api = axios.create({
  baseURL: API_URL
});

export const getStudents = () => api.get('/students');
export const addStudent = (student) => api.post('/students', student);
export const updateStudent = (id, student) => api.put(`/students/${id}`, student);
export const deleteStudent = (id) => api.delete(`/students/${id}`);

export const getCourses = () => api.get('/courses');
export const addCourse = (course) => api.post('/courses', course);
export const updateCourse = (id, course) => api.put(`/courses/${id}`, course);
export const deleteCourse = (id) => api.delete(`/courses/${id}`);

export const getMarks = (studentId) => api.get(`/marks/${studentId}`);
export const addMarks = (marks) => api.post('/marks', marks);
export const updateMarks = (id, marks) => api.put(`/marks/${id}`, marks);
export const deleteMarks = (id) => api.delete(`/marks/${id}`);

export default api;
