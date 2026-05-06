const mongoose = require('mongoose');

const CourseSchema = new mongoose.Schema({
  courseName: { type: String, required: true },
  duration: String,
  instructor: String
});

module.exports = mongoose.model('Course', CourseSchema);
