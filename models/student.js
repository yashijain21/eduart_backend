// models/Student.js
const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: String,
  registeredCourses: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Course' }],
  registeredAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Student', studentSchema);
