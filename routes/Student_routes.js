// routes/students.js
const express = require('express');
const router = express.Router();
const Student = require('../models/student');

// Get all registered students (admin)
router.get('/', async (req, res) => {
  try {
    const students = await Student.find().populate('registeredCourses');
    res.json(students);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Register new student (public)
router.post('/register', async (req, res) => {
  const student = new Student(req.body);
  try {
    const newStudent = await student.save();
    res.status(201).json(newStudent);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;
