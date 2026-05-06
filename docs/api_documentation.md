# 🔌 API Documentation

All API endpoints are prefixed with the base URL (default: `http://localhost:5000`).

## 🎓 Students

- `GET /students`: Fetch all students.
- `POST /students`: Add a new student.
  - Body: `{ name, email, age, course }`
- `PUT /students/:id`: Update an existing student.
- `DELETE /students/:id`: Remove a student.

## 📚 Courses

- `GET /courses`: Fetch all courses.
- `POST /courses`: Add a new course.
  - Body: `{ courseName, duration, instructor }`
- `PUT /courses/:id`: Update a course.
- `DELETE /courses/:id`: Remove a course.

## 📝 Marks

- `GET /marks/:studentId`: Fetch all marks for a specific student.
- `POST /marks`: Add marks for a subject.
  - Body: `{ studentId, subject, marks }`
- `PUT /marks/:id`: Update marks.
- `DELETE /marks/:id`: Remove marks.
