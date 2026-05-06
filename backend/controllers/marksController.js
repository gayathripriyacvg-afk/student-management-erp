const Marks = require('../models/Marks');

exports.getMarksByStudent = async (req, res) => {
  try {
    const marks = await Marks.find({ studentId: req.params.studentId });
    res.json(marks);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.addMarks = async (req, res) => {
  const marks = new Marks(req.body);
  try {
    const newMarks = await marks.save();
    res.status(201).json(newMarks);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.updateMarks = async (req, res) => {
  try {
    const marks = await Marks.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(marks);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.deleteMarks = async (req, res) => {
  try {
    await Marks.findByIdAndDelete(req.params.id);
    res.json({ message: 'Marks deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
