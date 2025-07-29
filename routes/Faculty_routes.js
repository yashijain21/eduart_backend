// routes/faculties.js
const express = require('express');
const router = express.Router();
const Faculty = require('../models/Faculty');

// Get all faculties
router.get('/', async (req, res) => {
  try {
    const faculties = await Faculty.find().populate('courses');
    res.json(faculties);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Create new faculty (admin)
router.post('/', async (req, res) => {
  const faculty = new Faculty(req.body);
  try {
    const newFaculty = await faculty.save();
    res.status(201).json(newFaculty);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Update faculty
router.put('/:id', async (req, res) => {
  try {
    const updatedFaculty = await Faculty.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedFaculty);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete faculty
router.delete('/:id', async (req, res) => {
  try {
    await Faculty.findByIdAndDelete(req.params.id);
    res.json({ message: 'Faculty deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
