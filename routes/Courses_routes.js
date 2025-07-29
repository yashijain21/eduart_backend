// routes/courses.js
const express = require('express');
const router = express.Router();
const Course = require('../models/Courses');

// Get all courses
router.get('/', async (req, res) => {
  try {
    const courses = await Course.find().populate('faculty');
    res.json(courses);
  } catch (err) {
    res.status(500).json({ message: 'Server error: ' + err.message });
  }
});

// Get a single course by ID
router.get('/:id', async (req, res) => {
  try {
    const course = await Course.findById(req.params.id).populate('faculty');
    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }
    res.json(course);
  } catch (err) {
    res.status(500).json({ message: 'Server error: ' + err.message });
  }
});

// Create new course (admin only)
router.post('/', async (req, res) => {
  const course = new Course(req.body);
  try {
    const newCourse = await course.save();
    res.status(201).json(newCourse);
  } catch (err) {
    res.status(400).json({ message: 'Invalid data: ' + err.message });
  }
});

// Update course
router.put('/:id', async (req, res) => {
  try {
    const updatedCourse = await Course.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedCourse) {
      return res.status(404).json({ message: 'Course not found' });
    }
    res.json(updatedCourse);
  } catch (err) {
    res.status(400).json({ message: 'Update failed: ' + err.message });
  }
});

// Delete course
router.delete('/:id', async (req, res) => {
  try {
    const deletedCourse = await Course.findByIdAndDelete(req.params.id);
    if (!deletedCourse) {
      return res.status(404).json({ message: 'Course not found' });
    }
    res.json({ message: 'Course deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Server error: ' + err.message });
  }
});

module.exports = router;
