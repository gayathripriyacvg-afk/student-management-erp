const mongoose = require('mongoose');

const MarksSchema = new mongoose.Schema({
  studentId: { type: mongoose.Schema.Types.ObjectId, ref: "Student", required: true },
  subject: { type: String, required: true },
  marks: { type: Number, required: true }
});

module.exports = mongoose.model('Marks', MarksSchema);
