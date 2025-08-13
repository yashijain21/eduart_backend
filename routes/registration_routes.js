const express = require("express");
const Registration = require("../models/Registration");

const router = express.Router();

// POST: register for a course
router.post("/", async (req, res) => {
  try {
    const { name, email, phone, courseId, fees } = req.body;
    const registration = new Registration({
      name,
      email,
      phone,
      courseId,
      fees
    });
    await registration.save();
    res.status(201).json({ message: "Registration successful!" });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;
